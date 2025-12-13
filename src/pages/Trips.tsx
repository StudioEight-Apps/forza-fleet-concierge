import { Car, Calendar, MapPin, Clock } from 'lucide-react';
import IOSBottomNav from '@/components/IOSBottomNav';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useBookings } from '@/hooks/useBookings';
import { format } from 'date-fns';

const Trips = () => {
  const { bookings } = useBookings();

  const upcomingBookings = bookings.filter(b => new Date(b.startDate) >= new Date());
  const pastBookings = bookings.filter(b => new Date(b.startDate) < new Date());

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="px-4 h-14 flex items-center justify-center">
          <h1 className="font-semibold text-lg">Trips</h1>
        </div>
      </header>

      <main className="pt-14 px-4 py-6">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Car className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No trips yet</h2>
            <p className="text-muted-foreground max-w-xs mb-6">
              Book your first exotic car rental to see your trips here.
            </p>
            <Link to="/">
              <Button>Browse vehicles</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upcoming Trips */}
            {upcomingBookings.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <img
                        src={booking.vehicleImage}
                        alt={`${booking.vehicleBrand} ${booking.vehicleModel}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {booking.vehicleBrand} {booking.vehicleModel} {booking.vehicleYear}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(booking.startDate), 'MMM d')} – {format(new Date(booking.endDate), 'MMM d, yyyy')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <Clock className="h-4 w-4" />
                          <span>Pickup: {booking.pickupTime}</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                          <MapPin className="h-4 w-4" />
                          <span>601 Biscayne Boulevard, Miami, FL 33132</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div>
                            <p className="text-sm text-muted-foreground">Total due</p>
                            <p className="font-semibold">${booking.totalPrice.toLocaleString()}</p>
                          </div>
                          <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                            Confirmed
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Trips */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Past</h2>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-card border border-border rounded-xl overflow-hidden opacity-60"
                    >
                      <img
                        src={booking.vehicleImage}
                        alt={`${booking.vehicleBrand} ${booking.vehicleModel}`}
                        className="w-full h-32 object-cover grayscale"
                      />
                      <div className="p-4">
                        <h3 className="font-medium">
                          {booking.vehicleBrand} {booking.vehicleModel}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.startDate), 'MMM d')} – {format(new Date(booking.endDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <IOSBottomNav />
    </div>
  );
};

export default Trips;

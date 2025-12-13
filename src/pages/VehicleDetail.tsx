import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, MapPin, Share, Heart } from 'lucide-react';
import IOSBottomNav from '@/components/IOSBottomNav';
import { Button } from '@/components/ui/button';
import { getVehicleById } from '@/data/vehicles';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = getVehicleById(id || '');

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
          <Link to="/">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const price = vehicle.salePrice || vehicle.originalPrice;
  const rating = 4.85;
  const trips = 47;

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* iOS Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate('/')} className="p-2 -ml-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="font-semibold">{vehicle.brand.toUpperCase()} {vehicle.model.toUpperCase()}</h1>
          <div className="flex items-center gap-2">
            <button className="p-2">
              <Share className="h-5 w-5" />
            </button>
            <button className="p-2 -mr-2">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-14">
        {/* Hero Image */}
        <div className="relative aspect-[4/3] bg-secondary">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
            1 of 10
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {/* Owner & Title */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Forza Exotic</p>
              <h2 className="text-2xl font-bold">
                {vehicle.brand.toUpperCase()} {vehicle.model.toUpperCase()} {vehicle.year}
              </h2>
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 fill-foreground text-foreground" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">• {trips} trips</span>
              </div>
            </div>
            
            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold">${price}</p>
              <p className="text-muted-foreground text-sm">per day</p>
            </div>
          </div>

          {/* Trip Dates */}
          <div className="bg-secondary rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">TRIP DATES</p>
                  <p className="text-muted-foreground text-sm">Mon, Jan 9 at 9:00 AM</p>
                  <p className="text-muted-foreground text-sm">Mon, Jan 16 at 9:00 AM</p>
                </div>
              </div>
              <button className="text-primary font-medium text-sm">Change &gt;</button>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">PICKUP & RETURN</p>
                  <p className="text-muted-foreground text-sm">Miami, FL</p>
                </div>
              </div>
              <button className="text-primary font-medium text-sm">Change &gt;</button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">DESCRIPTION</h3>
            <p className="text-muted-foreground">
              Experience the ultimate in luxury and performance with this {vehicle.year} {vehicle.brand} {vehicle.model}. 
              Featuring {vehicle.specs.horsepower} horsepower, {vehicle.specs.acceleration} 0-60, and a top speed of {vehicle.specs.topSpeed}.
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">FEATURES</h3>
            <div className="grid grid-cols-2 gap-2">
              {vehicle.features.slice(0, 6).map((feature) => (
                <div key={feature} className="bg-secondary rounded-lg px-3 py-2 text-sm">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-semibold mb-3">REQUIREMENTS</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Age</span>
                <span>{vehicle.minAge}+ years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Insurance</span>
                <span>{vehicle.insuranceRequired}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 safe-area-bottom">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Add dates for prices</p>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>
          <Button 
            onClick={() => navigate(`/booking/${id}`)}
            className="h-12 px-6 font-semibold"
          >
            Check availability
          </Button>
        </div>
      </div>

      <IOSBottomNav />
    </div>
  );
};

export default VehicleDetail;

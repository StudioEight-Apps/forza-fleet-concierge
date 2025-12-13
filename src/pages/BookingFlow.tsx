import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { getVehicleById } from '@/data/vehicles';
import { format, differenceInDays, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BookingStep = 'dates' | 'review';

const timeOptions = [
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'
];

const BookingFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = getVehicleById(id || '');
  
  const [step, setStep] = useState<BookingStep>('dates');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [pickupTime, setPickupTime] = useState('8 AM');
  const [returnTime, setReturnTime] = useState('8 AM');

  if (!vehicle) {
    navigate('/');
    return null;
  }

  const price = vehicle.salePrice || vehicle.originalPrice;
  const rating = 4.85;
  const trips = 47;

  const numberOfDays = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const subtotal = numberOfDays * price;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  const handleDateSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else if (date && date > startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(undefined);
    }
  };

  const handleClearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const canProceed = startDate && endDate && numberOfDays > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <X className="h-6 w-6" />
          </button>
          {step === 'dates' && (
            <button 
              onClick={handleClearDates}
              className="text-primary font-medium"
            >
              Clear dates
            </button>
          )}
        </div>
      </header>

      {step === 'dates' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-6"
        >
          <h1 className="text-2xl font-bold mb-1">Select dates</h1>
          <p className="text-muted-foreground mb-6">
            {startDate ? format(startDate, 'EEE, MMM d') : 'Start date'} 
            {' – '}
            {endDate ? format(endDate, 'EEE, MMM d') : 'End date'}
          </p>

          {/* Calendar - Larger */}
          <div className="flex justify-center mb-8">
            <Calendar
              mode="single"
              selected={endDate || startDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              modifiers={{
                range_start: startDate ? [startDate] : [],
                range_end: endDate ? [endDate] : [],
                range_middle: startDate && endDate 
                  ? Array.from({ length: differenceInDays(endDate, startDate) - 1 }, (_, i) => addDays(startDate, i + 1))
                  : [],
              }}
              modifiersStyles={{
                range_start: { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))', borderRadius: '50%' },
                range_end: { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))', borderRadius: '50%' },
                range_middle: { backgroundColor: 'hsl(var(--secondary))', borderRadius: '0' },
              }}
              className="p-4 pointer-events-auto scale-110 origin-top"
              numberOfMonths={1}
            />
          </div>

          {/* Pick-Up & Return Time Selection - Matching Forza Website */}
          <div className="space-y-4 mt-8">
            {/* Pick-Up Section */}
            <div className="border border-border rounded-lg">
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">Pick-Up Date *</p>
                  <p className="font-medium">
                    {startDate ? format(startDate, 'MMM d, yyyy') : 'Start Date'}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">Pick-Up Time*</p>
                  <Select value={pickupTime} onValueChange={setPickupTime}>
                    <SelectTrigger className="border-0 p-0 h-auto font-medium shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Return Section */}
            <div className="border border-border rounded-lg">
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">Return Date*</p>
                  <p className="font-medium">
                    {endDate ? format(endDate, 'MMM d, yyyy') : 'End Date'}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">Return Time*</p>
                  <Select value={returnTime} onValueChange={setReturnTime}>
                    <SelectTrigger className="border-0 p-0 h-auto font-medium shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 safe-area-bottom">
            <div className="flex items-center justify-between">
              <div>
                {canProceed && (
                  <>
                    <p className="font-bold text-lg">${total.toLocaleString()}</p>
                    <p className="text-muted-foreground text-sm">For {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}</p>
                  </>
                )}
              </div>
              <Button 
                onClick={() => setStep('review')}
                disabled={!canProceed}
                className="h-12 px-8"
              >
                Continue
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {step === 'review' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-6 pb-32"
        >
          <h1 className="text-2xl font-bold mb-6">Review and continue</h1>

          {/* Vehicle Card */}
          <div className="border border-border rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <img 
                src={vehicle.image} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-24 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {vehicle.brand} {vehicle.model} {vehicle.year}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-foreground" />
                  <span className="text-sm">{rating}</span>
                  <span className="text-muted-foreground text-sm">({trips} trips)</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trip details</p>
                  <p className="text-muted-foreground text-sm">
                    {startDate && format(startDate, 'MMM d')} – {endDate && format(endDate, 'MMM d, yyyy')}
                  </p>
                </div>
                <button 
                  onClick={() => setStep('dates')}
                  className="px-4 py-2 border border-border rounded-lg font-medium text-sm"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Total price</p>
                  <p className="text-muted-foreground text-sm">
                    ${total.toLocaleString()} for {numberOfDays} days
                  </p>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg font-medium text-sm">
                  Details
                </button>
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <p className="font-medium">Free cancellation</p>
              <p className="text-muted-foreground text-sm">
                Cancel before {startDate && format(addDays(startDate, -1), 'MMMM d')} for a full refund.
              </p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-6">
            <h2 className="font-semibold mb-4">Price details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">${price.toLocaleString()} x {numberOfDays} days</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>${serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold pt-3 border-t border-border">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 safe-area-bottom">
            <Button className="w-full h-14 text-lg font-semibold">
              Request to book
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BookingFlow;

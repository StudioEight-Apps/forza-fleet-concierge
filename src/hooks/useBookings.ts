import { useState, useEffect } from 'react';

export interface Booking {
  id: string;
  vehicleId: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleImage: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  returnTime: string;
  totalPrice: number;
  depositPaid: number;
  createdAt: string;
}

const BOOKINGS_KEY = 'forza_bookings';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  };

  const getUpcomingBookings = () => {
    return bookings.filter(b => new Date(b.startDate) >= new Date());
  };

  return { bookings, addBooking, getUpcomingBookings };
};

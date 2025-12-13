import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'forza_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = useCallback((vehicleId: string) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(vehicleId);
      const updated = isFavorite 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((vehicleId: string) => {
    return favorites.includes(vehicleId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};

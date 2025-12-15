import { motion } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';

interface TuroVehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const TuroVehicleCard = ({ vehicle, index }: TuroVehicleCardProps) => {
  const price = vehicle.originalPrice;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(vehicle.id);
  
  // Stable rating based on vehicle id
  const rating = useMemo(() => {
    const seed = vehicle.id.charCodeAt(0) + vehicle.id.charCodeAt(vehicle.id.length - 1);
    return 4.8 + (seed % 20) / 100;
  }, [vehicle.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(vehicle.id);
  };

  // Format transmission to be shorter
  const transmissionShort = vehicle.specs.transmission.includes('Auto') ? 'Automatic' : 'Manual';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <div className="bg-background overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />

            {/* Heart icon */}
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-1.5 transition-transform active:scale-90"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 32 32" 
                className={`w-6 h-6 stroke-white stroke-2 transition-colors ${
                  favorited ? 'fill-red-500' : 'fill-black/50'
                }`}
              >
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="pt-3 pb-2">
            {/* Title and Rating */}
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base text-foreground">
                {vehicle.brand} {vehicle.model}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm text-foreground">{rating.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Details: Seats · Transmission · Location */}
            <p className="text-sm text-muted-foreground mb-2">
              {vehicle.seats} seats · {transmissionShort} · Miami
            </p>
            
            {/* Price and View Button */}
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">
                From ${price.toLocaleString()}<span className="font-normal text-muted-foreground">/day</span>
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-full px-5 h-9 border-foreground/20 hover:bg-muted"
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TuroVehicleCard;

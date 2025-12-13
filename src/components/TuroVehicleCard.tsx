import { motion } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

interface TuroVehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const TuroVehicleCard = ({ vehicle, index }: TuroVehicleCardProps) => {
  const price = vehicle.originalPrice;
  
  // Stable rating based on vehicle id
  const rating = useMemo(() => {
    const seed = vehicle.id.charCodeAt(0) + vehicle.id.charCodeAt(vehicle.id.length - 1);
    return 4.8 + (seed % 20) / 100;
  }, [vehicle.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <div className="bg-background overflow-hidden">
          {/* Image - Shorter aspect ratio */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />

            {/* Heart icon */}
            <button className="absolute top-2 right-2 p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-black/50 stroke-white stroke-2">
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
              </svg>
            </button>
          </div>

          {/* Content - Compact spacing */}
          <div className="pt-2 pb-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-foreground">
                {vehicle.brand} {vehicle.model}
              </h3>
              {/* Rating with green star */}
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs text-foreground">{rating.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Year and Price on same line */}
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs text-muted-foreground">{vehicle.year}</span>
              <span className="text-sm font-bold text-primary">
                ${price}<span className="font-normal text-muted-foreground text-xs">/day</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TuroVehicleCard;

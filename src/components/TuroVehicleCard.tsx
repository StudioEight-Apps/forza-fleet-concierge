import { motion } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import { Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TuroVehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const TuroVehicleCard = ({ vehicle, index }: TuroVehicleCardProps) => {
  const hasSale = !!vehicle.salePrice;
  const price = vehicle.salePrice || vehicle.originalPrice;
  
  // Simulate ratings and trips for demo
  const rating = 4.8 + (Math.random() * 0.2);
  const trips = Math.floor(20 + Math.random() * 80);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <div className="bg-card rounded-2xl overflow-hidden border border-border">
          {/* Image */}
          <div className="relative aspect-[16/10]">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {hasSale && (
                <span className="bg-highlight text-highlight-foreground px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  SALE
                </span>
              )}
              <span className="bg-secondary/90 text-secondary-foreground px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                INSTANT BOOK
              </span>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
              1 of 8
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-muted-foreground text-sm">{vehicle.year}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-foreground text-foreground" />
                  <span className="font-medium text-sm">{rating.toFixed(2)}</span>
                  <span className="text-muted-foreground text-sm">({trips} trips)</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="flex items-baseline gap-1">
                  {hasSale && (
                    <span className="text-muted-foreground text-sm line-through">
                      ${vehicle.originalPrice}
                    </span>
                  )}
                </div>
                <p className={`text-xl font-bold ${hasSale ? 'text-highlight' : ''}`}>
                  ${price}
                </p>
                <p className="text-muted-foreground text-xs">per day</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TuroVehicleCard;

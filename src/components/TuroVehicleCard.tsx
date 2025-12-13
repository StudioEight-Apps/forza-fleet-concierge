import { motion } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TuroVehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const TuroVehicleCard = ({ vehicle, index }: TuroVehicleCardProps) => {
  const price = vehicle.originalPrice;
  
  // Simulate rating for demo
  const rating = 4.8 + (Math.random() * 0.2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/vehicle/${vehicle.id}`} className="block">
        <div className="bg-background overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />

            {/* Heart icon like Airbnb */}
            <button className="absolute top-3 right-3 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-black/50 stroke-white stroke-2">
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
              </svg>
            </button>
          </div>

          {/* Content - Airbnb style */}
          <div className="pt-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-[15px] text-foreground">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <p className="text-muted-foreground text-[15px]">{vehicle.year}</p>
              </div>

              {/* Rating - Airbnb style */}
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
                <span className="text-[15px] text-foreground">{rating.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Price */}
            <div className="mt-1">
              <span className="text-[15px] text-foreground">
                <span className="font-semibold">${price}</span> day
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TuroVehicleCard;

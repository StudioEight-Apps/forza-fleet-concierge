import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';

interface TuroVehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const TuroVehicleCard = ({ vehicle, index }: TuroVehicleCardProps) => {
  const price = vehicle.originalPrice;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(vehicle.id);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Stable rating based on vehicle id
  const rating = useMemo(() => {
    const seed = vehicle.id.charCodeAt(0) + vehicle.id.charCodeAt(vehicle.id.length - 1);
    return 4.8 + (seed % 20) / 100;
  }, [vehicle.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!favorited) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
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
      <Link to={`/vehicle/${vehicle.id}`} className="block group">
        <motion.div 
          className="bg-background overflow-hidden rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          whileTap={{ scale: 0.985, opacity: 0.92 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Heart icon with circular container */}
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-all active:scale-90 hover:bg-black/30"
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 32 32" 
                className={`w-5 h-5 stroke-white stroke-[1.5] transition-colors ${
                  favorited ? 'fill-red-500' : 'fill-white/30'
                }`}
                animate={isAnimating ? {
                  scale: [1, 1.3, 0.9, 1.1, 1],
                } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
              </motion.svg>
              
              {/* Burst particles on favorite */}
              <AnimatePresence>
                {isAnimating && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-red-400"
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                          opacity: [1, 1, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Content */}
          <div className="pt-2.5 pb-2.5 px-1">
            {/* Title and Rating */}
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="font-semibold text-base text-foreground leading-tight">
                {vehicle.brand} {vehicle.model}
              </h3>
              <div className="flex items-center gap-0.5 opacity-50">
                <Star className="h-3 w-3 fill-muted-foreground/70 text-muted-foreground/70" />
                <span className="text-xs text-muted-foreground/70">{rating.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Details: Seats · Transmission · Location */}
            <p className="text-sm text-muted-foreground/80 mb-1.5 leading-tight">
              {vehicle.seats} seats · {transmissionShort} · Miami
            </p>
            
            {/* Price */}
            <p className="text-base font-semibold text-foreground leading-tight">
              From ${price.toLocaleString()}<span className="font-normal text-muted-foreground/80">/day</span>
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default TuroVehicleCard;

import { motion } from 'framer-motion';
import { Vehicle } from '@/data/vehicles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard = ({ vehicle, index }: VehicleCardProps) => {
  const hasSale = !!vehicle.salePrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative rounded-2xl overflow-hidden glass glass-hover cursor-pointer"
    >
      <Link to={`/vehicle/${vehicle.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Sale Badge */}
          {hasSale && (
            <Badge className="absolute top-4 left-4 bg-highlight text-highlight-foreground font-bold">
              <Zap className="h-3 w-3 mr-1" />
              SALE
            </Badge>
          )}

          {/* Type Badge */}
          <Badge variant="secondary" className="absolute top-4 right-4 capitalize">
            {vehicle.type === 'suv' ? 'Luxury SUV' : 'Sports Car'}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                {vehicle.brand}
              </p>
              <h3 className="font-display text-2xl font-semibold mt-0.5">
                {vehicle.model}
              </h3>
            </div>
            <div className="text-right">
              {hasSale ? (
                <>
                  <p className="text-muted-foreground text-sm line-through">
                    ${vehicle.originalPrice}
                  </p>
                  <p className="text-highlight text-xl font-bold">
                    ${vehicle.salePrice}<span className="text-sm font-normal">/day</span>
                  </p>
                </>
              ) : (
                <p className="text-foreground text-xl font-bold">
                  ${vehicle.originalPrice}<span className="text-sm font-normal text-muted-foreground">/day</span>
                </p>
              )}
            </div>
          </div>

          {/* Specs Preview */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>{vehicle.specs.horsepower} HP</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{vehicle.specs.acceleration}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{vehicle.year}</span>
          </div>

          {/* CTA */}
          <Button variant="default" className="w-full group/btn">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehicleCard;

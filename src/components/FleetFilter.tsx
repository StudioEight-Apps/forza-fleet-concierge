import { motion } from 'framer-motion';
import { Car, Truck } from 'lucide-react';

type FilterType = 'all' | 'suv' | 'sports';

interface FleetFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { type: FilterType; label: string; icon: React.ReactNode }[] = [
  { type: 'all', label: 'All Vehicles', icon: null },
  { type: 'suv', label: 'Luxury SUVs', icon: <Truck className="h-4 w-4" /> },
  { type: 'sports', label: 'Sports Cars', icon: <Car className="h-4 w-4" /> },
];

const FleetFilter = ({ activeFilter, onFilterChange }: FleetFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            activeFilter === filter.type
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground glass glass-hover'
          }`}
        >
          {activeFilter === filter.type && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-primary rounded-full glow-primary-sm"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {filter.icon}
            {filter.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FleetFilter;

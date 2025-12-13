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
          className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
            activeFilter === filter.type
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          {filter.icon}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FleetFilter;

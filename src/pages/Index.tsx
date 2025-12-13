import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Map } from 'lucide-react';
import LocationHeader from '@/components/LocationHeader';
import TuroVehicleCard from '@/components/TuroVehicleCard';
import IOSBottomNav from '@/components/IOSBottomNav';
import FilterSheet from '@/components/FilterSheet';
import PromoBanner from '@/components/PromoBanner';
import { getVehiclesByType } from '@/data/vehicles';

type FilterType = 'all' | 'suv' | 'sports';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const vehicles = getVehiclesByType(activeFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      <LocationHeader 
        location="Miami, FL"
        dates="Jan 9, 9:00 AM – Jan 16, 9:00 AM"
      />
      
      <main className="pt-[76px]">
        <PromoBanner />

        {/* Filter Bar */}
        <div className="sticky top-[76px] z-40 bg-background border-b border-border">
          <div className="px-4 py-3 flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium">
              <Map className="h-4 w-4" />
              Map
            </button>
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full ml-1">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="px-4 py-4 space-y-4">
          {vehicles.map((vehicle, index) => (
            <TuroVehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      </main>

      <FilterSheet 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(filters) => setActiveFilter(filters.vehicleType)}
        vehicleCount={vehicles.length}
      />

      <IOSBottomNav />
    </div>
  );
};

export default Index;

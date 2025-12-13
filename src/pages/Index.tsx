import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
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
  const [location, setLocation] = useState('Miami');
  const vehicles = getVehiclesByType(activeFilter);

  return (
    <div className="min-h-screen bg-background pb-24">
      <LocationHeader 
        location={location}
        onLocationChange={setLocation}
      />
      
      <main className="pt-[68px]">
        <PromoBanner />

        {/* Category Pills - Airbnb style */}
        <div className="sticky top-[76px] z-40 bg-background border-b border-border">
          <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium whitespace-nowrap ${
                activeFilter === 'all' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
              }`}
            >
              All Cars
            </button>
            <button 
              onClick={() => setActiveFilter('suv')}
              className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium whitespace-nowrap ${
                activeFilter === 'suv' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
              }`}
            >
              SUVs
            </button>
            <button 
              onClick={() => setActiveFilter('sports')}
              className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium whitespace-nowrap ${
                activeFilter === 'sports' ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
              }`}
            >
              Sports
            </button>
            
            <div className="flex-1" />
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
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

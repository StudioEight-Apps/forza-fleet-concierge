import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import LocationHeader from '@/components/LocationHeader';
import TuroVehicleCard from '@/components/TuroVehicleCard';
import IOSBottomNav from '@/components/IOSBottomNav';
import FilterSheet from '@/components/FilterSheet';

import { getVehiclesByType } from '@/data/vehicles';

interface ActiveFilters {
  vehicleType: string[];
  manufacturer: string[];
}

const Index = () => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    vehicleType: [],
    manufacturer: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [location, setLocation] = useState('Miami');
  
  // Get all vehicles then filter based on active filters
  const allVehicles = getVehiclesByType('all');
  const vehicles = allVehicles.filter(vehicle => {
    // If no filters selected, show all
    if (activeFilters.vehicleType.length === 0 && activeFilters.manufacturer.length === 0) {
      return true;
    }
    
    // Check vehicle type filter
    const typeMatch = activeFilters.vehicleType.length === 0 || 
      activeFilters.vehicleType.includes(vehicle.type);
    
    // Check manufacturer filter (using brand name lowercase)
    const brandId = vehicle.brand.toLowerCase().replace(' ', '-');
    const mfrMatch = activeFilters.manufacturer.length === 0 ||
      activeFilters.manufacturer.includes(brandId);
    
    return typeMatch && mfrMatch;
  });

  const activeFilterCount = activeFilters.vehicleType.length + activeFilters.manufacturer.length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <LocationHeader 
        location={location}
        onLocationChange={setLocation}
      />
      
      <main className="pt-[68px]">
        {/* Category Pills - Airbnb style */}
        <div className="sticky top-[76px] z-40 bg-background border-b border-border">
          <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto">
            <button 
              onClick={() => setActiveFilters({ vehicleType: [], manufacturer: [] })}
              className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium whitespace-nowrap ${
                activeFilterCount === 0 ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
              }`}
            >
              All Cars
            </button>
            <button 
              onClick={() => setActiveFilters({ vehicleType: ['suv'], manufacturer: [] })}
              className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium whitespace-nowrap ${
                activeFilters.vehicleType.includes('suv') && activeFilters.vehicleType.length === 1 ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
              }`}
            >
              SUVs
            </button>
            <button 
              onClick={() => setActiveFilters({ vehicleType: ['sports'], manufacturer: [] })}
              className={`flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium whitespace-nowrap ${
                activeFilters.vehicleType.includes('sports') && activeFilters.vehicleType.length === 1 ? 'text-foreground border-b-2 border-foreground' : 'text-muted-foreground'
              }`}
            >
              Sports
            </button>
            
            <div className="flex-1" />
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium ${
                activeFilterCount > 0 ? 'border-primary bg-primary/10 text-primary' : 'border-border'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
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
        onApply={(filters) => setActiveFilters(filters)}
        vehicleCount={vehicles.length}
      />

      <IOSBottomNav />
    </div>
  );
};

export default Index;

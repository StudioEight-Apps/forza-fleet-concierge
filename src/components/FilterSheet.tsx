import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Truck, Zap, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import logos
import bentleyLogo from '@/assets/logos/bentley.png';
import bmwLogo from '@/assets/logos/bmw.png';
import cadillacLogo from '@/assets/logos/cadillac.png';
import ferrariLogo from '@/assets/logos/ferrari.png';
import lamborghiniLogo from '@/assets/logos/lamborghini.png';
import landRoverLogo from '@/assets/logos/land-rover.png';
import mclarenLogo from '@/assets/logos/mclaren.png';
import mercedesLogo from '@/assets/logos/mercedes.png';
import porscheLogo from '@/assets/logos/porsche.png';
import rollsRoyceLogo from '@/assets/logos/rolls-royce.png';
import teslaLogo from '@/assets/logos/tesla.png';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  vehicleCount: number;
}

interface FilterState {
  vehicleType: string[];
  manufacturer: string[];
}

const vehicleTypes = [
  { id: 'convertible', label: 'Convertible', icon: Sun },
  { id: 'suv', label: 'SUV', icon: Truck },
  { id: 'electric', label: 'Electric', icon: Zap },
  { id: 'sports', label: 'Sports', icon: Car },
];

const manufacturers = [
  { id: 'bentley', label: 'Bentley', logo: bentleyLogo },
  { id: 'bmw', label: 'BMW', logo: bmwLogo },
  { id: 'cadillac', label: 'Cadillac', logo: cadillacLogo },
  { id: 'ferrari', label: 'Ferrari', logo: ferrariLogo },
  { id: 'lamborghini', label: 'Lamborghini', logo: lamborghiniLogo },
  { id: 'land-rover', label: 'Land Rover', logo: landRoverLogo },
  { id: 'mclaren', label: 'McLaren', logo: mclarenLogo },
  { id: 'mercedes', label: 'Mercedes Benz', logo: mercedesLogo },
  { id: 'porsche', label: 'Porsche', logo: porscheLogo },
  { id: 'rolls-royce', label: 'Rolls Royce', logo: rollsRoyceLogo },
  { id: 'tesla', label: 'Tesla', logo: teslaLogo },
];

const FilterSheet = ({ isOpen, onClose, onApply, vehicleCount }: FilterSheetProps) => {
  const [filters, setFilters] = useState<FilterState>({
    vehicleType: [],
    manufacturer: [],
  });

  const handleReset = () => {
    setFilters({
      vehicleType: [],
      manufacturer: [],
    });
  };

  const toggleVehicleType = (id: string) => {
    setFilters(prev => ({
      ...prev,
      vehicleType: prev.vehicleType.includes(id)
        ? prev.vehicleType.filter(t => t !== id)
        : [...prev.vehicleType, id]
    }));
  };

  const toggleManufacturer = (id: string) => {
    setFilters(prev => ({
      ...prev,
      manufacturer: prev.manufacturer.includes(id)
        ? prev.manufacturer.filter(m => m !== id)
        : [...prev.manufacturer, id]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <button 
                onClick={handleReset}
                className="text-primary font-medium text-sm"
              >
                Reset
              </button>
              <div className="text-center">
                <h2 className="font-semibold">FILTERS</h2>
                <p className="text-xs text-muted-foreground">{vehicleCount} cars</p>
              </div>
              <button onClick={onClose}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* Vehicle Type */}
                <div>
                  <p className="font-medium mb-4 text-sm tracking-wide">VEHICLE TYPE</p>
                  <div className="grid grid-cols-2 gap-3">
                    {vehicleTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => toggleVehicleType(type.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          filters.vehicleType.includes(type.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary'
                        }`}
                      >
                        <type.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manufacturer */}
                <div className="border-t border-border pt-6">
                  <p className="font-medium mb-4 text-sm tracking-wide">MANUFACTURER</p>
                  <div className="grid grid-cols-2 gap-3">
                    {manufacturers.map((mfr) => (
                      <button
                        key={mfr.id}
                        onClick={() => toggleManufacturer(mfr.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          filters.manufacturer.includes(mfr.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary'
                        }`}
                      >
                        <img 
                          src={mfr.logo} 
                          alt={mfr.label} 
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-sm font-medium">{mfr.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Apply Button */}
            <div className="p-4 border-t border-border safe-area-bottom shrink-0">
              <Button 
                onClick={() => {
                  onApply(filters);
                  onClose();
                }}
                className="w-full h-14 text-lg font-semibold"
              >
                Show {vehicleCount} cars
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSheet;

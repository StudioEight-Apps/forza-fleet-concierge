import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, Car, Truck, Zap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  vehicleCount: number;
}

interface FilterState {
  delivery: boolean;
  instantBook: boolean;
  vehicleType: 'all' | 'suv' | 'sports';
}

const vehicleTypes = [
  { id: 'all' as const, label: 'All', icon: null },
  { id: 'suv' as const, label: 'SUVs', icon: Truck },
  { id: 'sports' as const, label: 'Sports', icon: Car },
];

const FilterSheet = ({ isOpen, onClose, onApply, vehicleCount }: FilterSheetProps) => {
  const [filters, setFilters] = useState<FilterState>({
    delivery: false,
    instantBook: false,
    vehicleType: 'all',
  });

  const handleReset = () => {
    setFilters({
      delivery: false,
      instantBook: false,
      vehicleType: 'all',
    });
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
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

            {/* Content */}
            <div className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* Delivery Toggle */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">DELIVERY</p>
                    <p className="text-sm text-muted-foreground">Get the car delivered directly to you</p>
                  </div>
                </div>
                <Switch
                  checked={filters.delivery}
                  onCheckedChange={(checked) => setFilters({ ...filters, delivery: checked })}
                />
              </div>

              {/* Instant Book Toggle */}
              <div className="flex items-center justify-between py-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">INSTANT BOOK</p>
                    <p className="text-sm text-muted-foreground">Book immediately without waiting</p>
                  </div>
                </div>
                <Switch
                  checked={filters.instantBook}
                  onCheckedChange={(checked) => setFilters({ ...filters, instantBook: checked })}
                />
              </div>

              {/* Vehicle Type */}
              <div className="border-t border-border pt-4">
                <p className="font-medium mb-4">VEHICLE TYPE</p>
                <div className="grid grid-cols-3 gap-3">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFilters({ ...filters, vehicleType: type.id })}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        filters.vehicleType === type.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary'
                      }`}
                    >
                      {type.icon && <type.icon className="h-6 w-6 mb-2" />}
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="p-4 border-t border-border safe-area-bottom">
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

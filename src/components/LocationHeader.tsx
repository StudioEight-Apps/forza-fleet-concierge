import { useState } from 'react';
import { MapPin, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationHeaderProps {
  location: string;
  dates: string;
  onLocationClick?: () => void;
  onDatesClick?: () => void;
}

const LocationHeader = ({ location, dates, onLocationClick, onDatesClick }: LocationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Location & Dates Selector */}
          <button 
            onClick={onLocationClick}
            className="flex-1 flex items-center gap-3 bg-secondary rounded-xl px-4 py-3"
          >
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">{location}</p>
              <p className="text-xs text-muted-foreground">{dates}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Search Button */}
          <button className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default LocationHeader;

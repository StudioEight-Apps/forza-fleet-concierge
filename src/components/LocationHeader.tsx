import { Search } from 'lucide-react';

interface LocationHeaderProps {
  location: string;
  dates: string;
  onLocationClick?: () => void;
  onDatesClick?: () => void;
}

const LocationHeader = ({ location, dates, onLocationClick, onDatesClick }: LocationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background safe-area-top">
      <div className="px-4 py-3">
        {/* Location pill - no search since Miami/Ft Lauderdale only */}
        <button 
          onClick={onLocationClick}
          className="w-full flex items-center gap-3 bg-background rounded-full px-4 py-3 shadow-lg border border-border"
        >
          <Search className="h-4 w-4 text-foreground flex-shrink-0" />
          <div className="flex-1 text-left">
            <p className="font-medium text-sm text-foreground">{location}</p>
            <p className="text-xs text-muted-foreground">{dates}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default LocationHeader;

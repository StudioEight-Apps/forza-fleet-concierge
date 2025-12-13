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
        {/* Location pill with search icon */}
        <button 
          onClick={onLocationClick}
          className="w-full flex items-center gap-3 bg-background rounded-full px-4 py-3 shadow-lg border border-border"
        >
          <Search className="h-4 w-4 text-foreground flex-shrink-0" />
          <div className="flex-1 text-left">
            <p className="font-medium text-sm text-foreground">{location}</p>
            <p className="text-xs text-muted-foreground">{dates}</p>
          </div>
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4 text-foreground">
              <path fill="currentColor" d="M5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
              <path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8z"/>
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
};

export default LocationHeader;

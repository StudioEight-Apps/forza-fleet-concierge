import forzaLogo from '@/assets/forza-logo.png';

interface LocationHeaderProps {
  location: string;
  onLocationChange?: (location: string) => void;
}

const LocationHeader = ({ location, onLocationChange }: LocationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background safe-area-top">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Forza Logo - Left aligned, larger */}
          <img 
            src={forzaLogo} 
            alt="Forza Exotic Car Rentals" 
            className="h-16 w-auto object-contain"
          />
          
          {/* Location Tabs - Right aligned */}
          <div className="flex bg-secondary/60 rounded-full p-0.5">
            <button
              onClick={() => onLocationChange?.('Miami')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                location === 'Miami' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground/60 hover:text-muted-foreground'
              }`}
            >
              Miami
            </button>
            <button
              onClick={() => onLocationChange?.('Fort Lauderdale')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                location === 'Fort Lauderdale' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground/60 hover:text-muted-foreground'
              }`}
            >
              Ft. Lauderdale
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LocationHeader;

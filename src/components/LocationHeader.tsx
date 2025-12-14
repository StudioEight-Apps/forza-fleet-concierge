import forzaLogo from '@/assets/forza-logo.png';

interface LocationHeaderProps {
  location: string;
  onLocationChange?: (location: string) => void;
}

const LocationHeader = ({ location, onLocationChange }: LocationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background safe-area-top border-b border-border">
      <div className="px-4 py-3">
        <div className="flex flex-col items-center gap-2">
          {/* Forza Logo */}
          <img 
            src={forzaLogo} 
            alt="Forza Exotic Car Rentals" 
            className="h-12 w-auto object-contain"
          />
          
          {/* Location Tabs - Centered below with green accent */}
          <div className="flex bg-secondary rounded-full p-0.5">
            <button
              onClick={() => onLocationChange?.('Miami')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                location === 'Miami' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Miami
            </button>
            <button
              onClick={() => onLocationChange?.('Fort Lauderdale')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                location === 'Fort Lauderdale' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
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

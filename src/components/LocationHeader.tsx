interface LocationHeaderProps {
  location: string;
  onLocationChange?: (location: string) => void;
}

const LocationHeader = ({ location, onLocationChange }: LocationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background safe-area-top border-b border-border">
      <div className="px-4 py-2">
        <div className="flex flex-col items-center gap-1.5">
          {/* Forza Logo Text */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-foreground tracking-tight">FORZA</span>
            <span className="text-lg font-light text-muted-foreground ml-1">EXOTICS</span>
          </div>
          
          {/* Location Tabs - Centered below */}
          <div className="flex bg-secondary rounded-full p-0.5">
            <button
              onClick={() => onLocationChange?.('Miami')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                location === 'Miami' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground'
              }`}
            >
              Miami
            </button>
            <button
              onClick={() => onLocationChange?.('Fort Lauderdale')}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                location === 'Fort Lauderdale' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground'
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

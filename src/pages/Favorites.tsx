import { Heart } from 'lucide-react';
import IOSBottomNav from '@/components/IOSBottomNav';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { getVehicleById } from '@/data/vehicles';
import TuroVehicleCard from '@/components/TuroVehicleCard';

const Favorites = () => {
  const { favorites } = useFavorites();
  
  const favoriteVehicles = favorites
    .map(id => getVehicleById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="px-4 h-14 flex items-center justify-center">
          <h1 className="font-semibold text-lg">Favorites</h1>
        </div>
      </header>

      <main className="pt-14 px-4 py-6">
        {favoriteVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground max-w-xs mb-6">
              Tap the heart icon on any vehicle to save it here for later.
            </p>
            <Link to="/">
              <Button>Browse vehicles</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-muted-foreground text-sm">
              {favoriteVehicles.length} {favoriteVehicles.length === 1 ? 'vehicle' : 'vehicles'} saved
            </p>
            <div className="grid grid-cols-1 gap-6">
              {favoriteVehicles.map((vehicle, index) => (
                <TuroVehicleCard 
                  key={vehicle!.id} 
                  vehicle={vehicle!} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <IOSBottomNav />
    </div>
  );
};

export default Favorites;

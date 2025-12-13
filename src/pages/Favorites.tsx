import { Heart } from 'lucide-react';
import IOSBottomNav from '@/components/IOSBottomNav';

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="px-4 h-14 flex items-center justify-center">
          <h1 className="font-semibold text-lg">Favorites</h1>
        </div>
      </header>

      <main className="pt-14 px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground max-w-xs">
            Tap the heart icon on any vehicle to save it here for later.
          </p>
        </div>
      </main>

      <IOSBottomNav />
    </div>
  );
};

export default Favorites;

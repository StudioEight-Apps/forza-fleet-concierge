import { Car } from 'lucide-react';
import IOSBottomNav from '@/components/IOSBottomNav';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Trips = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="px-4 h-14 flex items-center justify-center">
          <h1 className="font-semibold text-lg">Trips</h1>
        </div>
      </header>

      <main className="pt-14 px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Car className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No trips yet</h2>
          <p className="text-muted-foreground max-w-xs mb-6">
            Book your first exotic car rental to see your trips here.
          </p>
          <Link to="/">
            <Button>Browse vehicles</Button>
          </Link>
        </div>
      </main>

      <IOSBottomNav />
    </div>
  );
};

export default Trips;

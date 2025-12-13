import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import PromoBanner from '@/components/PromoBanner';
import HeroSection from '@/components/HeroSection';
import FleetFilter from '@/components/FleetFilter';
import VehicleCard from '@/components/VehicleCard';
import BottomNav from '@/components/BottomNav';
import { getVehiclesByType } from '@/data/vehicles';

type FilterType = 'all' | 'suv' | 'sports';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const vehicles = getVehiclesByType(activeFilter);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <PromoBanner />
      
      <main>
        <HeroSection />

        {/* Fleet Section */}
        <section id="fleet" className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                Our Fleet
              </h2>
              <p className="text-muted-foreground">
                {vehicles.length} exotic vehicles available
              </p>
            </div>
            <FleetFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </motion.div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;

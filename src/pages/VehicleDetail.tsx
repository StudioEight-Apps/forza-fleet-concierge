import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Gauge, Clock, Settings, Shield, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getVehicleById } from '@/data/vehicles';

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = getVehicleById(id || '');

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
          <Link to="/">
            <Button variant="default">Back to Fleet</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasSale = !!vehicle.salePrice;
  const specs = [
    { icon: Zap, label: 'Horsepower', value: `${vehicle.specs.horsepower} HP` },
    { icon: Clock, label: '0-60 mph', value: vehicle.specs.acceleration },
    { icon: Gauge, label: 'Top Speed', value: vehicle.specs.topSpeed },
    { icon: Settings, label: 'Transmission', value: vehicle.specs.transmission },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-20">
      <Header />

      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-24 left-4 glass rounded-full p-3 hover:bg-card/90 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          {/* Sale Badge */}
          {hasSale && (
            <Badge className="absolute top-24 right-4 bg-highlight text-highlight-foreground font-bold text-base px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              ON SALE
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-primary font-medium uppercase tracking-widest text-sm mb-1">
                  {vehicle.brand}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-bold">
                  {vehicle.model}
                </h1>
                <p className="text-muted-foreground mt-2">{vehicle.year} Model</p>
              </div>
              <div className="text-left sm:text-right">
                {hasSale ? (
                  <>
                    <p className="text-muted-foreground line-through text-lg">
                      ${vehicle.originalPrice}/day
                    </p>
                    <p className="text-highlight text-3xl sm:text-4xl font-bold">
                      ${vehicle.salePrice}
                      <span className="text-lg font-normal">/day</span>
                    </p>
                  </>
                ) : (
                  <p className="text-foreground text-3xl sm:text-4xl font-bold">
                    ${vehicle.originalPrice}
                    <span className="text-lg font-normal text-muted-foreground">/day</span>
                  </p>
                )}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-secondary/50 rounded-xl p-4 text-center"
                >
                  <spec.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold mb-4">Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-secondary/30 rounded-xl p-5 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">Requirements</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Minimum Age</p>
                  <p className="font-medium">{vehicle.minAge}+ years old</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Insurance</p>
                  <p className="font-medium">{vehicle.insuranceRequired}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="premium" size="xl" className="flex-1">
                Reserve Now
              </Button>
              <Link to="/chat" className="flex-1">
                <Button variant="outline" size="xl" className="w-full">
                  Ask Concierge
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default VehicleDetail;

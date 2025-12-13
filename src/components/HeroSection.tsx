import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Shield, Clock, MapPin } from 'lucide-react';

const HeroSection = () => {
  const features = [
    { icon: Shield, label: 'Full Insurance' },
    { icon: Clock, label: '24/7 Support' },
    { icon: MapPin, label: 'Free Delivery' },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium uppercase tracking-widest text-sm mb-4"
          >
            Miami's Premier Exotic Fleet
          </motion.p>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Experience
            <span className="text-gradient block">Extraordinary</span>
          </h1>
          
          <p className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Drive the world's most exclusive vehicles. Lamborghini, Ferrari, Rolls Royce — 
            your dream car awaits.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="glass px-4 py-2 rounded-full flex items-center gap-2"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              variant="premium"
              size="xl"
              onClick={() => {
                document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Fleet
              <ArrowDown className="h-5 w-5 ml-2 animate-bounce" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

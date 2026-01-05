import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Calendar, Clock, Heart, Map, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      id: 'welcome',
      headline: 'Forza Fleet Concierge',
      subtext: 'Reserve Miami\'s top vehicles with white-glove delivery.',
      cta: 'Get Started',
      secondary: 'Skip',
    },
    {
      id: 'how-it-works',
      headline: 'How It Works',
      features: [
        { icon: Car, text: 'Browse the fleet' },
        { icon: Calendar, text: 'Select dates' },
        { icon: Clock, text: 'Reserve in minutes' },
      ],
      cta: 'Continue',
    },
    {
      id: 'value',
      headline: 'Your Concierge Awaits',
      features: [
        { icon: Heart, text: 'Save vehicles' },
        { icon: Map, text: 'Manage trips' },
        { icon: Headphones, text: 'Concierge support' },
      ],
      cta: 'Start Browsing',
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const screen = screens[currentScreen];

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex-1 flex flex-col items-center justify-center px-8 text-center"
        >
          {/* Icon or Logo area */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8"
          >
            <Car className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-2xl font-semibold text-foreground mb-3"
          >
            {screen.headline}
          </motion.h1>

          {/* Subtext or Features */}
          {screen.subtext && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-muted-foreground text-base max-w-[280px] leading-relaxed"
            >
              {screen.subtext}
            </motion.p>
          )}

          {screen.features && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-4 mt-2"
            >
              {screen.features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-foreground font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Section */}
      <div className="px-8 pb-12 safe-area-bottom">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleNext}
          className="w-full h-14 rounded-2xl text-base font-semibold bg-primary hover:bg-primary/90"
        >
          {screen.cta}
        </Button>

        {/* Skip Button */}
        {screen.secondary && (
          <button
            onClick={handleSkip}
            className="w-full mt-4 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
          >
            {screen.secondary}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;

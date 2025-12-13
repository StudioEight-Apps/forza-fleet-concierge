import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-highlight/90 to-amber-500/90 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 relative">
        <Sparkles className="h-4 w-4 text-highlight-foreground" />
        <p className="text-sm font-semibold text-highlight-foreground text-center">
          First-Time Rental? Get <span className="font-bold">15% OFF</span> — Use code FORZA15
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-highlight-foreground/70 hover:text-highlight-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PromoBanner;

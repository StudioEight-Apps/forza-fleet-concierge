import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-highlight"
    >
      <div className="px-4 py-2.5 flex items-center justify-center gap-2 relative">
        <Sparkles className="h-4 w-4 text-highlight-foreground" />
        <p className="text-sm font-semibold text-highlight-foreground text-center">
          First rental? Get <span className="font-bold">15% OFF</span> — FORZA15
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 text-highlight-foreground/70 hover:text-highlight-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PromoBanner;

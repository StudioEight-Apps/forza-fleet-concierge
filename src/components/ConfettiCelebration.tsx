import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ConfettiCelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const confettiColors = ['#6BBF6B', '#FFD700', '#FF6B6B', '#4ECDC4', '#9B59B6', '#3498DB'];

const ConfettiPiece = ({ delay, color, startX }: { delay: number; color: string; startX: number }) => (
  <motion.div
    initial={{ y: -20, x: startX, opacity: 1, rotate: 0 }}
    animate={{ 
      y: window.innerHeight + 50, 
      x: startX + (Math.random() - 0.5) * 200,
      opacity: 0,
      rotate: Math.random() * 720 - 360
    }}
    transition={{ 
      duration: 2.5 + Math.random(), 
      delay,
      ease: 'easeOut'
    }}
    className="absolute top-0 w-3 h-3"
    style={{ 
      backgroundColor: color,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px'
    }}
  />
);

const ConfettiCelebration = ({ isVisible, onComplete }: ConfettiCelebrationProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; delay: number; color: string; startX: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      const pieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.5,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        startX: Math.random() * window.innerWidth
      }));
      setConfetti(pieces);

      // Navigate after animation
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Confetti pieces */}
          {confetti.map((piece) => (
            <ConfettiPiece
              key={piece.id}
              delay={piece.delay}
              color={piece.color}
              startX={piece.startX}
            />
          ))}

          {/* Success message */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.2 }}
            className="text-center z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.3 }}
              className="w-24 h-24 rounded-full bg-primary mx-auto mb-6 flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              Order Confirmed!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg"
            >
              Your exotic ride awaits
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiCelebration;

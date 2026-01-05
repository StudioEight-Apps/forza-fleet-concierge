import { motion } from 'framer-motion';
import splashLogo from '@/assets/forza-splash-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 1800);
      }}
    >
      <motion.img
        src={splashLogo}
        alt="Forza Exotic Car Rentals"
        className="w-64 h-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

export default SplashScreen;

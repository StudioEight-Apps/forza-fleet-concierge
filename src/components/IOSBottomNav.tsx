import { Search, Heart, MessageCircle, User, Car } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const IOSBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Search, label: 'Search' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/trips', icon: Car, label: 'Trips' },
    { path: '/chat', icon: MessageCircle, label: 'Inbox' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
      className="fixed bottom-4 left-4 right-4 z-50 safe-area-bottom"
    >
      <div className="flex items-center justify-around h-16 bg-card/80 backdrop-blur-2xl border border-border/30 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200"
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-2 inset-y-2 bg-primary/10 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <item.icon 
                  className={`h-[22px] w-[22px] transition-all duration-200 ${
                    isActive 
                      ? 'text-primary stroke-[2]' 
                      : 'text-muted-foreground/70 stroke-[1.5]'
                  }`}
                  style={isActive ? { 
                    filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.5))' 
                  } : undefined}
                />
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted-foreground/70'
                }`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default IOSBottomNav;

import { Search, Heart, MessageCircle, User, Car } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
    <nav className="fixed bottom-4 left-4 right-4 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-[72px] bg-card/90 backdrop-blur-xl border border-border/20 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full"
            >
              {/* Active pill background */}
              {isActive && (
                <div className="absolute inset-x-3 inset-y-3 bg-primary/8 rounded-2xl" />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <item.icon 
                  className={`h-[22px] w-[22px] transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary stroke-[2]' 
                      : 'text-foreground/50 stroke-[1.5]'
                  }`}
                />
                <span className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-foreground/50'
                }`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default IOSBottomNav;

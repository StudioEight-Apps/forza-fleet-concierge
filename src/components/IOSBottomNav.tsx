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
      <div className="flex items-center justify-around h-14 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5] drop-shadow-[0_0_8px_hsl(var(--primary))]' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default IOSBottomNav;

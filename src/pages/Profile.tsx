import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, FileText, LogOut, ChevronRight, Sparkles, Settings } from 'lucide-react';
import IOSBottomNav from '@/components/IOSBottomNav';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const menuItems = [
    { icon: User, label: 'Personal Information', href: '#' },
    { icon: FileText, label: 'Rental History', href: '#' },
    { icon: CreditCard, label: 'Payment Methods', href: '#' },
    { icon: Mail, label: 'Notifications', href: '#' },
    { icon: Phone, label: 'Support', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* iOS Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border safe-area-top">
        <div className="px-4 h-14 flex items-center justify-center">
          <h1 className="font-semibold text-lg">Profile</h1>
        </div>
      </header>

      <main className="pt-14 px-4 py-6">
        <div className="max-w-lg mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-3 flex items-center justify-center">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-0.5">Guest User</h2>
            <p className="text-muted-foreground text-sm">Sign in to access your account</p>
          </motion.div>

          {/* Promo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-secondary rounded-2xl p-5 mb-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-highlight" />
              <span className="text-highlight font-semibold text-sm">New Member Offer</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">
              Get 15% Off Your First Rental
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Create an account and use code FORZA15
            </p>
            <Button className="w-full h-12">
              Sign Up Now
            </Button>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary rounded-2xl overflow-hidden mb-5"
          >
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between p-4 active:bg-muted ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </a>
            ))}
          </motion.div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="w-full p-4 bg-secondary rounded-2xl flex items-center justify-center gap-2 text-destructive">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </motion.div>
        </div>
      </main>

      <IOSBottomNav />
    </div>
  );
};

export default Profile;

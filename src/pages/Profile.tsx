import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, FileText, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const menuItems = [
    { icon: User, label: 'Personal Information', href: '#' },
    { icon: FileText, label: 'Rental History', href: '#' },
    { icon: CreditCard, label: 'Payment Methods', href: '#' },
    { icon: Mail, label: 'Notifications', href: '#' },
    { icon: Phone, label: 'Support', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="pt-24 px-4">
        <div className="container mx-auto max-w-lg">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-emerald-500 mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-1">Guest User</h1>
            <p className="text-muted-foreground">Sign in to access your account</p>
          </motion.div>

          {/* Promo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 mb-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-highlight" />
                <span className="text-highlight font-semibold">New Member Offer</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                Get 15% Off Your First Rental
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Create an account and use code FORZA15 at checkout
              </p>
              <Button variant="premium" className="w-full">
                Sign Up Now
              </Button>
            </div>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden mb-6"
          >
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between p-4 hover:bg-accent/50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
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
            <Button variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;

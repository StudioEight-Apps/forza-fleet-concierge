import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ApplePaySheetProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  vehicleName: string;
}

const ApplePaySheet = ({ isOpen, onClose, amount, vehicleName }: ApplePaySheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1e] rounded-t-[20px] overflow-hidden"
          >
            {/* iOS-style handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-9 h-1 rounded-full bg-white/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-4">
              <button onClick={onClose} className="text-[#0a84ff] text-[17px]">
                Cancel
              </button>
              <div className="text-white text-[17px] font-semibold">
                Confirm Payment
              </div>
              <div className="w-14" /> {/* Spacer for centering */}
            </div>

            {/* Apple Pay Content */}
            <div className="bg-[#2c2c2e] mx-4 rounded-xl overflow-hidden mb-4">
              {/* Merchant Info */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FE</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Forza Exotics</p>
                    <p className="text-white/60 text-sm">{vehicleName} Deposit</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-white font-semibold">Pay</span>
                  <span className="text-white font-semibold">${amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#2c2c2e] mx-4 rounded-xl overflow-hidden mb-4">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Apple Pay Card Icon */}
                  <div className="w-10 h-7 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M17.0425 8.78354C16.9608 8.84429 15.6375 9.59375 15.6375 11.2295C15.6375 13.1308 17.31 13.8126 17.3608 13.8295C17.3523 13.8734 17.0933 14.7812 16.4775 15.7068C15.9366 16.5131 15.3702 17.318 14.4708 17.318C13.5884 17.318 13.3041 16.7876 12.2808 16.7876C11.2916 16.7876 10.8824 17.3349 10.0676 17.3349C9.25253 17.3349 8.70328 16.5808 8.07003 15.6553C7.33528 14.5743 6.73203 12.8878 6.73203 11.2802C6.73203 8.7157 8.39628 7.35303 10.0252 7.35303C10.8824 7.35303 11.5918 7.93354 12.113 7.93354C12.6008 7.93354 13.3949 7.31903 14.3858 7.31903C14.7525 7.31903 16.0758 7.35303 17.0425 8.78354ZM14.0423 5.98804C14.4515 5.48804 14.7358 4.80229 14.7358 4.11654C14.7358 4.01479 14.7273 3.91304 14.7018 3.82904C14.0508 3.85504 13.2783 4.26654 12.8013 4.83329C12.4176 5.28054 12.0678 5.96979 12.0678 6.66654C12.0678 6.77779 12.0848 6.88904 12.0933 6.92304C12.1358 6.93104 12.2045 6.94004 12.2733 6.94004C12.857 6.94004 13.5968 6.55004 14.0423 5.98804Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm">Apple Pay</p>
                    <p className="text-white/60 text-xs">Visa •••• 4242</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Apple Pay Button */}
            <div className="px-4 pb-8 safe-area-bottom">
              <button 
                onClick={onClose}
                className="w-full h-14 bg-white rounded-xl flex items-center justify-center gap-2"
              >
                <span className="text-black font-medium text-lg">Pay with</span>
                <svg viewBox="0 0 50 20" className="h-5" fill="black">
                  <path d="M9.43182 2.55273C10.1193 1.69922 10.5795 0.537109 10.4545 -0.00195312C9.38636 0.0429688 8.10795 0.717773 7.36364 1.57227C6.70455 2.31738 6.15909 3.52344 6.29545 4.66016C7.46591 4.74707 8.7 4.02734 9.43182 2.55273ZM10.4318 4.90723C8.68182 4.80469 7.19318 5.89648 6.35227 5.89648C5.5 5.89648 4.20455 4.96387 2.82955 4.99707C1.03409 5.02344 -0.636364 6.00781 -1.52273 7.57422C-3.34091 10.7314 -1.98864 15.4023 -0.25 17.9443C0.613636 19.1943 1.63636 20.5703 2.98864 20.5146C4.29545 20.4707 4.80682 19.6836 6.38636 19.6836C7.95455 19.6836 8.42045 20.5146 9.80682 20.4824C11.227 20.4531 12.1136 19.2354 12.9773 17.9854C13.9545 16.5674 14.3636 15.1846 14.3864 15.1064C14.3523 15.0947 11.8068 14.1064 11.7727 11.0947C11.75 8.59082 13.75 7.39551 13.8409 7.33105C12.7045 5.61719 10.9432 5.41699 10.4318 5.36816V4.90723Z"/>
                  <path d="M21.8438 1.19336C25.5469 1.19336 28.1016 3.71484 28.1016 7.42871C28.1016 11.1533 25.4863 13.6846 21.7129 13.6846H17.7637V20.4326H14.6543V1.19336H21.8438ZM17.7637 11.0293H21.0039C23.5273 11.0293 24.9316 9.68848 24.9316 7.43848C24.9316 5.18848 23.5273 3.85742 21.0137 3.85742H17.7637V11.0293Z"/>
                  <path d="M29.0488 16.5078C29.0488 14.2383 30.7559 12.8047 33.8359 12.625L37.4277 12.4062V11.4551C37.4277 9.92188 36.4062 9.0293 34.6797 9.0293C33.168 9.0293 32.127 9.7666 31.9277 10.8809H29.1367C29.2676 8.47656 31.4688 6.69336 34.7871 6.69336C38.0859 6.69336 40.4023 8.40625 40.4023 11.1133V20.4326H37.5527V18.3291H37.4863C36.6914 19.7236 35.0625 20.6064 33.3262 20.6064C30.7461 20.6064 29.0488 19.0049 29.0488 16.5078ZM37.4277 15.3545V14.3838L34.2188 14.5928C32.6992 14.6943 31.9375 15.3154 31.9375 16.418C31.9375 17.5107 32.7422 18.2383 34.0781 18.2383C35.8145 18.2383 37.4277 17.0557 37.4277 15.3545Z"/>
                  <path d="M42.5762 24.5078V22.1689C42.7656 22.209 43.1934 22.209 43.4023 22.209C44.6895 22.209 45.3887 21.6514 45.7871 20.3154C45.7871 20.2861 45.9668 19.6846 45.9668 19.6748L41.0469 6.88867H44.3359L47.6738 17.4717H47.7305L51.0586 6.88867H54.2676L49.1133 20.6943C47.9902 23.791 46.6836 24.5879 43.8828 24.5879C43.6641 24.5879 42.7656 24.5488 42.5762 24.5078Z"/>
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ApplePaySheet;

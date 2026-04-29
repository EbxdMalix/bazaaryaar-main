import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

import { Shield, CreditCard, RefreshCcw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest gap-4">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <span className="flex items-center space-x-2 text-brand-blue">
            <Shield size={16} className="text-brand-gold" />
            <span>Genuine Products Only</span>
          </span>
          <span className="flex items-center space-x-2 text-brand-blue">
            <CreditCard size={16} className="text-brand-gold" />
            <span>Cash On Delivery</span>
          </span>
          <span className="flex items-center space-x-2 text-brand-blue">
            <RefreshCcw size={16} className="text-brand-gold" />
            <span>7-Day Return Policy</span>
          </span>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-300">© 2024 BAZAARYAAR PAKISTAN. Power by Inventor Design Studio.</span>
        </div>
      </div>
    </footer>
  );
}

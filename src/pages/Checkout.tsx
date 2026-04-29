import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { formatPrice } from '../utils/utils';
import { ShieldCheck, Truck, CreditCard, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  if (cart.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-40 pb-20 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} className="text-green-500" />
        </motion.div>
        <h1 className="text-3xl font-display font-bold text-brand-blue mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-2">Your order number is <span className="font-bold text-brand-blue">#BY-88392</span></p>
        <p className="text-gray-500 mb-8">We've sent a confirmation email to your address. Our team will contact you shortly for verification.</p>
        <Link 
          to="/" 
          className="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-gold transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-32 pb-20">
      <div className="mb-12 flex items-center gap-4">
        <Link to="/cart" className="p-2 hover:bg-brand-light rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="font-display font-bold text-3xl text-brand-blue">Checkout</h1>
          <p className="text-gray-500 text-sm">Securely place your order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-soft">
              <h2 className="font-display font-bold text-xl mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center text-sm">1</div>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="e.g. 03111234567"
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-brand-blue">Shipping Address</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="House/Street/Area info"
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/10"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-blue">City</label>
                  <select 
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 focus:outline-none"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  >
                    <option value="">Select City</option>
                    <option value="karachi">Karachi</option>
                    <option value="lahore">Lahore</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="rawalpindi">Rawalpindi</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-soft">
              <h2 className="font-display font-bold text-xl mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-light rounded-lg flex items-center justify-center text-sm">2</div>
                Payment Method
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-6 bg-brand-blue/5 border-2 border-brand-blue rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                       <Truck className="text-brand-blue" />
                    </div>
                    <div>
                      <span className="block font-bold text-brand-blue">Cash On Delivery</span>
                      <span className="text-xs text-gray-500">Pay when you receive your package</span>
                    </div>
                  </div>
                  <CheckCircle2 className="text-brand-blue" />
                </label>
                
                <div className="p-6 border-2 border-gray-100 rounded-2xl opacity-60 grayscale cursor-not-allowed flex items-center justify-between">
                   <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center">
                       <CreditCard className="text-gray-400" />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-400">Online Payment</span>
                      <span className="text-xs text-brand-gold font-bold">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <button 
              type="submit"
              className="w-full bg-brand-blue text-white py-6 rounded-[24px] font-bold text-xl hover:bg-brand-gold shadow-2xl shadow-brand-blue/20 transition-all active:scale-[0.98]"
            >
              Confirm Order {formatPrice(getTotalPrice())}
            </button>
          </form>
        </div>

        {/* Order Preview Column */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[30px] border border-gray-100 shadow-soft overflow-hidden sticky top-32">
             <div className="p-8 bg-brand-light/50 border-b">
                <h3 className="font-display font-bold text-xl text-brand-blue">Order Preview</h3>
             </div>
             
             <div className="p-8 space-y-6">
                <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
                   {cart.map(item => (
                     <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.image} className="w-16 h-16 object-cover rounded-xl bg-brand-light" />
                        <div className="flex-1 min-w-0">
                           <h4 className="text-sm font-bold text-brand-blue truncate">{item.name}</h4>
                           <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                        </div>
                        <span className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                     </div>
                   ))}
                </div>

                <div className="space-y-3 pt-6 border-t font-medium text-sm">
                   <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                   </div>
                   <div className="flex justify-between text-gray-500">
                      <span>Shipping Fee</span>
                      <span className="text-green-600">FREE</span>
                   </div>
                   <div className="flex justify-between text-xl font-display font-bold text-brand-blue pt-4">
                      <span>Grand Total</span>
                      <span className="text-brand-gold">{formatPrice(getTotalPrice())}</span>
                   </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                   <ShieldCheck className="text-blue-600 shrink-0" size={20} />
                   <p className="text-[10px] text-blue-800 leading-tight">
                     Our quality control team verifies every product before shipping. You will receive a verification call within 24 hours.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

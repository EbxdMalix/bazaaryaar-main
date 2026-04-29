import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { formatPrice } from '../utils/utils';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-40 pb-20 text-center">
        <div className="bg-brand-light w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-display font-bold text-brand-blue mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest tech collections!</p>
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-gold transition-all"
        >
          Start Shopping
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-32 pb-20">
      <div className="mb-12">
        <h1 className="font-display font-bold text-4xl text-brand-blue mb-2">Shopping Cart</h1>
        <p className="text-gray-500">You have {getTotalItems()} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 sm:p-6 rounded-[24px] shadow-soft border border-gray-100 flex gap-4 sm:gap-6 items-center"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-brand-light shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <Link to={`/product/${item.id}`} className="font-display font-bold text-brand-blue text-sm sm:text-lg hover:text-brand-gold transition-colors truncate">
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 uppercase tracking-wider">
                     <span>{item.brand}</span>
                     <span>•</span>
                     <span>In Stock</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center bg-brand-light rounded-lg p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-white rounded transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white rounded transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-brand-blue sm:text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-brand-blue text-white p-8 rounded-[30px] shadow-xl sticky top-32">
            <h3 className="font-display font-bold text-xl mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8 pb-8 border-b border-white/10">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Tax</span>
                <span>PKR 0</span>
              </div>
            </div>

            <div className="flex justify-between font-display font-bold text-xl mb-8">
              <span>Total</span>
              <span className="text-brand-gold">{formatPrice(getTotalPrice())}</span>
            </div>

            <Link 
              to="/checkout"
              className="block w-full bg-brand-gold text-brand-blue text-center py-4 rounded-xl font-bold hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-black/20"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-8 flex items-center gap-3 text-xs text-gray-400 justify-center">
               <ShieldCheck size={16} className="text-brand-gold" />
               Secure checkout with 256-bit encryption
            </div>
          </div>
          
          <div className="bg-brand-gold/10 p-6 rounded-[24px] border border-brand-gold/20">
             <h4 className="font-bold text-brand-blue text-sm mb-2">Need Help?</h4>
             <p className="text-xs text-gray-600 leading-relaxed">
               Contact our support team at <span className="font-bold">0311-1234567</span> or use the live chat for instant assistance.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

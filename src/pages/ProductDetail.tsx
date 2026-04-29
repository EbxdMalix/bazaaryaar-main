import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { useStore } from '../hooks/useStore';
import { formatPrice, cn } from '../utils/utils';
import { Star, Shield, Truck, RefreshCcw, ShoppingCart, CreditCard, ChevronRight, Share2, HelpCircle, Heart, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, compareList, addToCompare, removeFromCompare } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return <div className="h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
       addToCart(product);
    }
    toast.success(`${product.name} added to cart`, {
      style: { background: '#0A1533', color: '#fff' }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-32 pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-10 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <ChevronRight size={10} className="text-gray-300" />
        <Link to={`/products?category=${product.category}`} className="hover:text-brand-gold transition-colors">{product.category}</Link>
        <ChevronRight size={10} className="text-gray-300" />
        <span className="text-brand-blue">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Images Component */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-card-large overflow-hidden bg-white border border-gray-100 shadow-premium p-8"
          >
            <motion.img 
              layoutId={`prod-img-${product.id}`}
              src={product.image} 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-brand-gold cursor-pointer bg-white shadow-sm transition-all p-2">
                  <img src={product.image} className="w-full h-full object-contain opacity-40 hover:opacity-100 mix-blend-multiply" />
               </div>
             ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-brand-gold font-black text-xs tracking-[0.4em] uppercase">{product.brand}</span>
                <div className="flex gap-2">
                  <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-brand-gold hover:shadow-premium transition-all">
                    <Share2 size={18} />
                  </button>
                  <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 hover:shadow-premium transition-all">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
              <h1 className="font-display font-black text-4xl md:text-6xl text-brand-blue leading-[1.1] tracking-tighter uppercase italic">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold px-3 py-1.5 rounded-xl">
                  <Star fill="currentColor" size={14} />
                  <span className="font-black text-xs">{product.rating}</span>
                </div>
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{product.reviews} Verified Reviews</span>
                <div className="flex items-center gap-2 ml-auto">
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                   <span className="text-brand-blue text-[10px] font-black uppercase tracking-widest">In Stock & Ready</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-blue rounded-card p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-blue/20">
              <div className="relative z-10">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-4xl font-display font-black text-brand-gold italic">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-white/30 line-through font-display font-black italic">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Tax Inclusive & Official Warranty</span>
                  {product.discount && (
                    <span className="bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center font-black text-lg hover:bg-brand-light rounded-xl transition-all"
                >
                  -
                </button>
                <span className="w-14 text-center font-black text-brand-blue">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center font-black text-lg hover:bg-brand-light rounded-xl transition-all"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 w-full bg-brand-gold text-brand-blue py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:shadow-premium transition-all active:scale-95 shadow-xl shadow-brand-gold/10"
              >
                <ShoppingCart size={20} />
                Secure Checkout
              </button>
              <button 
                onClick={() => {
                  if (compareList.some(p => p.id === product.id)) {
                    removeFromCompare(product.id);
                  } else {
                    if (compareList.length >= 4) {
                      toast.error('Compare list full');
                      return;
                    }
                    addToCompare(product);
                  }
                }}
                className={cn(
                  "p-5 rounded-2xl border transition-all group",
                  compareList.some(p => p.id === product.id) 
                    ? "bg-brand-gold border-brand-gold text-brand-blue" 
                    : "bg-brand-blue text-brand-gold border-brand-blue hover:bg-white"
                )}
                title="Compare Product"
              >
                <Repeat size={22} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button 
                className="p-5 bg-brand-light text-brand-blue rounded-2xl hover:bg-white border border-gray-100 transition-all group"
              >
                <HelpCircle size={22} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-10 border-y border-gray-100">
               <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-brand-light rounded-2xl text-brand-gold">
                    <Truck size={20} />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black text-brand-blue uppercase tracking-widest">Nationwide</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Fast Express Delivery</span>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-brand-light rounded-2xl text-brand-gold">
                    <Shield size={20} />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black text-brand-blue uppercase tracking-widest">7 Days Warranty</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Authenticity Guaranteed</span>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-brand-light rounded-2xl text-brand-gold">
                    <RefreshCcw size={20} />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black text-brand-blue uppercase tracking-widest">Easy Returns</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Instant Refund Policy</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      {/* Specs / Tab Section */}
      <div className="mt-20">
         <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto whitespace-nowrap">
            {['description', 'specs', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-sm font-black uppercase tracking-widest transition-all relative",
                  activeTab === tab ? "text-brand-blue" : "text-gray-400 hover:text-brand-blue"
                )}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold rounded-full" />}
              </button>
            ))}
         </div>
         
         <div className="text-gray-500 text-sm leading-relaxed min-h-[150px] max-w-3xl">
            {activeTab === 'description' && (
              <p className="text-base text-gray-400 leading-loose">{product.description}</p>
            )}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                 <div className="flex justify-between py-4 border-b border-gray-50">
                    <span className="font-bold text-brand-blue uppercase tracking-widest text-[10px]">Brand</span>
                    <span className="font-medium text-brand-blue">{product.brand}</span>
                 </div>
                 <div className="flex justify-between py-4 border-b border-gray-50">
                    <span className="font-bold text-brand-blue uppercase tracking-widest text-[10px]">Warranty</span>
                    <span className="font-medium text-brand-blue">1 Year Official Manufacturer Warranty</span>
                 </div>
                 <div className="flex justify-between py-4 border-b border-gray-50">
                    <span className="font-bold text-brand-blue uppercase tracking-widest text-[10px]">Stock Status</span>
                    <span className="text-green-600 font-bold">Available Now</span>
                 </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="py-8 space-y-12">
                {/* Review Header & Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-card border border-gray-100 shadow-premium">
                  <div>
                    <h3 className="text-2xl font-display font-black text-brand-blue uppercase italic tracking-tighter mb-4">Customer Satisfaction</h3>
                    <div className="flex items-center gap-6">
                       <div className="text-5xl font-display font-black text-brand-blue italic">{product.rating}</div>
                       <div className="space-y-1">
                          <div className="flex items-center gap-1">
                             {[1, 2, 3, 4, 5].map(i => (
                               <Star key={i} size={16} fill={i <= Math.floor(product.rating) ? "#CBB26A" : "none"} className={i <= Math.floor(product.rating) ? "text-brand-gold" : "text-gray-200"} />
                             ))}
                          </div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Based on {product.reviews} Verified Reviews</p>
                       </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     {[5, 4, 3, 2, 1].map((stars) => (
                       <div key={stars} className="flex items-center gap-4">
                          <span className="text-[10px] font-black text-gray-400 w-4">{stars}</span>
                          <div className="flex-1 h-2 bg-brand-light rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${stars === 5 ? 75 : stars === 4 ? 15 : 2}%` }}
                               className="h-full bg-brand-gold"
                             />
                          </div>
                          <span className="text-[10px] font-black text-brand-blue w-6">{stars === 5 ? '75%' : stars === 4 ? '15%' : '2%'}</span>
                       </div>
                     ))}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-8">
                   <h3 className="text-xl font-display font-black text-brand-blue uppercase italic tracking-tighter">Recent Appraisals</h3>
                   <div className="divide-y divide-gray-100">
                      {[
                        { name: "Ahmed K.", date: "2 days ago", rating: 5, comment: "Absolutely stunning quality. The titanium finish is even better in person. Nationwide delivery was fast!" },
                        { name: "Sara M.", date: "1 week ago", rating: 4, comment: "Great product, but the packing could be slightly more premium for such an expensive item. Overall very satisfied." }
                      ].map((rev, i) => (
                        <div key={i} className="py-6 space-y-3">
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                 <span className="text-sm font-black text-brand-blue">{rev.name}</span>
                                 <span className="text-[9px] font-black bg-green-50 text-green-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">Verified Buyer</span>
                              </div>
                              <span className="text-[10px] font-bold text-gray-300 uppercase">{rev.date}</span>
                           </div>
                           <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill={s <= rev.rating ? "currentColor" : "none"} className={s <= rev.rating ? "text-brand-gold" : "text-gray-100"} />)}
                           </div>
                           <p className="text-sm text-gray-500 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Review Form */}
                <div className="bg-brand-blue rounded-card p-10 text-white relative overflow-hidden">
                   <div className="relative z-10">
                      <h3 className="text-2xl font-display font-black text-brand-gold uppercase italic tracking-tighter mb-2">Share Your Experience</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-8">Your feedback fuels our innovation.</p>
                      
                      <div className="space-y-6 max-w-xl">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Your Merit Rating</label>
                            <div className="flex items-center gap-4">
                               {[1, 2, 3, 4, 5].map(i => (
                                 <button key={i} className="hover:scale-125 transition-transform">
                                   <Star size={24} className="text-brand-gold" />
                                 </button>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/60">Detailed Merits</label>
                            <textarea 
                              placeholder="Tell us what impressed you or where we can improve..."
                              className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-gold/10 min-h-[120px] placeholder:text-white/20"
                            />
                         </div>
                         <button className="bg-brand-gold text-brand-blue font-black px-10 py-4 rounded-2xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10 text-xs uppercase tracking-widest">
                           SUBMIT REVIEW
                         </button>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

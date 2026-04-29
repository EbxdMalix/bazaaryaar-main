import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Truck, ShieldCheck, Headphones } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { formatPrice } from '../utils/utils';
import { motion } from 'framer-motion';

export default function Home() {
  const featuredProducts = products.filter(p => p.isFeatured);
  const flashSaleProduct = products.find(p => p.isDeal) || products[0];

  return (
    <div className="space-y-12 pb-20 mt-20 p-4 md:p-8">
      {/* Top Section: Hero & Flash Sale */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[400px]">
        {/* Hero Banner */}
        <div className="lg:col-span-8 bg-brand-blue rounded-card-large relative overflow-hidden flex items-center p-10 md:p-16 shadow-premium">
          <div className="relative z-10 max-w-xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-gold font-bold text-sm tracking-[0.3em] uppercase mb-4 block"
            >
              The Next Frontier
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-black text-white leading-[1.1] mb-6 tracking-tight"
            >
              Elevate Your <br/><span className="text-brand-gold italic">Digital Lifestyle.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/products" className="inline-flex items-center gap-3 bg-brand-gold text-brand-blue font-black px-10 py-5 rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-gold/10">
                EXPLORE COLLECTION
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
          {/* Abstract Elements */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-gold opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,var(--color-brand-gold),transparent_70%)]"></div>
        </div>

        {/* Deals of the Day / Flash Sale */}
        <div className="lg:col-span-4 bg-white rounded-card-large p-8 shadow-premium border border-gray-100 flex flex-col group">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display font-black text-xl uppercase tracking-tighter">Flash Sale</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-500 font-mono font-bold text-xs">Live Now</span>
            </div>
          </div>
          <Link to={`/product/${flashSaleProduct.id}`} className="flex-1 flex flex-col justify-center items-center gap-6">
            <div className="w-48 h-48 bg-brand-light rounded-3xl shadow-inner flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500">
              <img src={flashSaleProduct.image} className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{flashSaleProduct.brand}</p>
              <h3 className="text-lg font-bold text-brand-blue line-clamp-1 mb-2">{flashSaleProduct.name}</h3>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-black text-brand-blue">{formatPrice(flashSaleProduct.price)}</span>
                <span className="text-sm text-gray-300 line-through">{formatPrice(flashSaleProduct.originalPrice || flashSaleProduct.price * 1.2)}</span>
              </div>
              <div className="mt-4 inline-block bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                Save {flashSaleProduct.discount || 15}% Limited Edition
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => {
          return (
            <Link 
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 shadow-premium border border-gray-100 hover:border-brand-gold hover:shadow-hover transition-all group"
            >
              <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {cat.id === 'mobiles' ? '📱' : cat.id === 'laptops' ? '💻' : cat.id === 'audio' ? '🎧' : cat.id === 'watches' ? '⌚' : cat.id === 'gaming' ? '🎮' : '⚡'}
              </div>
              <span className="font-display font-black text-xs uppercase tracking-[0.1em] text-brand-blue">{cat.name}</span>
            </Link>
          );
        })}
      </section>

      {/* Brand Marquee */}
      <section className="py-10 border-y border-gray-100 bg-white/30 backdrop-blur-sm overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <span className="font-display font-black text-2xl italic tracking-tighter">APPLE</span>
              <span className="font-display font-black text-2xl italic tracking-tighter">SAMSUNG</span>
              <span className="font-display font-black text-2xl italic tracking-tighter">SONY</span>
              <span className="font-display font-black text-2xl italic tracking-tighter">DELL</span>
              <span className="font-display font-black text-2xl italic tracking-tighter">LOGITECH</span>
              <span className="font-display font-black text-2xl italic tracking-tighter">BOSE</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid: Trending Now */}
      <section className="space-y-8 px-4 md:px-0">
        <div className="flex flex-col gap-2">
          <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.4em]">Curated Hotlist</span>
          <h2 className="text-3xl md:text-5xl geometric-title text-brand-blue">Trending <span className="text-brand-gold">Now</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 h-auto md:h-[600px]">
          {/* Main Large Card */}
          <Link to="/products?category=mobiles" className="md:col-span-2 lg:col-span-3 bg-white rounded-card-large p-10 shadow-premium border border-gray-100 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10 transition-transform group-hover:-translate-y-2">
               <span className="bg-brand-blue text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Best Seller</span>
               <h3 className="text-3xl font-display font-black text-brand-blue uppercase italic tracking-tighter leading-none mb-4">
                 Mobile <br/>Revolution
               </h3>
               <p className="text-xs text-gray-400 font-bold max-w-[200px]">Next-gen processors and cinematic cameras available now.</p>
            </div>
            <img src={products.find(p => p.category === 'mobiles')?.image} className="absolute right-[-10%] bottom-[-10%] w-2/3 h-2/3 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
            <div className="mt-10 lg:mt-0 relative z-10">
               <div className="w-12 h-12 bg-brand-blue text-brand-gold rounded-2xl flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-blue transition-colors">
                  <ArrowRight size={24} />
               </div>
            </div>
          </Link>

          {/* Tall Card */}
          <Link to="/products?category=audio" className="md:col-span-2 lg:col-span-1 bg-brand-gold rounded-card-large p-8 flex flex-col justify-between group relative overflow-hidden shadow-premium">
             <div className="relative z-10">
               <h3 className="text-xl font-display font-black text-brand-blue uppercase italic tracking-tighter">Audio <br/>Purity</h3>
             </div>
             <img src={products.find(p => p.category === 'audio')?.image} className="absolute bottom-0 left-0 w-full h-1/2 object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform" />
             <div className="absolute top-10 right-[-20%] w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          </Link>

          {/* Two Small Cards Area */}
          <div className="md:col-span-2 lg:col-span-2 grid grid-rows-2 gap-6">
             <Link to="/products?category=laptops" className="bg-white rounded-card-large p-6 border border-gray-100 shadow-premium flex items-center justify-between group hover:border-brand-gold transition-all">
                <div className="max-w-[120px]">
                   <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Office Gear</span>
                   <h4 className="text-lg font-display font-black text-brand-blue uppercase italic tracking-tighter">Pro Laptops</h4>
                </div>
                <div className="w-20 h-20 bg-brand-light rounded-2xl flex items-center justify-center p-2">
                   <img src={products.find(p => p.id === '3')?.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                </div>
             </Link>
             <Link to="/products?category=watches" className="bg-brand-blue rounded-card-large p-6 shadow-premium flex items-center justify-between group hover:bg-brand-gold transition-all">
                <div className="max-w-[120px]">
                   <span className="text-[10px] font-black text-brand-gold/50 group-hover:text-brand-blue/50 uppercase tracking-widest">Wearables</span>
                   <h4 className="text-lg font-display font-black text-white group-hover:text-brand-blue uppercase italic tracking-tighter">Smart Tech</h4>
                </div>
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center p-2">
                   <img src={products.find(p => p.category === 'watches')?.image} className="w-full h-full object-contain brightness-110 group-hover:scale-110 transition-transform" />
                </div>
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Selection */}
      <section className="space-y-8 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-2">
            <span className="text-brand-gold font-black text-xs uppercase tracking-[0.3em]">Handpicked for you</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-brand-blue uppercase tracking-tighter italic">Featured Selection</h2>
          </div>
          <Link to="/products" className="group text-sm font-black text-brand-blue hover:text-brand-gold flex items-center gap-2 pb-1 border-b-2 border-brand-gold">
            EXPLORE ALL PRODUCTS 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / Join Squad */}
      <section className="bg-brand-blue rounded-card-large p-12 md:p-20 relative overflow-hidden text-center shadow-hover">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-xl mx-auto relative z-10">
          <span className="text-brand-gold font-black text-xs uppercase tracking-[0.4em] mb-4 block">Inside BazaarYaar</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight mb-8 tracking-tighter uppercase italic">
            Join the Tech <br/>Elite in <span className="text-brand-gold">Pakistan.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-4 focus:ring-brand-gold/20 font-bold placeholder:text-white/30"
            />
            <button className="bg-brand-gold text-brand-blue font-black px-10 py-4 rounded-2xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-[10px] text-white/30 mt-6 uppercase tracking-widest font-black">GET EARLY ACCESS TO DEALS & DROPS</p>
        </div>
      </section>

      {/* Trust Items / Footer Trust Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-gray-100">
        {[
          { icon: <ShieldCheck size={32} />, title: "AUTHENTIC GEAR", desc: "100% genuine products verified by our experts." },
          { icon: <Truck size={32} />, title: "SECURE LOGISTICS", desc: "Fast nationwide shipping with real-time tracking." },
          { icon: <Headphones size={32} />, title: "DIRECT SUPPORT", desc: "24/7 dedicated assistance for all your tech needs." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-card-large shadow-premium border border-gray-50 group hover:border-brand-gold transition-all">
             <div className="p-4 bg-brand-light rounded-2xl mb-6 text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all transform group-hover:rotate-6">
               {item.icon}
             </div>
             <h4 className="font-display font-black text-sm uppercase tracking-widest text-brand-blue mb-2">{item.title}</h4>
             <p className="text-xs text-gray-400 leading-relaxed max-w-[200px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

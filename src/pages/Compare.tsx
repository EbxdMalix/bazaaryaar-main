import React from 'react';
import { useStore } from '../hooks/useStore';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '../utils/utils';
import { motion } from 'framer-motion';

export default function Compare() {
  const { compareList, removeFromCompare, addToCart } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 pt-20 px-6">
        <div className="w-24 h-24 bg-brand-light rounded-card-large flex items-center justify-center text-brand-gold text-4xl">
          🔍
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-black text-brand-blue uppercase italic tracking-tight">Nothing to Compare</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Select up to 4 products to view side-by-side specs.</p>
        </div>
        <Link 
          to="/products"
          className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-blue transition-all shadow-xl shadow-brand-blue/10"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <Link to="/products" className="p-3 bg-white border border-gray-100 rounded-2xl text-brand-blue hover:text-brand-gold hover:shadow-premium transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl md:text-5xl geometric-title text-brand-blue">Comparison <span className="text-brand-gold">Matrix</span></h1>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Side-by-side evaluation of your selections</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto pb-8">
        {compareList.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col min-w-[280px]"
          >
            {/* Header: Product Image & Basic Info */}
            <div className="bg-white rounded-card p-6 shadow-premium border border-gray-100 mb-8 relative group">
              <button 
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="h-40 bg-brand-light rounded-2xl mb-6 p-4 flex items-center justify-center">
                <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" alt={product.name} />
              </div>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] mb-2 block">{product.brand}</span>
              <h3 className="font-display font-black text-lg text-brand-blue uppercase italic tracking-tighter leading-tight mb-4 line-clamp-2">{product.name}</h3>
              <div className="text-2xl font-black text-brand-blue mb-6">{formatPrice(product.price)}</div>
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-brand-blue text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-blue transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={14} />
                ADD TO CART
              </button>
            </div>

            {/* Spec Matrix */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Category</span>
                <p className="text-sm font-bold text-brand-blue capitalize">{product.category}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Rating</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-brand-gold">
                    <Star size={12} fill="currentColor" />
                    <span className="text-sm font-black">{product.rating}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">({product.reviews} reviews)</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Description</span>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{product.description}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Availability</span>
                <span className="inline-block bg-green-50 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">In Stock</span>
              </div>
            </div>
          </motion.div>
        ))}
        {[...Array(Math.max(0, 4 - compareList.length))].map((_, i) => (
          <div key={i} className="hidden lg:flex flex-col items-center justify-center bg-white/30 border-2 border-dashed border-gray-200 rounded-card p-12 text-center space-y-4">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-200 text-2xl">
               +
             </div>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Add product <br/>to compare</p>
          </div>
        ))}
      </div>
    </div>
  );
}

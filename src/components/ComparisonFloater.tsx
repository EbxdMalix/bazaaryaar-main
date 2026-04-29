import React from 'react';
import { Link } from 'react-router-dom';
import { Repeat, X, ArrowRight } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ComparisonFloater: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
      >
        <div className="bg-brand-blue rounded-3xl p-4 shadow-2xl border border-white/10 flex items-center gap-4">
          <div className="flex-1 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {compareList.map((product) => (
              <div key={product.id} className="relative group flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-xl overflow-hidden p-1">
                  <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" alt={product.name} />
                </div>
                <button 
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:scale-110 transition-transform"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
            {[...Array(Math.max(0, 4 - compareList.length))].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center text-white/20">
                <Repeat size={16} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
             <button 
              onClick={clearCompare}
              className="text-[10px] font-black text-white/50 uppercase tracking-widest hover:text-white transition-colors"
             >
               Clear
             </button>
             <Link 
              to="/compare"
              className="bg-brand-gold text-brand-blue font-black text-xs uppercase tracking-widest px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-white transition-all shadow-xl shadow-brand-gold/20"
             >
               Compare 
               <span className="bg-brand-blue text-brand-gold w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
                {compareList.length}
               </span>
               <ArrowRight size={14} />
             </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

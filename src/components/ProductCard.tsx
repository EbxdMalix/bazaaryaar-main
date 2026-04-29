import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Repeat } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, cn } from '../utils/utils';
import { useStore } from '../hooks/useStore';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const { compareList, addToCompare, removeFromCompare } = useStore();
  
  const isComparing = compareList.some(p => p.id === product.id);

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      description: 'You can view your cart to checkout.',
      style: { background: '#0A1533', color: '#fff' }
    });
  };

  const handleCompare = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComparing) {
      removeFromCompare(product.id);
      toast.info(`Removed ${product.name} from comparison`);
    } else {
      if (compareList.length >= 4) {
        toast.error('You can only compare up to 4 products');
        return;
      }
      addToCompare(product);
      toast.success(`Added ${product.name} to comparison list`);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-card p-4 md:p-6 shadow-premium border border-gray-100 relative group transition-all hover:shadow-hover flex flex-col h-full overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="relative block h-56 bg-brand-light rounded-2xl mb-6 overflow-hidden">
        <motion.div
           className="w-full h-full"
           whileHover={{ scale: 1.05 }}
           transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.img
            layoutId={`prod-img-${product.id}`}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply p-4"
          />
        </motion.div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discount && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg"
            >
              -{product.discount}%
            </motion.div>
          )}
          {product.isFeatured && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-blue text-brand-gold text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg"
            >
              Featured
            </motion.div>
          )}
        </div>

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 transition-all transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500">
          <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl text-gray-400 hover:text-red-500 hover:bg-white shadow-xl transition-all active:scale-90">
            <Heart size={18} />
          </button>
          <button 
            onClick={handleCompare}
            className={cn(
              "p-3 backdrop-blur-md rounded-2xl shadow-xl transition-all active:scale-90",
              isComparing ? "bg-brand-gold text-brand-blue" : "bg-white/80 text-gray-400 hover:text-brand-gold hover:bg-white"
            )}
            title="Compare Product"
          >
            <Repeat size={18} />
          </button>
        </div>
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">{product.brand}</span>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-light rounded-lg">
            <Star size={10} fill="currentColor" className="text-brand-gold" />
            <span className="text-[10px] font-black text-brand-blue">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-display font-black text-lg text-brand-blue mb-4 line-clamp-2 leading-[1.3] group-hover:text-brand-gold transition-colors italic tracking-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-brand-blue tracking-tighter">{formatPrice(product.price)}</span>
              {product.discount && (
                <span className="text-xs text-gray-300 line-through font-bold decoration-red-500/30">
                  {formatPrice(product.originalPrice || product.price * 1.2)}
                </span>
              )}
            </div>
            <span className="text-[9px] font-black text-green-600 uppercase tracking-widest mt-0.5">Official Warranty</span>
          </div>
          
          <motion.button 
            onClick={handleAddToCart}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-brand-blue text-brand-gold rounded-2xl flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all shadow-xl shadow-brand-blue/10 group/btn"
          >
            <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

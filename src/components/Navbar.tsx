import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Phone, Heart, ChevronRight } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { cn } from '../utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/mockData';
import { Product } from '../types';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cartItemsCount = useStore((state) => state.getTotalItems());
  const navigate = useNavigate();
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setIsMobileMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const navigateToProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-brand-blue text-white py-2 px-4 text-xs sm:text-sm hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={14} className="text-brand-gold" />
              0311-1234567
            </span>
            <span className="opacity-70">Pakistan's Trusted Tech Store</span>
          </div>
          <div className="flex gap-4">
            <Link to="/track-order" className="hover:text-brand-gold transition-colors">Track Order</Link>
            <Link to="/support" className="hover:text-brand-gold transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={cn(
        "bg-white transition-all duration-300 border-b border-gray-200 z-50",
        isScrolled ? "py-2 shadow-sm" : "py-4"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-brand-blue/20">
              <span className="text-brand-gold font-display font-black text-xl uppercase">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black tracking-tighter text-brand-blue uppercase leading-none italic">BAZAAR<span className="text-brand-gold">YAAR</span></span>
              <span className="text-[8px] font-black tracking-[0.4em] text-gray-300 uppercase ml-0.5">PAKISTAN OFFICIAL</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            ref={searchRef}
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-12 relative group"
          >
            <input
              type="text"
              placeholder="Search gadgets, electronics..."
              className="w-full bg-brand-light border-transparent focus:bg-white focus:ring-4 focus:ring-brand-gold/10 rounded-2xl py-3 px-6 text-sm transition-all outline-none font-medium text-brand-blue placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-gold transition-colors">
              <Search size={18} />
            </div>

            {/* Desktop Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60]"
                >
                  <div className="p-2">
                    {suggestions.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => navigateToProduct(p)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-brand-light rounded-xl transition-all group/item text-left"
                      >
                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-lg flex-shrink-0 p-1 flex items-center justify-center">
                          <img src={p.image} className="w-full h-full object-contain mix-blend-multiply" alt={p.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{p.brand}</span>
                            <span className="px-1.5 py-0.5 bg-brand-blue/5 text-brand-blue/60 text-[9px] font-bold rounded capitalize">{p.category}</span>
                          </div>
                          <p className="text-sm font-bold text-brand-blue truncate group-hover/item:text-brand-gold transition-colors">{p.name}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover/item:translate-x-1 group-hover/item:text-brand-gold transition-all" />
                      </button>
                    ))}
                    <button
                      type="submit"
                      className="w-full p-3 text-center text-[10px] font-black text-brand-blue/40 uppercase tracking-widest hover:text-brand-gold transition-colors bg-brand-light/30 mt-1"
                    >
                      See all results for "{searchQuery}"
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Nav Actions */}
          <div className="flex items-center space-x-6 text-brand-blue">
            <div className="hidden lg:flex items-center space-x-4 pr-6 border-r border-gray-100">
               <Link to="/track-order" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-gold">Track Order</Link>
               <Link to="/help" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-brand-gold">Help</Link>
            </div>
            
            <Link to="/cart" className="relative group p-2 bg-brand-light rounded-xl hover:bg-brand-blue transition-all">
              <ShoppingCart size={20} className="text-brand-blue group-hover:text-brand-gold transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-blue text-[9px] w-5 h-5 rounded-lg flex items-center justify-center font-black shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button className="hidden sm:flex bg-brand-blue text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-blue transition-all shadow-xl shadow-brand-blue/10">
              Login
            </button>
            
            <button 
              className="md:hidden p-2 bg-brand-light rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Scrolled Mobile Bar */}
      {isScrolled && (
        <div className="md:hidden bg-white px-4 py-2 border-b">
           <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-brand-light border border-gray-200 rounded-full py-2 px-10 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
           </form>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display font-bold text-xl uppercase tracking-wider">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-brand-light rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <nav className="flex flex-col gap-4 text-lg font-medium">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-gold transition-colors">Home</Link>
                  <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-gold transition-colors">Products</Link>
                  <Link to="/products?category=mobiles" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-gold transition-colors">Smartphone</Link>
                  <Link to="/products?category=laptops" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-gold transition-colors">Laptops</Link>
                  <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-gold transition-colors">My Cart</Link>
                </nav>

                <div className="pt-6 border-t">
                  <div className="flex items-center gap-3 text-gray-500 mb-4">
                    <Phone size={18} />
                    <span>0311-1234567</span>
                  </div>
                  <button className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold">
                    Sign in
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

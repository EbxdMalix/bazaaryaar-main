import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { cn } from '../utils/utils';

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState(searchCategory || 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-32 pb-20">
      <div className="mb-12">
        <h1 className="font-display font-bold text-4xl text-brand-blue mb-4">
          {searchQuery ? `Searching for "${searchQuery}"` : 'Our Product Catalog'}
        </h1>
        <p className="text-gray-500">Showing {filteredProducts.length} high-quality tech items</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8 shrink-0">
          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-gray-100">
            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Filter size={18} className="text-brand-gold" />
              Categories
            </h3>
            <div className="space-y-4">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  "w-full text-left font-medium text-sm transition-all",
                  selectedCategory === 'all' ? "text-brand-gold translate-x-2" : "text-gray-500 hover:text-brand-blue"
                )}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "w-full text-left font-medium text-sm transition-all",
                    selectedCategory === cat.id ? "text-brand-gold translate-x-2" : "text-gray-500 hover:text-brand-blue"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] shadow-soft border border-gray-100">
             <h3 className="font-display font-bold text-lg mb-6">Price Range</h3>
             <div className="space-y-4 text-sm text-gray-500">
                <label className="flex items-center gap-3 cursor-pointer">
                   <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                   Under Rs. 50,000
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                   <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                   Rs. 50k - 150k
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                   <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                   Rs. 150k +
                </label>
             </div>
          </div>
        </aside>

        {/* Main Listing Area */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-brand-light/50 p-4 rounded-2xl">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-brand-blue" : "text-gray-400 hover:text-brand-blue")}
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white shadow-sm text-brand-blue" : "text-gray-400 hover:text-brand-blue")}
                >
                  <List size={20} />
                </button>
             </div>

             <div className="flex items-center gap-4 ml-auto">
                <div className="relative group">
                   <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-gray-100">
                      Sort By: {sortBy === 'newest' ? 'Newest' : sortBy === 'price-low' ? 'Low to High' : 'High to Low'}
                      <ChevronDown size={16} />
                   </button>
                   <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                      <button onClick={() => setSortBy('newest')} className="w-full text-left px-4 py-2 text-sm hover:bg-brand-light">Newest Arrivals</button>
                      <button onClick={() => setSortBy('price-low')} className="w-full text-left px-4 py-2 text-sm hover:bg-brand-light">Price: Low to High</button>
                      <button onClick={() => setSortBy('price-high')} className="w-full text-left px-4 py-2 text-sm hover:bg-brand-light">Price: High to Low</button>
                      <button onClick={() => setSortBy('popular')} className="w-full text-left px-4 py-2 text-sm hover:bg-brand-light">Popularity</button>
                   </div>
                </div>
             </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "flex flex-col gap-6"
            )}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[30px] p-20 text-center shadow-soft">
               <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter size={32} className="text-gray-300" />
               </div>
               <h3 className="font-display font-bold text-xl mb-2">No products found</h3>
               <p className="text-gray-400">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

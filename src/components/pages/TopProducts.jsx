import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoStar } from 'react-icons/io5'; 
import productsData from "../../data/productsData.js";
import { useProducts } from "../../context/ProductContext"; 

const StarRating = ({ rating }) => (
  <div className="flex justify-start gap-0.5 mb-2">
    {[...Array(5)].map((_, i) => (
      <IoStar key={i} className={`text-[10px] ${i < rating ? 'text-[#e31e24]' : 'text-gray-800'}`} />
    ))}
  </div>
);

function TopProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useProducts(); 
  
  const categories = ['All', 'Headphones', 'Earbuds', 'Earphones', 'Neckbands'];
  
  // LOGIC: Filter first, then SLICE to 11 so the 12th slot is for "Browse All"
  const filteredProducts = productsData
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .slice(0, 11); // Taking 11 products to keep exactly 3 rows (4x3 = 12 slots)

  const ProductCard = ({ product }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAddToCart = () => {
      addToCart(product); 
      setIsAnimating(true); 
      setTimeout(() => setIsAnimating(false), 2000);
    };

    return (
      <div className="bg-[#111111] border border-transparent hover:border-red-800 transition-all duration-300 flex flex-col group h-full">
        <Link to={`${product.path}${product.id}`} className="flex-grow">
          <div className="bg-[#161616] aspect-square flex items-center justify-center p-8 mb-4">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="px-5 pb-2 text-left">
            <StarRating rating={product.rateCount} />
            <h3 className="text-lg font-bold text-white leading-tight mb-1 truncate uppercase tracking-tighter">{product.title}</h3>
            <p className="text-[11px] text-gray-500 mb-3 uppercase tracking-wider font-semibold">{product.info}</p>
            <div className="flex items-baseline gap-2 mb-5 border-t border-gray-900 pt-4">
              <span className="text-xl font-bold text-white italic">₹{product.finalPrice.toLocaleString()}</span>
              <span className="text-xs text-gray-600 line-through">₹{product.originalPrice.toLocaleString()}</span>
            </div>
          </div>
        </Link>
        <div className="px-5 pb-5 mt-auto">
          <button 
            onClick={handleAddToCart}
            className={`w-full py-3 text-white text-[11px] font-bold uppercase tracking-[2px] transition-all duration-300 rounded-sm ${
              isAnimating ? 'bg-green-600' : 'bg-[#e31e24] hover:bg-red-700'
            }`}
          >
            {isAnimating ? 'Added +1' : 'Add to cart'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#111] py-20 px-4 font-sans"> 
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-center mb-10 text-white">Top Products</h2>
        
        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {categories.map(c => (
            <button 
              key={c} 
              onClick={() => setActiveCategory(c)} 
              className={`px-6 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                activeCategory === c 
                ? 'bg-red-600 text-white border-red-600' 
                : 'text-gray-400 border-zinc-800 hover:border-gray-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 3-Row Grid (4 columns x 3 rows = 12 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}

          {/* This is the 12th item, completing the 3rd row */}
          <Link 
            to="/all-products" 
            className="bg-[#161616] border border-dashed border-zinc-800 hover:border-red-600 transition-all duration-500 group flex flex-col items-center justify-center h-full min-h-[400px]"
          >
            <div className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-red-900/20">
              <IoArrowForward className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white mb-2">Browse All</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">View Entire Collection</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoStar } from 'react-icons/io5';
import productsData from "../../data/productsData.js";
import { useProducts } from "../../context/ProductContext";
import ProductCard from './ProductCard.jsx';

const StarRating = ({ rating }) => (
  <div className="flex justify-start gap-0.5 mb-1 md:mb-2">
    {[...Array(5)].map((_, i) => (
      <IoStar key={i} className={`text-[6px] md:text-[10px] ${i < rating ? 'text-[#e31e24]' : 'text-gray-800'}`} />
    ))}
  </div>
);

function TopProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useProducts();

  const categories = ['All', 'Headphones', 'Earbuds', 'Earphones', 'Neckbands'];

  // Logic: Keep enough products to fill rows of 3 on mobile or 4 on desktop
  const filteredProducts = productsData
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .slice(0, 11);

    
     const handleAddToCart = (product) => {
    addToCart(product, "TopProducts.jsx");
    };




  return (
    <div className="bg-[#111] py-12 md:py-20 px-2 md:px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-center mb-6 md:mb-10 text-white">Top Products</h2>

        {/* Category Filters - adjusted for mobile scroll if they overflow */}
        <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-4 mb-8 md:mb-16 pb-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`whitespace-nowrap px-4 md:px-6 py-1.5 md:py-2 text-[9px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all border ${activeCategory === c
                  ? 'bg-red-600 text-white border-red-600'
                  : 'text-gray-400 border-zinc-800 hover:border-gray-600'
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Updated Grid: grid-cols-3 for mobile, md:grid-cols-4 for desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}

          {/* Browse All card scaled for mobile */}
          <Link
            to="/all-products"
            className="bg-[#161616] border border-dashed border-zinc-800 hover:border-red-600 transition-all duration-500 group flex flex-col items-center justify-center h-full min-h-[150px] md:min-h-[400px]"
          >
            <div className="bg-red-600 w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-red-900/20">
              <IoArrowForward className="text-white text-sm md:text-2xl" />
            </div>
            <h3 className="text-[10px] md:text-xl font-black italic tracking-tighter uppercase text-white mb-1">More</h3>
            <p className="hidden md:block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">View All</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
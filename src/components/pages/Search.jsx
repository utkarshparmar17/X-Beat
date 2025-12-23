import React, { useState, useEffect } from 'react';
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { AiOutlineFilter } from "react-icons/ai";
import { Link } from 'react-router-dom';
import productsData from "../../data/productsData.js";
import { useProducts } from "../../context/ProductContext";

function Search() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const { addToCart } = useProducts();

  // Filter Logic: Query + Category + Price
  const filteredResults = productsData.filter((product) => {
    const matchesQuery = 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || product.category === selectedCategory;
    
    const matchesPrice = product.finalPrice <= maxPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white pt-24 pb-12 px-2 md:px-10 font-sans">
      
      {/* Search & Filters Header */}
      <div className="max-w-6xl mx-auto mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative group max-w-2xl mx-auto">
          <IoSearchSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl group-focus-within:text-red-600 transition-colors" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search X-Beat..." 
            className="w-full bg-[#111] border border-zinc-800 py-3 pl-12 pr-12 rounded-sm focus:outline-none focus:border-red-600 transition-all text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <IoClose size={20} />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-[#111] p-4 border border-zinc-900 rounded-sm">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest border transition-all ${
                  selectedCategory === cat ? "bg-red-600 border-red-600 text-white" : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-4 min-w-[200px]">
            <span className="text-[10px] font-bold uppercase text-zinc-500 whitespace-nowrap">Under: ₹{maxPrice.toLocaleString()}</span>
            <input 
              type="range" 
              min="500" 
              max="15000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-1 bg-zinc-800 accent-red-600 appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Results Section - 3 Columns on Mobile */}
      <div className="max-w-7xl mx-auto">
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
            {filteredResults.map((product) => (
              <div key={product.id} className="bg-[#111] border border-zinc-900 group flex flex-col h-full hover:border-red-600/50 transition-all">
                {/* Image Container */}
                <Link to={`/product-details/${product.id}`} className="p-2 md:p-6 aspect-square flex items-center justify-center bg-[#161616]">
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                </Link>

                {/* Content */}
                <div className="p-2 md:p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-[8px] md:text-xs mb-1 uppercase tracking-tight truncate">
                    {product.brand} {product.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-[10px] md:text-base font-bold text-white">₹{product.finalPrice.toLocaleString()}</span>
                      <span className="hidden md:block text-[8px] text-zinc-600 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>

                    <button 
                      onClick={() => addToCart(product)} 
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 md:py-2 transition-colors text-[7px] md:text-[10px] uppercase tracking-widest"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111] border border-dashed border-zinc-800 rounded-sm">
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">No results found matching your filters</p>
            <button 
              onClick={() => {setQuery(""); setSelectedCategory("All"); setMaxPrice(10000);}}
              className="mt-4 text-red-600 text-[10px] uppercase font-bold underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
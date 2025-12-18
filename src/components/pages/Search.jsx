import React, { useState } from 'react';
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import productsData from "../../data/productsData.js";
import { useProducts } from "../../context/ProductContext";

function Search() {
  const [query, setQuery] = useState("");
  const { addToCart } = useProducts();

  // Filter products based on title, brand, or category
  const filteredResults = productsData.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white pt-28 pb-12 px-4 md:px-10">
      {/* Search Header Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-2xl font-bold mb-6 uppercase tracking-widest text-center">Search Products</h1>
        
        <div className="relative group">
          <IoSearchSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-red-600 transition-colors" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for headphones, earbuds..." 
            className="w-full bg-[#161616] border border-zinc-800 py-4 pl-14 pr-12 rounded-sm focus:outline-none focus:border-red-600 transition-all text-lg placeholder:text-zinc-600"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <IoClose size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto">
        {query === "" ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 italic">Try searching for "Sony" or "Earbuds"</p>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResults.map((product) => (
              <div key={product.id} className="bg-[#111] border border-zinc-800 p-4 hover:border-red-600 transition-all group">
                <Link to={`${product.path}${product.id}`}>
                  <div className="bg-[#161616] aspect-square flex items-center justify-center p-6 mb-4">
                    <img src={product.images[0]} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-bold truncate">{product.title}</h3>
                  <div className="flex gap-3 mt-2 mb-4">
                    <span className="text-red-500 font-bold">₹{product.finalPrice.toLocaleString()}</span>
                    <span className="text-zinc-600 line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-zinc-800 hover:bg-red-600 py-2 text-xs font-bold uppercase transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500">No products found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
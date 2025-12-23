import React, { useState, useEffect } from "react";
import productsData from "../../data/productsData.js";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineFilter, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "./ProductCard.jsx";

const AllProducts = () => {
  const { addToCart } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  
  // State for mobile filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    let result = [...productsData];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (sortBy === "Price(Lowest First)") {
      result.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (sortBy === "Price(Highest First)") {
      result.sort((a, b) => b.finalPrice - a.finalPrice);
    } else if (sortBy === "Top Rated") {
      result.sort((a, b) => b.rateCount - a.rateCount);
    }

    setFilteredProducts(result);
  }, [selectedBrands, selectedCategories, sortBy]);

  const toggleFilter = (item, state, setState) => {
    setState(state.includes(item) ? state.filter((i) => i !== item) : [...state, item]);
  };

  return (
    
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-24 md:pt-32 pb-12 font-sans px-4 md:px-10">
      
      {/* MOBILE & TABLET FILTER TOGGLE (Visible below 1024px) */}
      <div className="lg:hidden w-full mb-6">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between bg-[#111] border border-zinc-800 px-5 py-4 rounded-sm transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <AiOutlineFilter className="text-red-600 text-lg" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Filter & Sort</span>
          </div>
          {isFilterOpen ? <AiOutlineUp size={14} /> : <AiOutlineDown size={14} />}
        </button>

        {/* MOBILE DROPDOWN CONTENT */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#161616] border-x border-b border-zinc-800 ${isFilterOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-6 space-y-8">
            {/* Sort Dropdown */}
            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Sort By</h3>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-3 text-xs uppercase outline-none focus:border-red-600"
              >
                {["Latest", "Top Rated", "Price(Lowest First)", "Price(Highest First)"].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </section>

            {/* Category Chips */}
            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    className={`px-4 py-2 text-[10px] uppercase font-bold border transition-all ${selectedCategories.includes(cat) ? "bg-red-600 border-red-600 text-white" : "border-zinc-800 text-zinc-500"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Brand Chips */}
            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {["JBL", "BoAt", "Sony"].map((brand) => (
                  <button 
                    key={brand}
                    onClick={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                    className={`px-4 py-2 text-[10px] uppercase font-bold border transition-all ${selectedBrands.includes(brand) ? "bg-red-600 border-red-600 text-white" : "border-zinc-800 text-zinc-500"}`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </section>

            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-red-600 py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              Apply & Close
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* DESKTOP SIDEBAR (Hidden on Mobile/Tablet < 1024px) */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-12 border-r border-zinc-900 pr-8">
          {/* Desktop Sort */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Sort By</h3>
            <ul className="space-y-4 text-xs font-medium">
              {["Latest", "Top Rated", "Price(Lowest First)", "Price(Highest First)"].map((opt) => (
                <li 
                  key={opt} 
                  onClick={() => setSortBy(opt)}
                  className={`cursor-pointer transition-colors ${sortBy === opt ? "text-red-600 font-bold" : "text-zinc-400 hover:text-white"}`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </section>

          {/* Desktop Category */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Category</h3>
            <div className="space-y-4">
              {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group text-xs uppercase tracking-widest">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat)}
                    className="w-4 h-4 accent-red-600 bg-transparent border-zinc-700"
                    onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                  />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Desktop Brands */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Brands</h3>
            <div className="space-y-4">
              {["JBL", "BoAt", "Sony"].map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group text-xs uppercase tracking-widest">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    className="w-4 h-4 accent-red-600 bg-transparent border-zinc-700"
                    onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                  />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-grow">
          {/* Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-[#111] border border-zinc-900 hover:border-red-600 transition-all flex flex-col group">
                <Link to={`/product-details/${product.id}`} className="p-8 aspect-square flex items-center justify-center bg-[#161616]">
                  <img src={product.images[0]} alt={product.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-6">
                  <div className="flex text-[10px] text-red-600 mb-2">
                    {[...Array(5)].map((_, i) => (<AiFillStar key={i} className={i < product.rateCount ? "text-red-600" : "text-zinc-800"} />))}
                  </div>
                  <h3 className="font-bold text-sm mb-1 uppercase tracking-tight truncate">{product.brand} {product.title}</h3>
                  <p className="text-zinc-500 text-[10px] mb-4 h-8 line-clamp-2">{product.info}</p>
                  <div className="h-[1px] bg-zinc-900 mb-4" />
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold">₹{product.finalPrice.toLocaleString()}</span>
                    <span className="text-xs text-zinc-600 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  <button onClick={() => addToCart(product)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-colors text-xs uppercase tracking-widest">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 uppercase tracking-widest text-xs">No products found matching these filters.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default AllProducts;
import React, { useState, useEffect } from "react";
// Import your API file
import ProductAPI from "../api/ProductAPI"; 
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineFilter, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  
  // States
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 25000]);

  // --- API CALL LOGIC ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      // 1. Prepare filter object for the API
      const filters = {};
      if (selectedBrands.length > 0) filters.brand = selectedBrands;
      if (selectedCategories.length > 0) filters.category = selectedCategories;

      // 2. Call the ProductAPI
      const data = await ProductAPI.getProducts(filters);
      
      // 3. Apply Price Range Filter
      let result = data.filter(p => 
        p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1]
      );
      
      // 4. Apply Sorting to the data received from API
      if (sortBy === "Price(Lowest First)") {
        result.sort((a, b) => a.finalPrice - b.finalPrice);
      } else if (sortBy === "Price(Highest First)") {
        result.sort((a, b) => b.finalPrice - a.finalPrice);
      } else if (sortBy === "Top Rated") {
        result.sort((a, b) => b.rateCount - a.rateCount);
      }
     
      setFilteredProducts(result);
      setIsLoading(false);
    };

    fetchProducts();
  }, [selectedBrands, selectedCategories, sortBy, priceRange]); // Re-runs when filters or sort change

  // Helper to toggle chips/checkboxes
  const toggleFilter = (item, state, setState) => {
    setState(state.includes(item) ? state.filter((i) => i !== item) : [...state, item]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 25000]);
    setSortBy("Latest");
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-24 md:pt-32 pb-12 font-sans px-4 md:px-10">
      
      {/* MOBILE & TABLET FILTER TOGGLE */}
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

        <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#161616] border-x border-b border-zinc-800 ${isFilterOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Sort By</h3>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-black border border-zinc-800 p-3 text-xs uppercase outline-none focus:border-red-600">
                {["Latest", "Top Rated", "Price(Lowest First)", "Price(Highest First)"].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </section>

            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Price Range</h3>
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max="25000" 
                  step="500"
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
                  <button key={cat} onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    className={`px-4 py-2 text-[10px] uppercase font-bold border transition-all ${selectedCategories.includes(cat) ? "bg-red-600 border-red-600 text-white" : "border-zinc-800 text-zinc-500"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {["JBL", "BoAt", "Sony"].map((brand) => (
                  <button key={brand} onClick={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                    className={`px-4 py-2 text-[10px] uppercase font-bold border transition-all ${selectedBrands.includes(brand) ? "bg-red-600 border-red-600 text-white" : "border-zinc-800 text-zinc-500"}`}>
                    {brand}
                  </button>
                ))}
              </div>
            </section>
            <button onClick={clearAllFilters} className="w-full bg-zinc-800 hover:bg-zinc-700 py-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Clear All Filters</button>
            <button onClick={() => setIsFilterOpen(false)} className="w-full bg-red-600 py-4 text-[10px] font-bold uppercase tracking-[0.2em]">Apply & Close</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-12 border-r border-zinc-900 pr-8">
          <button 
            onClick={clearAllFilters} 
            className="w-full bg-zinc-800 hover:bg-zinc-700 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Clear All Filters
          </button>
          
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Sort By</h3>
            <ul className="space-y-4 text-xs font-medium">
              {["Latest", "Top Rated", "Price(Lowest First)", "Price(Highest First)"].map((opt) => (
                <li key={opt} onClick={() => setSortBy(opt)}
                  className={`cursor-pointer transition-colors ${sortBy === opt ? "text-red-600 font-bold" : "text-zinc-400 hover:text-white"}`}>
                  {opt}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Price Range</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="25000" 
                step="500"
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-zinc-400">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Category</h3>
            <div className="space-y-4">
              {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group text-xs uppercase tracking-widest">
                  <input type="checkbox" checked={selectedCategories.includes(cat)} className="w-4 h-4 accent-red-600"
                    onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)} />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Brands</h3>
            <div className="space-y-4">
              {["JBL", "BoAt", "Sony"].map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group text-xs uppercase tracking-widest">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} className="w-4 h-4 accent-red-600"
                    onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)} />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-[#111] border border-zinc-900 hover:border-red-600 transition-all flex flex-col group">
                  <Link to={`/product-details/${product._id}`} className="p-8 aspect-square flex items-center justify-center bg-[#161616]">
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
                    <button onClick={() => dispatch(addToCart(product))} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-colors text-xs uppercase tracking-widest">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredProducts.length === 0 && (
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
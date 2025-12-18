import React, { useState, useEffect } from "react";
import productsData from "../../data/productsData.js";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useProducts } from "../../context/ProductContext";

const AllProducts = () => {
  const { addToCart } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  
  // Filter States
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Logic to apply all filters simultaneously
  useEffect(() => {
    let result = [...productsData];

    // 1. Filter by Brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // 2. Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // 3. Sorting Logic
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
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-28 pb-12 font-sans px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTER (Based on image_cb0b0b.jpg) */}
        <aside className="w-full md:w-64 shrink-0 space-y-10 border-r border-zinc-900 pr-6">
          
          {/* SORT SECTION */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Sort By</h3>
            <ul className="space-y-4 text-xs font-medium">
              {["Latest", "Featured", "Top Rated", "Price(Lowest First)", "Price(Highest First)"].map((opt) => (
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

          {/* BRANDS SECTION */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Filter By Brands</h3>
            <div className="space-y-4">
              {["JBL", "BoAt", "Sony"].map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group text-xs uppercase tracking-widest">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 accent-red-600 bg-transparent border-zinc-700 rounded-sm"
                    onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                  />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </section>

          {/* CATEGORY SECTION */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 border-b border-zinc-900 pb-2">Category</h3>
            <div className="space-y-4">
              {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group text-xs uppercase tracking-widest">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 accent-red-600"
                    onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                  />
                  <span className="text-zinc-400 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-grow">
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
                  <h3 className="font-bold text-sm mb-1 uppercase tracking-tight">{product.brand} {product.title}</h3>
                  <p className="text-zinc-500 text-[10px] mb-4">{product.info}</p>
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
        </main>

      </div>
    </div>
  );
};

export default AllProducts;
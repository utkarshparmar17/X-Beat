import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowForward, IoStar } from "react-icons/io5";
import ProductAPI from "../../api/ProductAPI";
import ProductCard from "./ProductCard.jsx";

const StarRating = ({ rating }) => (
  <div className="flex justify-start gap-0.5 mb-1 md:mb-2">
    {[...Array(5)].map((_, i) => (
      <IoStar
        key={i}
        className={`text-[6px] md:text-[10px] ${
          i < rating ? "text-[#e31e24]" : "text-gray-800"
        }`}
      />
    ))}
  </div>
);

function TopProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

  /* ===================== FETCH TOP PRODUCTS ===================== */
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setIsDataLoading(true);

        // ✅ ONLY top products (matches your network tab)
        const data = await ProductAPI.getProducts({
          
        });

        setAllProducts(data || []);
      } catch (err) {
        console.error("TopProducts API error:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  /* ===================== FILTER LOGIC (FIXED) ===================== */
  const filteredProducts = allProducts
    .filter((p) => {
      if (activeCategory === "All") return true;

      const apiCategory = p.category?.toLowerCase();
      const uiCategory = activeCategory.toLowerCase();

      // handles: headphones ↔ headphone, earbuds ↔ earbud
      return (
        apiCategory === uiCategory ||
        apiCategory === uiCategory.slice(0, )
      );
    })
    .slice(0, 11);

  /* ===================== LOADING UI ===================== */
  if (isDataLoading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-[#111]">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-zinc-500 text-[10px] uppercase tracking-widest">
          Loading Products...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111] py-12 md:py-20 px-2 md:px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-center mb-6 md:mb-10 text-white">
          Top Products
        </h2>

        {/* CATEGORY FILTERS */}
        <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-4 mb-8 md:mb-16 pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`whitespace-nowrap px-4 md:px-6 py-1.5 md:py-2 text-[9px] md:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                activeCategory === c
                  ? "bg-red-600 text-white border-red-600"
                  : "text-gray-400 border-zinc-800 hover:border-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
          

          {/* MORE CARD */}
          <Link
            to="/all-products"
            className="bg-[#161616] border border-dashed border-zinc-800 hover:border-red-600 transition-all duration-500 group flex flex-col items-center justify-center h-full min-h-[150px] md:min-h-[400px]"
          >
            <div className="bg-red-600 w-8 h-8 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-red-900/20">
              <IoArrowForward className="text-white text-sm md:text-2xl" />
            </div>
            <h3 className="text-[10px] md:text-xl font-black italic tracking-tighter uppercase text-white mb-1">
              More
            </h3>
            <p className="hidden md:block text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              View All
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;

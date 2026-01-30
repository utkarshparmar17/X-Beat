import React, { useState, useRef, useEffect } from "react";
import { IoSearchSharp, IoCartOutline, IoMenu } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchOverlay from "../common/SearchOverlay";
import ProductAPI from "../../api/ProductAPI"; // ✅ FIXED PATH

function Navbar({ toggleSidebar }) {
  const cart = useSelector((state) => state.cart.cart);

  const [showDropdown, setShowDropdown] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const cartItemCount = cart?.length || 0;

  /* ---------- FETCH PRODUCTS FOR SEARCH ---------- */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductAPI.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products for search:", error);
      }
    };
    loadProducts();
  }, []);

  /* ---------- CLOSE DROPDOWNS ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------- AUTO FOCUS ---------- */
  useEffect(() => {
    if (openSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [openSearch]);

  /* ---------- SEARCH LOGIC ---------- */
  const q = searchQuery.trim().toLowerCase();

  const liveResults = q
    ? products
        .filter(
          (p) =>
            p.title?.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q)
        )
        .slice(0, 6)
    : [];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-30 bg-black text-white border-b border-zinc-900">
        <div className="flex justify-between items-center h-14 md:h-16 px-3 md:px-8">

          {/* LEFT */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-2xl hover:text-red-500"
            >
              <IoMenu />
            </button>

            <Link
              to="/"
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter"
            >
              X-Beat
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 text-lg sm:text-xl md:text-2xl">

            {/* SEARCH */}
            <div className="relative" ref={searchContainerRef}>
              <div className="hidden md:block">
                {openSearch && (
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="absolute right-9 top-1/2 -translate-y-1/2 w-[320px]
                      bg-transparent border border-zinc-700 px-3 py-2 pr-9
                      rounded-md text-sm text-white focus:outline-none
                      focus:border-red-600"
                  />
                )}

                <button
                  onClick={() => setOpenSearch((s) => !s)}
                  className="hover:text-red-500 p-1"
                >
                  <IoSearchSharp />
                </button>

                {openSearch && q && (
                  <div className="absolute right-9 top-full mt-2 w-[320px] bg-[#111] border border-zinc-800 rounded-md shadow-lg z-50">
                    {liveResults.length ? (
                      liveResults.map((p) => (
                        <Link
                          key={p._id} // ✅ unique key
                          to={`/product-details/${p._id}`} // ✅ FIXED ROUTE
                          onClick={() => {
                            setOpenSearch(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 px-2 py-2 hover:bg-zinc-800"
                        >
                          <img
                            src={p.images?.[0] || "/placeholder.png"}
                            alt={p.title}
                            className="w-10 h-10 object-contain"
                          />
                          <p className="flex-1 text-sm truncate">
                            {p.title}
                          </p>
                          <span className="text-sm font-bold text-red-500">
                            ₹{p.finalPrice.toLocaleString()}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <div className="p-2 text-xs text-zinc-500">
                        No results
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setOpenOverlay(true)}
                className="md:hidden hover:text-red-500 p-1"
              >
                <IoSearchSharp />
              </button>
            </div>

            {/* CART */}
            <Link to="/cart" className="relative hover:text-red-500">
              <IoCartOutline />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px]
                  w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* USER */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:text-red-500 transition p-1"
              >
                <GrUserManager />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-[#111] border border-zinc-800 shadow-2xl z-50 rounded-sm overflow-hidden">
                  
                  {/* HEADER */}
                  <div className="p-6 border-b border-zinc-800">
                    <h3 className="text-base font-bold text-white mb-1">Hello!</h3>
                    <p className="text-xs text-zinc-500 mb-4">Access account and manage orders</p>
                    
                    <Link 
                      to="/login"
                      onClick={() => setShowDropdown(false)}
                      className="block w-fit px-5 py-2 border border-zinc-600 text-sm font-bold text-white uppercase hover:border-red-600 hover:text-red-500 transition-colors"
                    >
                      Login / Signup
                    </Link>
                  </div>

                  {/* MENU LINKS */}
                  <div className="py-2">
                    {[
                      { label: "Orders", path: "/orders" },
                      { label: "Wishlist", path: "/wishlist" },
                      { label: "Gift Cards", path: "/gift-cards" },
                      { label: "Saved Cards", path: "/profile" },
                      { label: "Saved Addresses", path: "/profile" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setShowDropdown(false)}
                        className="block px-6 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {openOverlay && (
        <SearchOverlay close={() => setOpenOverlay(false)} />
      )}
    </>
  );
}

export default Navbar;

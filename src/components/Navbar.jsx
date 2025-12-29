import React, { useState, useRef, useEffect } from "react";
import { IoSearchSharp, IoCartOutline, IoMenu } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import SearchOverlay from "../components/pages/SearchOverlay";
import productsData from "../data/productsData";

function Navbar({ toggleSidebar }) {
  const { cart } = useProducts();

  const [showDropdown, setShowDropdown] = useState(false);
  const [openSearch, setOpenSearch] = useState(false); // inline search (md+)
  const [openOverlay, setOpenOverlay] = useState(false); // mobile overlay
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const cartItemCount = cart?.length || 0;

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

  /* ---------- SEARCH RESULTS ---------- */
  const q = searchQuery.trim().toLowerCase();
  const liveResults = q
    ? productsData
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      )
      .slice(0, 6)
    : [];

  return (
    <>
      {/* ================= NAVBAR ================= */}
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

            {/* ================= SEARCH ================= */}
            <div className="relative" ref={searchContainerRef}>

              {/* INLINE SEARCH (md+) */}
              <div className="hidden md:block">
                {openSearch && (
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="
                      absolute right-9 top-1/2 -translate-y-1/2
                      w-[320px]
                      bg-transparent border border-zinc-700
                      px-3 py-2 pr-9
                      rounded-md text-sm text-white
                      focus:outline-none focus:border-red-600
                    "
                  />
                )}

                <button
                  onClick={() => setOpenSearch((s) => !s)}
                  className="hover:text-red-500 p-1"
                >
                  <IoSearchSharp />
                </button>

                {/* DROPDOWN */}
                {openSearch && q && (
                  <div className="absolute right-9 top-full mt-2 w-[320px] bg-[#111] border border-zinc-800 rounded-md shadow-lg z-50">
                    {liveResults.length ? (
                      liveResults.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product-details/${p.id}`}
                          onClick={() => setOpenSearch(false)}
                          className="flex items-center gap-3 px-2 py-2 hover:bg-zinc-800"
                        >
                          <img
                            src={p.images[0]}
                            className="w-10 h-10 object-contain"
                          />
                          <p className="flex-1 text-sm truncate">
                            {p.title}
                          </p>
                          <span className="text-sm font-bold text-red-500">
                            ₹{p.finalPrice}
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

              {/* MOBILE SEARCH (sm) → OPEN OVERLAY */}
              <button
                onClick={() => setOpenOverlay(true)}
                className="md:hidden hover:text-red-500 p-1"
              >
                <IoSearchSharp />
              </button>
            </div>

            {/* ================= CART ================= */}
            <Link to="/cart" className="relative hover:text-red-500">
              <IoCartOutline />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* ================= USER ================= */}
            {/* USER */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:text-red-500 transition flex items-center p-1"
              >
                <GrUserManager />
              </button>

              {showDropdown && (
                <div
                  className="
                    absolute right-0 mt-3
                    w-64
                    bg-gradient-to-b from-[#111] to-[#0b0b0b]
                    border border-zinc-700
                    shadow-2xl
                    rounded-sm
                    p-5
                  "
                >
                  {/* HEADER */}
                  <h4 className="text-sm font-semibold text-white mb-1">Hello!</h4>
                  <p className="text-xs text-zinc-400 mb-4">Access account and manage orders</p>

                  {/* LOGIN BUTTON */}
                  <Link
                    to="/login"
                    onClick={() => setShowDropdown(false)}
                    className="
                      block w-full
                      border border-zinc-600
                      py-2.5
                      text-center
                      text-sm
                      font-medium
                      text-white
                      hover:bg-zinc-800
                      transition
                      mb-5
                    "
                  >
                    Login / Signup
                  </Link>

                  {/* DIVIDER */}
                  <div className="border-t border-zinc-800 mb-4" />

                  {/* MENU */}
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li>
                      <Link to="/orders" onClick={() => setShowDropdown(false)} className="hover:text-white transition">Orders</Link>
                    </li>
                    <li>
                      <Link to="/wishlist" onClick={() => setShowDropdown(false)} className="hover:text-white transition">Wishlist</Link>
                    </li>
                    <li>
                      <Link to="/gift-cards" onClick={() => setShowDropdown(false)} className="hover:text-white transition">Gift Cards</Link>
                    </li>
                    <li>
                      <Link to="/saved-cards" onClick={() => setShowDropdown(false)} className="hover:text-white transition">Saved Cards</Link>
                    </li>
                    <li>
                      <Link to="/profile" onClick={() => setShowDropdown(false)} className="hover:text-white transition">Saved Addresses</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ================= MOBILE SEARCH OVERLAY ================= */}
      {openOverlay && (
        <SearchOverlay close={() => setOpenOverlay(false)} />
      )}
    </>
  );
}

export default Navbar;

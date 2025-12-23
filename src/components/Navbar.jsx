import React, { useState, useRef, useEffect } from 'react';
import { IoSearchSharp, IoCartOutline, IoMenu } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function Navbar({ toggleSidebar }) { 
  const { cart } = useProducts();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartItemCount = cart ? cart.length : 0;

  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-black text-white shadow-lg border-b border-zinc-900"> 
      {/* - height: h-14 on mobile, h-16 on desktop
          - padding: px-3 on mobile, px-8 on desktop 
      */}
      <div className="flex justify-between items-center h-14 md:h-16 px-3 md:px-8">
        
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-2xl p-1 hover:text-red-500 transition"
          >
            <IoMenu /> 
          </button>
          {/* Logo scales from text-2xl to text-3xl */}
          <div className="text-2xl md:text-3xl font-bold tracking-tighter">
            <Link to="/">X-Beat</Link>
          </div>
        </div>
        
        {/* Icons spacing and size adjustments */}
        <div className="flex items-center space-x-4 md:space-x-6 text-xl md:text-2xl">
          <Link to="/search" className="hover:text-red-500 transition">
            <IoSearchSharp />
          </Link>
          
          <Link to="/cart" className="hover:text-red-500 transition relative p-1">
            <IoCartOutline />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-[8px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              className="hover:text-red-500 transition flex items-center p-1"
            >
              <GrUserManager />
            </button>

            {/* Dropdown width adjustment for mobile */}
            {showDropdown && (
              <div className="absolute right-0 mt-4 w-56 md:w-64 bg-[#161616] border border-zinc-800 p-4 md:p-6 shadow-2xl rounded-sm">
                <h4 className="text-xs md:text-sm font-bold mb-1">Hello!</h4>
                <p className="text-[9px] md:text-[11px] text-zinc-500 mb-4 uppercase tracking-wider italic">Manage account & info</p>
                
                <Link 
                  to="/login" 
                  onClick={() => setShowDropdown(false)} 
                  className="block w-full border border-zinc-700 py-2.5 md:py-3 text-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition mb-4 md:mb-6"
                >
                  Login / Signup
                </Link>
                
                <ul className="space-y-3 md:space-y-4 text-[10px] md:text-[11px] text-zinc-400 border-t border-zinc-800 pt-4 md:pt-5 uppercase tracking-widest font-medium">
                  <li className="hover:text-white transition"><Link to="/orders" onClick={() => setShowDropdown(false)}>Orders</Link></li>
                  <li className="hover:text-white transition"><Link to="/help" onClick={() => setShowDropdown(false)}>Help Center</Link></li>
                  <li className="hover:text-white transition"><Link to="/policies" onClick={() => setShowDropdown(false)}>Policies</Link></li>
                  <li className="hover:text-white transition"><Link to="/about" onClick={() => setShowDropdown(false)}>Company</Link></li>
                  <li className="hover:text-white transition"><Link to="/profile" onClick={() => setShowDropdown(false)}>Saved Addresses</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
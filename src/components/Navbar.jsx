import React, { useState, useRef, useEffect } from 'react';
import { IoSearchSharp, IoCartOutline, IoMenu } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext"; // Import your context

function Navbar({ toggleSidebar }) { 
  const { cart } = useProducts(); // Access your cart state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate total items in cart
  const cartItemCount = cart ? cart.length : 0;

  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-black text-white shadow-lg border-b border-zinc-900"> 
      <div className="flex justify-between items-center h-16 px-4 md:px-8">
        
        <div className="flex items-center gap-4">
          <button 
              onClick={toggleSidebar} 
              className="md:hidden text-3xl p-2 focus:outline-none hover:text-red-500 transition" 
          >
              <IoMenu /> 
          </button>

          <div className="text-3xl font-bold">
            <Link to="/">X-Beat</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-2xl md:text-3xl">
          <Link to="/search" className="hover:text-red-500 transition">
            <IoSearchSharp />
          </Link>
          
          <Link to="/cart" className="hover:text-red-500 transition relative">
            <IoCartOutline />
            {/* Logic: Only show badge if cartItemCount is greater than 0 */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="hover:text-red-500 transition focus:outline-none flex items-center"
            >
              <GrUserManager />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-4 w-64 bg-[#161616] border border-zinc-800 p-6 shadow-2xl rounded-sm">
                <h4 className="text-sm font-bold mb-1">Hello!</h4>
                <p className="text-[11px] text-zinc-500 mb-4 uppercase tracking-wider italic">Access account and manage orders</p>
                
                <Link 
                  to="/login" 
                  onClick={() => setShowDropdown(false)}
                  className="block w-full border border-zinc-700 py-3 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition mb-6"
                >
                  Login / Signup
                </Link>
                
                <ul className="space-y-4 text-[11px] text-zinc-400 border-t border-zinc-800 pt-5 uppercase tracking-widest font-medium">
                  <li className="hover:text-white cursor-pointer transition">Orders</li>
                  <li className="hover:text-white cursor-pointer transition">Wishlist</li>
                  <li className="hover:text-white cursor-pointer transition">Gift Cards</li>
                  <li className="hover:text-white cursor-pointer transition">Saved Cards</li>
                  <li className="hover:text-white cursor-pointer transition">Saved Addresses</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

// Receiving state and toggle function
function Sidebar({ isSidebarOpen, toggleSidebar }) { 
  const navItems = [
  //   { name: 'Home', path: '/' },
  //   { name: 'assssty', path: '/assssty' },
  //   { name: 'Narvbar', path: '/navbar' },
  //   { name: 'Sages', path: '/sages' },
  //   { name: 'Geohori', path: '/geohori' },
  //   { name: 'Sommes', path: '/sommes' },
  //   { name: 'Sogect', path: '/sogect' },
  //   { name: 'Sogict', path: '/sogict' },
  //   { name: 'Home /rac', path: '/home/rac' },
  // ];

  return (
    <>
      {/* Overlay for Mobile (only visible when sidebar is open) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={toggleSidebar} // Closes sidebar when clicking outside
        />
      )}

      {/* Sidebar Container: Fixed width, positioned under the Navbar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 p-4 flex flex-col transition-transform duration-300
          w-60
          // Mobile visibility: slide in/out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          // Desktop visibility: permanently docked, starting below the Navbar
          md:translate-x-0 md:top-16
        `}
        style={{ paddingTop: '4rem' }} // Space for fixed Navbar
      >
        {/* Close Button for Mobile (Hidden on Desktop) */}
        <button 
          onClick={toggleSidebar} 
          className="absolute top-4 right-4 text-3xl md:hidden text-white hover:text-red-500 transition"
          aria-label="Close menu"
        >
          <IoClose />
        </button>
        
        <nav className="flex flex-col space-y-2 pt-4 md:pt-0">
          {/* REMOVED: <p className="text-xl font-semibold mb-4 text-gray-400 border-b border-gray-700 pb-2">Categories</p> */}
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={toggleSidebar} // Close sidebar on navigation
              className="p-2 rounded-lg hover:bg-gray-700 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
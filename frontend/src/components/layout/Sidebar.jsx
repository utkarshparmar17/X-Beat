import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { AiOutlineInfoCircle, AiOutlineFileText, AiOutlineQuestionCircle } from "react-icons/ai";

function Sidebar({ isSidebarOpen, toggleSidebar }) { 
  // State to track which nested menu is open
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menuName) => {
    setOpenSubMenu(openSubMenu === menuName ? null : menuName);
  };

  const infoItems = [
    { 
      name: 'Help Center', 
      icon: <AiOutlineQuestionCircle />,
      subLinks: [
        { name: 'FAQs', path: '/faqs' },
        { name: 'Track Order', path: '/track' },
        { name: 'Cancel Order', path: '/cancel' },
        { name: 'Return Order', path: '/return' },
        { name: 'Warranty Info', path: '/warranty' },
      ]
    },
    { 
      name: 'Policies', 
      icon: <AiOutlineFileText />,
      subLinks: [
        { name: 'Return Policy', path: '/return-policy' },
        { name: 'Security', path: '/security' },
        { name: 'Sitemap', path: '/sitemap' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms & Conditions', path: '/terms' },
      ]
    },
    { name: 'Company', path: '/about', icon: <AiOutlineInfoCircle /> },
  ];

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[60] lg:hidden backdrop-blur-sm" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar container */}
      <div 
        className={`fixed top-0 left-0 h-full bg-[#0e0e0e] text-white z-[70] p-8 flex flex-col transition-transform duration-500 ease-in-out border-r border-zinc-900 w-80 lg:hidden
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        `}
      >
        {/* Close Button */}
        <button 
          onClick={toggleSidebar} 
          className="self-end text-3xl text-zinc-500 hover:text-red-600 transition mb-10"
        >
          <IoClose />
        </button>
        
        <nav className="flex flex-col h-full overflow-y-auto no-scrollbar">
          <div className="mt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-8 italic">
              Support & Info
            </p>
            
            <div className="space-y-4">
              {infoItems.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.subLinks ? (
                    /* Category with Sub-links */
                    <div className="group">
                      <button 
                        onClick={() => toggleSubMenu(item.name)}
                        className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all py-2"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl text-red-600">{item.icon}</span>
                          {item.name}
                        </div>
                        {openSubMenu === item.name ? <IoChevronUp /> : <IoChevronDown />}
                      </button>

                      {/* Nested Category Links */}
                      <div className={`pl-12 space-y-3 overflow-hidden transition-all duration-300 ${openSubMenu === item.name ? 'max-h-60 mt-4 mb-2' : 'max-h-0'}`}>
                        {item.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={toggleSidebar}
                            className="block text-[11px] font-medium text-zinc-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Standard Single Link */
                    <Link 
                      to={item.path} 
                      onClick={toggleSidebar}
                      className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all py-2"
                    >
                      <span className="text-2xl text-red-600">{item.icon}</span>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pb-4 pt-10 border-t border-zinc-900">
            <p className="text-[9px] text-zinc-800 uppercase tracking-widest font-bold">
              X-Beat Version 1.0
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
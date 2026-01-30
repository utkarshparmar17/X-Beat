import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    /* mt-auto ensures it pushes to the bottom in a flexbox layout */
    <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-6 md:px-12 border-t border-zinc-800 w-full mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Brand & Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-2xl font-bold tracking-tight">X-Beat</h2>
          <p className="text-sm leading-6">
            Subscribe to our Email alerts to receive early discount offers, and new products info.
          </p>
          <form className="mt-2 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email Address*"
              className="bg-transparent border border-zinc-700 p-3 rounded-sm text-white focus:outline-none focus:border-red-600 transition-colors"
              required
            />
            <button className="bg-[#d10000] text-white font-semibold py-2.5 px-6 rounded-sm w-fit hover:bg-red-700 transition-all">
              Subscribe
            </button>
          </form>
        </div>

        {/* Other Columns... */}
        <div className="flex flex-col gap-4 lg:pl-10">
          <h3 className="text-white font-semibold text-lg">Help</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link to="/cancel-order" className="hover:text-white transition-colors">Cancel Order</Link></li>
            <li><Link to="/return-order" className="hover:text-white transition-colors">Return Order</Link></li>
            <li><Link to="/warranty-info" className="hover:text-white transition-colors">Warranty Info</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-lg">Policies</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
            <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
            <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-lg">Company</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/service-centers" className="hover:text-white transition-colors">Service Centres</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/affiliates" className="hover:text-white transition-colors">Affiliates</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      {/* Ensure mb-0 is set to prevent bottom spacing */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 mb-0">
        <p className="text-xs text-zinc-500">
          2025 | XBeat. All Rights Reserved. Built by | <span className="text-zinc-300">Parmar Utkarsh</span>
        </p>
        
        <div className="flex gap-6 pb-2 md:pb-0">
          <a href="#" className="hover:text-white transition-colors"><FaFacebookF size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaTwitter size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaInstagram size={18} /></a>
          <a href="#" className="hover:text-white transition-colors"><FaLinkedinIn size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
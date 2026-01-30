import React from 'react';
import { Link } from 'react-router-dom';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const Sitemap = () => {
  const links = [
    { title: "Home", path: "/" },
    { title: "Shop All", path: "/all-products" },
    { title: "Top Deals", path: "/top-deals" },
    { title: "Featured Products", path: "/featured-products" },
    { title: "Cart", path: "/cart" },
    { title: "Login", path: "/login" },
    { title: "Help Center", path: "/help" },
    { title: "Privacy Policy", path: "/privacy-policy" },
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  return (
    <FooterPageLayout title="Sitemap">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className="block p-4 border border-zinc-800 rounded hover:border-red-600 hover:text-red-500 transition-colors"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </FooterPageLayout>
  );
};

export default Sitemap;

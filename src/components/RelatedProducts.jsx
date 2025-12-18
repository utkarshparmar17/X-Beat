import React from 'react';
import { Link } from 'react-router-dom';
import productsData from "../../data/productsData.js";
import { useProducts } from "../../context/ProductContext";

const RelatedProducts = ({ currentProduct }) => {
  const { addToCart } = useProducts();

  // Find products in the same category, excluding the one currently being viewed
  const related = productsData
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 pb-20 border-t border-zinc-900 pt-10">
      <h2 className="text-2xl font-bold mb-10 text-white uppercase tracking-tighter">
        You May Also Like
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <div key={product.id} className="group bg-[#111] border border-zinc-800 p-4 hover:border-red-600 transition-colors duration-300 flex flex-col">
            <Link to={`${product.path}${product.id}`} className="flex-grow">
              <div className="bg-[#161616] aspect-square flex items-center justify-center p-6 mb-4 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  className="max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                  alt={product.title} 
                />
              </div>
              <h3 className="text-white font-bold text-sm mb-1 truncate">{product.title}</h3>
              <p className="text-zinc-500 text-[10px] uppercase mb-4">{product.brand}</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white font-bold">₹{product.finalPrice.toLocaleString()}</span>
                <span className="text-zinc-600 line-through text-xs">₹{product.originalPrice.toLocaleString()}</span>
              </div>
            </Link>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-red-600 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
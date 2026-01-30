import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

const Orders = () => {
  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-24 pb-12 px-4 md:px-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-6">My Orders</h1>
        
        <div className="bg-[#161616] border border-zinc-800 p-10 rounded-sm text-center">
          <AiOutlineShopping className="text-6xl text-zinc-800 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-zinc-500 text-sm mb-6">Looks like you haven't placed any orders yet.</p>
          
          <Link 
            to="/all-products" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-sm uppercase tracking-widest text-sm transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;

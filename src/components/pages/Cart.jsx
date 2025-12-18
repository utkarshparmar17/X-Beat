import React from "react";
import { useProducts } from "../../context/ProductContext";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom"; // Added for navigation

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useProducts();

  const subtotal = cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const originalTotal = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);

  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-white pt-24 pb-12 px-4 md:px-10 font-sans">
      <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter mb-10 border-b border-zinc-900 pb-4 uppercase">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <p className="text-zinc-500 text-lg">Your cart is empty.</p>
          <Link to="/" className="bg-red-600 px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-6 bg-[#161616] p-6 rounded-sm border border-zinc-900 shadow-xl">
                {/* Image background matches product display style */}
                <div className="w-24 h-24 bg-white p-2 rounded-sm flex items-center justify-center shrink-0">
                   <img src={item.images[0]} className="w-full h-full object-contain" alt={item.title} />
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-tight">
                    {item.brand} {item.title}
                  </h3>
                  <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wide mt-1">
                    {item.info}
                  </p>
                  
                  <div className="flex items-center gap-6 mt-6">
                    {/* Stepper Logic */}
                    <div className="flex items-center border border-zinc-800 bg-black">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                        className="p-2 hover:text-red-600 transition"
                      >
                        <AiOutlineMinus size={14} />
                      </button>
                      <span className="px-4 font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="p-2 hover:text-red-600 transition"
                      >
                        <AiOutlinePlus size={14} />
                      </button>
                    </div>
                    {/* Delete Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-zinc-600 hover:text-red-600 transition-colors"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg md:text-xl font-black text-red-600 italic">
                    ₹{(item.finalPrice * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-zinc-600 text-[10px] line-through">
                    ₹{(item.originalPrice * item.quantity).toLocaleString()} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary matches image_bec8a6 layout */}
          <div className="lg:col-span-4">
            <div className="bg-[#161616] p-8 rounded-sm border border-zinc-900 h-fit sticky top-28 shadow-2xl">
              <h2 className="text-sm font-bold mb-8 border-b border-zinc-800 pb-4 uppercase tracking-widest">
                Order Summary
              </h2>
              <div className="space-y-4 text-[11px] uppercase tracking-wider">
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span>Price ({cart.length} items)</span>
                  <span>₹{originalTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-500 font-bold">
                  <span>Discount</span>
                  <span>- ₹{(originalTotal - subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-500 font-medium">
                  <span>Delivery</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                
                <div className="flex justify-between border-t border-zinc-800 pt-6 text-lg font-black italic tracking-tighter">
                  <span className="uppercase">Total Amount</span>
                  <span className="text-red-600">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
              
              <Link to="/place-order">
                <button className="w-full bg-red-600 text-white font-bold py-4 hover:bg-red-700 transition-all uppercase text-[10px] tracking-[0.2em] mt-8 shadow-lg shadow-red-900/10">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import ProductAPI from "../../api/ProductAPI";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useProducts();

  /* ================= FORCE OBJECT ID CALLS ================= */
  useEffect(() => {
    const fetchCartProducts = async () => {
      for (const item of cart) {
        // 🔥 THIS WILL SHOW IN NETWORK TAB
        await ProductAPI.getProductById(item._id);
      }
    };

    if (cart.length) fetchCartProducts();
  }, [cart]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-black mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-500 mb-6">Your cart is empty</p>
            <Link to="/all-products" className="bg-red-600 px-6 py-3 font-bold uppercase">
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 bg-[#161616] border border-zinc-800 p-4"
                >
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 bg-white p-2 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">
                      {item.brand} {item.title}
                    </h3>
                    <p className="text-zinc-500">₹{item.finalPrice}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="border p-2"
                      >
                        <AiOutlineMinus />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="border p-2"
                      >
                        <AiOutlinePlus />
                      </button>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-4 text-red-500"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-red-500">
                    ₹{item.finalPrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-4 bg-[#161616] border border-zinc-800 p-6 h-fit">
              <h2 className="font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="text-red-500 font-bold">₹{subtotal}</span>
              </div>
              <button className="w-full bg-red-600 py-3 font-bold uppercase">
                Place Order
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

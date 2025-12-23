import { useProducts } from "../../context/ProductContext";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useProducts();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-20 md:pt-24 px-3 sm:px-4 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-6 md:mb-8">
          Shopping Cart
        </h1>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-500 mb-6 text-sm sm:text-base">
              Your cart is empty
            </p>

            <Link
              to="/all-products"
              className="inline-block bg-red-600 hover:bg-red-700 px-6 sm:px-8 py-3 font-bold uppercase text-xs sm:text-sm"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* ================= LEFT: CART ITEMS ================= */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">

              {/* ADD MORE PRODUCTS */}
              <Link
                to="/all-products"
                className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-red-500 hover:underline"
              >
                + Add More Products
              </Link>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 bg-[#161616] border border-zinc-800 p-4 sm:p-5"
                >
                  {/* IMAGE */}
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-2 object-contain mx-auto sm:mx-0"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base">
                      {item.brand} {item.title}
                    </h3>

                    <p className="text-xs text-zinc-500 mt-1">
                      ₹{item.finalPrice}
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="border border-zinc-700 p-2"
                      >
                        <AiOutlineMinus size={14} />
                      </button>

                      <span className="font-bold text-sm sm:text-base">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="border border-zinc-700 p-2"
                      >
                        <AiOutlinePlus size={14} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 sm:ml-4 text-zinc-500 hover:text-red-600"
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <p className="font-bold text-red-500 text-sm sm:text-base text-right sm:text-left">
                    ₹{item.finalPrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* ================= RIGHT: SUMMARY ================= */}
            <div className="lg:col-span-4 bg-[#161616] border border-zinc-800 p-5 sm:p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-sm">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-lg sm:text-xl font-black mb-6">
                <span>Total</span>
                <span className="text-red-500">₹{subtotal}</span>
              </div>

              <Link to="/place-order">
                <button className="w-full bg-red-600 hover:bg-red-700 py-3 sm:py-4 font-bold uppercase tracking-widest text-xs sm:text-sm">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

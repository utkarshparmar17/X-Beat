import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pt-24 px-6">
      <h1 className="text-2xl font-bold mb-6">❤️ Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400">Your wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] p-4 rounded-lg"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-40 mx-auto object-contain"
              />
              <h2 className="mt-4 font-semibold">{product.title}</h2>
              <p className="text-red-500 font-bold">₹{product.finalPrice}</p>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/product-details/${product.id}`}
                  className="text-sm underline"
                >
                  View
                </Link>
                <button
                  onClick={() => dispatch(removeFromWishlist(product._id))}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";


/* -------------------- StarRating Component -------------------- */
const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-start gap-0.5 mb-1 md:mb-2">
      {[...Array(5)].map((_, i) => (
        <IoStar
          key={i}
          className={`text-[6px] md:text-[10px] ${
            i < rating ? "text-[#e31e24]" : "text-gray-800"
          }`}
        />
      ))}
    </div>
  );
};

/* -------------------- ProductCard Component -------------------- */
const ProductCard = ({ product }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAnimating(true);
  };

  const isInWishlist = wishlist.some(
    (item) => item._id === product._id
  );


  return (
    <div className="bg-[#111111] border border-transparent hover:border-red-800 transition-all duration-300 flex flex-col group h-full">
      
      <Link to={`/product-details/${product._id}`} className="flex-grow">
        <div className="bg-[#161616] aspect-square flex items-center justify-center p-2 md:p-8 mb-2 md:mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="px-2 md:px-5 pb-2 text-left">
          <StarRating rating={product.rateCount} />

          <h3 className="text-[8px] md:text-lg font-bold text-white leading-tight mb-1 truncate uppercase tracking-tighter">
            {product.brand} {product.title}
          </h3>

          <p className="hidden md:block text-[11px] text-gray-500 mb-3 uppercase tracking-wider font-semibold">
            {product.info}
          </p>

          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-2 mb-2 md:mb-5 border-t border-gray-900 pt-2 md:pt-4">
            <span className="text-[10px] md:text-xl font-bold text-white italic">
              ₹{product.finalPrice.toLocaleString()}
            </span>
            <span className="text-[7px] md:text-xs text-gray-600 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-2 md:px-5 pb-3 md:pb-5 mt-auto">
        <button
          onClick={handleAddToCart}
          className={`w-full py-1.5 md:py-3 text-white text-[7px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-sm ${
            isAnimating
              ? "bg-green-600"
              : "bg-[#e31e24] hover:bg-red-700"
          }`}
        >
          {isAnimating ? "Added" : "Add"}
        </button>
        <button
  onClick={() =>
    isInWishlist
      ? dispatch(removeFromWishlist(product._id))
      : dispatch(addToWishlist(product))
  }
  className="mt-2 w-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white text-[10px] md:text-xs font-bold uppercase py-2 flex items-center justify-center gap-1 transition"
>
  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
  Wishlist
</button>

      </div>
    </div>
  );
};

export default ProductCard;

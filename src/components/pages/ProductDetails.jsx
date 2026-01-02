import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductAPI from "../../api/ProductAPI"; 
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { useProducts } from "../../context/ProductContext";
import { useWishlist } from "../../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { productId } = useParams(); // This captures the ObjectID from the URL
  const { addToCart } = useProducts();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [activeTab, setActiveTab] = useState("Specifications");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0); // Always scroll to top on new product

      try {
        const data = await ProductAPI.getProducts();
        // MATCHING LOGIC: Use _id and compare as strings
        const found = data.find((p) => String(p._id) === String(productId));
        
        if (found) {
          setProduct(found);
          setMainImg(found.images[0]);
          
          // Filter related products using _id
          const related = data
            .filter((p) => p.category === found.category && p._id !== found._id)
            .slice(0, 3);
          setRelatedProducts(related);
          console.log("ProductDetails API:",found);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [productId]);

// Inside ProductDetails.jsx
if (isLoading) {
  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center">
      {/* Symmetrical Wave Visualizer */}
      <div className="flex items-center justify-center gap-1.5 h-16">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-red-600 rounded-full animate-music-wave"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
      <p className="mt-8 text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">
        Loading Gear...
      </p>

      <style jsx>{`
        @keyframes music-wave {
          0%, 100% { height: 10px; }
          50% { height: 50px; }
        }
        .animate-music-wave {
          animation: music-wave 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

  if (!product) {
    return (
      <div className="text-white text-center pt-40 min-h-screen bg-[#0e0e0e]">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-zinc-500 mt-2">The ID "{productId}" does not exist in our database.</p>
        <Link to="/all-products" className="text-red-500 underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const savings = product.originalPrice - product.finalPrice;
  const discountPercentage = Math.round((savings / product.originalPrice) * 100);
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-28 pb-12 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {product.images?.map((img, index) => (
              <div 
                key={index}
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 bg-[#161616] p-2 border-2 cursor-pointer transition-all ${
                  mainImg === img ? "border-red-600" : "border-zinc-800"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#161616] flex items-center justify-center p-10 order-1 md:order-2 min-h-[400px]">
            <img src={mainImg} alt={product.title} className="max-w-full max-h-[500px] object-contain" />
          </div>

          {/* Info Side */}
          <div className="flex-1 space-y-6 order-3">
            <header>
              <h1 className="text-3xl font-bold">{product.brand} {product.title}</h1>
              <p className="text-zinc-400 mt-2">{product.info}</p>
            </header>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">₹{product.finalPrice.toLocaleString()}</span>
              <span className="text-lg text-zinc-600 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-green-500 text-sm">{discountPercentage}% OFF</span>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)} 
                className="flex-1 bg-red-600 hover:bg-red-700 py-3 font-bold uppercase text-sm"
              >
                Add to cart
              </button>
              <button
                onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product)}
                className="px-6 border border-zinc-700 hover:bg-zinc-800"
              >
                {isInWishlist ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-32">
          <h2 className="text-2xl font-bold mb-10 text-center uppercase">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/product-details/${item._id}`} key={item._id} className="group bg-[#111] p-6 border border-zinc-900 hover:border-red-600 transition-all">
                <img src={item.images[0]} alt={item.title} className="h-48 mx-auto object-contain group-hover:scale-105 transition-transform" />
                <h3 className="mt-4 font-bold text-center">{item.title}</h3>
                <p className="text-red-600 font-bold text-center">₹{item.finalPrice.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
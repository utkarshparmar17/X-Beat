import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import ProductAPI from "../api/ProductAPI";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";

const ProductDetails = () => {
  const { productId } = useParams(); // ✅ MongoDB ObjectId
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Specifications");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT BY OBJECT ID ================= */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        // 1️⃣ Fetch product by ObjectId
        const productData = await ProductAPI.getProductDetails(productId);
        if (!productData) return;

        setProduct(productData);
        setMainImg(productData.images?.[0]);

        // 2️⃣ Fetch related by category
        const related = await ProductAPI.getProducts({
          category: productData.category,
        });

        setRelatedProducts(
          related.filter((p) => p._id !== productData._id).slice(0, 3)
        );
      } catch (err) {
        console.error("Product details error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const isInWishlist = wishlist.some((i) => i._id === product._id);
  const savings = product.originalPrice - product.finalPrice;
  const discount = Math.round((savings / product.originalPrice) * 100);

  /* ================= MOCK REVIEWS ================= */
  const reviews = [
    { id: 1, name: "Atharva Kumar", date: "4 Aug 2022", rating: 5, comment: "Sound is awesome and as I expected, love it." },
    { id: 2, name: "Ritika Sen", date: "15 July 2022", rating: 5, comment: "Very good and awesome product" },
    { id: 3, name: "Bhavesh Joshi", date: "10 June 2022", rating: 4, comment: "Super amazing product !!!" },
    { id: 4, name: "Anandi Gupta", date: "6 May 2022", rating: 4, comment: "Great NC, sound is a bit flat" },
  ];

  return (
    <div className="bg-[#0e0e0e] text-white pt-28 pb-16 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">

        {/* ================= MAIN SECTION ================= */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT – THUMBNAILS */}
          <div className="hidden md:flex flex-col gap-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 p-2 bg-[#161616] border cursor-pointer ${
                  mainImg === img ? "border-red-600" : "border-zinc-800"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* CENTER – IMAGE */}
          <div className="flex-1 bg-[#161616] flex items-center justify-center min-h-[420px]">
            <img src={mainImg} alt={product.title} className="max-h-[480px] object-contain" />
          </div>

          {/* RIGHT – INFO */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {product.brand} {product.title}
            </h1>

            <p className="text-zinc-400">{product.info}</p>

            <div className="flex text-red-600">
              {[...Array(5)].map((_, i) => <AiFillStar key={i} />)}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">₹{product.finalPrice}</span>
              <span className="line-through text-zinc-600">₹{product.originalPrice}</span>
              <span className="text-green-500 text-sm">{discount}% OFF</span>
            </div>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="w-full bg-red-600 hover:bg-red-700 py-3 font-bold uppercase"
            >
              Add to Cart
            </button>

            <button
              onClick={() =>
                isInWishlist
                  ? dispatch(removeFromWishlist(product._id))
                  : dispatch(addToWishlist(product))
              }
              className="w-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-3 font-bold uppercase flex items-center justify-center gap-2"
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              Wishlist
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-24">

          {/* TAB BUTTONS */}
          <div className="flex justify-center gap-4 mb-10 overflow-x-auto">
            {["Specifications", "Overview", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-widest rounded ${
                  activeTab === tab
                    ? "bg-red-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="max-w-4xl mx-auto">

            {/* SPECIFICATIONS */}
            {activeTab === "Specifications" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                {[
                  ["Brand", product.brand],
                  ["Model", product.title],
                  ["Category", product.category],
                  ["Headphone Type", "In Ear"],
                  ["Connectivity", "Wireless"],
                  ["Microphone", "Yes"],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* OVERVIEW */}
            {activeTab === "Overview" && (
              <div className="space-y-5 text-zinc-400 text-sm">
                <h3 className="text-lg font-medium">
                  The <span className="text-red-600 font-bold">{product.brand} {product.title}</span> delivers fabulous sound quality
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Sound Tuned to Perfection</li>
                  <li>Comfortable to Wear</li>
                  <li>Long Hours Playback Time</li>
                </ul>
              </div>
            )}

            {/* REVIEWS */}
            {activeTab === "Reviews" && (
              <div className="space-y-8">
                {reviews.map((r) => (
                  <div key={r.id} className="flex gap-4">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                      <AiOutlineUser />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold">{r.name}</h4>
                        <div className="flex text-red-600 text-xs">
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar key={i} className={i < r.rating ? "text-red-600" : "text-zinc-800"} />
                          ))}
                        </div>
                        <span className="text-xs text-zinc-500">{r.date}</span>
                      </div>
                      <p className="text-zinc-400 text-sm mt-1">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-2xl font-bold mb-10 text-center uppercase">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product-details/${item._id}`}
                  className="bg-[#111] p-6 border border-zinc-900 hover:border-red-600 transition"
                >
                  <img src={item.images?.[0]} alt={item.title} className="h-48 mx-auto object-contain" />
                  <h3 className="mt-4 text-center font-bold">{item.title}</h3>
                  <p className="text-center text-red-600 font-bold mt-1">
                    ₹{item.finalPrice}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;

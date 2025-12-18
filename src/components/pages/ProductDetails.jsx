import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../data/productsData.js";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";
import { useProducts } from "../../context/ProductContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useProducts();
  
  // Find product based on URL ID or default to the first product for preview
  const product = productsData.find((p) => p.id === parseInt(productId)) || productsData[0];
  
  // State for gallery and tabs
  const [mainImg, setMainImg] = useState(product?.images?.[0]);
  const [activeTab, setActiveTab] = useState("Specifications");

  // Sync main image if product changes
  useEffect(() => {
    if (product) setMainImg(product.images[0]);
  }, [product]);

  if (!product) return <div className="text-white text-center pt-40">Product not found.</div>;

  // Logic for savings and related products
  const savings = product.originalPrice - product.finalPrice;
  const discountPercentage = Math.round((savings / product.originalPrice) * 100);
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Mock Review Data matching the provided image (image_cd5fc6.png)
  const reviews = [
    { id: 1, name: "Atharva Kumar", date: "4 Aug 2022", rating: 5, comment: "Sound is awesome and as I expected, love it." },
    { id: 2, name: "Ritika Sen", date: "15 July 2022", rating: 5, comment: "Very good and awesome product" },
    { id: 3, name: "Bhavesh Joshi", date: "10 June 2022", rating: 4, comment: "Super amazing product !!!" },
    { id: 4, name: "Anandi Gupta", date: "6 May 2022", rating: 4, comment: "Great NC, sound is a bit flat" },
  ];

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-28 pb-12 font-sans px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- SECTION 1: PRODUCT HERO --- */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* LEFT: THUMBNAIL STRIP */}
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {product.images.map((img, index) => (
              <div 
                key={index}
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 bg-[#161616] p-2 border-2 cursor-pointer transition-all ${
                  mainImg === img ? "border-red-600" : "border-zinc-800"
                }`}
              >
                <img src={img} alt={`thumb-${index}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* CENTER: MAIN PRODUCT IMAGE */}
          <div className="flex-1 bg-[#161616] flex items-center justify-center p-10 order-1 md:order-2 min-h-[400px]">
            <img src={mainImg} alt={product.title} className="max-w-full max-h-[500px] object-contain" />
          </div>

          {/* RIGHT: PRODUCT INFO & ACTIONS */}
          <div className="flex-1 space-y-6 order-3">
            <header>
              <h1 className="text-3xl font-bold mb-1">{product.brand} {product.title}</h1>
              <p className="text-zinc-400 text-sm">{product.info}</p>
              
              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-red-600">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar key={i} className={i < 5 ? "text-red-600" : "text-zinc-800"} />
                  ))}
                </div>
                <span className="text-zinc-500 text-xs border-l border-zinc-700 pl-2">1321 Ratings</span>
              </div>
            </header>

            <div className="h-[1px] bg-zinc-800 w-full" />

            {/* PRICING */}
            <section className="space-y-1">
              <div className="flex items-baseline gap-4 relative">
                <span className="text-3xl font-bold">₹{product.finalPrice.toLocaleString()}</span>
                <span className="text-lg text-zinc-600 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="absolute right-0 bg-green-600 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter self-center">
                  ✓ In Stock
                </span>
              </div>
              <p className="text-green-500 text-sm font-medium">
                You save: ₹{savings.toLocaleString()} ({discountPercentage}%)
              </p>
              <p className="text-zinc-500 text-[10px]">(Inclusive of all taxes)</p>
            </section>

            {/* OFFERS */}
            <section className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Offers and Discounts</h4>
              <div className="flex flex-wrap gap-3">
                <div className="border border-zinc-800 p-3 text-[10px] text-zinc-400 rounded hover:border-zinc-600 cursor-pointer">
                  No Cost EMI on Credit Card
                </div>
                <div className="border border-zinc-800 p-3 text-[10px] text-zinc-400 rounded hover:border-zinc-600 cursor-pointer">
                  Pay Later & Avail...
                </div>
              </div>
            </section>

            <button 
              onClick={() => addToCart(product)} 
              className="w-full md:w-48 bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-colors text-sm uppercase tracking-widest"
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* --- SECTION 2: TABS (SPECIFICATIONS/OVERVIEW/REVIEWS) --- */}
        <div className="mt-24">
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            {["Specifications", "Overview", "Reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-6 text-xs md:text-sm font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab ? "text-white bg-red-600" : "text-zinc-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto min-h-[350px]">
            {/* SPECIFICATIONS TAB */}
            {activeTab === "Specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 text-sm">
                {[
                  { label: "Brand", value: product.brand },
                  { label: "Model", value: product.title },
                  { label: "Generic Name", value: product.category },
                  { label: "Headphone Type", value: "In Ear" },
                  { label: "Connectivity", value: "Wireless" },
                  { label: "Microphone", value: "Yes" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-zinc-200 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* OVERVIEW TAB (Matching image_cd5f8f.png) */}
            {activeTab === "Overview" && (
              <div className="space-y-6 text-left">
                <h3 className="text-lg font-medium">
                  The <span className="text-red-600 font-bold">{product.brand} {product.title}</span> In-Ear Wireless {product.category} provides with fabulous sound quality
                </h3>
                <ul className="list-disc list-inside space-y-3 text-zinc-400 text-sm">
                  <li>Sound Tuned to Perfection</li>
                  <li>Comfortable to Wear</li>
                  <li>Long Hours Playback Time</li>
                </ul>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Buy the <span className="font-bold text-zinc-200">{product.brand} {product.title}</span> which offers you with fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these {product.category} giving you a truly awesome audio experience. It blends with exceptional sound quality and a range of smart features for an unrivalled listening experience.
                </p>
              </div>
            )}

            {/* REVIEWS TAB (Matching image_cd5fc6.png) */}
            {activeTab === "Reviews" && (
              <div className="space-y-10">
                {reviews.map((rev) => (
                  <div key={rev.id} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                      <AiOutlineUser className="text-2xl text-zinc-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-sm">{rev.name}</h4>
                        <div className="flex text-[10px] text-red-600">
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar key={i} className={i < rev.rating ? "text-red-600" : "text-zinc-900"} />
                          ))}
                        </div>
                        <span className="text-zinc-600 text-[10px] border-l border-zinc-800 pl-2">{rev.date}</span>
                      </div>
                      <p className="text-zinc-400 text-sm">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION 3: RELATED PRODUCTS --- */}
        <div className="mt-32">
          <h2 className="text-2xl font-bold text-center mb-12 uppercase tracking-tighter">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-[#111] border border-zinc-900 hover:border-red-600 transition-all group p-6 flex flex-col items-center">
                <div className="h-56 w-full flex items-center justify-center mb-6">
                  <img src={item.images[0]} alt={item.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="w-full">
                  <div className="flex text-red-600 text-[10px] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} className={i < item.rateCount ? "text-red-600" : "text-zinc-800"} />
                    ))}
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-tight">{item.brand} {item.title}</h3>
                  <p className="text-red-600 font-bold mt-2">₹{item.finalPrice.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
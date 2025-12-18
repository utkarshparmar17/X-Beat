import React, { useState } from 'react';
import { AiFillStar, AiOutlineInfoCircle, AiOutlineStar } from "react-icons/ai";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="mt-20 border-t border-zinc-900 pt-10">
      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-800 space-x-8 overflow-x-auto overflow-y-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? "text-red-600" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div className="py-10">
        {/* OVERVIEW PANEL */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 transition-opacity duration-500 ease-in">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">The {product.brand} Experience</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Elevate your audio with the {product.title}. Featuring {product.info}, 
                this product is designed for those who refuse to compromise on sound quality.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  Professional Grade Audio Drivers
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                  Sweat and Water Resistance
                </div>
              </div>
            </div>
            <div className="bg-zinc-900/40 p-8 rounded border border-zinc-800 hidden md:block">
               <h4 className="text-red-600 font-bold mb-2 uppercase text-xs tracking-tighter">Pro Tip</h4>
               <p className="text-gray-400 text-sm italic">"Pair this with high-bitrate audio files to truly hear the dynamic range of the {product.brand} drivers."</p>
            </div>
          </div>
        )}

        {/* SPECIFICATIONS PANEL */}
        {activeTab === "specifications" && (
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-12 transition-all duration-500">
            {[
              { label: "Brand", value: product.brand },
              { label: "Model", value: product.title },
              { label: "Category", value: product.category },
              { label: "Playback", value: "Up to 24 Hours" },
              { label: "Bluetooth", value: "v5.3" },
              { label: "Warranty", value: "1 Year" },
            ].map((spec, i) => (
              <div key={i} className="flex justify-between py-4 border-b border-zinc-900">
                <span className="text-gray-500 text-xs uppercase font-bold">{spec.label}</span>
                <span className="text-gray-200 text-sm font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS PANEL */}
        {activeTab === "reviews" && (
          <div className="space-y-8 transition-opacity duration-500">
            <div className="flex items-center gap-6 mb-10">
              <span className="text-6xl font-bold text-white">{product.rateCount}.0</span>
              <div>
                <div className="flex text-red-600 mb-1"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /></div>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{product.ratings} Ratings</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-6 bg-[#161616] border border-zinc-800 rounded">
                  <div className="flex gap-1 text-red-600 text-xs mb-3"><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></div>
                  <p className="text-gray-300 text-sm italic">"Best in class performance. The {product.category} fit perfectly and the sound is extremely well-balanced."</p>
                  <p className="text-zinc-600 text-[10px] mt-4 font-bold uppercase">— Verified Customer</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
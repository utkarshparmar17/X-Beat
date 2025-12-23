import React, { useState } from "react";
import { AiFillStar, AiOutlineUser } from "react-icons/ai";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("specifications");

  const tabs = ["specifications", "overview", "reviews"];

  return (
    <div className="mt-16 text-white px-3 sm:px-4 overflow-x-hidden">

      {/* ================= TABS ================= */}
      <div
        className="
          flex
          justify-start
          sm:justify-center
          gap-3
          overflow-x-auto
          no-scrollbar
          border-b border-zinc-800
          mb-8
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "text-zinc-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ===== SPECIFICATIONS ===== */}
        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            {[
              { label: "Brand", value: product.brand },
              { label: "Model", value: product.title },
              { label: "Generic Name", value: product.category },
              { label: "Headphone Type", value: "In Ear" },
              { label: "Connectivity", value: "Wireless" },
              { label: "Microphone", value: "Yes" },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:justify-between
                  border-b border-zinc-800
                  pb-3
                "
              >
                <span className="text-zinc-500 text-xs sm:text-sm">
                  {item.label}
                </span>
                <span className="font-semibold text-xs sm:text-sm">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ===== OVERVIEW ===== */}
        {activeTab === "overview" && (
          <div className="max-w-4xl space-y-4 text-xs sm:text-sm text-zinc-400">
            <p>
              The{" "}
              <span className="text-red-600 font-bold">
                {product.brand} {product.title}
              </span>{" "}
              provides fabulous sound quality with premium comfort.
            </p>
          </div>
        )}

        {/* ===== REVIEWS ===== */}
        {activeTab === "reviews" && (
          <div className="max-w-4xl space-y-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <AiOutlineUser className="text-zinc-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Verified User</span>
                    <div className="flex text-red-600 text-xs">
                      {[...Array(5)].map((_, j) => (
                        <AiFillStar key={j} />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Amazing sound quality. Totally worth it.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductTabs;

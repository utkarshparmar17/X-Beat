import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductAPI from "../api/ProductAPI";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await ProductAPI.getProducts({ tag: "featured-product" });
        setFeaturedProducts(data);
      } catch (err) {
        console.error("Failed to load featured products", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Loading Featured Data...
      </p>
    );
  }

  if (featuredProducts.length === 0) return null;

  return (
    <div className="bg-[#111] pt-10 pb-20 w-full overflow-hidden featured-swiper-container">
      <h2 className="text-3xl text-gray-400 text-center font-bold mb-10">
        Featured Products
      </h2>

      <div className="w-full">
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          slidesPerView={1.5}
          breakpoints={{
            1024: { slidesPerView: 3 },
          }}
          loop={featuredProducts.length > 3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="featured-swiper"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id} className="featured-slide group">
              <Link to={`/product-details/${product._id}`}>
                <div className="product-card flex flex-col items-center justify-center py-5 pb-14 transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                  <p className="text-sm md:text-lg font-semibold mb-4 text-white whitespace-nowrap">
                    {product.title}
                  </p>

                  <img
                    src={product.images?.[0]}
                    className="h-48 md:h-72 w-full object-contain mx-auto"
                    alt={product.title}
                  />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 mt-6">
                    <p className="text-white font-bold text-lg md:text-xl">
                      ₹{product.finalPrice.toLocaleString()}
                    </p>
                    <p className="text-gray-500 font-bold text-sm md:text-md line-through opacity-60">
                      ₹{product.originalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper pagination styling */}
      <style jsx="true">{`
        .featured-swiper-container .swiper-pagination {
          position: relative !important;
          margin-top: 30px;
        }
        .featured-swiper-container .swiper-pagination-bullet {
          background: #444;
          opacity: 1;
          width: 25px;
          height: 5px;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .featured-swiper-container .swiper-pagination-bullet-active {
          background: #ff0000;
          width: 45px;
        }
      `}</style>
    </div>
  );
}

export default FeaturedProducts;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { Link } from "react-router-dom";
import productsData from "../../data/productsData.js";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

function FeaturedProducts() {
  const featured = productsData.filter(p => p.tag === "featured-product");

  return (
    /* We add a specific class "featured-swiper-container" to target the dots in CSS */
    <div className="bg-[#111] pt-10 pb-20 w-full overflow-hidden featured-swiper-container">
      <h2 className="text-3xl text-gray-400 text-center font-bold mb-10 ">
        Featured Products
      </h2>
      
      <div className="w-full">
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.5}
          breakpoints={{ 1024: { slidesPerView: 3 } }}
          coverflowEffect={{ 
            rotate: 0, 
            stretch: 0, 
            depth: 250, 
            modifier: 1, 
            slideShadows: false 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: false 
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="featured-swiper"
        >
          {featured.map((product) => (
            <SwiperSlide key={product.id} className="featured-slide group">
              <Link to={`${product.path}${product.id}`}>
                {/* FIX 1: Added pb-14 to create a "safe zone" at the bottom of each slide 
                   so the dots have their own space below the price.
                */}
                <div className="product-card flex flex-col items-center justify-center py-5 pb-14 transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                  <p className="text-sm md:text-lg font-semibold mb-4 text-white whitespace-nowrap">
                    {product.title}
                  </p>
                  
                  <img 
                    src={product.images[0]} 
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

      {/* FIX 2: Custom Styles to push the swiper dots down. 
         You can move this to your index.css or keep it here in a <style> tag.
      */}
      <style jsx="true">{`
        .featured-swiper-container .swiper-pagination {
          position: relative !important;
          bottom: 0px !important;
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
          background: #ff0000; /* Matches your theme red */
          width: 45px;
        }
      `}</style>
    </div>
  );
}

export default FeaturedProducts;
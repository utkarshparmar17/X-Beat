import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductAPI from "../API/ProductAPI"; // ✅ adjust if needed

function HeroSection() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = heroSlides.length;

  // ✅ FETCH HERO PRODUCTS
  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        const data = await ProductAPI.getProducts();
        const filtered = data.filter(
          (product) => product.tag === "hero-product"
        );
        console.log("Hero products:", filtered);
        setHeroSlides(filtered);
      } catch (err) {
        console.error("Hero API error:", err);
      }
    };

    fetchHeroProducts();
  }, []);

  // ✅ SLIDE CONTROLS
  const goToPrevious = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (totalSlides > 0) {
      const timer = setInterval(goToNext, 5000);
      return () => clearInterval(timer);
    }
  }, [totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <div className="bg-[#111] text-white relative overflow-hidden w-full pt-16 h-[550px] sm:h-[650px] md:h-[600px] lg:h-[650px]">

      {/* LEFT ARROW */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 transition"
      >
        <IoIosArrowBack className="text-xl md:text-3xl text-white" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/5 backdrop-blur-md rounded-full hover:bg-white/20 transition"
      >
        <IoIosArrowForward className="text-xl md:text-3xl text-white" />
      </button>

      {/* SLIDER */}
      <div
        className="flex h-full"
        style={{
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${currentSlideIndex * (100 / totalSlides)}%)`,
          transition: "transform 800ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-full relative overflow-hidden px-4"
            style={{ width: `${100 / totalSlides}%` }}
          >
            {/* BACKGROUND BRAND */}
            <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none z-0">
              <span className="absolute text-[16vw] md:text-[12vw] font-black uppercase text-white/[0.07]">
                {slide.brand}
              </span>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full max-w-7xl mx-auto px-4 md:px-12 relative z-10">

              {/* IMAGE */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={slide.heroImage}
                  alt={slide.title}
                  className="max-h-[180px] sm:max-h-[280px] md:max-h-[400px] object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col items-center md:items-start md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
                <p className="text-[10px] md:text-sm text-red-600 font-bold uppercase tracking-[0.4em]">
                  {slide.title}
                </p>

                <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black italic uppercase leading-[0.95] tracking-tighter">
                  {slide.tagline}
                </h2>

                <div className="flex items-center gap-4">
                  <span className="text-xl md:text-5xl font-bold">
                    ₹{slide.finalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs md:text-xl text-zinc-600 line-through">
                    ₹{slide.originalPrice.toLocaleString()}
                  </span>
                </div>

                <Link
                  to={`/product-details/${slide._id}`}
                  className="font-bold text-white bg-red-600 rounded-sm hover:bg-red-700 uppercase tracking-widest md:text-sm transition-transform active:scale-95 px-4 py-2 mt-6"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurprentSlideIndex(index)}
            className={`h-[4px] md:h-[6px] rounded-full transition-all ${
              index === currentSlideIndex
                ? "w-10 md:w-14 bg-red-600"
                : "w-4 md:w-6 bg-zinc-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;

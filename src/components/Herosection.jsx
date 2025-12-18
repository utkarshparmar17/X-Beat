import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import productsData from "../data/productsData.js"; // Import central data

function HeroSection() {
  // Filter products from central data that are designated for the hero section
  const heroSlides = productsData.filter(product => product.tag === "hero-product");
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = heroSlides.length;

  const goToPrevious = () => {
    setCurrentSlideIndex((prevIndex) => 
      (prevIndex === 0) ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  useEffect(() => {
    if (totalSlides > 0) {
      const timer = setInterval(goToNext, 5000); 
      return () => clearInterval(timer); 
    }
  }, [totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <div className="bg-[#111] text-white relative overflow-hidden w-full h-[600px] md:h-[500px]"> 
      
      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
      >
        <IoIosArrowBack className="text-2xl text-white" />
      </button>

      <button 
        onClick={goToNext} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
      >
        <IoIosArrowForward className="text-2xl text-white" />
      </button>
      
      {/* SLIDES TRACK */}
      <div 
        className="flex h-full" 
        style={{
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${currentSlideIndex * (100 / totalSlides)}%)`,
          transition: 'transform 700ms ease-in-out',
        }}
      >
        {heroSlides.map((slide) => (
          <div 
            key={slide.id} 
            className="flex-shrink-0 w-full h-full relative"
            style={{ width: `${100 / totalSlides}%` }} 
          >
            {/* LARGE WATERMARK TEXT - Using Brand name as watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <span className="text-[12vw] font-black text-white/5 uppercase leading-none">
                    {slide.brand}
                </span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between h-full max-w-7xl mx-auto p-6 md:p-12 relative z-10">
              
              {/* Product Image - Using heroImage from data */}
              <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center items-center">
                <img 
                  src={slide.heroImage} 
                  alt={slide.title} 
                  className="max-h-64 md:max-h-96 object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Text and CTA - Mapping title, tagline, and prices */}
              <div className="order-2 md:order-1 flex flex-col space-y-4 md:w-1/2 text-left mt-6 md:mt-0">
                <p className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-widest">
                  {slide.title}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight max-w-lg">
                  {slide.tagline}
                </h2>
                <div className="text-2xl md:text-4xl font-bold flex items-center gap-3">
                  ₹{slide.finalPrice.toLocaleString()} 
                  <span className="text-base md:text-xl text-gray-500 line-through font-normal">
                    ₹{slide.originalPrice.toLocaleString()}
                  </span>
                </div>
                <Link 
                  to={`${slide.path}${slide.id}`} 
                  className="w-44 text-center bg-red-600 text-white py-3 px-6 rounded-md font-bold hover:bg-red-700 transition duration-300"
                >
                  Shop Now
                </Link>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicator Dots */}
      <div className="flex justify-center space-x-2 pb-6 absolute bottom-0 left-0 right-0 z-20">
        {heroSlides.map((_, index) => (
          <span 
            key={index} 
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-10 h-1 rounded-full cursor-pointer transition-all duration-300 
              ${index === currentSlideIndex ? 'bg-white' : 'bg-gray-600'}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
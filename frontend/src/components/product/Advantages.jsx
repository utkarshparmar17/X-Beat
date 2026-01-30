import React from "react";
import { FaTruck, FaShieldAlt, FaTag, FaCreditCard } from "react-icons/fa";

const advantagesData = [
  {
    id: 1,
    icon: <FaTruck />,
    title: "Express Delivery",
    description: "Ships in 24 Hours",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Brand Warranty",
    description: "100% Original",
  },
  {
    id: 3,
    icon: <FaTag />,
    title: "Exciting Deals",
    description: "On prepaid orders",
  },
  {
    id: 4,
    icon: <FaCreditCard />,
    title: "Secure Payments",
    description: "SSL Certificate",
  },
];

const Advantages = () => {
  return (
    /* pt-0 removes top padding, -mt-1 pulls the section up to seal any 1px gap */
    <section className="bg-[#111] pt-0 pb-16 px-2 md:px-10 -mt-10 border-none relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* mt-0 ensures the heading doesn't push the section down. 
            pt-10 or pt-16 provides internal spacing from the top border */}
        <h2 className="mt-0 pt-10 md:pt-16 text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white text-center mb-10 md:mb-16">
          Our Advantages
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 md:gap-4">
          {advantagesData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center md:flex-row md:items-center justify-center lg:justify-start gap-2 md:gap-4 px-1"
            >
              <div className="text-red-600 text-2xl md:text-4xl flex-shrink-0">
                {item.icon}
              </div>

              <div className="flex flex-col text-center md:text-left">
                <h3 className="text-white font-bold text-[10px] md:text-lg leading-tight uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-[8px] md:text-sm mt-0.5 md:mt-1 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
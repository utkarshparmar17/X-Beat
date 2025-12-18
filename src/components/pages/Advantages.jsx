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
    description: "100% Original products",
  },
  {
    id: 3,
    icon: <FaTag />,
    title: "Exciting Deals",
    description: "On all prepaid orders",
  },
  {
    id: 4,
    icon: <FaCreditCard />,
    title: "Secure Payments",
    description: "SSL / Secure certificate",
  },
];

const Advantages = () => {
  return (
    <section className="bg-[#111] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-300 text-center m-16 tracking-wide">
          Our Advantages
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {advantagesData.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {/* Icon Container */}
              <div className="text-red-600 text-4xl flex-shrink-0">
                {item.icon}
              </div>

              {/* Text Container */}
              <div className="flex flex-col text-left">
                <h3 className="text-white font-bold text-lg leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
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
import { IoStar } from "react-icons/io5";

const StarRating = ({ rating }) => (
  <div className="flex justify-start gap-0.5 mb-1 md:mb-2">
    {[...Array(5)].map((_, i) => (
      <IoStar
        key={i}
        className={`text-[6px] md:text-[10px] ${
          i < rating ? "text-[#e31e24]" : "text-gray-800"
        }`}
      />
    ))}
  </div>
);

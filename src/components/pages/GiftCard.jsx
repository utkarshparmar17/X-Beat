import { useState } from "react";
import { useProducts } from "../../context/ProductContext";

export default function GiftCard() {
  const [amount, setAmount] = useState(999);
  const { addToCart } = useProducts();

  const DISCOUNT_PERCENT = 30;

  const discountedPrice = Math.round(
    amount - (amount * DISCOUNT_PERCENT) / 100
  );

  const handleAddGiftCard = () => {
    addToCart({
      id: `gift-${amount}`,
      brand: "X-Beat",
      title: `Gift Card ₹${amount}`,
      type: "giftcard",
      images: ["/gift-card.png"], // fallback image
      originalPrice: amount,
      finalPrice: discountedPrice,
      discountPercent: DISCOUNT_PERCENT,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 md:px-10 pt-24 pb-16">
      
      {/* HERO */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          🎁 Gift Cards
        </h1>
        <p className="text-zinc-400 mt-3">
          The perfect gift. Anytime. Anywhere.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

        {/* LEFT */}
        <div className="space-y-8">

          <div>
            <h2 className="font-bold mb-3">Select Amount</h2>
            <div className="flex gap-3 flex-wrap">
              {[500, 999, 1999, 4999].map((price) => (
                <button
                  key={price}
                  onClick={() => setAmount(price)}
                  className={`px-5 py-2 rounded border 
                  ${amount === price
                    ? "bg-red-600 border-red-600"
                    : "border-zinc-700 hover:border-red-500"}`}
                >
                  ₹{price}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-bold">Recipient Details</h2>

            <input
              type="text"
              placeholder="Recipient Name"
              className="w-full bg-transparent border border-zinc-700 px-4 py-2 rounded outline-none focus:border-red-500"
            />

            <input
              type="email"
              placeholder="Recipient Email"
              className="w-full bg-transparent border border-zinc-700 px-4 py-2 rounded outline-none focus:border-red-500"
            />

            <textarea
              placeholder="Message (optional)"
              rows="4"
              className="w-full bg-transparent border border-zinc-700 px-4 py-2 rounded outline-none focus:border-red-500"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddGiftCard}
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-bold uppercase tracking-wider"
          >
            Add Gift Card – ₹{discountedPrice}
            <span className="block text-xs text-white/70">
              {DISCOUNT_PERCENT}% OFF (MRP ₹{amount})
            </span>
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-xl p-8 flex flex-col justify-between ">
          <div>
            <p className="text-zinc-400 text-sm">X-Beat Gift Card</p>
            <h2 className="text-4xl font-black mt-3">₹{discountedPrice}</h2>
            <p className="text-xs text-green-500 mt-1">
              Save ₹{amount - discountedPrice}
            </p>
          </div>

          <p className="text-zinc-500 text-sm mt-6">
            Redeemable on all products. No expiry. Instant delivery via email.
          </p>

          <div className="text-right text-zinc-600 text-xs mt-10">
            Powered by X-Beat
          </div>
        </div>
      </div>
    </div>
  );
}


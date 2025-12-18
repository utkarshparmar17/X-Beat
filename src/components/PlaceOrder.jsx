import React, { useState } from "react";
import { useProducts } from "../context/ProductContext"; 
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPayment, MdQrCodeScanner, MdOutlineAccountBalanceWallet } from "react-icons/md";
import QRCode from "react-qr-code"; 
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PlaceOrder = () => {
  const { cart, clearCart } = useProducts(); 
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); 
  const [formData, setFormData] = useState({ fullName: "", email: "", address: "" });

  // --- NEW UPI STATES ---
  const [upiIdInput, setUpiIdInput] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const myUpiId = "parmarutkarshparmar777@okhdfcbank";
  const upiPaymentLink = `upi://pay?pa=${myUpiId}&pn=X-Beat&am=${totalAmount}&cu=INR`;

  // --- UPI VERIFICATION LOGIC ---
  const handleUpiVerify = () => {
    if (!upiIdInput.includes("@")) {
      alert("Please enter a valid UPI ID (e.g. name@bank)");
      return;
    }
    setIsVerifying(true);
    // Simulate sending a request to the user's UPI app
    setTimeout(() => {
      setIsVerifying(false);
      setIsUpiVerified(true);
    }, 2000);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Extra safety check for UPI
    if (paymentMethod === "upi" && !isUpiVerified) {
      alert("Please verify your UPI ID before completing the purchase.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser ? auth.currentUser.uid : "guest",
        customerName: formData.fullName,
        email: formData.email,
        address: formData.address,
        items: cart,
        amount: totalAmount,
        paymentMethod: paymentMethod,
        upiHandle: paymentMethod === "upi" ? upiIdInput : null,
        status: paymentMethod === "cod" ? "Confirmed" : "Payment Pending",
        createdAt: serverTimestamp(),
      });

      setOrderPlaced(true);
      if (clearCart) clearCart();
    } catch (error) {
      alert("Error placing order. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-[#0e0e0e] min-h-screen text-white flex flex-col items-center justify-center px-4 pt-16">
        <IoMdCheckmarkCircle className="text-green-500 text-8xl mb-6 animate-bounce" />
        <h2 className="text-3xl font-black italic tracking-tighter uppercase">Order Successful!</h2>
        <p className="text-zinc-500 mb-8 mt-2 text-center text-sm uppercase tracking-widest">
           A payment request was sent to {upiIdInput || "your app"}
        </p>
        <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 transition-all uppercase text-xs tracking-widest">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-28 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-8 border-l-4 border-red-600 pl-4">Checkout</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Shipping Section */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">01. Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className="bg-[#161616] border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                <input type="email" placeholder="Email" required className="bg-[#161616] border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <input type="text" placeholder="Complete Address" required className="w-full bg-[#161616] border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition" onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </section>

            {/* Payment Selection Section */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">02. Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "cod", label: "Cash on Delivery", icon: <MdOutlineAccountBalanceWallet /> },
                  { id: "card", label: "Credit / Debit Card", icon: <MdPayment /> },
                  { id: "upi", label: "UPI (Paytm/GPay)", icon: <MdPayment /> },
                  { id: "qr", label: "Scan QR Code", icon: <MdQrCodeScanner /> }
                ].map((method) => (
                  <label key={method.id} className={`flex items-center gap-4 p-4 border transition cursor-pointer ${paymentMethod === method.id ? 'bg-red-600/10 border-red-600' : 'bg-[#161616] border-zinc-800'}`}>
                    <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod(method.id)} checked={paymentMethod === method.id} />
                    <span className="text-2xl text-red-600">{method.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Conditional Payment UI */}
              <div className="mt-6 p-6 bg-[#111] border border-zinc-800 rounded-sm">
                
                {/* UPI UI with "Next" Verification */}
                {paymentMethod === "upi" && (
                  <div className="animate-fadeIn space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter your UPI ID (e.g. user@bank)" 
                        value={upiIdInput}
                        onChange={(e) => {
                          setUpiIdInput(e.target.value);
                          setIsUpiVerified(false);
                        }}
                        disabled={isUpiVerified}
                        className={`w-full bg-black border p-4 text-sm outline-none transition ${isUpiVerified ? 'border-green-600 text-green-600' : 'border-zinc-800 focus:border-red-600'}`} 
                      />
                      {!isUpiVerified && (
                        <button 
                          type="button"
                          onClick={handleUpiVerify}
                          className="bg-zinc-800 px-6 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition"
                        >
                          {isVerifying ? "Verifying..." : "Verify"}
                        </button>
                      )}
                    </div>

                    {isVerifying && (
                      <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Sending request to your UPI App...</p>
                      </div>
                    )}

                    {isUpiVerified && (
                      <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-2">
                        <IoMdCheckmarkCircle /> Request Sent! Approve payment in your app.
                      </p>
                    )}
                  </div>
                )}

                {paymentMethod === "qr" && (
                  <div className="flex flex-col items-center animate-fadeIn py-4">
                    <div className="bg-white p-4 rounded-sm shadow-xl">
                      <QRCode value={upiPaymentLink} size={150} />
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-4 uppercase tracking-widest">Scan to pay: <span className="text-white font-bold">{myUpiId}</span></p>
                  </div>
                )}

                {paymentMethod === "card" && (
                   <p className="text-xs text-zinc-400 uppercase tracking-widest text-center py-4 italic">Credit/Debit Card payment portal offline for maintenance</p>
                )}

                {paymentMethod === "cod" && (
                  <p className="text-xs text-zinc-400 uppercase tracking-widest text-center py-4 italic">Pay with cash upon delivery</p>
                )}
              </div>
            </section>

            {/* Dynamic Button State */}
            <button 
              type="submit" 
              disabled={paymentMethod === 'upi' && !isUpiVerified}
              className={`w-full font-bold py-5 transition-all uppercase text-xs tracking-[0.2em] shadow-xl mt-8 
                ${(paymentMethod === 'upi' && !isUpiVerified) 
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/10'}`}
            >
              {paymentMethod === 'upi' && !isUpiVerified 
                ? "Verify UPI to Proceed" 
                : `Complete Purchase (₹${totalAmount.toLocaleString()})`}
            </button>
          </form>
        </div>

        {/* Sticky Summary */}
        <div className="lg:col-span-4">
          <div className="bg-[#161616] border border-zinc-900 p-8 sticky top-28 shadow-2xl">
            <h3 className="text-xs font-bold mb-8 border-b border-zinc-800 pb-4 uppercase tracking-widest text-zinc-500">Your Order</h3>
            <div className="space-y-5 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-[11px] uppercase tracking-wider font-medium">
                  <span className="text-zinc-500">{item.title} (x{item.quantity})</span>
                  <span>₹{(item.finalPrice * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-6">
              <div className="flex justify-between text-2xl font-black italic tracking-tighter">
                <span className="uppercase">Grand Total</span>
                <span className="text-red-600">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import QRCode from "react-qr-code";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

const PlaceOrder = () => {
  const { cart, clearCart } = useProducts();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const myUpiId = "parmarutkarshparmar777@okhdfcbank";
  const upiLink = `upi://pay?pa=${myUpiId}&pn=X-Beat&am=${totalAmount}&cu=INR`;

  const verifyUpi = () => {
    if (!upiId.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setUpiVerified(true);
    }, 2000);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod === "upi" && !upiVerified) {
      alert("Verify UPI first");
      return;
    }

    // ✅ CONSOLE OUTPUT (PRODUCTS + ADDRESS)
    console.log("ORDER PLACED");
    console.log("PRODUCT DETAILS:", cart);
    console.log("CUSTOMER ADDRESS:", formData);

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser ? auth.currentUser.uid : "guest",
        items: cart,
        amount: totalAmount,
        paymentMethod,
        status: paymentMethod === "cod" ? "Confirmed" : "Payment Pending",
        upiHandle: paymentMethod === "upi" ? upiId : null,
        address: { ...formData },
        createdAt: serverTimestamp(),
      });

      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      alert("Order failed");
    }
  };

  // ✅ SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <IoMdCheckmarkCircle className="text-green-500 text-7xl mb-4" />
        <h2 className="text-2xl font-bold">Order Placed Successfully</h2>
        <Link
          to="/"
          className="mt-6 bg-red-600 hover:bg-red-700 px-8 py-3 text-sm font-bold uppercase"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-24 px-4 pb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ================= LEFT SECTION ================= */}
        <form
          onSubmit={handlePlaceOrder}
          className="lg:col-span-7 space-y-5"
        >
          <h2 className="text-xl font-bold uppercase tracking-widest">
            Shipping Address
          </h2>

          <input
            className="w-full bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />

          <input
            className="w-full bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="w-full bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
            placeholder="Phone Number"
            required
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <input
            className="w-full bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
            placeholder="House / Street / Area"
            required
            onChange={(e) =>
              setFormData({ ...formData, addressLine: e.target.value })
            }
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              className="bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
              placeholder="City"
              required
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <input
              className="bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
              placeholder="State"
              required
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
            <input
              className="bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
              placeholder="Pincode"
              required
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
            />
          </div>

          <h2 className="text-xl font-bold uppercase tracking-widest pt-4">
            Payment Method
          </h2>

          <select
            className="w-full bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="qr">QR Code</option>
          </select>

          {paymentMethod === "upi" && (
            <div className="flex gap-2">
              <input
                className="flex-1 bg-[#161616] border border-zinc-800 p-3 text-sm outline-none"
                placeholder="Enter UPI ID"
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setUpiVerified(false);
                }}
              />
              <button
                type="button"
                onClick={verifyUpi}
                className="bg-zinc-800 px-5 text-sm font-bold uppercase"
              >
                {verifying ? "Verifying..." : "Verify"}
              </button>
            </div>
          )}

          {paymentMethod === "qr" && (
            <div className="bg-white p-4 inline-block">
              <QRCode value={upiLink} size={150} />
            </div>
          )}

          <button
            type="submit"
            disabled={paymentMethod === "upi" && !upiVerified}
            className="w-full bg-red-600 hover:bg-red-700 py-4 font-bold uppercase tracking-widest"
          >
            Place Order ₹{totalAmount}
          </button>
        </form>

        {/* ================= RIGHT SECTION ================= */}
        <div className="lg:col-span-5 bg-[#161616] border border-zinc-800 p-6 sticky top-24 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-6">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-zinc-500 text-sm">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-zinc-800 pb-4"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 bg-white p-2 object-contain"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      {item.brand} {item.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-red-500">
                    ₹{item.finalPrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between text-lg font-black mt-6">
            <span>Total</span>
            <span className="text-red-500">₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

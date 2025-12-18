import React from "react";
import { useProducts } from "../../context/ProductContext"; // Fixed path
import { Link } from "react-router-dom";
import { AiOutlineLogout, AiOutlineShopping } from "react-icons/ai";

function Profile() {
  const { cart } = useProducts(); // Matches your Context variable name

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white pt-24 pb-12 px-4 md:px-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-8 mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">User Profile</h1>
            <p className="text-zinc-500 text-sm">Manage your account settings and track your orders.</p>
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 hover:bg-red-600 border border-zinc-800 px-6 py-2 rounded-sm transition-all text-xs uppercase font-bold tracking-widest">
            <AiOutlineLogout size={18} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1 bg-[#161616] border border-zinc-800 p-8 rounded-sm h-fit">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-3xl font-black mb-6 mx-auto shadow-lg shadow-red-900/20">
              JD
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-zinc-500 text-sm">johndoe@example.com</p>
            </div>
            <button className="w-full mt-8 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-sm text-xs uppercase font-bold tracking-widest transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Account Overview Sections */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#161616] border border-zinc-800 p-6 rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Recent Orders</h3>
                <Link to="/orders" className="text-red-600 text-xs font-bold hover:underline">View All</Link>
              </div>
              <div className="text-center py-10 border border-dashed border-zinc-800 rounded-sm">
                <AiOutlineShopping className="text-4xl text-zinc-800 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm italic">No recent orders found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
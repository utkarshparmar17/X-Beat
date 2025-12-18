import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Signup logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-[#161616] p-8 rounded-sm border border-zinc-800 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter mb-2 italic">X-BEAT</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Join X-Beat</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-bold">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-sm outline-none focus:border-red-600 transition-colors text-sm"
              placeholder="John Doe"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-bold">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-sm outline-none focus:border-red-600 transition-colors text-sm"
              placeholder="email@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-bold">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-sm outline-none focus:border-red-600 transition-colors text-sm"
              placeholder="Create Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-sm transition-all uppercase tracking-widest text-xs mt-6"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account? <Link to="/login" className="text-red-600 font-bold hover:underline ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
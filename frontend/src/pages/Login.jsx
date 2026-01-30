import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Authentication logic here
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-[#161616] p-8 rounded-sm border border-zinc-800 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter mb-2 italic">X-BEAT</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Welcome Back</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-bold">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-sm outline-none focus:border-red-600 transition-colors text-sm"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-2 font-bold">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-sm outline-none focus:border-red-600 transition-colors text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-sm transition-all uppercase tracking-widest text-xs shadow-lg shadow-red-900/20 mt-4"
          >
            Login
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            New to X-Beat? <Link to="/signup" className="text-red-600 font-bold hover:underline ml-1">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set initial state based on the URL path (/login or /signup)
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');

  // Update state if the URL changes while the component is open
  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0e0e0e]/95 fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm font-sans">
      <div className="max-w-md w-full bg-[#161616] p-8 md:p-10 border border-zinc-800 rounded-sm relative shadow-2xl">
        <button 
          onClick={() => navigate("/")} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition"
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-white">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <p className="text-zinc-500 text-sm mb-8">
          {isLogin ? "New to X-Beat?" : "Already have an account?"} 
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              navigate(isLogin ? '/signup' : '/login'); // Sync URL with toggle
            }} 
            className="text-red-600 font-bold ml-1 hover:underline"
          >
            {isLogin ? "Create an account" : "Login here"}
          </button>
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-[#161616] border border-zinc-700 p-4 rounded-sm text-white outline-none focus:border-red-600 transition text-sm" 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-[#161616] border border-zinc-700 p-4 rounded-sm text-white outline-none focus:border-red-600 transition text-sm" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-[#161616] border border-zinc-700 p-4 rounded-sm text-white outline-none focus:border-red-600 transition text-sm" 
          />

          <button className="w-full bg-red-600 py-4 font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition mt-4 shadow-lg shadow-red-900/20">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
          <span className="relative bg-[#161616] px-4 text-xs text-zinc-500 uppercase tracking-widest">or login with</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="bg-[#3b5998] py-3 rounded-sm text-white text-[10px] font-bold uppercase hover:opacity-90 transition">Facebook</button>
          <button className="bg-[#ea4335] py-3 rounded-sm text-white text-[10px] font-bold uppercase hover:opacity-90 transition">Google</button>
          <button className="bg-[#1da1f2] py-3 rounded-sm text-white text-[10px] font-bold uppercase hover:opacity-90 transition">Twitter</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
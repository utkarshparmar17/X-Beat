import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0e0e0e]">
      <div className="relative mb-12">
        {/* Pulsing Brand Logo */}
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white animate-pulse relative z-10">
          X-BEAT<span className="text-red-600">.</span>
        </h1>
        {/* Glow effect behind text */}
        <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full"></div>
      </div>

      {/* Music Frequency Visualizer */}
      <div className="flex items-end gap-1.5 h-16">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 md:w-2 bg-red-600 rounded-full animate-music-bar"
            style={{
              animationDelay: `${i * 0.1}s`,
              height: '20%' // Initial height
            }}
          ></div>
        ))}
      </div>

      <p className="mt-8 text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.5em] font-black animate-pulse">
        Sensing the Rhythm
      </p>

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
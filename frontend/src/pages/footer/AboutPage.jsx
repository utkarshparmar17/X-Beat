import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pt-32 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-6 text-red-600">X-Beat</h1>
        <p className="text-xl text-zinc-300 mb-8">Redefining Sound for the Next Generation.</p>
        <p className="text-zinc-500 leading-relaxed max-w-2xl mx-auto">
          Founded in 2025, X-Beat was born out of a passion for high-fidelity audio and modern design. 
          We believe everyone deserves premium sound without the premium price tag.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
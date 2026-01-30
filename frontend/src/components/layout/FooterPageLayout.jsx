import React from 'react';

const FooterPageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pt-28 pb-16 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase border-b border-zinc-800 pb-6 mb-10 text-red-600">
          {title}
        </h1>
        <div className="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FooterPageLayout;

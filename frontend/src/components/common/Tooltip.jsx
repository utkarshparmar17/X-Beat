import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className="absolute top-full mt-2 w-max px-3 py-1 text-xs font-bold text-white bg-[#111] border border-zinc-800 rounded shadow-xl opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 uppercase tracking-wider">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

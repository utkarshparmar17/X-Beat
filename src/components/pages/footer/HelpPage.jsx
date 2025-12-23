import React from 'react';

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white pt-32 px-6 md:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase border-b border-zinc-800 pb-6 mb-10">Help Center</h1>
        <div className="space-y-8 text-zinc-400">
          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Track Your Order</h3>
            <p>Enter your order ID in the profile section to see live status updates.</p>
          </section>
          <section>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Contact Support</h3>
            <p>Email: support@xbeat.com <br /> Hours: Mon-Fri, 9am - 6pm</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
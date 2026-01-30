import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const Affiliates = () => {
  return (
    <FooterPageLayout title="Affiliate Program">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">Earn Money by Referring X-Beat</h2>
        <p className="max-w-2xl mx-auto">
          Join the X-Beat Affiliate Program and earn up to 10% commission on every sale made through your unique referral link.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-[#111] p-8 border border-zinc-800 rounded">
          <h3 className="text-red-500 text-4xl font-black mb-2">1.</h3>
          <h4 className="text-white font-bold mb-2">Sign Up</h4>
          <p className="text-sm">Create your affiliate account in minutes.</p>
        </div>
        <div className="bg-[#111] p-8 border border-zinc-800 rounded">
          <h3 className="text-red-500 text-4xl font-black mb-2">2.</h3>
          <h4 className="text-white font-bold mb-2">Share</h4>
          <p className="text-sm">Promote X-Beat products on your social media or blog.</p>
        </div>
        <div className="bg-[#111] p-8 border border-zinc-800 rounded">
          <h3 className="text-red-500 text-4xl font-black mb-2">3.</h3>
          <h4 className="text-white font-bold mb-2">Earn</h4>
          <p className="text-sm">Get paid for every successful referral sale.</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded uppercase tracking-widest transition-colors">
            Become an Affiliate
        </button>
      </div>
    </FooterPageLayout>
  );
};

export default Affiliates;

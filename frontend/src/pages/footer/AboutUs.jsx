import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const AboutUs = () => {
  return (
    <FooterPageLayout title="About Us">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-white">Our Story</h2>
          <p className="mb-4">
            Founded in 2025, X-Beat was born out of a passion for high-fidelity audio and modern design. We believe everyone deserves premium sound without the premium price tag.
          </p>
          <p>
            Our mission is to deliver innovative audio products that blend style, comfort, and exceptional sound quality. From deep bass to crystal clear highs, X-Beat is engineered for the audiophile in you.
          </p>
        </div>
        <div className="flex-1 bg-[#161616] p-4 flex items-center justify-center h-64 border border-zinc-800">
           {/* Placeholder for About Us Image */}
           <span className="text-zinc-600 font-bold uppercase tracking-widest">[ About Image ]</span>
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default AboutUs;

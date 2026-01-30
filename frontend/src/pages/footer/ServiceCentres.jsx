import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const ServiceCentres = () => {
  return (
    <FooterPageLayout title="Service Centres">
      <p className="mb-8">Find the nearest X-Beat authorized service centre for repairs and support.</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { city: "Mumbai", address: "Shop 12, Cyber Mall, Andheri West" },
          { city: "Delhi", address: "G-45, Tech Plaza, Nehru Place" },
          { city: "Bangalore", address: "1st Floor, Indira Nagar 100ft Road" },
          { city: "Chennai", address: "No. 22, Express Avenue, Royapettah" },
          { city: "Hyderabad", address: "L-3, Hitech City Main Road" },
          { city: "Pune", address: "Shop 7, Phoenix Market City, Viman Nagar" },
        ].map((center, i) => (
          <div key={i} className="bg-[#111] p-6 rounded border border-zinc-800 hover:border-red-600 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">{center.city}</h3>
            <p className="text-zinc-400 text-sm">{center.address}</p>
            <p className="text-zinc-500 text-xs mt-3">+91 1800-123-4567</p>
          </div>
        ))}
      </div>
    </FooterPageLayout>
  );
};

export default ServiceCentres;

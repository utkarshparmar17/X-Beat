import React, { useState } from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    alert(`Tracking functionality for Order ID: ${orderId} is coming soon!`);
  };

  return (
    <FooterPageLayout title="Track Your Order">
      <p className="mb-8">Enter your Order ID below to get the latest update on your shipment.</p>
      
      <form onSubmit={handleTrack} className="max-w-md space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Order ID</label>
          <input 
            type="text" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. XB-123456"
            className="w-full bg-[#111] border border-zinc-700 p-3 rounded text-white focus:outline-none focus:border-red-600"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded uppercase tracking-widest transition-colors"
        >
          Track Status
        </button>
      </form>
    </FooterPageLayout>
  );
};

export default TrackOrder;

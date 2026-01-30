import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const ReturnOrder = () => {
  return (
    <FooterPageLayout title="Return Order">
      <p>
        We want you to love your X-Beat product. If you are not satisfied, you can return it within 7 days of delivery.
      </p>
      
      <h3 className="text-white font-bold text-xl mt-8 mb-4">How to Initiate a Return</h3>
      <ol className="list-decimal list-inside space-y-3">
        <li>Log in to your account and go to "Order History".</li>
        <li>Select the order containing the item you wish to return.</li>
        <li>Click on "Return Item" and select the reason for return.</li>
        <li>Our courier partner will pick up the product within 2-3 business days.</li>
      </ol>

      <div className="bg-[#111] p-6 border border-zinc-800 rounded mt-8">
        <h4 className="text-white font-bold mb-2">Important Note</h4>
        <p className="text-sm">
          Please ensure the product is unused, and all original tags, manuals, and packaging are intact. Returns regarding damage/missing accessories must be reported within 24 hours of delivery.
        </p>
      </div>
    </FooterPageLayout>
  );
};

export default ReturnOrder;

import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const CancelOrder = () => {
  return (
    <FooterPageLayout title="Cancel Order">
      <p>
        To cancel an order, please go to your <a href="/profile" className="text-red-500 hover:underline">Profile &gt; Orders</a> section.
      </p>
      <p>
        Orders can only be cancelled before they have been shipped. Once shipped, you will need to initiate a return request after delivery.
      </p>
      <ul className="list-disc list-inside space-y-2 mt-4">
        <li>Refunds for prepaid orders will be processed within 5-7 business days.</li>
        <li>If you used a discount coupon, it might not be reactivated for future use.</li>
      </ul>
    </FooterPageLayout>
  );
};

export default CancelOrder;

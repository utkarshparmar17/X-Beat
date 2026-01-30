import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const ReturnPolicy = () => {
  return (
    <FooterPageLayout title="Return Policy">
      <p>
        At X-Beat, we strive to give you the very best shopping experience possible. However, considering that opened or damaged products cannot be reused, we cannot accept exchange or return of opened or used products once sold or delivered.
      </p>
      
      <p>
        X-Beat is not responsible for any damage caused after delivery.
      </p>

      <h3 className="text-white font-bold text-xl mt-6 mb-4">Dead on Arrival or Manufacturing Defects</h3>
      <p>
        In case of any manufacturing defect or if the product is dead on arrival, please report the issue within 24 hours of delivery. We will replace the product after verification.
      </p>
    </FooterPageLayout>
  );
};

export default ReturnPolicy;

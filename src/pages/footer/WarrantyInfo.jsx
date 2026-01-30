import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const WarrantyInfo = () => {
  return (
    <FooterPageLayout title="Warranty Information">
      <p>
        All X-Beat products come with a standard <strong>1-Year Manufacturer Warranty</strong> from the date of purchase.
      </p>

      <h3 className="text-white font-bold text-xl mt-8 mb-4">What is Covered?</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Manufacturing defects in materials and workmanship.</li>
        <li>Malfunctioning of internal components (battery, speakers, mic).</li>
      </ul>

      <h3 className="text-white font-bold text-xl mt-8 mb-4">What is Not Covered?</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Physical damage, water damage, or wear and tear.</li>
        <li>Unauthorized repairs or modifications.</li>
        <li>Accessories like charging cables or ear tips (unless defective out of box).</li>
      </ul>

      <p className="mt-8">
        To claim warranty, please email us at <span className="text-red-500">support@xbeat.com</span> with your invoice and photos of the issue.
      </p>
    </FooterPageLayout>
  );
};

export default WarrantyInfo;

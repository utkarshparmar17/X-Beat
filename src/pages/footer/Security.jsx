import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const Security = () => {
  return (
    <FooterPageLayout title="Security">
      <p>
        Your security is our top priority. We use industry-standard encryption technologies to keep your personal information safe.
      </p>
      <h3 className="text-white font-bold text-xl mt-6 mb-4">Secure Payments</h3>
      <p>
        All payments made on X-Beat are processed through secure gateways. We do not store your credit card or banking information on our servers.
      </p>
      <h3 className="text-white font-bold text-xl mt-6 mb-4">Data Protection</h3>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information when you place an order or access your personal information.
      </p>
    </FooterPageLayout>
  );
};

export default Security;

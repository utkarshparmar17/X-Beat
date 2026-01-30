import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const PrivacyPolicy = () => {
  return (
    <FooterPageLayout title="Privacy Policy">
      <p>Last Updated: October 2025</p>
      <p>
        X-Beat respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      <h3 className="text-white font-bold text-xl mt-6 mb-4">Collection of Information</h3>
      <p>
        We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data such as name, address, email address, and payment information.
      </p>

      <h3 className="text-white font-bold text-xl mt-6 mb-4">Use of Your Information</h3>
      <p>
        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We use the information to fulfill and manage purchases, orders, payments, and other transactions related to the Site.
      </p>
    </FooterPageLayout>
  );
};

export default PrivacyPolicy;

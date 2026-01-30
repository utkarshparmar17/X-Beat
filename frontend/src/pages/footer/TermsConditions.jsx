import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const TermsConditions = () => {
  return (
    <FooterPageLayout title="Terms & Conditions">
      <p>
        Welcome to X-Beat. By accessing our website, you agree to be bound by these terms and conditions.
      </p>

      <h3 className="text-white font-bold text-xl mt-6 mb-4">Intellectual Property</h3>
      <p>
        The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary laws.
      </p>

      <h3 className="text-white font-bold text-xl mt-6 mb-4">Limitation of Liability</h3>
      <p>
        In no event will X-Beat be liable for any incidental, consequential, or indirect damages to your computer hardware, data, information, or business arising out of the use of the website.
      </p>
    </FooterPageLayout>
  );
};

export default TermsConditions;

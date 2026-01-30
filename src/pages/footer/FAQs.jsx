import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const FAQs = () => {
  return (
    <FooterPageLayout title="Frequently Asked Questions">
      <div className="space-y-8">
        {[
          { q: "How do I track my order?", a: "You can track your order by visiting the 'Track Order' section in the footer or logging into your account." },
          { q: "What is the return policy?", a: "We offer a 7-day return policy for all products. Items must be unused and in original packaging." },
          { q: "Do you ship internationally?", a: "Currently, we only ship within India. International shipping will be available soon." },
          { q: "How can I contact support?", a: "You can email us at support@xbeat.com or call our toll-free number from 10 AM to 7 PM." },
        ].map((item, index) => (
          <div key={index} className="border-b border-zinc-800 pb-4">
            <h3 className="text-white font-bold text-lg mb-2">{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </FooterPageLayout>
  );
};

export default FAQs;

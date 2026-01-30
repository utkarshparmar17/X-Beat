import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <FooterPageLayout title="Contact Us">
      <div className="grid md:grid-cols-2 gap-12">
        
        <div className="space-y-8">
          <p>We'd love to hear from you! Whether you have a question about features, pricing, or need anything else, our team is ready to answer all your questions.</p>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white"><FaPhoneAlt /></div>
            <div>
              <h3 className="text-white font-bold">Phone</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white"><FaEnvelope /></div>
            <div>
              <h3 className="text-white font-bold">Email</h3>
              <p>support@xbeat.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white"><FaMapMarkerAlt /></div>
            <div>
              <h3 className="text-white font-bold">Headquarters</h3>
              <p>123 Audio Street, Tech Park, Bangalore - 560001</p>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full bg-[#111] border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-red-600" />
          <input type="email" placeholder="Your Email" className="w-full bg-[#111] border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-red-600" />
          <textarea rows="4" placeholder="Message" className="w-full bg-[#111] border border-zinc-800 p-3 rounded text-white focus:outline-none focus:border-red-600"></textarea>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded uppercase tracking-widest w-full transition-colors">Send Message</button>
        </form>

      </div>
    </FooterPageLayout>
  );
};

export default ContactUs;

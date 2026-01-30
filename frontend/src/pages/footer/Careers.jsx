import React from 'react';
import FooterPageLayout from '../../components/layout/FooterPageLayout';

const Careers = () => {
  return (
    <FooterPageLayout title="Careers at X-Beat">
      <p className="mb-8">Join the revolution. We are looking for passionate individuals who love audio and technology.</p>
      
      <div className="space-y-6">
        {[
          { role: "Product Designer", type: "Full Time", location: "Bangalore" },
          { role: "Frontend Developer (React)", type: "Full Time", location: "Remote" },
          { role: "Audio Engineer", type: "Full Time", location: "Mumbai" },
          { role: "Marketing Specialist", type: "Internship", location: "Delhi" },
        ].map((job, i) => (
            <div key={i} className="flex flex-col md:flex-row justify-between items-center bg-[#111] p-6 border border-zinc-800 rounded">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h3 className="text-lg font-bold text-white">{job.role}</h3>
                    <p className="text-sm text-zinc-500">{job.type} • {job.location}</p>
                </div>
                <button className="border border-white hover:bg-white hover:text-black px-6 py-2 rounded uppercase text-xs font-bold transition-all">
                    Apply Now
                </button>
            </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm">
        Don't see a role? Email your resume to <span className="text-red-500">careers@xbeat.com</span>
      </p>
    </FooterPageLayout>
  );
};

export default Careers;

import React from 'react';
import { Contact } from '../components/Contact';
import { ADDRESS } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in">
      <div className="py-24 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Let's Talk</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or just want to chat about possibilities? We're here.
          </p>
        </div>
      </div>
      
      <div className="bg-slate-950">
        <Contact />
      </div>

      {/* Map Section */}
      <section className="h-[400px] md:h-[500px] w-full bg-slate-200 dark:bg-slate-800 relative z-0">
        <iframe 
          width="100%" 
          height="100%" 
          id="gmap_canvas" 
          src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0}
          title="OITS Dhaka Office Location"
          className="filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
          loading="lazy"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-y border-slate-900/10 dark:border-white/10"></div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
           <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Our Process for Inquiries</h2>
              <div className="space-y-8 text-left">
                {[
                  { step: "1. Submission", text: "Fill out the form with your project details and goals." },
                  { step: "2. Consultation", text: "We schedule a 30-min discovery call to understand your needs." },
                  { step: "3. Strategy", text: "Our team drafts a technical proposal and roadmap." },
                  { step: "4. Kick-off", text: "Legal formalization and project start." }
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                     <div className="font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{s.step}</div>
                     <div className="text-slate-600 dark:text-slate-400">{s.text}</div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
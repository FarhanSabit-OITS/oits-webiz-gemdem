
import React from 'react';
import { Contact } from '../components/Contact';

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

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
           <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">Our Process for Inquiries</h2>
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

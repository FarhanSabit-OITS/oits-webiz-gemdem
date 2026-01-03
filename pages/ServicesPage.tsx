
import React from 'react';
import { Services } from '../components/Services';
import { Process } from '../components/Process';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in">
      <div className="py-24 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Our Services</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We offer end-to-end software development services, from initial concept to deployment and beyond.
          </p>
        </div>
      </div>
      
      <Services />
      
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Partner with OITS Dhaka?</h2>
                <div className="space-y-4">
                  {[
                    "Strategic Product Engineering",
                    "Agile & Transparent Workflow",
                    "Security-First Architecture",
                    "Post-Launch Growth Support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                   alt="Team working together" 
                   loading="lazy"
                   className="w-full h-full object-cover"
                 />
              </div>
           </div>
        </div>
      </section>

      <Process />
    </div>
  );
};

export default ServicesPage;


import React from 'react';
import { About } from '../components/About';

const LOGOS = [
  { name: 'TechFlow', url: 'https://cdn.worldvectorlogo.com/logos/techflow-1.svg' },
  { name: 'CloudScale', url: 'https://cdn.worldvectorlogo.com/logos/cloudscale.svg' },
  { name: 'DevOps', url: 'https://cdn.worldvectorlogo.com/logos/devops.svg' },
  { name: 'Innovate', url: 'https://cdn.worldvectorlogo.com/logos/innovate-3.svg' },
  { name: 'GlobalLogistics', url: 'https://cdn.worldvectorlogo.com/logos/global-1.svg' },
  { name: 'Fintech', url: 'https://cdn.worldvectorlogo.com/logos/fintech-2.svg' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in">
      {/* Header */}
      <div className="py-24 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Our Story</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A collective of passionate engineers and creative problem solvers based in Dhaka.
          </p>
        </div>
      </div>

      {/* Trusted By Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Trusted By Global Leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {LOGOS.map((logo) => (
              <div key={logo.name} className="flex justify-center group">
                 <div className="h-8 md:h-12 w-full flex items-center justify-center font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                   {/* Fallback to text if svg fails, real logos would be img tags */}
                   <span className="text-xl tracking-tighter">{logo.name}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />
      
      {/* Culture Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Driven by our culture of excellence.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { title: "Innovation", desc: "Always pushing the boundaries of what's possible." },
                   { title: "Integrity", desc: "Honest and transparent in every line of code." },
                   { title: "Impact", desc: "Creating solutions that matter to the real world." }
                 ].map((val) => (
                   <div key={val.title} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <h4 className="text-xl font-bold mb-3">{val.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{val.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

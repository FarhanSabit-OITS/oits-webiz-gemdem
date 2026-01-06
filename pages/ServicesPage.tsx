import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="pt-20 animate-fade-in">
      <div className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-6 text-sm">Our Capabilities</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white leading-tight">Engineering <br/> for Scale.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
            High-performance solutions tailored to the needs of modern enterprises and fast-growing startups.
          </p>
        </div>
      </div>
      
      <Services />
      
      <section className="py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">Why top innovators <br/> choose OITS Dhaka.</h2>
                <div className="space-y-6">
                  {[
                    { title: "Strategic Product Engineering", desc: "We don't just build features; we build products that align with your long-term business goals." },
                    { title: "Agile & Transparent Workflow", desc: "Real-time communication and bi-weekly sprints ensure you're always in control of the progress." },
                    { title: "Security-First Architecture", desc: "Every line of code is written with security best practices to protect your data and reputation." },
                    { title: "Post-Launch Growth Support", desc: "Our partnership doesn't end at deployment; we help you scale based on real user feedback." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                 <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-transform opacity-10" />
                 <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                      alt="Team working together" 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Process />

      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Need a specialized technical consultation?</h3>
           <Link to="/contact">
             <Button size="lg" className="rounded-full shadow-xl">Contact an Expert</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
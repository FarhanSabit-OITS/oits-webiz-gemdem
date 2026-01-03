
import React, { useEffect, useRef, useState } from 'react';
import { Search, Layers, Code, ShieldCheck, Rocket, ChevronRight } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

export const Process: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.PROCESS} className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Workflow</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">How we bring your vision to life.</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A structured, agile development lifecycle designed for speed, transparency, and high-quality outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-slate-800 -translate-y-12 z-0"></div>

          {PROCESS_STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative z-10 flex flex-col items-center text-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 relative">
                 <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/5 group-hover:scale-110 transition-transform">
                    {iconMap[step.icon]}
                 </div>
                 <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {step.number}
                 </div>
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
                {step.description}
              </p>

              {index < PROCESS_STEPS.length - 1 && (
                <div className="md:hidden flex justify-center py-6 text-slate-300">
                  <ChevronRight className="rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-20 p-8 rounded-3xl bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-500/20">
           <div className="max-w-xl">
             <h4 className="text-2xl font-bold mb-2">Ready to start the discovery?</h4>
             <p className="text-blue-100">Schedule a 30-minute consultation with our lead architect to discuss your project requirements.</p>
           </div>
           <button 
             onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/10"
           >
             Book Consultation
           </button>
        </div>
      </div>
    </section>
  );
};

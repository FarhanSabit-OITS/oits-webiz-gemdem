import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, Users, Cloud, ArrowUpRight, X, Check, BookOpen } from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId, Service } from '../types';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  Users: <Users className="w-7 h-7" />,
  Cloud: <Cloud className="w-7 h-7" />,
};

interface ServicesProps {
  limit?: number;
}

export const Services: React.FC<ServicesProps> = ({ limit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const displayServices = limit ? SERVICES.slice(0, limit) : SERVICES;

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-24 md:py-32 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Engineering Capabilities</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1] tracking-tight">
              Future-proof solutions <br className="hidden lg:block" /> for digital innovators.
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm text-lg leading-relaxed font-medium">
            We architect resilient, high-speed digital systems using the industry's most advanced technology stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
          {displayServices.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-50 dark:border-slate-800 rounded-[2.5rem] p-10 transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-400/30 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              aria-label={`Service: ${service.title}. Click for details.`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedService(service)}
            >
              {/* Icon with hover bounce animation */}
              <div className="w-16 h-16 shrink-0 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-sm mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:animate-subtle-bounce border border-slate-100 dark:border-slate-600">
                {iconMap[service.icon]}
              </div>

              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">{service.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-10 line-clamp-4 font-medium italic">
                {service.description}
              </p>

              <div className="space-y-4 mb-10">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <Check size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50" />
                <button className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white group/btn uppercase tracking-[0.2em]">
                  View Service Details <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" role="dialog" aria-modal="true">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border-2 border-slate-50 dark:border-slate-800 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
            <div className="p-10 md:p-16 relative overflow-y-auto">
              <button onClick={() => setSelectedService(null)} className="absolute top-10 right-10 p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500" aria-label="Close">
                <X size={28} />
              </button>
              
              <div className="flex flex-col md:flex-row gap-10 items-start md:items-center mb-12">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                  {iconMap[selectedService.icon]}
                </div>
                <div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">{selectedService.title}</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Enterprise Ready</span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Agile Delivery</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-xl mb-12 leading-relaxed font-medium">{selectedService.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50 transition-all hover:border-blue-500/30 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm transition-transform group-hover/item:scale-110">
                      <Check size={20} />
                    </div>
                    <span className="text-base font-bold text-slate-700 dark:text-slate-200 tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="flex-1" onClick={() => setSelectedService(null)}>
                  <Button variant="primary" className="w-full py-8 text-lg rounded-2xl shadow-xl shadow-blue-600/20">Start Your Roadmap</Button>
                </Link>
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  <BookOpen size={18} /> Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
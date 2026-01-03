import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, Users, Cloud, ArrowUpRight, X, Check } from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId, Service } from '../types';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
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
        
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1]">
              Future-proof solutions <br className="hidden lg:block" /> for digital natives.
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm text-lg leading-relaxed">
            We bridge the gap between complex problems and elegant code using modern architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-[2rem] p-10 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400/50 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              aria-label={`Service: ${service.title}. Click for details.`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedService(service)}
            >
              <div className="w-14 h-14 shrink-0 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-sm mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:animate-subtle-bounce">
                {iconMap[service.icon]}
              </div>

              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Check size={14} className="text-blue-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50" />
                <button className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white group/btn uppercase tracking-widest">
                  Learn More <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300" role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-12 relative">
              <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500" aria-label="Close">
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8">
                {iconMap[selectedService.icon]}
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{selectedService.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">{selectedService.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" onClick={() => setSelectedService(null)}>
                <Button variant="primary" className="w-full">Consult on this Service</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
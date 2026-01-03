
import React, { useEffect, useRef, useState } from 'react';
import { Globe, Smartphone, PenTool, Cloud, ArrowUpRight, Code2, Server, Database, Layers, Terminal } from 'lucide-react';
import { SERVICES, TECH_DOMAINS } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  PenTool: <PenTool className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
};

const domainIcons: Record<string, React.ReactNode> = {
  frontend: <Code2 size={18} />,
  backend: <Server size={18} />,
  cloud: <Cloud size={18} />,
};

export const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(TECH_DOMAINS[0].id);
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={SectionId.SERVICES} className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Comprehensive solutions for your digital transformation.
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md pb-2">
            We leverage modern architectures and industry best practices to build software that scales globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:border-blue-400/50 dark:hover:border-blue-600/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 120}ms` }}
              role="article"
              aria-label={service.title}
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true">
                <ArrowUpRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="w-12 h-12 shrink-0 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {iconMap[service.icon]}
              </div>

              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">{service.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-blue-600 transition-all">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';

const LOGOS = [
  { name: 'TECHFLOW', icon: 'TF' },
  { name: 'CLOUDSCALE', icon: 'CS' },
  { name: 'INNOVATE', icon: 'IN' },
  { name: 'NEXUS', icon: 'NX' },
  { name: 'VANTAGE', icon: 'VT' },
];

export const TrustedBy: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <p className={`text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Trusted By Emerging Global Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
          {LOGOS.map((logo, index) => (
            <div 
              key={logo.name} 
              className={`flex items-center gap-3 group cursor-default transition-all duration-700 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-xs font-black text-slate-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-115 group-hover:rotate-3 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/20">
                {logo.icon}
              </div>
              <span className="text-sm font-black text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
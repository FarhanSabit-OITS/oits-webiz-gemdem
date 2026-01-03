import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
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
    <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row items-end justify-between mb-16 gap-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Testimonials</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">What our clients say.</h3>
          </div>
          <div className="flex gap-2">
            {/* Simple dot navigation simulation */}
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <div 
              key={t.id} 
              className={`bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="text-blue-100 dark:text-blue-900 w-12 h-12 mb-6" />
              <p className="text-slate-700 dark:text-slate-300 italic mb-8 relative z-10 leading-relaxed">"{t.content}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
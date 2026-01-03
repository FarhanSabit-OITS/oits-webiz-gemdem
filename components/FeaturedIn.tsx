import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const PUBLICATIONS = [
  { name: 'TechCrunch', ariaLabel: 'Recognized by TechCrunch' },
  { name: 'Wired', ariaLabel: 'Recognized by Wired Magazine' },
  { name: 'Forbes', ariaLabel: 'Recognized by Forbes' },
  { name: 'Business Insider', ariaLabel: 'Recognized by Business Insider' },
  { name: 'The Verge', ariaLabel: 'Recognized by The Verge' },
];

export const FeaturedIn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-16">
            Recognized by Global Tech Media
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-16 md:gap-x-24 mb-20">
            {PUBLICATIONS.map((pub, index) => (
              <div 
                key={pub.name} 
                role="img"
                aria-label={pub.ariaLabel}
                className={`group flex items-center justify-center transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl md:text-4xl font-black text-slate-300 dark:text-slate-700 tracking-tighter transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-1">
                  {pub.name}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-50 dark:border-slate-800/50">
            <Link to="/portfolio">
              <Button variant="outline" size="lg" className="group rounded-full px-12 transition-all hover:bg-slate-900 hover:text-white">
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const PUBLICATIONS = [
  { name: 'TechCrunch', ariaLabel: 'Recognized by TechCrunch - Leading technology media' },
  { name: 'Wired', ariaLabel: 'Recognized by Wired Magazine - Future-focused tech publication' },
  { name: 'Forbes', ariaLabel: 'Recognized by Forbes - Global business and tech insights' },
  { name: 'Business Insider', ariaLabel: 'Recognized by Business Insider - Tech and innovation news' },
  { name: 'The Verge', ariaLabel: 'Recognized by The Verge - Technology and lifestyle media' },
];

export const FeaturedIn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth parallax updates
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Calculate parallax offset based on section position with smooth factor
  const getParallaxY = () => {
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    // Calculate relative distance from viewport
    const offset = scrollY - sectionTop;
    return offset * 0.15; // Refined parallax factor for subtle depth
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-28 md:py-36 lg:py-48 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      {/* Refined Parallax Background Layer */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.08] grayscale will-change-transform"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate3d(0, ${getParallaxY()}px, 0) scale(1.15)` 
          }}
          aria-hidden="true"
        />
        {/* Soft edge masking */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-slate-900 dark:via-transparent dark:to-slate-900" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header text with entry animation */}
          <div className={`text-center mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] md:text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em] mb-4">
              Industry Recognition
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Recognized by Global Tech Media
            </h2>
          </div>
          
          {/* Responsive grid for logos with individual stagger animations */}
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-12 sm:gap-x-16 md:gap-x-20 lg:gap-x-24 mb-24">
            {PUBLICATIONS.map((pub, index) => (
              <div 
                key={pub.name} 
                role="img"
                aria-label={pub.ariaLabel}
                className={`group flex items-center justify-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-200 dark:text-slate-800 tracking-tighter transition-all duration-500 group-hover:text-blue-600/80 dark:group-hover:text-blue-400/80 group-hover:scale-105 group-hover:-rotate-1 cursor-default select-none relative">
                  {pub.name}
                  {/* Subtle underline hover effect */}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-500 group-hover:w-full opacity-40 rounded-full" />
                </span>
              </div>
            ))}
          </div>

          {/* Call to action with slide-up effect */}
          <div className={`flex flex-col items-center pt-16 border-t border-slate-100 dark:border-slate-800/50 transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium max-w-md text-center">
              Our engineering standards are vetted by the industry's most demanding critics and innovative leaders.
            </p>
            <Link to="/portfolio" aria-label="Navigate to portfolio to view our work">
              <Button 
                variant="outline" 
                size="lg" 
                className="group rounded-full px-12 py-7 transition-all hover:bg-slate-950 hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600 shadow-xl shadow-blue-500/10 active:scale-95 border-2 hover:shadow-blue-500/20"
              >
                <span className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
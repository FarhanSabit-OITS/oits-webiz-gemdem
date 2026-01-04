import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Zap, PlayCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';

const CODE_SNIPPET = `// OITS Dhaka Project Config
const project = {
  client: "Innovative Startup",
  goals: ["Scalability", "Security"],
  techStack: ["React", "Next.js", "AWS"],
  status: "Ready for Launch"
};

async function deploy() {
  console.log("Initializing Engineering...");
  await project.initialize();
  return "Excellence Delivered.";
}`;

const TRUSTED_BY = [
  { name: 'TECHFLOW', icon: 'TF', color: 'bg-blue-500/10 text-blue-600' },
  { name: 'CLOUDSCALE', icon: 'CS', color: 'bg-indigo-500/10 text-indigo-600' },
  { name: 'INNOVATE', icon: 'IN', color: 'bg-cyan-500/10 text-cyan-600' },
  { name: 'NEXUS', icon: 'NX', color: 'bg-blue-600/10 text-blue-700' },
  { name: 'VANTAGE', icon: 'VT', color: 'bg-sky-500/10 text-sky-600' },
];

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Character-by-character typing animation with blinking cursor support
  useEffect(() => {
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      if (charIndex <= CODE_SNIPPET.length) {
        setTypedCode(CODE_SNIPPET.slice(0, charIndex));
        
        const char = CODE_SNIPPET[charIndex - 1];
        let delay = 35; // Standard typing speed
        if (char === '\n') delay = 400; // Longer pause for new lines
        else if (char === '.' || char === ',') delay = 200;
        else if (char === '{' || char === '}') delay = 250;

        charIndex++;
        timeoutId = setTimeout(type, delay);
      }
    };

    const initialDelay = setTimeout(type, 800);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    
    if (heroRef.current) observer.observe(heroRef.current);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="home" 
      className="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] lg:min-h-screen flex items-center transition-all duration-500"
    >
      {/* Parallax Background with Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-30 blur-[2px] scale-110 will-change-transform"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)` 
          }}
          aria-hidden="true"
        />
        {/* Darkened Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950/80 to-slate-950 dark:from-black/50 dark:via-slate-950 dark:to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
          <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap size={14} className="fill-current animate-pulse" />
              <span>Future-Ready Engineering</span>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Building the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300">Digital Elite</span>
            </h1>
            
            <div className={`space-y-8 transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium`}>
                {TAGLINE}. High-performance software engineering for businesses that refuse to settle for second best.
              </p>

              <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start`}>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="primary" 
                    className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-blue-500 px-10 shadow-2xl shadow-blue-600/20 active:scale-95 w-full sm:w-auto bg-blue-600 text-white border-none"
                    aria-label="Request a quote"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/portfolio" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group transition-all duration-300 hover:scale-105 hover:bg-white/10 text-white border-white/50 active:scale-95 w-full sm:w-auto border-2 flex items-center justify-center gap-2"
                    aria-label="Request a demo"
                  >
                    <PlayCircle size={20} className="transition-transform group-hover:rotate-12" />
                    Request a Demo
                  </Button>
                </Link>
              </div>

              {/* Trusted By Section with hover visual feedback */}
              <div className="pt-8 md:pt-12 transition-all duration-1000 delay-500">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 lg:mb-6">
                  Trusted by Global Innovators
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-10">
                  {TRUSTED_BY.map((partner, idx) => (
                    <div 
                      key={partner.name} 
                      className={`flex items-center gap-3 group cursor-default transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${600 + idx * 100}ms` }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${partner.color} flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg hover:brightness-125`}>
                        {partner.icon}
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-400 group-hover:text-white transition-colors duration-300">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-2xl transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
            <div className="relative group/visual">
              {/* Terminal Snippet with realistic typing animation */}
              <div className="absolute -top-6 -left-4 sm:-top-12 sm:-left-16 w-full max-w-sm z-20 hidden md:block animate-float">
                <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/50 border-b border-slate-800">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 tracking-wider">
                      <TerminalIcon size={12}/> deploy.ts
                    </div>
                  </div>
                  <div className="p-6 font-mono text-[11px] leading-relaxed text-blue-400/90 h-64 overflow-hidden whitespace-pre-wrap relative">
                    {typedCode}
                    <span className="w-2.5 h-4 bg-blue-500 inline-block align-middle ml-1 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-slate-900 border-2 border-slate-700/50 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[4/3] group/img">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover/img:scale-110" 
                  alt="Engineering Concept"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -z-10 group-hover/visual:scale-150 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Zap, PlayCircle, MessageCircle } from 'lucide-react';
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
  { name: 'TECHFLOW', icon: 'TF', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { name: 'CLOUDSCALE', icon: 'CS', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
  { name: 'INNOVATE', icon: 'IN', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
  { name: 'NEXUS', icon: 'NX', color: 'bg-blue-600/10 text-blue-700 dark:text-blue-500' },
  { name: 'VANTAGE', icon: 'VT', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
];

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Character-by-character typing animation with human-like cadence
  useEffect(() => {
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      if (charIndex <= CODE_SNIPPET.length) {
        setTypedCode(CODE_SNIPPET.slice(0, charIndex));
        
        const char = CODE_SNIPPET[charIndex - 1];
        let delay = 35; // Moderate, readable typing speed
        
        // Contextual pauses for structural elements
        if (char === '\n') delay = 600; 
        else if (char === '.') delay = 300;
        else if (char === ',') delay = 150;
        else if (char === '{' || char === '}') delay = 400;
        else if (char === ';') delay = 250;

        charIndex++;
        timeoutId = setTimeout(type, delay);
      }
    };

    const initialDelay = setTimeout(type, 1200);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, []);

  // Optimized parallax scrolling logic
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
      className="relative pt-28 pb-24 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48 overflow-hidden min-h-[95vh] lg:min-h-screen flex items-center bg-slate-950"
    >
      {/* Background Parallax Layer with Enhanced Multi-layered Overlays for Readability */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-[1px] scale-110 will-change-transform"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate3d(0, ${scrollY * 0.25}px, 0)` 
          }}
          aria-hidden="true"
        />
        {/* Semi-transparent dark overlay to ensure text contrast without obscuring background entirely */}
        <div className="absolute inset-0 bg-slate-950/80" />
        {/* Subtle vertical gradient for depth and focus on center text */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
          <div className="flex-1 space-y-8 md:space-y-12 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] md:text-xs font-bold text-blue-300 uppercase tracking-widest transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap size={14} className="fill-current animate-pulse text-blue-400" />
              <span>Engineering Excellence</span>
            </div>
            
            <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[1.05] transition-all duration-1000 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Building the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200">Digital Elite</span>
            </h1>
            
            <div className={`space-y-8 md:space-y-10 transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {TAGLINE}. High-performance software engineering for businesses that refuse to settle for second best.
              </p>

              <div className="flex flex-col items-center lg:items-start gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start w-full">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="primary" 
                      className="group relative transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:bg-blue-500 px-10 md:px-12 shadow-2xl shadow-blue-600/40 active:scale-95 w-full bg-blue-600 text-white border-none rounded-2xl"
                    >
                      Request a Quote
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/portfolio" className="w-full sm:w-auto">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="group transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 bg-white/10 backdrop-blur-md text-white border border-white/10 active:scale-95 w-full rounded-2xl flex items-center justify-center gap-2 px-10 md:px-12 hover:bg-white/20 shadow-xl"
                    >
                      <PlayCircle size={20} className="transition-transform group-hover:scale-110" />
                      Request a Demo
                    </Button>
                  </Link>
                </div>
                
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="ghost" 
                    size="md" 
                    className="group transition-all duration-500 hover:text-white text-slate-400 hover:bg-white/5 rounded-2xl flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 px-10 w-full lg:w-auto"
                  >
                    <MessageCircle size={18} className="transition-transform group-hover:rotate-12" />
                    Contact Us Directly
                  </Button>
                </Link>
              </div>

              {/* Trusted By: Visual logos with tactile hover states */}
              <div className="pt-10 md:pt-16 transition-all duration-1000 delay-500 border-t border-white/10 max-w-2xl mx-auto lg:mx-0">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">
                  Trusted by Global Innovators
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 sm:gap-12 lg:gap-14">
                  {TRUSTED_BY.map((partner, idx) => (
                    <div 
                      key={partner.name} 
                      className={`flex items-center gap-3 group cursor-default transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${700 + idx * 100}ms` }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${partner.color} flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:brightness-125 shadow-sm`}>
                        {partner.icon}
                      </div>
                      <span className="text-[10px] sm:text-xs font-black text-slate-500 group-hover:text-white transition-colors duration-300 tracking-widest uppercase">
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
              {/* Terminal Snippet with persistent blinking cursor */}
              <div className="absolute -top-6 -left-4 sm:-top-12 sm:-left-16 w-full max-w-sm z-20 hidden md:block animate-float">
                <div className="bg-slate-950/95 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-white/5">
                    <div className="flex gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 tracking-widest font-bold uppercase">
                      <TerminalIcon size={12} className="text-blue-400" /> deploy.config.ts
                    </div>
                  </div>
                  <div className="p-8 font-mono text-[11px] lg:text-[12px] leading-relaxed text-blue-300/90 h-64 overflow-hidden whitespace-pre-wrap relative bg-gradient-to-b from-transparent to-slate-950/20">
                    {typedCode}
                    <span className="w-2.5 h-4 bg-blue-500 inline-block align-middle ml-1 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></span>
                  </div>
                </div>
              </div>
              
              {/* High-Impact Hero Visual Frame: Optimized Scaling */}
              <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden aspect-[4/3] group/img ring-1 ring-white/5 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover/img:scale-110" 
                  alt="Engineering Workspace"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-slate-950/40 pointer-events-none" />
                
                {/* Visual accent glow for depth */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
              </div>

              {/* Background ambient glow behind the main visual */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px] -z-10 group-hover/visual:scale-125 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

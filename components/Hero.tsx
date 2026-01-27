import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Zap, PlayCircle, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';

const TYPING_TITLE = "Digital Elite";
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
  const [typedTitle, setTypedTitle] = useState("");
  const [typedTagline, setTypedTagline] = useState("");
  const [typedCode, setTypedCode] = useState("");
  
  const [isTitleDone, setIsTitleDone] = useState(false);
  const [isTaglineDone, setIsTaglineDone] = useState(false);
  
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // High-performance Parallax scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      // Optimization: Only animate when within view range (approx 1.2x viewport height)
      if (window.scrollY <= window.innerHeight * 1.2) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
        });
      }
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

  // --- Animation Sequence ---

  // 1. Type Title
  useEffect(() => {
    if (!isVisible) return;
    
    if (typedTitle.length < TYPING_TITLE.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(TYPING_TITLE.slice(0, typedTitle.length + 1));
      }, 120); 
      return () => clearTimeout(timeout);
    } else if (!isTitleDone) {
      const timeout = setTimeout(() => setIsTitleDone(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, typedTitle, isTitleDone]);

  // 2. Type Tagline (after Title)
  useEffect(() => {
    if (!isTitleDone) return;

    if (typedTagline.length < TAGLINE.length) {
      const timeout = setTimeout(() => {
        setTypedTagline(TAGLINE.slice(0, typedTagline.length + 1));
      }, 30); 
      return () => clearTimeout(timeout);
    } else if (!isTaglineDone) {
      setIsTaglineDone(true);
    }
  }, [isTitleDone, typedTagline, isTaglineDone]);

  // 3. Type Code snippet (after Tagline)
  useEffect(() => {
    if (!isTaglineDone) return;

    if (typedCode.length < CODE_SNIPPET.length) {
      const nextChar = CODE_SNIPPET[typedCode.length];
      let delay = 40; 
      
      if (nextChar === '\n') delay = 500;
      else if ([';', '{', '}'].includes(nextChar)) delay = 200;
      else if (nextChar === ' ') delay = 15;
      
      delay += Math.random() * 20 - 10;

      const timeout = setTimeout(() => {
        setTypedCode(CODE_SNIPPET.slice(0, typedCode.length + 1));
      }, Math.max(5, delay));
      return () => clearTimeout(timeout);
    }
  }, [isTaglineDone, typedCode]);

  return (
    <section 
      ref={heroRef} 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-52 lg:pb-48 overflow-hidden min-h-[100dvh] flex items-center bg-slate-950"
    >
      {/* Refined Parallax Background Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <div 
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            // Subtle parallax factor (0.15) with scale (1.1) to avoid edges showing
            transform: `translate3d(0, ${scrollY * 0.15}px, 0) scale(1.1)` 
          }}
          aria-hidden="true"
        />
        
        {/* Base dark overlay - increased opacity (70%) for better text readability */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
        
        {/* Desktop Gradient: Darker on left for text readability */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        {/* Mobile Gradient: Darker top/bottom for readability of centered text */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
        
        {/* Radial spotlight effect for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,rgba(15,23,42,0.6)_100%)] hidden lg:block" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 xl:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left w-full pt-4 lg:pt-0">
            {/* Tag */}
            <div className={`inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] md:text-xs font-black text-blue-300 uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap size={12} className="fill-current animate-pulse text-blue-400 md:w-3.5 md:h-3.5" />
              <span>Future-Proof Engineering</span>
            </div>
            
            {/* Main Title - Responsive Sizing */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-[1.05] min-h-[2.2em] md:min-h-[1.1em] drop-shadow-2xl transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Building the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200 inline-block">
                {typedTitle}
                {!isTitleDone && isVisible && (
                  <span className="inline-block w-[3px] md:w-[6px] h-[0.7em] bg-blue-500 ml-1 md:ml-2 animate-pulse align-middle" />
                )}
              </span>
            </h1>
            
            {/* Tagline and Buttons */}
            <div className={`space-y-8 md:space-y-10 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold drop-shadow-md min-h-[3.5rem] md:min-h-0 px-2 sm:px-0">
                {typedTagline}
                {isTitleDone && !isTaglineDone && (
                  <span className="inline-block w-[2px] h-[0.8em] bg-blue-400 ml-1 animate-pulse align-middle" />
                )}
              </p>

              {/* Responsive Buttons Container */}
              <div className="flex flex-col items-center lg:items-start gap-6 md:gap-8">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 justify-center lg:justify-start w-full sm:w-auto">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="primary" 
                      className="group relative w-full sm:w-auto overflow-hidden rounded-xl sm:rounded-2xl border-none bg-blue-600 px-8 py-3.5 md:px-10 md:py-4 font-black text-white shadow-2xl shadow-blue-600/40 transition-all duration-500 hover:scale-[1.05] hover:bg-blue-500 hover:shadow-[0_25px_50px_rgba(37,99,235,0.5)] active:scale-95 text-xs sm:text-sm md:text-base tracking-widest uppercase ring-offset-2 ring-offset-slate-900 focus:ring-2 focus:ring-blue-400"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Request a Quote
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </Button>
                  </Link>
                  <Link to="/portfolio" className="w-full sm:w-auto">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="group w-full sm:w-auto gap-2 rounded-xl sm:rounded-2xl border border-white/20 bg-slate-900/40 px-8 py-3.5 md:px-10 md:py-4 font-black text-white shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.05] hover:bg-white/10 hover:border-white/40 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 text-xs sm:text-sm md:text-base tracking-widest uppercase"
                    >
                      <PlayCircle size={18} className="transition-transform duration-300 group-hover:scale-110 group-hover:fill-white/20 md:w-5 md:h-5" />
                      Request a Demo
                    </Button>
                  </Link>
                </div>
                
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="ghost" 
                    size="md" 
                    className="group w-full gap-2 rounded-xl border border-transparent px-6 font-bold text-slate-300 transition-all duration-500 hover:scale-[1.05] hover:border-white/10 hover:bg-white/5 hover:text-white lg:w-auto text-xs md:text-sm"
                  >
                    <MessageCircle size={16} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:text-blue-400 md:w-[18px] md:h-[18px]" />
                    Contact Us Directly
                  </Button>
                </Link>
              </div>

              {/* Trusted By - Responsive Layout with Enhanced Animations */}
              <div className={`pt-10 md:pt-14 transition-all duration-1000 delay-500 border-t border-white/10 max-w-2xl mx-auto lg:mx-0 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className="text-center lg:text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">
                  Trusted by Global Innovators
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-10 md:gap-12">
                  {TRUSTED_BY.map((partner, idx) => (
                    <div 
                      key={partner.name} 
                      className={`flex items-center gap-2.5 group cursor-default transition-all duration-700 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
                      style={{ transitionDelay: `${700 + idx * 100}ms` }}
                    >
                      {/* Logo Container with Scale and Brightness Animation */}
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl ${partner.color} flex items-center justify-center text-[10px] sm:text-[11px] md:text-xs font-black transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-lg group-hover:shadow-blue-500/20 shadow-sm ring-1 ring-white/5 group-hover:ring-white/20 active:scale-95`}>
                        {partner.icon}
                      </div>
                      {/* Text label with color shift */}
                      <span className="text-xs sm:text-sm font-black text-slate-500 group-hover:text-white transition-colors duration-300 tracking-tight hidden sm:inline-block">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual/Code Snippet Container - Adjusted spacing and scaling */}
          <div className={`flex-1 w-full max-w-xl lg:max-w-2xl transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'} mt-12 lg:mt-0 px-4 sm:px-0`}>
            <div className="relative group/visual">
              
              {/* Floating Code Window (Hidden on mobile/tablet for cleaner look, visible on desktop) */}
              <div className="absolute -top-8 -left-12 w-full max-w-[280px] sm:max-w-sm z-20 hidden xl:block animate-float">
                <div className="bg-slate-950/95 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-900/50 border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono flex items-center gap-1.5 tracking-widest font-bold uppercase">
                      <TerminalIcon size={10} className="text-blue-400" /> deploy.config.ts
                    </div>
                  </div>
                  <div className="p-6 font-mono text-[10px] lg:text-[11px] leading-relaxed text-blue-300/90 h-64 overflow-hidden whitespace-pre-wrap relative bg-gradient-to-b from-transparent to-slate-950/20">
                    {typedCode}
                    {isTaglineDone && (
                      <span className="inline-block w-2 h-3.5 bg-blue-500 align-middle ml-1 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative bg-slate-900 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden aspect-[4/3] group/img ring-1 ring-white/5 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover/img:scale-105" 
                  alt="Modern Software Engineering Environment"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-slate-950/40 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] -z-10 group-hover/visual:scale-125 transition-transform duration-1000" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
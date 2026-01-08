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

  // Parallax scroll tracker with RAF for performance
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

  // --- Animation Sequence ---

  // 1. Type Title
  useEffect(() => {
    if (!isVisible) return;
    
    if (typedTitle.length < TYPING_TITLE.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(TYPING_TITLE.slice(0, typedTitle.length + 1));
      }, 100); 
      return () => clearTimeout(timeout);
    } else if (!isTitleDone) {
      const timeout = setTimeout(() => setIsTitleDone(true), 500);
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
      let delay = 45; 
      
      if (nextChar === '\n') delay = 600;
      else if ([';', '{', '}'].includes(nextChar)) delay = 250;
      else if (nextChar === ' ') delay = 15;
      
      delay += Math.random() * 30 - 15;

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
      className="relative pt-32 pb-24 md:pt-48 md:pb-40 lg:pt-60 lg:pb-56 overflow-hidden min-h-[95vh] lg:min-h-screen flex items-center bg-slate-950"
    >
      {/* Subtle Parallax Background Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-75 ease-out"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            // Refined 0.15 parallax factor for subtle motion depth
            transform: `translate3d(0, ${scrollY * 0.15}px, 0) scale(1.15)` 
          }}
          aria-hidden="true"
        />
        
        {/* Layered readability overlay: Enhanced opacity and subtle blur */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />
        
        {/* Gradients for effective text contrast and visual grounding */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.95)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 xl:gap-32">
          
          {/* Text Content */}
          <div className="flex-1 space-y-10 md:space-y-14 text-center lg:text-left w-full">
            {/* Tag */}
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] md:text-xs font-black text-blue-300 uppercase tracking-[0.3em] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap size={14} className="fill-current animate-pulse text-blue-400" />
              <span>Future-Proof Software Engineering</span>
            </div>
            
            {/* Heading */}
            <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-7xl xl:text-9xl font-black text-white tracking-tighter leading-[1.0] min-h-[2.1em] md:min-h-[1.1em] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Building the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200 inline-block">
                {typedTitle}
                {!isTitleDone && isVisible && (
                  <span className="inline-block w-[3px] md:w-[6px] h-[0.7em] bg-blue-500 ml-2 animate-pulse align-middle" />
                )}
              </span>
            </h1>
            
            {/* Tagline and Buttons */}
            <div className={`space-y-10 md:space-y-12 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl md:text-3xl text-slate-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold drop-shadow-md min-h-[3.5rem] md:min-h-0">
                {typedTagline}
                {isTitleDone && !isTaglineDone && (
                  <span className="inline-block w-[2px] h-[0.8em] bg-blue-400 ml-1 animate-pulse align-middle" />
                )}
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-center lg:items-start gap-8">
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 justify-center lg:justify-start w-full">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="primary" 
                      className="group relative w-full overflow-hidden rounded-2xl border-none bg-blue-600 px-12 font-black text-white shadow-2xl shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] active:scale-95 md:px-14"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Request a Quote
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                  <Link to="/portfolio" className="w-full sm:w-auto">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="group w-full gap-2 rounded-2xl border border-white/10 bg-white/5 px-12 font-black text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:ring-1 hover:ring-white/30 active:scale-95 md:px-14"
                    >
                      <PlayCircle size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:fill-white/20" />
                      Request a Demo
                    </Button>
                  </Link>
                </div>
                
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button 
                    variant="ghost" 
                    size="md" 
                    className="group w-full gap-2 rounded-2xl border border-white/5 px-10 font-bold text-slate-300 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:bg-white/5 hover:text-white lg:w-auto"
                  >
                    <MessageCircle size={18} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:text-blue-400" />
                    Contact Us Directly
                  </Button>
                </Link>
              </div>

              {/* Trusted By Indicators */}
              <div className={`pt-12 md:pt-16 transition-all duration-1000 delay-500 border-t border-white/10 max-w-2xl mx-auto lg:mx-0 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className="text-center lg:text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">
                  Trusted by Global Innovators
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 sm:gap-12 lg:gap-14">
                  {TRUSTED_BY.map((partner, idx) => (
                    <div 
                      key={partner.name} 
                      className={`flex items-center gap-3 group cursor-default transition-all duration-700 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
                      style={{ transitionDelay: `${700 + idx * 100}ms` }}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${partner.color} flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-500 group-hover:scale-115 group-hover:brightness-125 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-sm`}>
                        {partner.icon}
                      </div>
                      <span className="text-sm font-black text-slate-400 group-hover:text-blue-400 dark:group-hover:text-white transition-colors duration-300 tracking-tight">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual/Code Snippet Container */}
          <div className={`flex-1 w-full max-w-2xl transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
            <div className="relative group/visual">
              
              {/* Floating Code Window */}
              <div className="absolute -top-12 -left-8 w-full max-w-[320px] sm:max-w-sm z-20 hidden lg:block animate-float">
                <div className="bg-slate-950/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/10">
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-white/5">
                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 tracking-widest font-bold uppercase">
                      <TerminalIcon size={12} className="text-blue-400" /> deploy.config.ts
                    </div>
                  </div>
                  <div className="p-8 font-mono text-[11px] lg:text-[12px] leading-relaxed text-blue-300/90 h-80 overflow-hidden whitespace-pre-wrap relative bg-gradient-to-b from-transparent to-slate-950/20">
                    {typedCode}
                    {isTaglineDone && (
                      <span className="inline-block w-2.5 h-4 bg-blue-500 align-middle ml-1 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Image Container */}
              <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden aspect-[4/3] group/img ring-1 ring-white/5 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover/img:scale-105" 
                  alt="Modern Software Engineering Environment"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-slate-950/40 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
              </div>

              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px] -z-10 group-hover/visual:scale-125 transition-transform duration-1000" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
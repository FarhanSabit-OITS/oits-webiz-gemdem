import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal as TerminalIcon, Zap, PlayCircle, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE } from '../constants';

const TITLE_TEXT = "Building the Digital Elite";
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
  const [typedCode, setTypedCode] = useState("");
  const [typedTagline, setTypedTagline] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Character-by-character typing animation for the Main Title
  useEffect(() => {
    let titleIndex = 0;
    const typeTitle = () => {
      if (titleIndex <= TITLE_TEXT.length) {
        setTypedTitle(TITLE_TEXT.slice(0, titleIndex));
        titleIndex++;
        setTimeout(typeTitle, 75);
      }
    };
    const timeout = setTimeout(typeTitle, 600);
    return () => clearTimeout(timeout);
  }, []);

  // Character-by-character typing for the Tagline
  useEffect(() => {
    let taglineIndex = 0;
    const typeTagline = () => {
      if (taglineIndex <= TAGLINE.length) {
        setTypedTagline(TAGLINE.slice(0, taglineIndex));
        taglineIndex++;
        setTimeout(typeTagline, 40);
      }
    };
    const timeout = setTimeout(typeTagline, 2400); 
    return () => clearTimeout(timeout);
  }, []);

  // Natural code typing animation
  useEffect(() => {
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeCode = () => {
      if (charIndex <= CODE_SNIPPET.length) {
        setTypedCode(CODE_SNIPPET.slice(0, charIndex));
        const char = CODE_SNIPPET[charIndex - 1];
        let delay = 35;
        
        if (char === '\n') delay = 500; 
        else if (char === '.') delay = 250;
        else if (char === '{' || char === '}') delay = 350;
        else if (char === ';') delay = 200;

        charIndex++;
        timeoutId = setTimeout(typeCode, delay);
      }
    };
    const initialDelay = setTimeout(typeCode, 3200);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, []);

  // Optimized Scroll Listener for Parallax
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
      className="relative pt-32 pb-24 md:pt-48 md:pb-40 lg:pt-60 lg:pb-56 overflow-hidden min-h-[95vh] lg:min-h-screen flex items-center bg-slate-950 transition-colors duration-500"
    >
      {/* Parallax Background with Refined Dark Overlay for superior text Pop */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[0.1] scale-110 will-change-transform"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")',
            transform: `translate3d(0, ${scrollY * 0.18}px, 0)` 
          }}
          aria-hidden="true"
        />
        {/* Layered overlays to ensure text remains perfectly legible on all screens */}
        <div className="absolute inset-0 bg-slate-950/85 md:bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-16 xl:gap-24">
          
          <div className="flex-1 space-y-10 md:space-y-14 text-center lg:text-left w-full">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] md:text-xs font-black text-blue-300 uppercase tracking-[0.3em] transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap size={14} className="fill-current animate-pulse text-blue-400" />
              <span>Future-Proof Software Engineering</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter leading-[1.0] min-h-[2.1em] md:min-h-[1.1em]">
              Building the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-200 inline-block">
                {typedTitle}
                <span className="inline-block w-[4px] md:w-[8px] h-[0.7em] bg-blue-500 ml-2 animate-pulse align-middle" />
              </span>
            </h1>
            
            <div className={`space-y-10 md:space-y-12 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium min-h-[3.5rem] md:min-h-0">
                {typedTagline}
                <span className="inline-block w-[2px] h-[0.8em] bg-slate-400 ml-1 animate-pulse align-middle" />
              </p>

              <div className="flex flex-col items-center lg:items-start gap-8">
                {/* Refined Buttons with Hover scale and feedback */}
                <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 justify-center lg:justify-start w-full">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="primary" 
                      className="group relative transition-all duration-500 hover:scale-105 hover:-translate-y-1.5 hover:bg-blue-500 hover:shadow-blue-500/40 px-12 md:px-14 shadow-2xl shadow-blue-600/30 active:scale-95 w-full bg-blue-600 text-white border-none rounded-2xl overflow-hidden font-black"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Request a Quote
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </Button>
                  </Link>
                  <Link to="/portfolio" className="w-full sm:w-auto">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="group transition-all duration-500 hover:scale-105 hover:-translate-y-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 active:scale-95 w-full rounded-2xl flex items-center justify-center gap-2 px-12 md:px-14 hover:bg-white/20 shadow-xl font-black"
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
                    className="group transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:text-white text-slate-400 rounded-2xl flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 px-10 w-full lg:w-auto font-bold"
                  >
                    <MessageCircle size={18} className="transition-transform group-hover:rotate-12" />
                    Contact Us Directly
                  </Button>
                </Link>
              </div>

              {/* Trusted By with Responsive Layout */}
              <div className="pt-12 md:pt-16 transition-all duration-1000 delay-500 border-t border-white/10 max-w-2xl mx-auto lg:mx-0">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10 text-center lg:text-left">
                  Trusted by Global Innovators
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 sm:gap-12 lg:gap-14">
                  {TRUSTED_BY.map((partner, idx) => (
                    <div 
                      key={partner.name} 
                      className={`flex items-center gap-3 group cursor-default transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${700 + idx * 100}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-2xl ${partner.color} flex items-center justify-center text-xs font-black transition-all duration-500 group-hover:scale-115 group-hover:-rotate-3 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-sm`}>
                        {partner.icon}
                      </div>
                      <span className="text-[10px] sm:text-xs font-black text-slate-500 group-hover:text-blue-400 dark:group-hover:text-white transition-colors duration-300 tracking-widest uppercase">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual: Code Snippet & Responsive Terminal */}
          <div className={`flex-1 w-full max-w-2xl transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
            <div className="relative group/visual">
              
              {/* Floating Terminal with typing cursor */}
              <div className="absolute -top-10 -left-6 w-full max-w-[320px] sm:max-w-sm z-20 hidden lg:block animate-float">
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
                  <div className="p-8 font-mono text-[11px] lg:text-[12px] leading-relaxed text-blue-300/90 h-72 overflow-hidden whitespace-pre-wrap relative bg-gradient-to-b from-transparent to-slate-950/20">
                    {typedCode}
                    <span className="inline-block w-2.5 h-4 bg-blue-500 align-middle ml-1 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                  </div>
                </div>
              </div>
              
              <div className="relative bg-slate-900 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden aspect-[4/3] group/img ring-1 ring-white/5 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover/img:scale-105" 
                  alt="Engineering Workspace"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070';
                  }}
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
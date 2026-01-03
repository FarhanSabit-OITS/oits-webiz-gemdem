
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { TAGLINE, COMPANY_NAME } from '../constants';

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

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedCode(CODE_SNIPPET.slice(0, i));
      i++;
      if (i > CODE_SNIPPET.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20 blur-sm scale-110"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070")' }}
            aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-slate-50 dark:to-slate-950" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Engineering Excellence
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05] transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              Turning Code into <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Business Growth</span>
            </h1>
            
            <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {TAGLINE}. At {COMPANY_NAME}, we specialize in building high-performance software that solves complex problems and delights users.
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start transition-all duration-1000 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="primary"
                  aria-label="Request a quote and start your journey"
                  className="group transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 px-10"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="group" aria-label="Explore our previous projects">
                  Our Portfolio
                </Button>
              </Link>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-2xl transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
            <div className="relative">
              {/* Coding Terminal Banner */}
              <div className="absolute -top-12 -left-8 md:-left-16 w-full max-w-sm z-20 hidden md:block animate-float">
                <div className="bg-slate-950/90 backdrop-blur-xl rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <TerminalIcon size={10} /> project.ts
                    </div>
                  </div>
                  <div className="p-4 font-mono text-[11px] leading-relaxed text-blue-400 h-48 overflow-hidden whitespace-pre">
                    {typedCode}
                    <span className="w-1.5 h-4 bg-blue-500 inline-block align-middle ml-1 animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Main Visual */}
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Software Development Workspace"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

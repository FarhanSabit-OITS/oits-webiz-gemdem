import React from 'react';
import { Terminal, Github, Linkedin, Twitter, Facebook, Sun, Moon, MapPin } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS, SERVICES, ADDRESS } from '../constants';
import { Link } from 'react-router-dom';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a 
    href={href} 
    className="group relative p-3 rounded-xl hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label={label}
  >
    <div className="group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300">
      <Icon size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
    </div>
    
    {/* Enhanced Tooltip with Scale Animation */}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-blue-600 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl scale-75 group-hover:scale-100 group-focus:scale-100 origin-bottom z-20">
      {label}
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-blue-600"></span>
    </span>
  </a>
);

const FooterLink = ({ href, children }: { href: string; children?: React.ReactNode }) => {
  const content = (
    <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400">
      {children}
    </span>
  );

  return (
    <Link 
      to={href} 
      className="group flex items-center text-slate-400 hover:text-blue-400 transition-all py-1.5 font-medium text-sm"
    >
      {content}
    </Link>
  );
};

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-24 border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 text-white group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Terminal size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">{COMPANY_NAME}</span>
            </Link>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-slate-400 font-medium">
                We architect resilient digital systems that power the world's most innovative brands. From concept to scale, we are your strategic engineering partner.
              </p>
              <a 
                href={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors"
                aria-label="View our office location on Google Maps"
              >
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>{ADDRESS}</span>
              </a>
            </div>
            
            <div className="flex gap-2">
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
            </div>
            
            <div className="pt-4">
               <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 px-6 py-3.5 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-500 group shadow-xl hover:shadow-blue-500/5"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
               >
                  <div className="transition-transform duration-500 group-hover:rotate-45">
                    {theme === 'dark' ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-blue-400" />}
                  </div>
                  <span className="group-hover:text-white transition-colors">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
               </button>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Company</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/about">
                  <div className="flex items-center gap-2">
                    Careers 
                    <span className="text-[9px] bg-blue-600/20 text-blue-400 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse">Hiring</span>
                  </div>
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Engineering</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <FooterLink href={`/services#${service.id}`}>
                    {service.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Stay Informed</h4>
            <p className="text-sm mb-8 text-slate-400 font-medium leading-relaxed">Join our engineering collective for bi-weekly deep dives into modern tech stacks.</p>
            <form className="space-y-4 group/form" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  id="newsletter-email"
                  type="email" 
                  placeholder="Work email address" 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:pl-8 transition-all duration-500 peer"
                />
                {/* Border pulse effect on focus */}
                <div className="absolute inset-0 rounded-2xl border border-blue-600 opacity-0 peer-focus:opacity-100 transition-all duration-500 pointer-events-none scale-105 peer-focus:scale-100"></div>
              </div>
              <button className="w-full bg-blue-600 text-white px-8 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all duration-300 shadow-2xl shadow-blue-600/20 active:scale-95 active:shadow-none">
                Subscribe to Insights
              </button>
            </form>
          </div>

        </div>
        
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Digital Engineering Excellence.</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <Link to="#" className="hover:text-blue-400 transition-all hover:scale-105">Privacy Policy</Link>
            <Link to="#" className="hover:text-blue-400 transition-all hover:scale-105">Terms of Service</Link>
            <Link to="#" className="hover:text-blue-400 transition-all hover:scale-105">Legal Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
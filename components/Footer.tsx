import React from 'react';
import { Terminal, Github, Linkedin, Twitter, Facebook, Sun, Moon } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { SectionId } from '../types';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a 
    href={href} 
    className="group relative p-2 rounded-lg hover:bg-slate-800 transition-colors"
    aria-label={label}
  >
    <div className="group-hover:animate-subtle-bounce">
      <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
    </div>
    
    {/* Tooltip */}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-700 transform translate-y-2 group-hover:translate-y-0 duration-200">
      {label}
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-700"></span>
    </span>
  </a>
);

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <a href={`#${SectionId.HOME}`} className="flex items-center gap-2 text-white" onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Terminal size={16} className="text-white" />
              </div>
              <span className="text-xl font-bold">{COMPANY_NAME}</span>
            </a>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering businesses through innovative software solutions. Your digital transformation partner.
            </p>
            <div className="flex gap-2">
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
            </div>
            
            <div className="pt-2">
               <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
               >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
               </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="hover:text-blue-500 transition-colors text-slate-400 hover:text-blue-400">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleNavClick(e, `#${SectionId.SERVICES}`)} className="hover:text-blue-500 transition-colors text-slate-400 hover:text-blue-400">Web Development</a></li>
              <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleNavClick(e, `#${SectionId.SERVICES}`)} className="hover:text-blue-500 transition-colors text-slate-400 hover:text-blue-400">Mobile Apps</a></li>
              <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleNavClick(e, `#${SectionId.SERVICES}`)} className="hover:text-blue-500 transition-colors text-slate-400 hover:text-blue-400">UI/UX Design</a></li>
              <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleNavClick(e, `#${SectionId.SERVICES}`)} className="hover:text-blue-500 transition-colors text-slate-400 hover:text-blue-400">Cloud Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4 text-slate-400">Subscribe to our newsletter for the latest tech news and updates.</p>
            <form className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Email address" 
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-blue-600 text-white placeholder-slate-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                OK
              </button>
            </form>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
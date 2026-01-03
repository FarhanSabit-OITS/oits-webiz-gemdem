
import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS } from '../constants';
import { Button } from './ui/Button';
import { SectionId } from '../types';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById(SectionId.CONTACT);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="flex items-center gap-2 group" 
          onClick={(e) => handleNavClick(e, `#${SectionId.HOME}`)}
          aria-label={`${COMPANY_NAME} home`}
        >
          <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{COMPANY_NAME}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all duration-300 active:scale-95"
            >
              {item.label}
            </a>
          ))}
          
          <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center gap-2">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:rotate-12"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>

          <div className="ml-2">
            <Button variant="primary" size="sm" onClick={scrollToContact} aria-label="Request a demonstration">
              Request Demo
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 md:hidden p-6 shadow-2xl animate-in slide-in-from-top-2 duration-300">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 rounded-lg text-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-95"
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4" onClick={scrollToContact} aria-label="Request a demonstration">
              Request Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

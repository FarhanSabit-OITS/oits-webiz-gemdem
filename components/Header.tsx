import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { COMPANY_NAME } from '../constants';
import { Button } from './ui/Button';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '/', aria: 'Navigate to home page' },
  { label: 'Services', href: '/services', aria: 'View our software engineering services' },
  { label: 'Portfolio', href: '/portfolio', aria: 'Browse our past projects and case studies' },
  { label: 'About', href: '/about', aria: 'Learn about OITS Dhaka and our mission' },
  { label: 'Contact', href: '/contact', aria: 'Get in touch with our engineering team' },
];

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-2xl' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group" 
          aria-label={`${COMPANY_NAME} home`}
        >
          <div className={`w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <Terminal size={20} />
          </div>
          <span className={`text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>{COMPANY_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              aria-label={item.aria}
              onClick={(e) => handleLinkClick(e as any, item.href)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
                location.pathname === item.href 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
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
            <Link to="/contact">
              <Button variant="primary" size="sm" className={`transition-all duration-300 rounded-full ${isScrolled ? 'scale-90' : 'scale-100'}`} aria-label="Request a consultation">
                Consult Now
              </Button>
            </Link>
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
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
            {NAV_LINKS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href}
                aria-label={item.aria}
                onClick={(e) => {
                  handleLinkClick(e as any, item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-lg font-bold transition-all active:scale-95 ${
                   location.pathname === item.href 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' 
                    : 'text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full mt-4 rounded-xl" aria-label="Request a consultation">
                Consult Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
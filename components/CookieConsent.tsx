import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from './ui/Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[110] animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Privacy Preference</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We use cookies to improve your experience and analyze site traffic. By clicking "Accept All", you agree to our use of cookies.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="primary" onClick={handleAccept} className="text-[10px] px-6">
                Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={handleDecline} className="text-[10px] px-6">
                Decline
              </Button>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
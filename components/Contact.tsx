import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { CONTACT_EMAIL } from '../constants';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Minimum 3 characters required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Provide a valid business email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please share your inquiry details';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more context (min 10 chars)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 1500);
  };

  const getLabelClass = (field: keyof typeof formData) => {
    const isActive = focusedField === field || formData[field].length > 0;
    return `absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-widest text-[10px] 
      ${isActive ? '-top-2.5 bg-white dark:bg-slate-900 px-2 text-blue-600 dark:text-blue-400 opacity-100 z-10' : 'top-5 text-slate-500 opacity-60 translate-y-0'}`;
  };

  const getInputClass = (field: keyof typeof formData) => {
    const hasError = !!errors[field];
    const isFocused = focusedField === field;
    return `w-full bg-slate-50 dark:bg-slate-900/40 border transition-all duration-300 rounded-xl px-4 py-4 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none ring-offset-2 dark:ring-offset-slate-900
      ${hasError ? 'border-red-500 ring-red-500/10 animate-shake' : isFocused ? 'border-blue-600 ring-4 ring-blue-600/5 shadow-[0_0_15px_rgba(37,99,235,0.1)]' : 'border-slate-200 dark:border-slate-800'}`;
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 md:py-32 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-10">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Start a Conversation</h2>
              <h3 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.05]">
                Let's turn your vision into <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">scalable reality.</span>
              </h3>
            </div>
            
            <p className={`text-slate-600 dark:text-slate-400 text-xl max-w-md transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Our team of experts is ready to discuss your project requirements and draft a comprehensive roadmap.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {[
                { icon: Mail, label: 'Email Us', value: CONTACT_EMAIL, aria: `Email us at ${CONTACT_EMAIL}` },
                { icon: Phone, label: 'Call Us', value: '+880 1234 567890', aria: "Call our office" }
              ].map((item, idx) => (
                <div key={item.label} className={`flex flex-col gap-3 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: `${200 + (idx * 150)}ms` }}>
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <a href={item.label === 'Email Us' ? `mailto:${item.value}` : `tel:${item.value}`} className="text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors" aria-label={item.aria}>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in-95 duration-500">
                   <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8">
                      <CheckCircle2 size={48} />
                   </div>
                   <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 text-center">Inquiry Received</h4>
                   <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed text-center">Thanks for reaching out! A technical consultant will respond within 24 hours.</p>
                   <Button variant="outline" onClick={() => setStatus('idle')} className="w-full" aria-label="Send another message">New message</Button>
                </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                 <div className="space-y-8">
                   <div className="relative group">
                     <label id="label-name" htmlFor="name" className={getLabelClass('name')}>
                        Full Name
                     </label>
                     <input 
                        type="text" 
                        id="name"
                        autoComplete="name"
                        aria-labelledby="label-name"
                        aria-invalid={!!errors.name}
                        className={getInputClass('name')}
                        placeholder="Full Name"
                        value={formData.name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if(errors.name) setErrors({...errors, name: undefined});
                        }}
                     />
                     {errors.name && (
                       <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-lg animate-in slide-in-from-top-1">
                         <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                         <span className="text-red-600 dark:text-red-400 text-xs font-bold">{errors.name}</span>
                       </div>
                     )}
                   </div>

                   <div className="relative group">
                     <label id="label-email" htmlFor="email" className={getLabelClass('email')}>
                        Work Email
                     </label>
                     <input 
                        type="email" 
                        id="email"
                        autoComplete="email"
                        aria-labelledby="label-email"
                        aria-invalid={!!errors.email}
                        className={getInputClass('email')}
                        placeholder="Work Email Address"
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if(errors.email) setErrors({...errors, email: undefined});
                        }}
                     />
                     {errors.email && (
                       <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-lg animate-in slide-in-from-top-1">
                         <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                         <span className="text-red-600 dark:text-red-400 text-xs font-bold">{errors.email}</span>
                       </div>
                     )}
                   </div>
                 </div>
                 
                 <div className="relative group">
                   <label id="label-message" htmlFor="message" className={getLabelClass('message')}>
                      Your Project Idea
                   </label>
                   <textarea 
                      id="message"
                      aria-labelledby="label-message"
                      aria-invalid={!!errors.message}
                      rows={4}
                      className={`${getInputClass('message')} resize-none`}
                      placeholder="Describe your project goal..."
                      value={formData.message}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => {
                        setFormData({...formData, message: e.target.value});
                        if(errors.message) setErrors({...errors, message: undefined});
                      }}
                   />
                   {errors.message && (
                     <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-lg animate-in slide-in-from-top-1">
                       <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                       <span className="text-red-600 dark:text-red-400 text-xs font-bold">{errors.message}</span>
                     </div>
                   )}
                 </div>

                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full text-lg shadow-xl shadow-blue-600/20 active:scale-95"
                   disabled={status === 'sending'}
                   aria-label="Submit project consultation form"
                 >
                   {status === 'sending' ? 'Sending...' : 'Send Message'}
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </section>
  );
};
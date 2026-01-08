import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, AlertCircle, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Please enter at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide some details about your project';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Minimum 10 characters required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Small haptic-like effect or sound could go here if needed
      return;
    }
    
    setStatus('sending');
    // Simulate high-performance API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 1800);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getLabelClass = (field: keyof typeof formData) => {
    const isActive = focusedField === field || formData[field].length > 0;
    return `absolute left-4 transition-all duration-300 pointer-events-none font-black uppercase tracking-[0.2em] text-[10px] 
      ${isActive 
        ? '-top-2.5 bg-white dark:bg-slate-900 px-3 text-blue-600 dark:text-blue-400 opacity-100 z-10 scale-90 translate-x-[-2px]' 
        : 'top-5 text-slate-500 opacity-50 translate-y-0 scale-100'}`;
  };

  const getInputClass = (field: keyof typeof formData) => {
    const hasError = !!errors[field];
    const isFocused = focusedField === field;
    return `w-full bg-slate-50 dark:bg-slate-900/40 border-2 transition-all duration-300 rounded-2xl px-5 py-4 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none ring-offset-2 dark:ring-offset-slate-950
      ${hasError 
        ? 'border-red-500/50 ring-red-500/10 animate-shake bg-red-50/10 dark:bg-red-900/5' 
        : isFocused 
          ? 'border-blue-600 ring-4 ring-blue-600/10 shadow-[0_0_30px_rgba(37,99,235,0.15),0_0_10px_rgba(37,99,235,0.1)]' 
          : 'border-slate-200 dark:border-slate-800 hover:border-blue-400/50 hover:bg-white dark:hover:bg-slate-800/60'}`;
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 md:py-32 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-12">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-6">
                <Send size={12} className="animate-pulse" />
                <span>Next-Gen Partnership</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter">
                Let's turn your vision into <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600">scalable reality.</span>
              </h3>
            </div>
            
            <p className={`text-slate-600 dark:text-slate-400 text-xl md:text-2xl max-w-md transition-all duration-1000 delay-100 ease-out leading-relaxed ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Our team of expert engineers is ready to discuss your specific technical roadmap and project requirements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
              {[
                { icon: Mail, label: 'Email Engineering', value: CONTACT_EMAIL, aria: `Email us at ${CONTACT_EMAIL}` },
                { icon: Phone, label: 'Direct Line', value: '+880 1234 567890', aria: "Call our office phone" }
              ].map((item, idx) => (
                <div key={item.label} className={`flex flex-col gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: `${200 + (idx * 150)}ms` }}>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200/50 dark:border-blue-800/50 hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <a href={item.label === 'Email Engineering' ? `mailto:${item.value}` : `tel:${item.value}`} className="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors" aria-label={item.aria}>
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-blue-500/5 dark:shadow-none border border-slate-200 dark:border-slate-800/50 transition-all duration-1000 delay-300 ease-out min-h-[500px] flex flex-col ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
             
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-700">
                   <div className="relative mb-10">
                      <div className="absolute inset-0 bg-blue-400/20 blur-[40px] rounded-full animate-pulse" />
                      <div className="w-24 h-24 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white relative z-10 shadow-2xl shadow-blue-600/40">
                         <CheckCircle2 size={48} strokeWidth={2.5} className="animate-in zoom-in-50 duration-500 delay-200" />
                      </div>
                   </div>
                   <h4 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Brief Successfully Transmitted</h4>
                   <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed max-w-sm mx-auto">
                     Our lead architect will review your project brief and reach out within one business day.
                   </p>
                   <Button 
                      variant="outline" 
                      onClick={() => setStatus('idle')} 
                      className="group gap-2 rounded-2xl py-6 px-10 border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
                   >
                     <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                     Send Another Inquiry
                   </Button>
                </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-7 flex-1 flex flex-col" noValidate aria-label="Contact information form">
                 <div className="space-y-7">
                   <div className="relative group">
                     <label id="label-name" htmlFor="name" className={getLabelClass('name')}>
                        Full Name
                     </label>
                     <input 
                        type="text" 
                        id="name"
                        autoComplete="name"
                        aria-labelledby="label-name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        className={getInputClass('name')}
                        placeholder="Full Name"
                        value={formData.name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                     />
                     {errors.name && (
                       <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-red-500/5 border border-red-500/10 rounded-xl animate-in slide-in-from-top-1" role="alert">
                         <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                         <span className="text-red-600 dark:text-red-400 text-[11px] font-black uppercase tracking-tight">{errors.name}</span>
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
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        className={getInputClass('email')}
                        placeholder="Work Email Address"
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                     />
                     {errors.email && (
                       <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-red-500/5 border border-red-500/10 rounded-xl animate-in slide-in-from-top-1" role="alert">
                         <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                         <span className="text-red-600 dark:text-red-400 text-[11px] font-black uppercase tracking-tight">{errors.email}</span>
                       </div>
                     )}
                   </div>
                 </div>
                 
                 <div className="relative group flex-1 flex flex-col">
                   <div className="flex justify-between items-center mb-1">
                      <label id="label-message" htmlFor="message" className={getLabelClass('message')}>
                        Project Brief
                      </label>
                      <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${formData.message.length >= 10 ? 'text-green-500' : 'text-slate-400'}`}>
                        {formData.message.length}/500 chars
                      </span>
                   </div>
                   <textarea 
                      id="message"
                      aria-labelledby="label-message"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      rows={5}
                      className={`${getInputClass('message')} resize-none flex-1`}
                      placeholder="Describe your project goal..."
                      value={formData.message}
                      maxLength={500}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                   />
                   {errors.message && (
                     <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-red-500/5 border border-red-500/10 rounded-xl animate-in slide-in-from-top-1" role="alert">
                       <AlertCircle size={14} className="text-red-600 dark:text-red-400" />
                       <span className="text-red-600 dark:text-red-400 text-[11px] font-black uppercase tracking-tight">{errors.message}</span>
                     </div>
                   )}
                 </div>

                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="group relative w-full text-lg shadow-2xl shadow-blue-600/30 rounded-2xl py-8 active:scale-[0.98] transition-all bg-blue-600 hover:bg-blue-500 overflow-hidden"
                   disabled={status === 'sending'}
                   aria-label={status === 'sending' ? 'Sending message...' : 'Submit project consultation form'}
                 >
                   <span className="relative z-10 flex items-center justify-center gap-2">
                     {status === 'sending' ? (
                       <>
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         <span className="font-black tracking-widest uppercase text-xs">Transmitting...</span>
                       </>
                     ) : (
                       <>
                         <span className="font-black tracking-[0.2em] uppercase text-xs">Initialize Consultation</span>
                         <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                       </>
                     )}
                   </span>
                   {/* Shimmer effect for button */}
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px) rotate(-0.5deg); }
          40% { transform: translateX(6px) rotate(0.5deg); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { ADDRESS, CONTACT_EMAIL } from '../constants';
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 1500);
  };

  const getLabelClass = (field: keyof typeof formData) => {
    const isActive = focusedField === field || formData[field].length > 0;
    return `absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-widest text-[10px] 
      ${isActive ? '-top-2.5 bg-slate-900 px-2 text-blue-400 opacity-100 z-10' : 'top-3.5 text-slate-500 opacity-0 translate-y-1'}`;
  };

  const getInputClass = (field: keyof typeof formData) => {
    const hasError = !!errors[field];
    return `w-full bg-slate-900 border ${hasError ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 transition-all duration-300`;
  };

  return (
    <section ref={sectionRef} id={SectionId.CONTACT} className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                Let's build something <br/> <span className="text-blue-500">extraordinary</span> together.
              </h3>
            </div>
            
            <p className={`text-slate-300 text-lg max-w-md transition-all duration-1000 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-6 pt-8">
              {[
                { icon: Mail, label: 'Email Us', value: CONTACT_EMAIL },
                { icon: MapPin, label: 'Visit Us', value: ADDRESS },
                { icon: Phone, label: 'Call Us', value: '+880 1234 567890' }
              ].map((item, idx) => (
                <div key={item.label} className={`flex items-start gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: `${200 + (idx * 150)}ms` }}>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700" aria-hidden="true">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                    <p className="text-lg font-medium text-slate-100">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
             {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-6">
                      <CheckCircle2 size={40} />
                   </div>
                   <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                   <p className="text-slate-400 mb-8">Thank you for reaching out. We'll be in touch very soon.</p>
                   <Button variant="outline" onClick={() => setStatus('idle')} className="text-white border-slate-700 hover:bg-slate-700">Send another message</Button>
                </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="relative group">
                     <label id="label-name" htmlFor="name" className={getLabelClass('name')}>
                        Name
                     </label>
                     <input 
                        type="text" 
                        id="name"
                        aria-labelledby="label-name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={getInputClass('name')}
                        placeholder={focusedField === 'name' ? '' : 'Enter your full name'}
                        value={formData.name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if(errors.name) setErrors({...errors, name: undefined});
                        }}
                     />
                     {errors.name && <p id="name-error" className="text-red-400 text-[10px] font-bold mt-1.5 flex items-center gap-1 uppercase tracking-wider animate-in slide-in-from-top-1"><AlertCircle size={10} /> {errors.name}</p>}
                   </div>

                   <div className="relative group">
                     <label id="label-email" htmlFor="email" className={getLabelClass('email')}>
                        Email
                     </label>
                     <input 
                        type="email" 
                        id="email"
                        aria-labelledby="label-email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={getInputClass('email')}
                        placeholder={focusedField === 'email' ? '' : 'Email Address'}
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if(errors.email) setErrors({...errors, email: undefined});
                        }}
                     />
                     {errors.email && <p id="email-error" className="text-red-400 text-[10px] font-bold mt-1.5 flex items-center gap-1 uppercase tracking-wider animate-in slide-in-from-top-1"><AlertCircle size={10} /> {errors.email}</p>}
                   </div>
                 </div>
                 
                 <div className="relative group">
                   <label id="label-message" htmlFor="message" className={getLabelClass('message')}>
                      Message
                   </label>
                   <textarea 
                      id="message"
                      aria-labelledby="label-message"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={4}
                      className={`${getInputClass('message')} resize-none`}
                      placeholder={focusedField === 'message' ? '' : 'Describe your project goals and technical requirements...'}
                      value={formData.message}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => {
                        setFormData({...formData, message: e.target.value});
                        if(errors.message) setErrors({...errors, message: undefined});
                      }}
                   />
                   {errors.message && <p id="message-error" className="text-red-400 text-[10px] font-bold mt-1.5 flex items-center gap-1 uppercase tracking-wider animate-in slide-in-from-top-1"><AlertCircle size={10} /> {errors.message}</p>}
                 </div>

                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-900/40 font-bold tracking-widest uppercase text-xs"
                   disabled={status === 'sending'}
                   aria-label={status === 'sending' ? 'Sending message...' : 'Send message now'}
                 >
                   {status === 'sending' ? (
                     <span className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                       Sending...
                     </span>
                   ) : (
                     <span className="flex items-center gap-2">
                       Send Message <Send size={16} />
                     </span>
                   )}
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

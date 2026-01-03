
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
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
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
               <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="group relative">
                     <label htmlFor="name" className={`block text-xs font-bold uppercase text-blue-400 mb-1 tracking-wide transition-all ${formData.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                        Name
                     </label>
                     <input 
                        type="text" 
                        id="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({...formData, name: e.target.value});
                          if(errors.name) setErrors({...errors, name: undefined});
                        }}
                     />
                     {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
                   </div>

                   <div className="group relative">
                     <label htmlFor="email" className={`block text-xs font-bold uppercase text-blue-400 mb-1 tracking-wide transition-all ${formData.email ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                        Email
                     </label>
                     <input 
                        type="email" 
                        id="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all`}
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({...formData, email: e.target.value});
                          if(errors.email) setErrors({...errors, email: undefined});
                        }}
                     />
                     {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                   </div>
                 </div>
                 
                 <div className="group relative">
                   <label htmlFor="message" className={`block text-xs font-bold uppercase text-blue-400 mb-1 tracking-wide transition-all ${formData.message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                      Message
                   </label>
                   <textarea 
                      id="message"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows={4}
                      className={`w-full bg-slate-900 border ${errors.message ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none`}
                      placeholder="Tell us about your project requirements..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({...formData, message: e.target.value});
                        if(errors.message) setErrors({...errors, message: undefined});
                      }}
                   />
                   {errors.message && <p id="message-error" className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                 </div>

                 <Button 
                   type="submit" 
                   variant="primary" 
                   size="lg" 
                   className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all"
                   disabled={status === 'sending'}
                   aria-label={status === 'sending' ? 'Sending message...' : 'Send message now'}
                 >
                   {status === 'sending' ? 'Sending...' : 'Send Message'}
                 </Button>
               </form>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

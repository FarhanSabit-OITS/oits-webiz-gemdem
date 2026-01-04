import React, { useState } from 'react';
import { About } from '../components/About';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Briefcase, Coffee, Globe, GraduationCap } from 'lucide-react';

const LOGOS = [
  { name: 'TechFlow' },
  { name: 'CloudScale' },
  { name: 'DevOps' },
  { name: 'Innovate' },
  { name: 'GlobalLogistics' },
  { name: 'Fintech' },
];

const FAQS = [
  {
    question: "What is OITS Dhaka's typical project timeline?",
    answer: "Project timelines vary depending on complexity. A typical MVP development cycle takes between 8 to 12 weeks, while larger enterprise transformations can span 6+ months with continuous agile iterations."
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in radical transparency. Every project gets a dedicated Slack channel for real-time chat, bi-weekly video sprint reviews, and access to our project management tools (Jira/Asana) so you can track progress anytime."
  },
  {
    question: "Can you help with post-launch support and scaling?",
    answer: "Absolutely. We offer flexible post-launch maintenance packages that include monitoring, bug fixes, performance tuning, and continuous feature development to help you scale based on user feedback."
  },
  {
    question: "Do you offer dedicated developer teams?",
    answer: "Yes, we specialize in high-velocity dedicated teams that integrate seamlessly with your in-house workflow. Our staff augmentation model ensures you get senior engineering talent that scales with your roadmap."
  },
  {
    question: "How do you ensure the security of our data and intellectual property?",
    answer: "Security is baked into our DNA. We sign strict NDAs, follow OWASP security best practices during development, and implement robust CI/CD pipelines with automated vulnerability scanning."
  }
];

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group transition-all"
        aria-expanded={isOpen}
      >
        <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
          {question}
        </span>
        <div className={`shrink-0 ml-4 p-2 bg-slate-50 dark:bg-slate-800 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-blue-600 text-white' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(37,99,235,0.15),_transparent)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Our Story</h2>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">Human Centered. <br/> Tech Driven.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            OITS Dhaka is a collective of visionary engineers and designers obsessed with crafting high-performance digital products.
          </p>
        </div>
      </div>

      <About />

      {/* Careers Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6">
                <Briefcase size={14} /> Join the Innovation Lab
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Engineer your <br/> own future.</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 leading-relaxed font-medium">
                At OITS Dhaka, we're always looking for senior-level talent who are passionate about solving hard problems. Our culture is built on technical autonomy, continuous learning, and global collaboration.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { icon: Coffee, title: "Flexible Flow", desc: "Remote-first culture with asynchronous communication workflows." },
                  { icon: GraduationCap, title: "Learning Lab", desc: "Annual budget for courses, certifications, and tech conferences." },
                  { icon: Globe, title: "Global Scale", desc: "Work on high-impact projects for international startups and enterprises." },
                  { icon: Briefcase, title: "Equity & Growth", desc: "Competitive compensation with performance-based stock options." }
                ].map((benefit, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-blue-500/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <benefit.icon size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/contact">
                <Button variant="primary" size="lg" className="rounded-2xl px-12 shadow-xl shadow-blue-500/20">
                  Join Our Team
                </Button>
              </Link>
            </div>
            
            <div className="order-1 lg:order-2 relative">
               <div className="absolute -inset-10 bg-blue-600/5 rounded-full blur-3xl animate-pulse -z-10" />
               <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="Team culture at OITS Dhaka"
                  />
                  <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">"Best engineering culture I've ever been part of."</p>
                    <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">— Lead Frontend Engineer</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6">
                <HelpCircle size={14} /> Common Questions
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Everything you need <br/> to know.</h2>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-12">Our Ecosystem Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale transition-all hover:grayscale-0">
            {LOGOS.map((logo) => (
              <span key={logo.name} className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{logo.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">Built on a foundation of excellence.</h2>
                <div className="space-y-12">
                   {[
                     { title: "Innovation first", desc: "We don't follow trends; we set them by experimenting with bleeding-edge technology that solves real problems." },
                     { title: "Radical Transparency", desc: "Clients are part of our internal Slack. You see the progress, the hurdles, and the wins in real-time." },
                     { title: "Uncompromising Quality", desc: "Our CI/CD pipelines and QA protocols ensure that nothing enters production without being bulletproof." }
                   ].map((val) => (
                     <div key={val.title} className="group">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{val.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative">
                 <div className="aspect-square bg-blue-600/5 rounded-full absolute -inset-10 animate-pulse" />
                 <img 
                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                   className="relative z-10 rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                   alt="Collaborative work environment"
                 />
              </div>
           </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10">Want to join our mission?</h3>
           <Link to="/contact">
             <Button size="lg" variant="primary" className="bg-white text-slate-900 hover:bg-slate-100">Work with us</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
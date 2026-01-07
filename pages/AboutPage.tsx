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
    answer: "Absolutely. We offer flexible post-launch maintenance packages that include monitoring, bug fixes, performance tuning, and continuous feature development to help you scale based on real user feedback."
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
        className="w-full flex items-center justify-between py-6 text-left group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors px-4 rounded-xl"
      >
        <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{question}</span>
        <ChevronDown 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
          size={20} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in bg-white dark:bg-slate-950">
      <div className="py-24 md:py-32 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-sm">Who We Are</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight text-white">Engineers. <br/> Innovators. Partners.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
            Building the digital infrastructure for tomorrow's industry leaders with passion and precision.
          </p>
        </div>
      </div>
      
      <About />

      {/* Culture Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Culture Code</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">We foster an environment where curiosity thrives and excellence is the standard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Remote-First", desc: "We hire the best talent globally, regardless of location." },
              { icon: GraduationCap, title: "Continuous Learning", desc: "Weekly tech talks and a generous budget for upskilling." },
              { icon: Briefcase, title: "Ownership", desc: "We empower every team member to own their decisions." },
              { icon: Coffee, title: "Work-Life Balance", desc: "Flexible hours because burnout kills creativity." },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
               <div className="lg:w-1/3">
                  <div className="sticky top-32">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                        <HelpCircle size={24} />
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Common Questions</h3>
                     <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Everything you need to know about partnering with OITS Dhaka. Can't find the answer you're looking for?
                     </p>
                     <Link to="/contact">
                        <Button variant="outline" className="rounded-full">Contact Support</Button>
                     </Link>
                  </div>
               </div>
               <div className="lg:w-2/3">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 md:p-6 shadow-sm">
                     {FAQS.map((faq, index) => (
                        <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Join the digital elite.</h3>
           <Link to="/contact">
             <Button size="lg" className="rounded-full shadow-xl px-12 py-6 text-lg">Work With Us</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
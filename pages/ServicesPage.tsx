import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Lightbulb, Users, Activity, TrendingUp } from 'lucide-react';

const WHY_CHOOSE_US = [
  {
    title: "Expertise & Innovation",
    desc: "We stay at the bleeding edge of technology, ensuring your solutions are built with the most advanced, future-proof engineering practices available.",
    icon: Lightbulb
  },
  {
    title: "Client-Centric Approach",
    desc: "Your success is our priority. We align our technical roadmaps with your specific business goals through deep collaboration and strategic planning.",
    icon: Users
  },
  {
    title: "Agile Delivery",
    desc: "Experience rapid, transparent development cycles with bi-weekly sprints and real-time communication that keep you in control of every milestone.",
    icon: Activity
  },
  {
    title: "Scalable Solutions",
    desc: "We architect systems that grow with you. Our cloud-native approach ensures high-performance and resilient scalability for global-scale demands.",
    icon: TrendingUp
  }
];

const ServicesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="pt-20 animate-fade-in">
      <div className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-6 text-sm">Our Capabilities</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white leading-tight">Engineering <br/> for Scale.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
            High-performance solutions tailored to the needs of modern enterprises and fast-growing startups.
          </p>
        </div>
      </div>
      
      <Services />
      
      {/* Why Choose Us Section */}
      <section className="py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center text-center mb-20">
              <h2 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-xs">Differentiation</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tighter">Why top innovators <br/> choose OITS Dhaka.</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {WHY_CHOOSE_US.map((item, idx) => (
                <div key={idx} className="group relative p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2">
                  <div className="flex gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500">
                      <item.icon size={30} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-blue-600/40 dark:text-blue-400/40 font-mono">0{idx + 1}</span>
                        <h4 className="font-black text-2xl text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-20 flex flex-col lg:flex-row items-center justify-center gap-12 pt-20 border-t border-slate-100 dark:border-slate-800/50">
              <div className="relative group lg:w-1/2">
                 <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 group-hover:rotate-1 transition-transform opacity-10" />
                 <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                      alt="Team working together" 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                 </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed italic">
                  "At OITS Dhaka, we don't just write code; we solve complex business problems through engineering excellence and radical transparency."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 shimmer" />
                  <div>
                    <p className="font-black text-slate-900 dark:text-white">Engineering Leadership</p>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">OITS Dhaka Team</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      <Process />

      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-6 text-center">
           <h3 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Need a specialized technical consultation?</h3>
           <Link to="/contact">
             <Button size="lg" className="rounded-full shadow-xl">Contact an Expert</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
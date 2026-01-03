import React from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Services } from '../components/Services';
import { FeaturedIn } from '../components/FeaturedIn';
import { Process } from '../components/Process';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in overflow-hidden">
      <Hero />
      <Marquee />
      
      <div className="relative">
        <Services limit={4} />
        <FeaturedIn />
        <div className="container mx-auto px-6 py-12 text-center">
          <Link to="/services">
            <Button variant="outline" size="lg" className="rounded-full">Explore All Services</Button>
          </Link>
        </div>
      </div>

      <Process />

      <div className="bg-slate-50 dark:bg-slate-950/50 pt-24">
        <div className="container mx-auto px-6 text-center mb-12">
           <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Featured Work</h2>
           <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Selected Case Studies</h3>
        </div>
        <Portfolio limit={3} />
        <div className="container mx-auto px-6 pb-24 text-center">
          <Link to="/portfolio">
            <Button variant="outline" size="lg" className="rounded-full">View All Projects</Button>
          </Link>
        </div>
      </div>

      <Testimonials />
      
      <section className="py-32 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 leading-tight">Ready to build your <br/> digital future?</h2>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="scale-110 shadow-2xl !bg-white !text-blue-600 hover:!bg-blue-50">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
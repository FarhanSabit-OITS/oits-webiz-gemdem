import React from 'react';
import { Portfolio } from '../components/Portfolio';
import { Button } from '../components/ui/Button';

const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in bg-white dark:bg-slate-950">
      <div className="py-24 md:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-4 text-sm">Portfolio</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight text-white">Impactful <br/> Digital Stories.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
            A selection of complex engineering challenges solved with precision and creativity.
          </p>
        </div>
      </div>
      
      <Portfolio />

      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Have a similar project in mind?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">We'd love to discuss how our expertise can accelerate your specific technical roadmap.</p>
          <div className="flex justify-center gap-4">
             <Button variant="primary" size="lg" className="rounded-2xl">Start a Project</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
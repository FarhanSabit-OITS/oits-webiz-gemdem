
import React from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Marquee />
      
      {/* Featured Services Preview */}
      <div className="relative">
        <Services />
        <div className="container mx-auto px-6 pb-24 text-center">
          <Link to="/services">
            <Button variant="outline" size="lg">Explore All Services</Button>
          </Link>
        </div>
      </div>

      <Process />

      {/* Featured Portfolio Preview */}
      <div className="bg-slate-50 dark:bg-slate-950">
        <Portfolio />
        <div className="container mx-auto px-6 pb-24 text-center">
          <Link to="/portfolio">
            <Button variant="outline" size="lg">View Full Case Studies</Button>
          </Link>
        </div>
      </div>

      <Testimonials />
      
      {/* Pre-footer CTA */}
      <section className="py-24 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to transform your business?</h2>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">Get Started Today</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

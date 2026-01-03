
import React from 'react';
import { Portfolio } from '../components/Portfolio';

const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-20 animate-fade-in">
      <div className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Case Studies</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Explore our diverse portfolio of high-impact digital solutions.
          </p>
        </div>
      </div>
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;

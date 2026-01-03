
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { SectionId } from './types';
import { COMPANY_NAME, TAGLINE } from './constants';

const SEO_DATA = {
  [SectionId.HOME]: {
    title: `${COMPANY_NAME} | ${TAGLINE}`,
    description: "Transforming ideas into digital reality with expert web and mobile development services in Dhaka."
  },
  [SectionId.SERVICES]: {
    title: `Expert Services - ${COMPANY_NAME}`,
    description: "From custom web apps to scalable enterprise cloud solutions."
  },
  [SectionId.PROCESS]: {
    title: `Our Process - ${COMPANY_NAME}`,
    description: "Discover our agile lifecycle for delivering world-class software."
  },
  [SectionId.ABOUT]: {
    title: `Who We Are - ${COMPANY_NAME}`,
    description: "A team of passionate engineers and designers dedicated to your success."
  },
  [SectionId.PORTFOLIO]: {
    title: `Our Work - ${COMPANY_NAME}`,
    description: "Explore the successful products we've built for global clients."
  },
  [SectionId.CONTACT]: {
    title: `Start Your Project - ${COMPANY_NAME}`,
    description: "Contact OITS Dhaka for a consultation and free project estimate."
  }
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const seoInfo = SEO_DATA[sectionId as SectionId] || SEO_DATA[SectionId.HOME];
          
          if (seoInfo) {
            document.title = seoInfo.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute('content', seoInfo.description);
            }
            // CRITICAL: Removed history.replaceState to avoid SecurityError in sandboxed environments.
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3
    });

    Object.values(SectionId).forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300 relative">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
      <AiAssistant />
    </div>
  );
}

export default App;

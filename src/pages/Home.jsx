import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Portafolio } from '../components/Portafolio';
import { Blog } from '../components/Blog';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Home = () => {
  // Efecto para el scroll suave al hacer clic en los enlaces del Navbar
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-100 bg-[#0a0a0c] selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portafolio />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
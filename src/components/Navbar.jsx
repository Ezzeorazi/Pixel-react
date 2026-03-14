import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants/data';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0c]/80 backdrop-blur-lg border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#inicio" className="hover:opacity-80 transition-opacity">
          <Logo />
        </a>

        <nav className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-400 hover:text-purple-400 transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Menú">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#121215] border-t border-white/5 py-4 px-4 flex flex-col space-y-4 shadow-xl">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} href={link.href} 
              className="text-base font-medium text-gray-300 hover:text-purple-400 p-2 rounded-md hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
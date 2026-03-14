import { ChevronRight } from 'lucide-react';
import { PORTAFOLIO } from '../constants/data';

export const Portafolio = () => (
  <section id="portfolio" className="py-16 md:py-24 bg-[#121215] border-y border-white/5">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
        <div className="max-w-2xl">
          <span className="text-pink-400 font-semibold tracking-wider uppercase text-xs md:text-sm">Portfolio</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2">Nuestros Trabajos</h2>
        </div>
        <a href="#contacto" className="text-purple-400 font-medium hover:text-purple-300 flex items-center gap-1 transition-colors text-sm md:text-base">
          Quiero mi propio sitio <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {PORTAFOLIO.map((item, index) => (
          <div key={index} className="group cursor-pointer">
            <div className={`aspect-video ${item.imageClass} border rounded-2xl mb-4 md:mb-6 overflow-hidden flex items-center justify-center relative transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(219,39,119,0.15)]`}>
              <span className="text-white/20 font-bold text-lg md:text-2xl px-2 md:px-4 text-center">[{item.name}]</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="px-4 md:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium border border-white/20">Ver proyecto</span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-purple-400 font-semibold mb-2">{item.category}</p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-pink-400 transition-colors">{item.name}</h3>
            <p className="text-gray-400 leading-relaxed text-xs md:text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
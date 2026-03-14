import { ArrowRight } from 'lucide-react';

export const Hero = () => (
  <section id="inicio" className="pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
    <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-[100px] transform translate-x-1/3 opacity-50 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full filter blur-[100px] transform -translate-x-1/3 opacity-40 pointer-events-none"></div>
    
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-3xl">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium backdrop-blur-sm">
          Innovación digital en Rosario, Argentina
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Agencia de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Marketing</span> y Desarrollo Web
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
          Transformamos ideas complejas en experiencias digitales excepcionales. Somos tu socio tecnológico estratégico para destacar en el mundo digital.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contacto" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
            Contactar ahora <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#portfolio" className="px-8 py-4 bg-[#18181c] text-white font-semibold rounded-lg border border-white/10 hover:bg-white/5 transition-all text-center hover:-translate-y-0.5">
            Ver trabajos
          </a>
        </div>
      </div>
    </div>
  </section>
);
import { CheckCircle2 } from 'lucide-react';

export const About = () => (
  <section id="quienes-somos" className="py-24 bg-[#121215] border-y border-white/5">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <div className="aspect-square md:aspect-video lg:aspect-square bg-[#0a0a0c] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 group-hover:border-purple-500/30 transition-colors duration-500">
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent flex flex-col items-center justify-center p-8 text-center">
                 <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500">
                   <span className="text-white font-bold text-3xl">5+</span>
                 </div>
                 <span className="text-gray-200 font-bold text-xl mb-2">Años de Experiencia</span>
                 <span className="text-gray-400">Diseño, desarrollo y soluciones web</span>
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-600/20 filter blur-2xl rounded-full -z-10"></div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">Quiénes Somos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Diseño web de alto nivel.</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Somos Pixel Maker. Con más de 5 años de experiencia, nos especializamos en brindar soluciones web integrales que ayudan a las empresas a destacar en el mundo digital. Desde la concepción de la idea hasta la puesta en marcha, te acompañamos en cada paso.
          </p>
          <ul className="space-y-4 pt-4">
            {['Desarrollo y diseño web a medida', 'Estrategias de Marketing Digital efectivas', 'Soporte y mantenimiento continuo'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-300 font-medium">
                <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
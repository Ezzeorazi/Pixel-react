import { SERVICIOS } from '../constants/data';

export const Services = () => (
  <section id="servicios" className="py-24 relative">
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">Nuestros Servicios</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Soluciones Digitales Completas</h2>
        <p className="text-gray-400 text-lg">Todo lo que necesitas para que tu negocio tenga una presencia en línea profesional, segura y exitosa.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICIOS.map((service, index) => (
          <div key={index} className="bg-[#18181c] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-[#0a0a0c] border border-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-900/20 transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
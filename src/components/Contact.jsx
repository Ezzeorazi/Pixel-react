import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

export const Contact = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = () => {
    setStatus('submitting');
  };

  return (
    <section id="contacto" className="py-24 bg-[#121215] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-5/12 space-y-8">
            <div>
              <span className="text-pink-400 font-semibold tracking-wider uppercase text-sm">Contacto</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-white">
                ¿Interesado en soluciones personalizadas?
              </h2>
              <p className="text-gray-400 text-lg">
                Póngase en contacto con nosotros para conversar sobre su idea y descubra el paquete perfecto diseñado especialmente para usted.
              </p>
            </div>
            
            <div className="space-y-6 pt-4">
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#18181c] border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-purple-500/50 transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-200">
                    pixelmakerweb@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-[#18181c] border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-pink-500/50 transition-colors">
                  <MapPin className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-medium text-gray-200">Rosario, Argentina</p>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="bg-[#18181c] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative">

              <form
                action="https://formsubmit.co/pixelmakerweb@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* configuración FormSubmit */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Nuevo mensaje desde Pixel Maker" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Nombre completo
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0c] text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Correo electrónico
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-[#0a0a0c] text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Su mensaje o idea
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full px-4 py-3 bg-[#0a0a0c] text-white rounded-lg border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-lg transition-all flex justify-center items-center disabled:opacity-70 shadow-lg"
                >
                  {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

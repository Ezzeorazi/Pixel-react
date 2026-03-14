import { Logo } from './Logo';

export const Footer = () => (
  <footer className="bg-[#0a0a0c] text-gray-400 py-12 border-t border-white/10">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="opacity-80 scale-90 md:scale-100 origin-left">
          <Logo />
        </div>
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} Pixel Maker. Todos los derechos reservados.
        </p>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/pixelmakerweb" className="w-10 h-10 rounded-full bg-[#18181c] border border-white/5 flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-transparent transition-all text-sm">Fb</a>
          <a href="https://www.instagram.com/pixelmakerdevs/" className="w-10 h-10 rounded-full bg-[#18181c] border border-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white hover:border-transparent transition-all text-sm">Ig</a>
          <a href="https://www.linkedin.com/company/pixel-maker/" className="w-10 h-10 rounded-full bg-[#18181c] border border-white/5 flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-transparent transition-all text-sm">In</a>
        </div>
      </div>
    </div>
  </footer>
);
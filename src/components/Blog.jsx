import { BookOpen, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants/data';

export const Blog = () => (
  <section id="blog" className="py-24 relative">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">Blog & Novedades</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Aprende con Nosotros</h2>
        <p className="text-gray-400 text-lg">Consejos, tendencias de diseño web y estrategias para potenciar tu presencia digital.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <article key={index} className="bg-[#18181c] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
            <div className="aspect-video bg-[#0a0a0c] flex items-center justify-center relative overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>
              <BookOpen className="w-12 h-12 text-purple-500/30 z-10 group-hover:scale-110 group-hover:text-purple-500/60 transition-all duration-500" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>{post.readTime} de lectura</span>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-purple-400 cursor-pointer transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{post.excerpt}</p>
              <a href="#blog" className="text-pink-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto w-fit">
                Leer artículo <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef, useEffect } from 'react';
import kepllerImage from 'figma:asset/bc67d64e07c0a8fb8946fd8f02586a2ee5ac3b44.png';
import bagietyImage from 'figma:asset/5cf7f576ebbcf82b1eb1506d9ebfc2d7e8073ada.png';
import maisonImage from 'figma:asset/6fca7eaf2914fc7dc12d64abb36a99add525826d.png';
import thawImage from 'figma:asset/e7cd7cd8e24ecba92aa8cfa2a809b07cc35fe561.png';

const portfolioItems = [
  {
    title: 'Kepller - IT & Telekomunikacja',
    category: 'Design',
    description: 'Profesjonalna strona dla firmy telekomunikacyjnej z nowoczesnym designem i strukturą',
    image: kepllerImage,
    gradient: 'from-slate-500 to-zinc-600',
    link: 'https://kepller.pl/',
    useImageWithFallback: false,
  },
  {
    title: 'Bagiety - Playful Brand Experience',
    category: 'Design',
    description: 'Kreatywna strona z interaktywnymi elementami oraz świeżym podejściem do brandu',
    image: bagietyImage,
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://primer-split-03182146.figma.site',
    useImageWithFallback: false,
  },
  {
    title: 'Maison - Baked with Soul',
    category: 'Design',
    description: 'Elegancka strona dla piekarni z artystyczną prezentacją produktów i ciepłą, craftową atmosferą',
    image: maisonImage,
    gradient: 'from-amber-500 to-orange-500',
    link: 'https://safari-anchor-00699964.figma.site',
    useImageWithFallback: false,
  },
  {
    title: 'FlowMint',
    category: 'Design',
    description: 'Nowoczesna strona brandowa z unikalnym designem, premium animacjami i UX',
    image: thawImage,
    gradient: 'from-purple-500 to-pink-500',
    link: 'https://thaw-cider-52691793.figma.site',
    useImageWithFallback: false,
  },
];

export function PortfolioSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollToMore = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.scrollWidth / 2;
      containerRef.current.scrollTo({
        left: scrollPosition + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollToLess = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.scrollWidth / 2;
      containerRef.current.scrollTo({
        left: scrollPosition - scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      const handleScroll = () => {
        setScrollPosition(currentRef.scrollLeft);
        setMaxScroll(currentRef.scrollWidth - currentRef.clientWidth);
      };
      currentRef.addEventListener('scroll', handleScroll);
      // Initialize maxScroll
      setMaxScroll(currentRef.scrollWidth - currentRef.clientWidth);
      return () => {
        currentRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  // Calculate visible items based on scroll position
  const itemWidth = containerRef.current ? containerRef.current.scrollWidth / portfolioItems.length : 0;
  const visibleStartIndex = Math.floor(scrollPosition / itemWidth);
  const hiddenItemsLeft = visibleStartIndex;
  const hiddenItemsRight = Math.max(0, portfolioItems.length - visibleStartIndex - 3);
  
  return (
    <section id="portfolio" className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-visible">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
          >
            <span className="text-cyan-300 text-xs sm:text-sm font-medium uppercase tracking-wider">
              Realizacje
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Zobacz, jak wspieramy rozwój innych firm
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto px-4"
          >
            Każdy projekt to wyjątkowa historia. Sprawdź kilka przykładów, w których nasze strony i automatyzacje realnie usprawniły pracę i rozwój biznesu naszych klientów.
          </motion.p>
        </div>

        {/* Portfolio horizontal scroll container */}
        <div className="relative py-8">
          <div 
            ref={containerRef}
            className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide py-4 px-4 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] min-w-[280px] sm:min-w-[320px]"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden p-4">
                      {item.useImageWithFallback ? (
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div
                          className={`px-3 py-1 bg-gradient-to-r ${item.gradient} rounded-full text-white text-xs font-semibold`}
                        >
                          {item.category}
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ExternalLink className="w-8 h-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} group-hover:w-full transition-all duration-500`}
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Scroll Right Arrow Button with Counter */}
          {hiddenItemsRight > 0 && (
            <motion.button
              onClick={scrollToMore}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              className="group/arrow absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              <span className="text-cyan-300 font-semibold text-sm">+{hiddenItemsRight}</span>
              <ArrowRight className="w-6 h-6 text-cyan-300" />
            </motion.button>
          )}

          {/* Scroll Left Arrow Button with Counter */}
          {hiddenItemsLeft > 0 && (
            <motion.button
              onClick={scrollToLess}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              className="group/arrow absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              <ArrowLeft className="w-6 h-6 text-cyan-300" />
              <span className="text-cyan-300 font-semibold text-sm">+{hiddenItemsLeft}</span>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
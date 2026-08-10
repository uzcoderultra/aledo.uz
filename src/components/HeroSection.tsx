import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Compass, Sparkles, Layers } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface HeroProps {
  currentLang: Language;
  onOpenCatalog: () => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({
  currentLang,
  onOpenCatalog,
  onExploreProjects
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);
  const t = ALEDO_TRANSLATIONS[currentLang];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 bg-[#0A0A0A] overflow-hidden select-none"
    >
      {/* Dynamic Interactive Architectural Lighting Canvas / Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Background Architectural Interior Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')`,
            transform: `translate(${(mousePos.x - 0.5) * -15}px, ${(mousePos.y - 0.5) * -15}px) scale(1.05)`
          }}
        />

        {/* Heavy Dark Vignette & Architectural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/80" />

        {/* Dynamic Light Spot following cursor */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-300 ease-out blur-[120px] mix-blend-screen opacity-70"
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            width: '600px',
            height: '600px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(232, 196, 90, 0.45) 0%, rgba(232, 196, 90, 0.1) 50%, transparent 80%)'
          }}
        />

        {/* Clean, high-contrast dark architectural backdrop without dot texture */}
      </div>

      {/* Top Hero Brand Subtitle Tag */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 w-full flex justify-between items-center pt-4 sm:pt-6 mb-2 sm:mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8C45A] animate-pulse shrink-0" />
          <span className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#E8C45A]">
            {t.heroSubLabel}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:flex items-center gap-6 text-xs font-mono text-[#A6A39D]"
        >
          <div className="flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#E8C45A] animate-ping" />
            <span>TASHKENT STUDIO</span>
          </div>
          <span>41.2995° N, 69.2401° E</span>
        </motion.div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 w-full my-auto py-6 sm:py-10">
        <div className="max-w-6xl xl:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform: `translate(${(mousePos.x - 0.5) * 6}px, ${(mousePos.y - 0.5) * 6}px)`
            }}
          >
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-bold font-syne text-[#F5F3EE] leading-[0.95] sm:leading-[0.92] tracking-tight whitespace-pre-line uppercase text-balance">
              {t.heroHeadline}
            </h1>
          </motion.div>

          {/* Subtext and CTAs */}
          <div className="mt-8 md:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="md:col-span-6 lg:col-span-7 text-base md:text-xl font-light text-[#A6A39D] leading-relaxed max-w-2xl font-sans"
            >
              {t.heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:col-span-6 lg:col-span-5 flex flex-wrap items-center gap-4 md:justify-end"
            >
              <button
                onClick={onExploreProjects}
                className="group px-8 py-4 bg-[#E8C45A] hover:bg-white text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 flex items-center gap-3 shadow-[0_0_30px_rgba(232,196,90,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
                data-cursor="PROJECTS"
              >
                <span>{t.ctaProjects}</span>
                <span className="w-6 h-6 rounded-full bg-[#0A0A0A] text-[#E8C45A] group-hover:bg-[#0A0A0A] group-hover:text-white flex items-center justify-center transition-colors">
                  →
                </span>
              </button>

              <button
                onClick={onOpenCatalog}
                className="px-8 py-4 border border-white/20 hover:border-[#E8C45A] text-[#F5F3EE] hover:text-[#E8C45A] font-mono text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 bg-[#111111]/60 backdrop-blur-sm"
                data-cursor="CATALOG"
              >
                {t.ctaCatalog}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#A6A39D]">
        <div className="flex items-center gap-8">
          <span className="text-[#E8C45A] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            LIGHT IS ARCHITECTURE
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline">TECHNICAL & ARCHITECTURAL SPECTRUM</span>
        </div>

        <motion.button
          type="button"
          onClick={() => {
            const introEl = document.querySelector('#intro') || document.querySelector('section:nth-of-type(2)');
            if (introEl) {
              introEl.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 text-white/70 hover:text-[#E8C45A] transition-colors group cursor-pointer border-none bg-transparent outline-none py-1"
          aria-label="Scroll to discover content"
        >
          <span className="tracking-widest font-mono text-[11px] sm:text-xs">
            {currentLang === 'UZ' ? 'KASHF ETISH UCHUN PASTDAN QORING' : 'SCROLL TO DISCOVER'}
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:border-[#E8C45A]/50 group-hover:bg-[#E8C45A]/10 flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowDownRight className="w-3.5 h-3.5 text-[#E8C45A] group-hover:translate-y-0.5 transition-transform" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

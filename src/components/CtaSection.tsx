import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface CtaSectionProps {
  currentLang: Language;
  onOpenDiscuss: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ currentLang, onOpenDiscuss }) => {
  const t = ALEDO_TRANSLATIONS[currentLang];

  return (
    <section className="relative py-28 sm:py-36 md:py-56 px-4 sm:px-6 md:px-16 bg-[#0A0A0A] text-[#F5F3EE] overflow-hidden border-t border-white/10 flex flex-col justify-center items-center text-center">
      {/* Subtle Golden Glow Halo behind typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[900px] h-[320px] sm:h-[600px] md:h-[900px] bg-[#E8C45A]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl relative z-10 space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#E8C45A] px-3.5 sm:px-4 py-1.5 rounded-full bg-[#111111] border border-white/10"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{t.ctaLabel}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-6xl md:text-8xl lg:text-[110px] font-bold font-syne uppercase tracking-tight leading-[1.05] sm:leading-[0.92] text-[#F5F3EE] whitespace-pre-line text-balance"
        >
          {t.ctaHeadline}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-6"
        >
          <button
            onClick={onOpenDiscuss}
            className="group px-10 py-5 bg-[#E8C45A] hover:bg-white text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 inline-flex items-center gap-4 shadow-[0_0_40px_rgba(232,196,90,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]"
            data-cursor="CONTACT"
          >
            <span>{t.ctaButton}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

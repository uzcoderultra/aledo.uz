import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface IntroductionProps {
  currentLang: Language;
}

export const IntroductionSection: React.FC<IntroductionProps> = ({ currentLang }) => {
  const t = ALEDO_TRANSLATIONS[currentLang];

  return (
    <section id="intro" className="relative py-32 md:py-48 px-6 md:px-16 bg-[#F5F3EE] text-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-12 h-[1px] bg-[#0A0A0A]/40" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#0A0A0A]/70 font-semibold">
            ALEDO MANIFESTO
          </span>
        </div>

        {/* Large Typographic Reveal */}
        <div className="space-y-6 md:space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[105px] font-bold font-syne tracking-tight leading-[0.95] uppercase text-[#0A0A0A]"
          >
            {t.introText1}
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[105px] font-bold font-syne tracking-tight leading-[0.95] uppercase text-[#E8C45A] bg-[#0A0A0A] text-[#F5F3EE] p-4 md:p-8 rounded-2xl inline-block shadow-xl"
          >
            {t.introText2}
          </motion.h2>
        </div>

        {/* Additional Editorial Paragraph */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#0A0A0A]/10 pt-12">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/60">
            [ PHILOSOPHY ]
          </div>
          <p className="md:col-span-8 text-lg md:text-2xl font-light text-[#0A0A0A]/80 leading-relaxed max-w-3xl font-sans">
            Свет — это четвертое измерение архитектуры. Мы объединяем светотехнический инжиниринг, прецизионную оптику и архитектурное понимание формы, чтобы каждое пространство проявляло свою истинную эмоцию.
          </p>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface AledoNumbersProps {
  currentLang: Language;
}

export const AledoNumbers: React.FC<AledoNumbersProps> = ({ currentLang }) => {
  const t = ALEDO_TRANSLATIONS[currentLang];

  const stats = [
    {
      value: "100+",
      label: t.statSpec,
      tag: "ENGINEERING & DESIGN TEAM"
    },
    {
      value: "60 000",
      label: t.statFixtures,
      tag: "ANNUAL CAPACITY"
    },
    {
      value: "100 000 м²",
      label: t.statSpace,
      tag: "LIGHTING PORTFOLIO"
    }
  ];

  return (
    <section id="company" className="py-24 md:py-36 px-6 md:px-16 bg-[#0A0A0A] text-[#F5F3EE] border-t border-b border-white/10">
      <div className="max-w-[1700px] mx-auto">
        {/* Section Tag */}
        <div className="flex items-center justify-between mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#E8C45A]" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#A6A39D]">
              ALEDO SCALE & EXPERTISE
            </span>
          </div>
          <span className="text-xs font-mono text-[#A6A39D]">01 // METRICS</span>
        </div>

        {/* Editorial Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="flex flex-col justify-between pt-6 border-t border-white/15 relative group"
            >
              {/* Subtle top golden line animation */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#E8C45A] group-hover:w-full transition-all duration-500" />

              <div className="text-[10px] font-mono tracking-widest text-[#E8C45A] mb-4 uppercase">
                {stat.tag}
              </div>

              <div className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-syne text-[#F5F3EE] tracking-tight group-hover:text-[#E8C45A] transition-colors duration-300">
                {stat.value}
              </div>

              <div className="mt-6 text-sm md:text-lg font-light text-[#A6A39D] font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

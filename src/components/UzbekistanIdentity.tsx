import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Compass, Landmark, Hotel, Utensils, Home } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface UzbekistanIdentityProps {
  currentLang: Language;
}

export const UzbekistanIdentity: React.FC<UzbekistanIdentityProps> = ({ currentLang }) => {
  const t = ALEDO_TRANSLATIONS[currentLang];

  const pillars = [
    {
      icon: Building2,
      title: "ТАШКЕНТ-СИТИ И ДЕЛОВЫЕ ЦЕНТРЫ",
      desc: "Фасадная архитектурная подсветка высотных зданий и атриумов класса A+."
    },
    {
      icon: Hotel,
      title: "ПРЕМИАЛЬНЫЙ HORECA & ОТЕЛИ",
      desc: "Атмосферный свет для международной HoReCa в Самарканде, Ташкенте и Бухаре."
    },
    {
      icon: Home,
      title: "ЧАСТНЫЕ РЕЗИДЕНЦИИ И ВИЛЛЫ",
      desc: "Бесшовный внутренний и ландшафтный свет с автоматизацией сценариев."
    },
    {
      icon: Landmark,
      title: "КУЛЬТУРНЫЕ ОБЪЕКТЫ И МУЗЕИ",
      desc: "Музейный свет высочайшего качества без ультрафиолетового излучения."
    }
  ];

  return (
    <section className="py-20 sm:py-28 md:py-40 px-4 sm:px-6 md:px-16 bg-[#0E0E0E] text-[#F5F3EE] border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-12 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-[#E8C45A] shrink-0" />
            <span className="text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#E8C45A]">
              NATIONAL CONTEXT // UZBEKISTAN
            </span>
          </div>

          <h2 className="text-3xl sm:text-6xl md:text-7xl font-bold font-syne uppercase tracking-tight text-white leading-tight mb-8">
            {t.uzbekIdentityTitle}
          </h2>

          <p className="text-lg md:text-2xl font-light text-[#A6A39D] leading-relaxed font-sans">
            {t.uzbekIdentityDesc}
          </p>
        </div>

        {/* Uzbekistan Modern Architecture Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#141414] p-8 rounded-2xl border border-white/10 hover:border-[#E8C45A]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="p-4 rounded-xl bg-[#1C1C1C] text-[#E8C45A] w-fit mb-6 group-hover:bg-[#E8C45A] group-hover:text-[#0A0A0A] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-syne text-white mb-3 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A6A39D] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-[10px] font-mono text-[#E8C45A] tracking-widest uppercase">
                  ALEDO UZBEKISTAN
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowUpRight, X, User } from 'lucide-react';
import { Language, EducationalArticle } from '../types';
import { ALEDO_TRANSLATIONS, EDUCATIONAL_ARTICLES } from '../data/aledoData';

interface SvetovayaSredaEducationProps {
  currentLang: Language;
}

export const SvetovayaSredaEducation: React.FC<SvetovayaSredaEducationProps> = ({ currentLang }) => {
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const t = ALEDO_TRANSLATIONS[currentLang];

  return (
    <section id="education" className="py-20 sm:py-28 md:py-44 px-4 sm:px-6 md:px-16 bg-[#0E0E0E] text-[#F5F3EE] border-t border-b border-white/10">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E8C45A] shrink-0" />
              <span className="text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#E8C45A]">
                EDUCATION & RESEARCH HUB
              </span>
            </div>
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-bold font-syne uppercase tracking-tight text-white leading-tight">
              {t.educationTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base font-light text-[#A6A39D]">
            {currentLang === 'UZ'
              ? "ALEDO ta'lim va tadqiqot tashabbusi. O'zbekiston arxitektorlari uchun yoritish dizayni bo'yicha ma'ruzalar, vorkshoplar, qo'llanmalar va ilmiy maqolalar."
              : "Образовательная и исследовательская инициатива ALEDO. Лекции, воркшопы, гайды и научные статьи по световому дизайну для архитекторов Узбекистана."}
          </p>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATIONAL_ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden hover:border-[#E8C45A]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              data-cursor="READ"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md text-[10px] font-mono text-[#E8C45A] border border-white/10 uppercase tracking-widest">
                    {currentLang === 'UZ' && article.typeUZ ? article.typeUZ : article.type}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#E8C45A] mb-3 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E8C45A]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E8C45A]" />
                      {currentLang === 'UZ' && article.readTimeUZ ? article.readTimeUZ : article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-syne text-white group-hover:text-[#E8C45A] transition-colors mb-3 leading-snug">
                    {currentLang === 'UZ' && article.titleUZ ? article.titleUZ : article.title}
                  </h3>

                  <p className="text-sm text-[#CCCCCC] leading-relaxed line-clamp-3">
                    {currentLang === 'UZ' && article.excerptUZ ? article.excerptUZ : article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-[#E8C45A]">
                <span>{t.readMaterial}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#141414] border border-white/15 rounded-3xl p-6 md:p-12 my-8 text-[#F5F3EE]"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-[#0A0A0A] text-white transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <span className="px-3 py-1 bg-[#E8C45A]/10 text-[#E8C45A] border border-[#E8C45A]/30 font-mono text-xs font-bold rounded-full uppercase tracking-widest">
                  {currentLang === 'UZ' && selectedArticle.typeUZ ? selectedArticle.typeUZ : selectedArticle.type}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-syne text-white mt-4 leading-tight">
                  {currentLang === 'UZ' && selectedArticle.titleUZ ? selectedArticle.titleUZ : selectedArticle.title}
                </h2>
                {selectedArticle.speaker && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E8C45A] mt-3">
                    <User className="w-3.5 h-3.5" />
                    <span>{currentLang === 'UZ' && selectedArticle.speakerUZ ? selectedArticle.speakerUZ : selectedArticle.speaker}</span>
                  </div>
                )}
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-[#0A0A0A]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm md:text-base font-light text-[#A6A39D] leading-relaxed font-sans">
                <p>{currentLang === 'UZ' && selectedArticle.excerptUZ ? selectedArticle.excerptUZ : selectedArticle.excerpt}</p>
                <p>
                  {currentLang === 'UZ'
                    ? "Sifatli nur optika fizika qonunlari, inson ko'rish neyrobiologiyasi va arxitektorning fazoviy shakli kesishmasida yaratiladi. ALEDO Tashkent ta'lim seriyasi doirasida biz asosiy fizik metrikalarni tahlil qilamiz: TM-30-18, UGR ko'zga urishi, devorlarni bir maromda yoritish va DALI-2 boshqaruv protokollari."
                    : "Качественный свет создается на стыке физических законов оптики, нейробиологии человеческого зрения и пространственной формы архитектора. В рамках образовательной серии ALEDO Tashkent мы разбираем ключевые физические метрики: TM-30-18, дискомфортную слепимость UGR, равномерность мытья стен и протоколы управления DALI-2."}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
                <span className="text-xs font-mono text-[#A6A39D]">ALEDO ACADEMY TASHKENT</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 bg-[#E8C45A] text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest rounded-full"
                >
                  {t.closeMaterial}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

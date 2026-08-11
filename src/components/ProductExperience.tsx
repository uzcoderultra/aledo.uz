import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Download, Eye, Sparkles, ArrowUpRight, Layers, Home, Sun, Cpu } from 'lucide-react';
import { Language, ProductItem } from '../types';
import { ALEDO_TRANSLATIONS, ALEDO_PRODUCTS } from '../data/aledoData';

interface ProductExperienceProps {
  currentLang: Language;
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductExperience: React.FC<ProductExperienceProps> = ({
  currentLang,
  onSelectProduct
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'outdoor' | 'systems' | 'special'>('all');
  const t = ALEDO_TRANSLATIONS[currentLang];

  const categoryCounts = {
    all: ALEDO_PRODUCTS.length,
    interior: ALEDO_PRODUCTS.filter(p => p.category === 'interior').length,
    outdoor: ALEDO_PRODUCTS.filter(p => p.category === 'outdoor').length,
    systems: ALEDO_PRODUCTS.filter(p => p.category === 'systems').length,
    special: ALEDO_PRODUCTS.filter(p => p.category === 'special').length,
  };

  const categories = [
    { 
      id: 'all', 
      name: currentLang === 'UZ' ? 'Barcha kategoriyalar' : 'Все категории',
      shortName: currentLang === 'UZ' ? 'Barchasi' : 'Все категории',
      icon: Layers,
      count: categoryCounts.all,
      sub: currentLang === 'UZ' ? 'To\'liq katalog' : 'Полный каталог' 
    },
    { 
      id: 'interior', 
      name: t.catInterior, 
      shortName: t.catInterior,
      icon: Home,
      count: categoryCounts.interior,
      sub: currentLang === 'UZ' ? 'Trek • O\'rnatiladigan • Osma' : 'Трековые • Встраиваемые • Подвесные' 
    },
    { 
      id: 'outdoor', 
      name: t.catOutdoor, 
      shortName: t.catOutdoor,
      icon: Sun,
      count: categoryCounts.outdoor,
      sub: currentLang === 'UZ' ? 'Projektorlar • Ustunchalar • Devoriy' : 'Прожекторы • Болларды • Настенные' 
    },
    { 
      id: 'systems', 
      name: t.catSystems, 
      shortName: t.catSystems,
      icon: Cpu,
      count: categoryCounts.systems,
      sub: currentLang === 'UZ' ? 'Profil • Boshqaruv • Lentalar' : 'Профиль • Управление • Ленты' 
    },
    { 
      id: 'special', 
      name: t.catSpecial, 
      shortName: currentLang === 'UZ' ? 'Maxsus' : 'Спец. решения',
      icon: Sparkles,
      count: categoryCounts.special,
      sub: currentLang === 'UZ' ? 'Kastomizatsiya • Effektlar' : 'Кастомизация • Эффекты' 
    },
  ];

  const filteredProducts = activeCategory === 'all'
    ? ALEDO_PRODUCTS
    : ALEDO_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-20 sm:py-28 md:py-40 px-4 sm:px-6 md:px-16 bg-[#111111] text-[#F5F3EE]">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-16 border-b border-white/10 pb-8 sm:pb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E8C45A] shrink-0" />
              <span className="text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#E8C45A]">
                ALEDO ECOSYSTEM
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syne uppercase tracking-tight text-[#F5F3EE] leading-tight">
              {t.toolsHeadline}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base font-light text-[#A6A39D]">
            {t.toolsSubheading}
          </p>
        </div>

        {/* Category Filter Selector */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center justify-between text-xs font-mono text-[#A6A39D] uppercase tracking-widest mb-4">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C45A]" />
              {currentLang === 'UZ' ? 'Kategoriya bo\'yicha saralash:' : 'Фильтр по категориям:'}
            </span>
            <span className="text-[#E8C45A] font-bold">
              {filteredProducts.length} {currentLang === 'UZ' ? 'ta model' : 'моделей'}
            </span>
          </div>

          <div 
            className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 pb-6 border-b border-white/10" 
            role="tablist" 
            aria-label="Product categories"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const isAll = cat.id === 'all';
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${cat.name}`}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`min-h-[46px] px-3.5 sm:px-4 py-2.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-between gap-2 border w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] touch-manipulation active:scale-[0.98] cursor-pointer ${
                    isAll ? 'col-span-2 lg:col-span-1' : 'col-span-1'
                  } ${
                    isActive
                      ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold shadow-[0_0_20px_rgba(232,196,90,0.35)] border-[#E8C45A]'
                      : 'bg-[#1C1C1C] text-[#A6A39D] hover:text-white hover:border-white/20 border-white/10 active:bg-[#2A2A2A]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0A0A0A]' : 'text-[#E8C45A]'}`} />
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    isActive ? 'bg-[#0A0A0A]/20 text-[#0A0A0A]' : 'bg-white/10 text-[#E8C45A]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Product Cards Grid - Smooth Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[350px]"
          >
            {filteredProducts.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              aria-label={`View product details for ${product.name}`}
              onClick={() => onSelectProduct(product)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProduct(product);
                }
              }}
              className="group relative bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#E8C45A]/50 transition-all duration-300 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]"
              data-cursor="EXPLORE"
            >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent opacity-80" />

                  {/* Subcategory Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md text-xs font-mono font-medium text-[#E8C45A] border border-white/15 uppercase tracking-widest shadow-md">
                    {currentLang === 'UZ' && product.subcategoryUZ ? product.subcategoryUZ : product.subcategory}
                  </div>

                  {product.featured && (
                    <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#E8C45A] text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
                      FLAGSHIP
                    </div>
                  )}
                </div>

                {/* Content info */}
                <div className="p-6 md:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-syne text-white group-hover:text-[#E8C45A] transition-colors mb-3">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base text-[#D4D2CC] leading-relaxed mb-6">
                      {currentLang === 'UZ' && product.descriptionUZ ? product.descriptionUZ : product.description}
                    </p>
                  </div>

                  {/* Specs Quick Strip */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-mono text-[#CCCCCC]">
                    <div>
                      <span className="block text-[#B8B5AD] text-[10px] md:text-xs font-mono tracking-wider uppercase mb-0.5">CRI / SPECTRUM</span>
                      <span className="text-white font-semibold text-xs md:text-sm">{product.specs.cri}</span>
                    </div>
                    <div>
                      <span className="block text-[#B8B5AD] text-[10px] md:text-xs font-mono tracking-wider uppercase mb-0.5">POWER</span>
                      <span className="text-white font-semibold text-xs md:text-sm">{product.specs.power}</span>
                    </div>
                    <div>
                      <span className="block text-[#B8B5AD] text-[10px] md:text-xs font-mono tracking-wider uppercase mb-0.5">COLOR TEMP</span>
                      <span className="text-white font-semibold text-xs md:text-sm">{product.specs.colorTemp}</span>
                    </div>
                    <div>
                      <span className="block text-[#B8B5AD] text-[10px] md:text-xs font-mono tracking-wider uppercase mb-0.5">OPTICS</span>
                      <span className="text-white font-semibold text-xs md:text-sm">{product.specs.beamAngle}</span>
                    </div>
                  </div>

                  {/* View Details CTA */}
                  <div className="mt-6 flex items-center justify-between text-xs md:text-sm font-mono font-semibold text-[#E8C45A] pt-4 border-t border-white/10">
                    <span className="uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      {t.moreDetails}
                    </span>
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
            </div>
          ))}
        </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

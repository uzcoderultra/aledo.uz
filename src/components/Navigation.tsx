import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calculator, Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';
import { AledoLogo } from './AledoLogo';

interface NavigationProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
  onOpenCalculator: () => void;
  onOpenDiscuss: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSearch,
  onOpenCalculator,
  onOpenDiscuss
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = ALEDO_TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navProducts, href: '#products' },
    { label: t.navProjects, href: '#projects' },
    { label: currentLang === 'UZ' ? 'Ssenariylar' : 'Сценарии', href: '#scenarios' },
    { label: t.navSolutions, href: '#solutions' },
    { label: t.navCompany, href: '#company' },
    { label: t.navEnvironment, href: '#education' },
    { label: t.navContacts, href: '#contacts' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 xl:px-12 flex items-center justify-between">
          {/* Logo with responsive height */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group transition-transform duration-300 hover:scale-[1.02] shrink-0"
            data-cursor="ALEDO.UZ"
          >
            {/* Responsive Logo sizing for mobile, tablet, laptop, and desktop */}
            <div className="hidden 2xl:block">
              <AledoLogo height={isScrolled ? 42 : 52} showBadge={true} />
            </div>
            <div className="hidden xl:block 2xl:hidden">
              <AledoLogo height={isScrolled ? 38 : 46} showBadge={true} />
            </div>
            <div className="hidden md:block xl:hidden">
              <AledoLogo height={isScrolled ? 36 : 42} showBadge={true} />
            </div>
            <div className="block md:hidden">
              <AledoLogo height={isScrolled ? 30 : 36} showBadge={true} />
            </div>
          </a>

          {/* Desktop & Laptop Navigation Links - Responsive gaps and font sizes */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 2xl:gap-9 shrink mx-2 xl:mx-4">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(link.href)}
                className="text-[10.5px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] font-mono text-[#A6A39D] hover:text-[#F5F3EE] whitespace-nowrap transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#E8C45A] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#1C1C1C]/80 rounded-full p-0.5 sm:p-1 border border-white/10 text-[11px] sm:text-xs font-mono" role="group" aria-label="Language selector">
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                aria-label="Switch language to Russian"
                aria-pressed={currentLang === 'RU'}
                onClick={() => onLanguageChange('RU')}
                className={`relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] ${
                  currentLang === 'RU'
                    ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold shadow-sm'
                    : 'text-[#A6A39D] hover:text-white'
                }`}
              >
                RU
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                aria-label="Switch language to Uzbek"
                aria-pressed={currentLang === 'UZ'}
                onClick={() => onLanguageChange('UZ')}
                className={`relative px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] ${
                  currentLang === 'UZ'
                    ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold shadow-sm'
                    : 'text-[#A6A39D] hover:text-white'
                }`}
              >
                UZ
              </motion.button>
            </div>

            {/* Search Trigger */}
            <button
              type="button"
              aria-label="Open search and catalog modal"
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full bg-[#1C1C1C]/60 hover:bg-[#E8C45A]/20 text-[#A6A39D] hover:text-[#E8C45A] transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              title="Поиск и Каталог"
              data-cursor="SEARCH"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            </button>

            {/* Calculator Trigger */}
            <button
              type="button"
              aria-label="Open lighting express calculator"
              onClick={onOpenCalculator}
              className="p-2 sm:p-2.5 rounded-full bg-[#1C1C1C]/60 hover:bg-[#E8C45A]/20 text-[#A6A39D] hover:text-[#E8C45A] transition-all border border-white/10 hidden sm:flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              title="Калькулятор света"
              data-cursor="CALC"
            >
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            </button>

            {/* Discuss CTA */}
            <button
              type="button"
              aria-label="Discuss project with ALEDO engineers"
              onClick={onOpenDiscuss}
              className="hidden xl:flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 bg-[#F5F3EE] hover:bg-[#E8C45A] text-[#0A0A0A] text-[11px] xl:text-xs font-mono font-semibold uppercase tracking-wider xl:tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,196,90,0.4)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              data-cursor="CONTACT"
            >
              <span>{t.navDiscuss}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Mobile / Laptop Drawer Menu Toggle */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-full bg-[#1C1C1C] text-white border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-28 px-8 pb-12 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="text-[10px] font-mono tracking-widest text-[#E8C45A] uppercase border-b border-white/10 pb-2">
                ALEDO UZBEKISTAN / NAV
              </div>
              <div className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(link.href)}
                    className="text-2xl font-syne text-left text-[#F5F3EE] hover:text-[#E8C45A] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1C1C1C] text-white font-mono text-xs flex items-center justify-between border border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#E8C45A]" />
                  {t.navCalculator}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDiscuss();
                }}
                className="w-full py-4 rounded-xl bg-[#E8C45A] text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {t.navDiscuss}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

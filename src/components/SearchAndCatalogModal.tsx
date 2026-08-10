import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Download, FileText, ArrowRight } from 'lucide-react';
import { ALEDO_PRODUCTS, ALEDO_PROJECTS, ALEDO_TRANSLATIONS } from '../data/aledoData';
import { Language } from '../types';

interface SearchAndCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: any) => void;
  onSelectProject: (pr: any) => void;
  currentLang: Language;
}

export const SearchAndCatalogModal: React.FC<SearchAndCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectProject,
  currentLang
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const t = ALEDO_TRANSLATIONS[currentLang];

  const filteredProducts = ALEDO_PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    const nameMatch = p.name.toLowerCase().includes(q);
    const catMatch = p.category.toLowerCase().includes(q);
    const descMatch = p.description.toLowerCase().includes(q);
    const descUZMatch = p.descriptionUZ ? p.descriptionUZ.toLowerCase().includes(q) : false;
    return nameMatch || catMatch || descMatch || descUZMatch;
  });

  const filteredProjects = ALEDO_PROJECTS.filter(p => {
    const q = query.toLowerCase();
    const titleMatch = p.title.toLowerCase().includes(q);
    const locMatch = p.location.toLowerCase().includes(q);
    const catMatch = p.category.toLowerCase().includes(q);
    const descMatch = p.description.toLowerCase().includes(q);
    const descUZMatch = p.descriptionUZ ? p.descriptionUZ.toLowerCase().includes(q) : false;
    return titleMatch || locMatch || catMatch || descMatch || descUZMatch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Search and Architectural Assets Modal"
        className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col p-6 md:p-12 overflow-y-auto"
      >
        <div className="max-w-5xl mx-auto w-full relative">
          {/* Top Close */}
          <button
            type="button"
            aria-label="Close search modal"
            onClick={onClose}
            className="absolute top-0 right-0 p-3 rounded-full bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-black text-white transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Search Input */}
          <div className="pt-8 mb-12">
            <span className="text-xs font-mono text-[#E8C45A] uppercase tracking-widest block mb-3">
              ALEDO SEARCH & ARCHITECTURAL ASSETS
            </span>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-6 h-6 text-[#E8C45A]" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={query}
                aria-label="Search luminaires, projects, IES, BIM files"
                onChange={(e) => setQuery(e.target.value)}
                placeholder={currentLang === 'UZ' ? "Yoritgichlar, loyihalar, IES, BIM fayllarini qidirish..." : "Поиск светильников, проектов, файлов IES, BIM..."}
                className="w-full bg-[#141414] border border-white/20 focus:border-[#E8C45A] rounded-2xl py-5 pl-14 pr-6 text-lg md:text-2xl font-syne text-white placeholder-[#A6A39D] outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              />
            </div>
          </div>

          {/* Quick Downloads Strip */}
          <div className="mb-12 bg-[#121212] p-6 rounded-2xl border border-white/10">
            <h3 className="text-xs font-mono text-[#E8C45A] uppercase tracking-widest mb-4">
              {currentLang === 'UZ' ? "TEZKOR KATALOGLAR VA B2B FAYLLAR" : "БЫСТРЫЕ КАТАЛОГИ И B2B ФАЙЛЫ"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(currentLang === 'UZ' ? "Master Catalogue ALEDO Uzbekistan yuklanmoqda (PDF, 42MB)." : "Загрузка Master Catalogue ALEDO Uzbekistan (PDF, 42MB) заложена.");
                }}
                className="p-4 rounded-xl bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-black text-white transition-all flex items-center justify-between border border-white/10 group"
              >
                <div>
                  <span className="block text-xs font-bold font-syne">ALEDO MASTER 2025/2026</span>
                  <span className="text-[10px] font-mono opacity-70">PDF Catalog (42 MB)</span>
                </div>
                <Download className="w-4 h-4 text-[#E8C45A] group-hover:text-black" />
              </a>

              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(currentLang === 'UZ' ? "DIALux Evo plaginlari va IES fayllari bazasi yuklanmoqda." : "Загрузка базы плагинов DIALux Evo и файлов IES заложена.");
                }}
                className="p-4 rounded-xl bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-black text-white transition-all flex items-center justify-between border border-white/10 group"
              >
                <div>
                  <span className="block text-xs font-bold font-syne">DIALUX & IES DATABASE</span>
                  <span className="text-[10px] font-mono opacity-70">ZIP Archive (120 MB)</span>
                </div>
                <Download className="w-4 h-4 text-[#E8C45A] group-hover:text-black" />
              </a>

              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(currentLang === 'UZ' ? "REVIT BIM modellar oilasi yuklanmoqda." : "Загрузка семейства моделей REVIT BIM заложена.");
                }}
                className="p-4 rounded-xl bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-black text-white transition-all flex items-center justify-between border border-white/10 group"
              >
                <div>
                  <span className="block text-xs font-bold font-syne">REVIT BIM FAMILIES</span>
                  <span className="text-[10px] font-mono opacity-70">RVT Library (85 MB)</span>
                </div>
                <Download className="w-4 h-4 text-[#E8C45A] group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Search Results */}
          {query.trim() && (
            <div className="space-y-8">
              {/* Products Match */}
              <div>
                <h4 className="text-xs font-mono text-[#A6A39D] uppercase tracking-widest mb-4">
                  {currentLang === 'UZ' ? `MAHSULOTLAR (${filteredProducts.length})` : `ПРОДУКТЫ (${filteredProducts.length})`}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map(p => (
                    <div
                      key={p.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`View product details for ${p.name}`}
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onClose();
                          onSelectProduct(p);
                        }
                      }}
                      className="p-4 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-white/10 cursor-pointer flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
                    >
                      <div>
                        <span className="text-xs font-mono text-[#E8C45A] uppercase block">
                          {currentLang === 'UZ' && p.subcategoryUZ ? p.subcategoryUZ : p.subcategory}
                        </span>
                        <span className="text-sm font-bold font-syne text-white">{p.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A6A39D]" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Match */}
              <div>
                <h4 className="text-xs font-mono text-[#A6A39D] uppercase tracking-widest mb-4">
                  {currentLang === 'UZ' ? `LOYIHALAR (${filteredProjects.length})` : `ПРОЕКТЫ (${filteredProjects.length})`}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProjects.map(pr => (
                    <div
                      key={pr.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`View project details for ${pr.title}`}
                      onClick={() => {
                        onClose();
                        onSelectProject(pr);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onClose();
                          onSelectProject(pr);
                        }
                      }}
                      className="p-4 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-white/10 cursor-pointer flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
                    >
                      <div>
                        <span className="text-xs font-mono text-[#E8C45A] uppercase block">{pr.location}</span>
                        <span className="text-sm font-bold font-syne text-white">{pr.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A6A39D]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

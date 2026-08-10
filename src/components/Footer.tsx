import React from 'react';
import { Language } from '../types';
import { AledoLogo } from './AledoLogo';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDiscuss: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onLanguageChange, onOpenDiscuss }) => {
  return (
    <footer id="contacts" className="bg-[#050505] text-[#F5F3EE] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Logo & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <AledoLogo height={58} showBadge={true} />
            <p className="text-xs font-mono text-[#A6A39D] max-w-sm uppercase tracking-widest leading-relaxed pt-2">
              LIGHT IS ARCHITECTURE.
              <br />
              Узбекистан, г. Ташкент, ул. Нукус, 29B
            </p>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[#E8C45A] uppercase tracking-widest block mb-4">ПРОДУКЦИЯ</span>
            <ul className="space-y-2 text-[#A6A39D]">
              <li><a href="#products" className="hover:text-white transition-colors">Интерьерный свет</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Уличный свет</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Профильные системы</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Управление DALI/Casambi</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[#E8C45A] uppercase tracking-widest block mb-4">КОМПАНИЯ</span>
            <ul className="space-y-2 text-[#A6A39D]">
              <li><a href="#projects" className="hover:text-white transition-colors">Портфолио проектов</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Световой инжиниринг</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Световая среда</a></li>
              <li><button onClick={onOpenDiscuss} className="hover:text-white transition-colors text-left">Обсудить проект</button></li>
            </ul>
          </div>

          {/* Links 3 - Socials */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#E8C45A] uppercase tracking-widest block mb-4">КОНТАКТЫ & SOCIAL</span>
            <ul className="space-y-2 text-[#A6A39D]">
              <li><a href="tel:+998712000088" className="hover:text-white transition-colors">+998 (71) 200-00-88</a></li>
              <li><a href="mailto:tashkent@aledo.uz" className="hover:text-white transition-colors">tashkent@aledo.uz</a></li>
              <li><a href="https://t.me/aledo_uz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Telegram @aledo_uz</a></li>
              <li><a href="https://instagram.com/aledo.uz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram @aledo.uz</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-[#A6A39D]">
          <div>
            © {new Date().getFullYear()} ALEDO UZBEKISTAN. All Rights Reserved. Architectural & Technical Lighting.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onLanguageChange('RU')}
              className={`hover:text-white transition-colors ${currentLang === 'RU' ? 'text-[#E8C45A] font-bold' : ''}`}
            >
              RU
            </button>
            <span>/</span>
            <button
              onClick={() => onLanguageChange('UZ')}
              className={`hover:text-white transition-colors ${currentLang === 'UZ' ? 'text-[#E8C45A] font-bold' : ''}`}
            >
              UZ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

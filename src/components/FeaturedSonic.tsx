import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface FeaturedSonicProps {
  currentLang: Language;
  onDownloadSpec: (systemName: string) => void;
}

export const FeaturedSonic: React.FC<FeaturedSonicProps> = ({ currentLang, onDownloadSpec }) => {
  const [selectedDiameter, setSelectedDiameter] = useState('93 mm');
  const [selectedPower, setSelectedPower] = useState('18 W');
  const [selectedOptics, setSelectedOptics] = useState('24°');
  const t = ALEDO_TRANSLATIONS[currentLang];

  const diameters = ['80 mm', '93 mm', '110 mm'];
  const powers = ['9 W', '14 W', '18 W', '24 W'];
  const optics = ['12°', '24°', '38°', '45°', '60°'];

  return (
    <section className="py-20 sm:py-28 md:py-40 px-4 sm:px-6 md:px-16 bg-[#0A0A0A] text-[#F5F3EE] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[800px] h-[320px] sm:h-[800px] bg-[#E8C45A]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Top Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#E8C45A]">
            FEATURED SYSTEM ARCHITECTURE
          </span>
          <span className="w-8 h-[1px] bg-[#E8C45A] shrink-0" />
        </div>

        {/* Main Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-8xl lg:text-[120px] font-bold font-syne tracking-tight text-white leading-tight sm:leading-none">
              {t.sonicHeadline}
            </h2>
            <p className="text-xl md:text-3xl font-mono text-[#E8C45A] mt-4 font-light tracking-wide">
              {t.sonicSubtitle}
            </p>
          </div>
          <div className="lg:col-span-5 text-sm md:text-base font-light text-[#A6A39D] leading-relaxed">
            Флагманская модульная световая система. Конфигурируемый корпус, магнитный фиксатор и сменные линзы позволяют изменять характер освещения без демонтажа профиля.
          </div>
        </div>

        {/* Product Visual & Configurator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Render Stage */}
          <div className="lg:col-span-7 relative bg-[#111111] rounded-3xl border border-white/15 p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[500px]">
            <div className="absolute top-6 left-6 text-[10px] font-mono tracking-widest text-[#E8C45A] uppercase border border-[#E8C45A]/30 px-3 py-1 rounded-full bg-[#E8C45A]/10">
              ALEDO DESIGN LAB
            </div>

            {/* Central Product Rendering */}
            <div className="my-auto flex justify-center items-center py-8">
              <motion.img
                key={`${selectedDiameter}-${selectedPower}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
                alt="SONIC Lighting System"
                className="max-h-[380px] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Live Configured Specs Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between items-center text-xs font-mono text-[#A6A39D] gap-4">
              <div>
                <span className="text-[#B8B5AD] block text-[10px]">DIAMETER</span>
                <span className="text-white font-bold">{selectedDiameter}</span>
              </div>
              <div>
                <span className="text-[#B8B5AD] block text-[10px]">POWER</span>
                <span className="text-white font-bold">{selectedPower}</span>
              </div>
              <div>
                <span className="text-[#B8B5AD] block text-[10px]">OPTICS</span>
                <span className="text-white font-bold">{selectedOptics}</span>
              </div>
              <div>
                <span className="text-[#B8B5AD] block text-[10px]">COLOR RENDERING</span>
                <span className="text-[#E8C45A] font-bold">CRI 98+</span>
              </div>
            </div>
          </div>

          {/* Right Configurator Controls */}
          <div className="lg:col-span-5 space-y-8 bg-[#161616] p-8 md:p-10 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold font-syne text-white uppercase border-b border-white/10 pb-4">
              КОНФИГУРАТОР СИСТЕМЫ SONIC
            </h3>

            {/* Diameter Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#A6A39D] mb-3">
                1. ДИАМЕТР КОРПУСА / DIAMETER
              </label>
              <div className="grid grid-cols-3 gap-3">
                {diameters.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDiameter(d)}
                    className={`py-3 px-4 rounded-xl text-xs font-mono transition-all ${
                      selectedDiameter === d
                        ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold shadow-md'
                        : 'bg-[#0A0A0A] text-[#A6A39D] hover:text-white border border-white/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Wattage Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#A6A39D] mb-3">
                2. МОЩНОСТЬ / POWER
              </label>
              <div className="grid grid-cols-4 gap-2">
                {powers.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPower(p)}
                    className={`py-3 rounded-xl text-xs font-mono transition-all ${
                      selectedPower === p
                        ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold shadow-md'
                        : 'bg-[#0A0A0A] text-[#A6A39D] hover:text-white border border-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Optics Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#A6A39D] mb-3">
                3. УГОЛ РАССЕИВАНИЯ / OPTICS
              </label>
              <div className="grid grid-cols-5 gap-2">
                {optics.map((o) => (
                  <button
                    key={o}
                    onClick={() => setSelectedOptics(o)}
                    className={`py-3 rounded-xl text-xs font-mono transition-all ${
                      selectedOptics === o
                        ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold shadow-md'
                        : 'bg-[#0A0A0A] text-[#A6A39D] hover:text-white border border-white/10'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Download Specification Sheets CTA */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => onDownloadSpec(`SONIC-${selectedDiameter}-${selectedPower}`)}
                className="w-full py-4 bg-[#F5F3EE] hover:bg-[#E8C45A] text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <Download className="w-4 h-4" />
                СКАЧАТЬ IES / 3D BIM & SPEC SHEET
              </button>
              <p className="text-[10px] font-mono text-[#A6A39D] text-center">
                Полные файлы DIALux Evo, BIM Revit и сертификаты соответствия UzStandard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

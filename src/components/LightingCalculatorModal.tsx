import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface LightingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDiscussWithData: (calcSummary: string) => void;
  currentLang: Language;
}

export const LightingCalculatorModal: React.FC<LightingCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenDiscussWithData,
  currentLang
}) => {
  const [areaM2, setAreaM2] = useState<number>(150);
  const [spaceType, setSpaceType] = useState<'restaurant' | 'residence' | 'office' | 'retail' | 'museum'>('restaurant');
  const [ceilingHeight, setCeilingHeight] = useState<number>(3.5);

  if (!isOpen) return null;

  const t = ALEDO_TRANSLATIONS[currentLang];

  // Recommended Lux Levels & Fixture Density multipliers
  const spaceConfigs = {
    restaurant: { name: currentLang === 'UZ' ? 'Restoran / HoReCa' : 'Ресторан / HoReCa', lux: 200, fixtureWatts: 18, cri: '98+' },
    residence: { name: currentLang === 'UZ' ? 'Xususiy villa / Xonadon' : 'Частная вилла / Квартира', lux: 250, fixtureWatts: 14, cri: '97+' },
    office: { name: currentLang === 'UZ' ? 'Ofis / Biznes markazi' : 'Офис / Бизнес-центр', lux: 500, fixtureWatts: 24, cri: '90+' },
    retail: { name: currentLang === 'UZ' ? 'Butik / Shouroom' : 'Бутик / Шоурум', lux: 750, fixtureWatts: 28, cri: '98+' },
    museum: { name: currentLang === 'UZ' ? 'Galereya / Muzey' : 'Галерея / Музей', lux: 300, fixtureWatts: 18, cri: '98+' }
  };

  const config = spaceConfigs[spaceType];
  const totalLumensNeeded = Math.round((areaM2 * config.lux) / 0.65);
  const lumensPerFixture = config.fixtureWatts * 90;
  const estimatedFixtures = Math.ceil(totalLumensNeeded / lumensPerFixture);
  const totalPowerKW = ((estimatedFixtures * config.fixtureWatts) / 1000).toFixed(1);

  const handleApplyToProject = () => {
    const summary = currentLang === 'UZ'
      ? `Yoritish hisobi: ${config.name}, Maydoni ${areaM2} m², Shift balandligi ${ceilingHeight}m. Uskuna bahosi: ~${estimatedFixtures} dona ALEDO yoritgichlari (CRI ${config.cri}), Jami quvvat: ${totalPowerKW} kVt.`
      : `Расчет света: ${config.name}, Площадь ${areaM2} м², Высота потолка ${ceilingHeight}м. Оценка оборудования: ~${estimatedFixtures} светильников ALEDO (CRI ${config.cri}), Общая мощность: ${totalPowerKW} кВт.`;
    onClose();
    onOpenDiscussWithData(summary);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-modal-title"
        className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#121212] border border-white/15 rounded-3xl p-6 md:p-10 text-[#F5F3EE] shadow-2xl my-8"
        >
          <button
            type="button"
            aria-label="Close calculator modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-black text-white transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#E8C45A] uppercase tracking-widest mb-2">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            EXPRESS LIGHTING CALCULATOR
          </div>
          <h2 id="calculator-modal-title" className="text-2xl md:text-4xl font-bold font-syne text-white uppercase mb-2">
            {t.calcTitle}
          </h2>
          <p className="text-xs font-mono text-[#A6A39D] mb-8">
            {t.calcSubtitle}
          </p>

          <div className="space-y-6">
            {/* Space Type Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#A6A39D] mb-2">
                {t.calcSpaceType}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Space type selection">
                {Object.entries(spaceConfigs).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={spaceType === key}
                    aria-label={`Select ${val.name}`}
                    onClick={() => setSpaceType(key as any)}
                    className={`py-3 px-3 rounded-xl text-xs font-mono text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] ${
                      spaceType === key
                        ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold'
                        : 'bg-[#1C1C1C] text-[#A6A39D] border border-white/10'
                    }`}
                  >
                    {val.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Area M2 Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <label htmlFor="area-m2-slider" className="text-[#A6A39D]">{t.calcArea}</label>
                <span className="text-[#E8C45A] font-bold">{areaM2} м²</span>
              </div>
              <input
                id="area-m2-slider"
                type="range"
                min={20}
                max={2000}
                step={10}
                value={areaM2}
                aria-label="Area in square meters"
                aria-valuemin={20}
                aria-valuemax={2000}
                aria-valuenow={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full accent-[#E8C45A] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              />
            </div>

            {/* Ceiling Height Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <label htmlFor="ceiling-height-slider" className="text-[#A6A39D]">{t.calcCeiling}</label>
                <span className="text-[#E8C45A] font-bold">{ceilingHeight} м</span>
              </div>
              <input
                id="ceiling-height-slider"
                type="range"
                min={2.5}
                max={12}
                step={0.5}
                value={ceilingHeight}
                aria-label="Ceiling height in meters"
                aria-valuemin={2.5}
                aria-valuemax={12}
                aria-valuenow={ceilingHeight}
                onChange={(e) => setCeilingHeight(Number(e.target.value))}
                className="w-full accent-[#E8C45A] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              />
            </div>

            {/* Calculated Output Summary Card */}
            <div className="bg-[#181818] p-6 rounded-2xl border border-[#E8C45A]/30 grid grid-cols-2 md:grid-cols-4 gap-4 text-center" role="region" aria-label="Calculated lighting recommendations" aria-live="polite">
              <div>
                <span className="block text-[10px] font-mono text-[#A6A39D]">{t.calcRequiredLux}</span>
                <span className="text-xl md:text-2xl font-bold font-syne text-[#E8C45A]">{config.lux} lx</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-[#A6A39D]">{t.calcEstFixtures}</span>
                <span className="text-xl md:text-2xl font-bold font-syne text-white">~{estimatedFixtures} {currentLang === 'UZ' ? 'dona' : 'шт'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-[#A6A39D]">{t.calcCriIndex}</span>
                <span className="text-xl md:text-2xl font-bold font-syne text-[#E8C45A]">CRI {config.cri}</span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-[#A6A39D]">{t.calcTotalPower}</span>
                <span className="text-xl md:text-2xl font-bold font-syne text-white">{totalPowerKW} {currentLang === 'UZ' ? 'kVt' : 'кВт'}</span>
              </div>
            </div>

            {/* Apply & Discuss Button */}
            <button
              type="button"
              aria-label="Send calculation summary to project discussion form"
              onClick={handleApplyToProject}
              className="w-full py-4 bg-[#E8C45A] text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
            >
              <span>{t.calcDiscussWithEng}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

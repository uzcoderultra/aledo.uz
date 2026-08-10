import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Coffee, Palette, Building, Sun, Sliders, ShieldCheck, Sparkles, Plus, Eye, EyeOff, Moon } from 'lucide-react';
import { Language, ScenarioPreset, ScenarioHotspot } from '../types';
import { ALEDO_TRANSLATIONS, LIGHTING_SCENARIOS } from '../data/aledoData';

interface LightingScenariosProps {
  currentLang: Language;
  onOpenDiscuss?: (initialMessage?: string) => void;
}

export const LightingScenarios: React.FC<LightingScenariosProps> = ({
  currentLang,
  onOpenDiscuss
}) => {
  const t = ALEDO_TRANSLATIONS[currentLang];
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioPreset['id']>('work');
  const [intensity, setIntensity] = useState<number>(85); // 0 to 100%
  const [activeHotspot, setActiveHotspot] = useState<ScenarioHotspot | null>(null);
  const [isUnlitMode, setIsUnlitMode] = useState<boolean>(false);

  // Preload scenario images for instant tab switching and smooth comparison
  useEffect(() => {
    LIGHTING_SCENARIOS.forEach((scenario) => {
      const img = new Image();
      img.src = scenario.image;
      if (scenario.unlitImage) {
        const unlitImg = new Image();
        unlitImg.src = scenario.unlitImage;
      }
    });
  }, []);

  const activeScenario = LIGHTING_SCENARIOS.find((s) => s.id === activeScenarioId) || LIGHTING_SCENARIOS[0];

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Building':
        return <Building className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  // Temperature color helper
  const getCctColor = (k: number) => {
    if (k <= 2700) return '#FFBA6E';
    if (k <= 3000) return '#E8C45A';
    if (k <= 3500) return '#F5DC96';
    return '#B8E0FF';
  };

  return (
    <section id="scenarios" className="py-24 sm:py-32 md:py-40 bg-[#0A0A0A] text-[#F5F3EE] relative overflow-hidden border-t border-white/10">
      {/* Background Subtle Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8C45A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8C45A] animate-pulse shrink-0" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#E8C45A] uppercase">
                {t.scenariosTag || 'ATMOSPHERIC LIGHTING MODES'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-light tracking-tight text-[#F5F3EE]">
              {t.scenariosTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base font-light text-[#A6A39D] max-w-xl font-sans leading-relaxed">
            {t.scenariosSubtitle}
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {LIGHTING_SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeScenarioId;
            const title = currentLang === 'UZ' && scenario.titleUZ ? scenario.titleUZ : scenario.title;
            const subtitle = currentLang === 'UZ' && scenario.subtitleUZ ? scenario.subtitleUZ : scenario.subtitle;

            return (
              <motion.button
                key={scenario.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveScenarioId(scenario.id);
                  setActiveHotspot(null);
                }}
                className={`p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? 'bg-[#181818] border-[#E8C45A] text-[#F5F3EE] shadow-2xl shadow-[#E8C45A]/10'
                    : 'bg-[#121212]/80 border-white/10 hover:border-white/30 text-[#A6A39D] hover:text-[#F5F3EE]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute top-0 left-0 right-0 h-1 bg-[#E8C45A]"
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    isActive ? 'bg-[#E8C45A]/10 border-[#E8C45A]/40 text-[#E8C45A]' : 'bg-white/5 border-white/10 text-white/60 group-hover:text-white'
                  }`}>
                    {getPresetIcon(scenario.icon)}
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#E8C45A]/80 uppercase">
                    {scenario.colorTemp}K
                  </span>
                </div>
                <h3 className="font-sans font-medium text-base sm:text-lg mb-1 tracking-tight text-[#F5F3EE]">
                  {title}
                </h3>
                <p className="text-xs font-mono text-[#A6A39D] line-clamp-1">
                  {subtitle}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Main Architectural Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Showcase Box (8 cols) */}
          <div className="lg:col-span-8 bg-[#121212] rounded-3xl border border-white/10 overflow-hidden relative min-h-[420px] sm:min-h-[520px] md:min-h-[600px] flex flex-col justify-between p-6 sm:p-8">
            {/* Top Right Quick Compare Toggle */}
            <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-[#0D0D0D]/85 backdrop-blur-md p-1.5 rounded-xl border border-white/15">
              <button
                type="button"
                onClick={() => setIsUnlitMode(!isUnlitMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                  isUnlitMode
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-[#E8C45A] text-[#0A0A0A] font-bold'
                }`}
              >
                {isUnlitMode ? (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>БЕЗ ОСВЕЩЕНИЯ (UNLIT)</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span>ALEDO СЦЕНАРИЙ</span>
                  </>
                )}
              </button>
            </div>

            {/* Background Image with Dynamic Fade & Dimmer Filters */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeScenario.id}_${isUnlitMode ? 'unlit' : 'lit'}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 z-0"
              >
                <img
                  src={isUnlitMode && activeScenario.unlitImage ? activeScenario.unlitImage : activeScenario.image}
                  alt={activeScenario.title}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: isUnlitMode
                      ? 'brightness(0.85) contrast(1.05)'
                      : `brightness(${0.4 + (intensity / 100) * 0.7}) contrast(${1.0 + (intensity / 200)})`,
                  }}
                />
                {/* Custom Scenario Overlay Color Glow */}
                {!isUnlitMode && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: activeScenario.overlayGlow,
                      opacity: (intensity / 100) * 0.85,
                    }}
                  />
                )}
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Interactive Fixture Hotspots over Image */}
            <div className="relative z-10 w-full h-full min-h-[280px]">
              {activeScenario.hotspots.map((hotspot) => {
                const isHotspotActive = activeHotspot?.id === hotspot.id;
                const fixtureName = currentLang === 'UZ' && hotspot.fixtureNameUZ ? hotspot.fixtureNameUZ : hotspot.fixtureName;

                return (
                  <div
                    key={hotspot.id}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.25 }}
                      onClick={() => setActiveHotspot(isHotspotActive ? null : hotspot)}
                      aria-label={`View fixture ${fixtureName}`}
                      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0A0A0A]/80 border border-[#E8C45A] text-[#E8C45A] hover:bg-[#E8C45A] hover:text-[#0A0A0A] transition-colors shadow-lg cursor-pointer group"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#E8C45A]/40 animate-ping pointer-events-none" />
                      <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    </motion.button>

                    {/* Hotspot Popup Card */}
                    <AnimatePresence>
                      {isHotspotActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl bg-[#141414]/95 backdrop-blur-xl border border-[#E8C45A]/40 shadow-2xl z-30 text-xs text-[#F5F3EE]"
                        >
                          <div className="flex items-center justify-between mb-1.5 border-b border-white/10 pb-1.5">
                            <span className="font-mono text-[10px] text-[#E8C45A] tracking-wider uppercase">
                              {hotspot.type}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveHotspot(null)}
                              className="text-white/40 hover:text-white"
                            >
                              ✕
                            </button>
                          </div>
                          <h4 className="font-sans font-medium text-sm text-white mb-1">
                            {fixtureName}
                          </h4>
                          <p className="font-mono text-[11px] text-[#A6A39D]">
                            {hotspot.specs}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Overlay Info & Interactive Dimmer Slider */}
            <div className="relative z-10 bg-[#0D0D0D]/90 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-6 mt-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: getCctColor(activeScenario.colorTemp) }}
                    />
                    <h3 className="font-sans font-semibold text-lg text-white">
                      {currentLang === 'UZ' && activeScenario.titleUZ ? activeScenario.titleUZ : activeScenario.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#A6A39D] font-mono">
                    {currentLang === 'UZ' && activeScenario.subtitleUZ ? activeScenario.subtitleUZ : activeScenario.subtitle}
                  </p>
                </div>

                {/* Dimmer Control */}
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
                  <Sliders className="w-4 h-4 text-[#E8C45A]" />
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#A6A39D] mb-1 gap-4">
                      <span>{t.scenariosDimmerLabel || 'DIMMER'}</span>
                      <span className="text-[#E8C45A] font-bold">{intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-28 sm:w-36 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E8C45A]"
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#D4D1C9] font-sans leading-relaxed">
                {currentLang === 'UZ' && activeScenario.descriptionUZ ? activeScenario.descriptionUZ : activeScenario.description}
              </p>
            </div>
          </div>

          {/* Telemetry & Specifications Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-[#121212] rounded-3xl border border-white/10 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#E8C45A] tracking-widest uppercase border-b border-white/10 pb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>SCENARIO LIGHTING METRICS</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-[#A6A39D] block mb-1">ILLUMINANCE</span>
                  <span className="text-lg font-sans font-semibold text-[#F5F3EE]">
                    {activeScenario.luxLevel}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-[#A6A39D] block mb-1">COLOR TEMP (CCT)</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: getCctColor(activeScenario.colorTemp) }}
                    />
                    <span className="text-lg font-sans font-semibold text-[#F5F3EE]">
                      {activeScenario.colorTemp}K
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-[#A6A39D] block mb-1">COLOR RENDERING</span>
                  <span className="text-lg font-sans font-semibold text-[#E8C45A]">
                    {activeScenario.cri}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-[#A6A39D] block mb-1">GLARE CONTROL</span>
                  <span className="text-lg font-sans font-semibold text-[#F5F3EE]">
                    {activeScenario.ugr}
                  </span>
                </div>
              </div>

              {/* Active Fixtures List */}
              <div className="mb-8">
                <h4 className="text-xs font-mono tracking-widest text-[#A6A39D] uppercase mb-3">
                  INTEGRATED ALEDO FIXTURES
                </h4>
                <div className="space-y-2">
                  {(currentLang === 'UZ' && activeScenario.activeFixturesUZ
                    ? activeScenario.activeFixturesUZ
                    : activeScenario.activeFixtures
                  ).map((fixture, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 text-xs text-[#F5F3EE]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8C45A] shrink-0" />
                      <span>{fixture}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Control Protocol Badge */}
              <div className="p-4 rounded-xl bg-[#E8C45A]/10 border border-[#E8C45A]/30 flex items-center justify-between text-xs font-mono">
                <span className="text-[#A6A39D]">CONTROL PROTOCOL</span>
                <span className="text-[#E8C45A] font-bold">{activeScenario.controlProtocol}</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const message = currentLang === 'UZ'
                  ? `Salom! Men '${activeScenario.titleUZ || activeScenario.title}' yoritish tsenariysi bo'yicha hisob-kitob va uskunalar tanlashni muhokama qilmoqchiman.`
                  : `Здравствуйте! Я хочу обсудить светотехнический расчет и подбор оборудования для сценария '${activeScenario.title}'.`;
                onOpenDiscuss?.(message);
              }}
              className="w-full py-4 px-6 rounded-2xl bg-[#E8C45A] text-[#0A0A0A] font-sans font-semibold text-sm tracking-wide hover:bg-[#F5DC96] transition-colors flex items-center justify-center gap-3 shadow-xl shadow-[#E8C45A]/10 cursor-pointer"
            >
              <span>{t.scenariosDiscussBtn || 'REQUEST THIS LIGHTING SCENARIO →'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

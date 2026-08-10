import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Sliders, Sun, Shield, Eye, Sparkles, Layers, Image as ImageIcon, CheckCircle, AlertTriangle, Compass, SlidersHorizontal } from 'lucide-react';
import { Language, LightLabState } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

import imgLabArtwork from '../assets/images/lab_artwork_gallery_1786357576572.jpg';
import imgLabWood from '../assets/images/lab_wood_veneer_1786357600753.jpg';
import imgLabStone from '../assets/images/lab_stone_wallwash_1786357621449.jpg';

interface LightLabExperimentalProps {
  currentLang: Language;
}

export const LightLabExperimental: React.FC<LightLabExperimentalProps> = ({ currentLang }) => {
  const [labState, setLabState] = useState<LightLabState>({
    colorTemp: 3000,
    beamAngle: 24,
    cri: 97,
    glareControl: true,
    mode: 'accent',
    intensity: 85
  });

  const [activeSubject, setActiveSubject] = useState<'artwork' | 'wood' | 'wall'>('artwork');
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const t = ALEDO_TRANSLATIONS[currentLang];
  const stageRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));
    setPointerPos({ x, y });
  };

  // Convert Kelvin temperature to RGB & HEX
  const getKelvinColor = (kelvin: number) => {
    if (kelvin <= 2700) return { r: 255, g: 180, b: 100, hex: '#FFBA6E', name: '2700K (Warm Sunset)' };
    if (kelvin <= 3000) return { r: 232, g: 196, b: 90, hex: '#E8C45A', name: '3000K (Warm White)' };
    if (kelvin <= 3500) return { r: 245, g: 220, b: 150, hex: '#F5DC96', name: '3500K (Neutral Interior)' };
    return { r: 210, g: 230, b: 255, hex: '#D2E6FF', name: '4000K (Daylight)' };
  };

  const kelvinData = getKelvinColor(labState.colorTemp);

  // Subject HD images
  const subjects = {
    artwork: {
      nameRU: 'Живопись и Галерея',
      descRU: 'Демонстрация передачи красного спектра R9>95 и глубоких насыщенных тонов масляных красок.',
      image: imgLabArtwork,
      recommendedLux: '750 - 1000 LX',
      recommendedCCT: '3000K SunLike',
    },
    wood: {
      nameRU: 'Дерево и Архитектура',
      descRU: 'Демонстрация теплоты натурального орехового шпона и объема 3D текстур при разной CCT.',
      image: imgLabWood,
      recommendedLux: '300 - 500 LX',
      recommendedCCT: '2700K - 3000K',
    },
    wall: {
      nameRU: 'Рельефная Стена (Wallwashing)',
      descRU: 'Демонстрация мягкого скользящего светового луча для проявления фактуры микроцемента.',
      image: imgLabStone,
      recommendedLux: '200 - 400 LX',
      recommendedCCT: '3000K - 4000K',
    },
  };

  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-16 bg-[#080808] text-[#F5F3EE] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E8C45A] uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>ИНТЕРАКТИВНЫЙ СТЕНД ОПТИКИ И СПЕКТРА</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans font-light uppercase tracking-tight text-white leading-tight">
              СВЕТОВАЯ ЛАБОРАТОРИЯ ALEDO
            </h2>
          </div>
          <div className="max-w-lg bg-[#121212] p-4 rounded-2xl border border-white/10">
            <p className="text-xs sm:text-sm font-mono text-[#A6A39D] leading-relaxed">
              💡 <span className="text-white font-bold">Как пользоваться:</span> Выбирайте объекты исследования, изменяйте индекс цветопередачи (CRI), цветовую температуру и включайте защитные соты UGR.
            </p>
          </div>
        </div>

        {/* Main Lab Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Interactive Optical Chamber (7 cols) */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/15 rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[600px] shadow-2xl">
            {/* Top Bar Indicators */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8C45A] animate-ping" />
                <span className="text-[11px] font-mono tracking-widest text-[#E8C45A] uppercase font-bold">
                  CHAMBER #01 • {subjects[activeSubject].nameRU}
                </span>
              </div>

              {/* CRI Realism Warning Badge */}
              <div
                className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2 border ${
                  labState.cri === 97
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                    : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                }`}
              >
                {labState.cri === 97 ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>CRI 97+ SunLike: 100% Естественный спектр</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>CRI 80: Искажение оттенков R9 (Блеклый красный)</span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Physical Light Stage */}
            <div
              ref={stageRef}
              onPointerMove={handlePointerMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setPointerPos({ x: 50, y: 50 });
              }}
              className="relative w-full h-[400px] sm:h-[450px] bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center cursor-crosshair select-none"
            >
              {/* Target Image with Dynamic CRI Filter */}
              <img
                src={subjects[activeSubject].image}
                alt={subjects[activeSubject].nameRU}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                style={{
                  filter:
                    labState.cri === 80
                      ? 'saturate(0.5) contrast(0.85) sepia(0.2)'
                      : `saturate(${0.9 + (labState.intensity / 100) * 0.4}) contrast(1.1)`,
                }}
              />

              {/* Dynamic Color Temperature Light Overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  backgroundColor: kelvinData.hex,
                  opacity: 0.15 + (labState.intensity / 100) * 0.25,
                  mixBlendMode: 'color-dodge',
                }}
              />

              {/* Lighting Mode Beam Cone Overlay */}
              {labState.mode === 'accent' && (
                <div
                  className="absolute pointer-events-none transition-all duration-150 rounded-full blur-2xl"
                  style={{
                    left: `${pointerPos.x}%`,
                    top: `${pointerPos.y}%`,
                    width: `${labState.beamAngle * 8}px`,
                    height: `${labState.beamAngle * 8}px`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, rgba(${kelvinData.r}, ${kelvinData.g}, ${kelvinData.b}, ${(labState.intensity / 100) * 0.7}) 0%, transparent 70%)`,
                  }}
                />
              )}

              {labState.mode === 'wallwashing' && (
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-300"
                  style={{
                    background: `linear-gradient(180deg, rgba(${kelvinData.r}, ${kelvinData.g}, ${kelvinData.b}, ${(labState.intensity / 100) * 0.8}) 0%, rgba(${kelvinData.r}, ${kelvinData.g}, ${kelvinData.b}, ${(labState.intensity / 100) * 0.15}) 80%, transparent 100%)`,
                  }}
                />
              )}

              {labState.mode === 'ambient' && (
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-300"
                  style={{
                    boxShadow: `inset 0 0 100px 30px rgba(${kelvinData.r}, ${kelvinData.g}, ${kelvinData.b}, ${(labState.intensity / 100) * 0.5})`,
                  }}
                />
              )}

              {/* Honeycomb Anti-Glare Shield Visualizer Overlay */}
              <div className="absolute top-4 left-4 z-20">
                <div
                  className={`px-3 py-1.5 rounded-xl border backdrop-blur-md text-xs font-mono flex items-center gap-2 ${
                    labState.glareControl
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/80 border-red-500/40 text-red-300'
                  }`}
                >
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>
                    {labState.glareControl
                      ? 'UGR < 16 HONEYCOMB: Антибликовые соты включены'
                      : 'UGR 22: БЕЗ СОТ (Ослепляющий прямой блеск)'}
                  </span>
                </div>
              </div>

              {/* Hover Cursor Guidance Prompt */}
              {!isHovered && labState.mode === 'accent' && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white animate-bounce pointer-events-none">
                  👆 Наведите курсор для перемещения акцентного луча
                </div>
              )}
            </div>

            {/* Spectral Quality Live Graph Bar */}
            <div className="mt-4 p-4 bg-[#0D0D0D] rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <span className="text-[10px] font-mono text-[#E8C45A] uppercase block mb-1">
                  СПЕКТРАЛЬНЫЙ АНАЛИЗ (SPECTRAL SPECTRUM)
                </span>
                <span className="text-sm font-bold text-white font-sans block">
                  {labState.cri === 97 ? 'SunLike Full Spectrum (Без синего пика 450nm)' : 'Standard Blue-LED Spectrum (Синий пик + провал R9)'}
                </span>
              </div>

              {/* Live Spectrum Curve Simulation */}
              <div className="h-8 bg-[#161616] rounded-lg p-1 relative overflow-hidden flex items-end gap-1">
                {Array.from({ length: 24 }).map((_, i) => {
                  let heightPct = 50;
                  if (labState.cri === 97) {
                    // Smooth sunlight bell curve
                    heightPct = 40 + Math.sin((i / 24) * Math.PI) * 55;
                  } else {
                    // Spiky LED curve with huge blue peak at index 4 and dip at index 18
                    if (i === 4) heightPct = 95;
                    else if (i > 14) heightPct = 25;
                    else heightPct = 45;
                  }
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all duration-300"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: i < 6 ? '#5090FF' : i < 12 ? '#50FF90' : i < 18 ? '#FFE050' : '#FF5050',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Control Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-lg sm:text-xl font-bold font-sans text-white uppercase">
                ПАРАМЕТРЫ И ЭКСПЕРИМЕНТЫ
              </h3>
              <span className="text-xs font-mono text-[#E8C45A] bg-[#E8C45A]/10 px-2.5 py-1 rounded-md border border-[#E8C45A]/30">
                LIVE OPTICS
              </span>
            </div>

            {/* 1. Subject Choice */}
            <div>
              <span className="block text-xs font-mono text-[#A6A39D] mb-2 uppercase">
                1. ОБЪЕКТ ИССЛЕДОВАНИЯ
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['artwork', 'wood', 'wall'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSubject(key)}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center transition-all cursor-pointer ${
                      activeSubject === key
                        ? 'bg-[#E8C45A] text-black font-bold shadow-md'
                        : 'bg-[#1C1C1C] text-[#A6A39D] hover:text-white border border-white/10'
                    }`}
                  >
                    {key === 'artwork' ? '🎨 Живопись' : key === 'wood' ? '🪵 Дерево' : '🧱 Стена'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. CRI Spectrum Comparison */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs font-mono">
                <span className="text-[#A6A39D] uppercase">2. ИНДЕКС ЦВЕТОПЕРЕДАЧИ (CRI / R9)</span>
                <span className="text-[#E8C45A] font-bold">CRI {labState.cri}+</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLabState({ ...labState, cri: 80 })}
                  className={`p-3 rounded-xl text-xs font-mono text-left transition-all cursor-pointer ${
                    labState.cri === 80
                      ? 'bg-amber-500 text-black font-bold'
                      : 'bg-[#1C1C1C] text-[#A6A39D] border border-white/10'
                  }`}
                >
                  <span className="block font-bold">CRI 80 (Обычный)</span>
                  <span className="text-[10px] opacity-80 block mt-0.5">Блеклые масляные краски и шпон</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLabState({ ...labState, cri: 97 })}
                  className={`p-3 rounded-xl text-xs font-mono text-left transition-all cursor-pointer ${
                    labState.cri === 97
                      ? 'bg-[#E8C45A] text-black font-bold shadow-md'
                      : 'bg-[#1C1C1C] text-[#A6A39D] border border-white/10'
                  }`}
                >
                  <span className="block font-bold">CRI 97+ (SunLike)</span>
                  <span className="text-[10px] opacity-90 block mt-0.5">100% реалистичные живые оттенки</span>
                </button>
              </div>
            </div>

            {/* 3. Color Temperature (CCT) */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs font-mono">
                <span className="text-[#A6A39D] uppercase">3. ЦВЕТОВАЯ ТЕМПЕРАТУРА (CCT)</span>
                <span className="text-[#E8C45A] font-bold">{kelvinData.name}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2700, 3000, 3500, 4000].map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setLabState({ ...labState, colorTemp: k })}
                    className={`py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      labState.colorTemp === k
                        ? 'bg-[#E8C45A] text-black font-bold'
                        : 'bg-[#1C1C1C] text-[#A6A39D] hover:text-white border border-white/10'
                    }`}
                  >
                    {k}K
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Optical Mode */}
            <div>
              <span className="block text-xs font-mono text-[#A6A39D] mb-2 uppercase">
                4. ТИП ОПТИЧЕСКОГО РАСПРЕДЕЛЕНИЯ
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'accent', label: '🎯 Акцентный (Spot)' },
                  { id: 'wallwashing', label: '🌊 Омывание стены' },
                  { id: 'ambient', label: '💡 Заполняющий' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setLabState({ ...labState, mode: m.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      labState.mode === m.id
                        ? 'bg-[#E8C45A] text-black font-bold'
                        : 'bg-[#1C1C1C] text-[#A6A39D] border border-white/10'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Beam Angle & Dimming Intensity Sliders */}
            <div className="space-y-4 pt-3 border-t border-white/10">
              {/* Beam Angle */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
                  <span className="text-[#A6A39D] uppercase">5. УГОЛ ЛУЧА (BEAM ANGLE)</span>
                  <span className="text-[#E8C45A] font-bold">{labState.beamAngle}°</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { angle: 15, name: '15° Narrow Spot' },
                    { angle: 24, name: '24° Medium Beam' },
                    { angle: 36, name: '36° Wide Flood' },
                  ].map((item) => (
                    <button
                      key={item.angle}
                      type="button"
                      onClick={() => setLabState({ ...labState, beamAngle: item.angle })}
                      className={`p-2 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                        labState.beamAngle === item.angle
                          ? 'bg-[#E8C45A] text-black font-bold'
                          : 'bg-[#1C1C1C] text-[#A6A39D] border border-white/10'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Dimming Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
                  <span className="text-[#A6A39D] uppercase">6. ИНТЕНСИВНОСТЬ (DALI / PWM DIMMING)</span>
                  <span className="text-[#E8C45A] font-bold">{labState.intensity}% ({Math.round(labState.intensity * 8.5)} LX)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={labState.intensity}
                  onChange={(e) => setLabState({ ...labState, intensity: Number(e.target.value) })}
                  className="w-full accent-[#E8C45A] bg-[#1C1C1C] h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* 6. Anti-Glare Louver Toggle */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-xs font-mono text-white font-bold">
                  СОТОВАЯ НАСАДКА HONEYCOMB (UGR &lt; 16)
                </span>
                <span className="text-[10px] font-mono text-[#A6A39D]">
                  Исключает ослепление глаз при взгляде на светильник
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={labState.glareControl}
                onClick={() => setLabState({ ...labState, glareControl: !labState.glareControl })}
                className={`w-14 h-8 rounded-full transition-all p-1 cursor-pointer ${
                  labState.glareControl ? 'bg-[#E8C45A]' : 'bg-[#1C1C1C]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-[#0A0A0A] transition-transform ${
                    labState.glareControl ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Lighting Designer Technical Summary Box */}
            <div className="p-4 rounded-2xl bg-[#090909] border border-[#E8C45A]/30 space-y-2">
              <span className="text-[10px] font-mono text-[#E8C45A] tracking-widest uppercase block font-bold">
                📋 ТЕХНИЧЕСКИЙ ПАСПОРТ ОБЕКТА (LIGHTING DATA)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#A6A39D]">
                <div>Освещенность: <span className="text-white font-bold">{Math.round(labState.intensity * 8.5)} LX</span></div>
                <div>Спектр R9: <span className="text-white font-bold">{labState.cri === 97 ? '> 95 (Живой)' : '< 12 (Блеклый)'}</span></div>
                <div>Цветопередача: <span className="text-white font-bold">CRI {labState.cri}+</span></div>
                <div>MacAdam Step: <span className="text-white font-bold">SDCM &lt; 2</span></div>
                <div>Рекомендуется: <span className="text-[#E8C45A] font-bold">{subjects[activeSubject].recommendedCCT}</span></div>
                <div>Норма Lux: <span className="text-white font-bold">{subjects[activeSubject].recommendedLux}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


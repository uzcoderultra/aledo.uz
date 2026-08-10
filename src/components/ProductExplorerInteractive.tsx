import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Sun, Sliders, Zap, Shield, Sparkles, Eye, Compass, Focus } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface ProductExplorerInteractiveProps {
  currentLang: Language;
}

export const ProductExplorerInteractive: React.FC<ProductExplorerInteractiveProps> = ({ currentLang }) => {
  const [beamAngle, setBeamAngle] = useState<number>(24);
  const [colorTemp, setColorTemp] = useState<number>(3000);
  const [dimmer, setDimmer] = useState<number>(90); // 10% to 100%
  const [targetRotation, setTargetRotation] = useState<number>(12);
  const [currentRotation, setCurrentRotation] = useState<number>(12);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const t = ALEDO_TRANSLATIONS[currentLang];

  // Smooth mechanical inertia physics (lerp) for luminaire tilt angle
  useEffect(() => {
    const updatePhysics = () => {
      setCurrentRotation((prev) => {
        const diff = targetRotation - prev;
        if (Math.abs(diff) < 0.05) return targetRotation;
        return prev + diff * 0.12; // Mechanical dampening factor
      });
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };
    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetRotation]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    const pivotX = rect.width / 2;
    const pivotY = 80; // Fixture mounting pivot point

    const dx = pointerX - pivotX;
    const dy = Math.max(pointerY - pivotY, 60);

    // Calculate angle in degrees
    const angleInRadians = Math.atan2(dx, dy);
    let angleInDegrees = -angleInRadians * (180 / Math.PI);

    // Limit maximum tilt angle to +- 52 degrees
    angleInDegrees = Math.max(-52, Math.min(52, angleInDegrees));
    setTargetRotation(angleInDegrees);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const pointerX = touch.clientX - rect.left;
    const pointerY = touch.clientY - rect.top;

    const pivotX = rect.width / 2;
    const pivotY = 80;

    const dx = pointerX - pivotX;
    const dy = Math.max(pointerY - pivotY, 60);

    const angleInRadians = Math.atan2(dx, dy);
    let angleInDegrees = -angleInRadians * (180 / Math.PI);
    angleInDegrees = Math.max(-52, Math.min(52, angleInDegrees));
    setTargetRotation(angleInDegrees);
  };

  // Convert Kelvin temperature to RGB & HSL color properties
  const getKelvinRgb = (kelvin: number) => {
    if (kelvin <= 2400) return { r: 255, g: 160, b: 70, hex: '#FFA046' };
    if (kelvin <= 2700) return { r: 255, g: 180, b: 100, hex: '#FFBA6E' };
    if (kelvin <= 3000) return { r: 232, g: 196, b: 90, hex: '#E8C45A' };
    if (kelvin <= 3500) return { r: 245, g: 220, b: 150, hex: '#F5DC96' };
    if (kelvin <= 4000) return { r: 225, g: 235, b: 245, hex: '#E1EBF5' };
    return { r: 210, g: 230, b: 255, hex: '#D2E6FF' };
  };

  const colorData = getKelvinRgb(colorTemp);
  const colorRgbStr = `${colorData.r}, ${colorData.g}, ${colorData.b}`;

  // Inverse Square Law Intensity Factor (narrower angle = higher peak illuminance)
  const peakIntensity = Math.min(1.3, (30 / beamAngle) * (dimmer / 100));

  // Compute spot offset on the floor based on trigonometry
  // Floor distance ~ 380px below lens
  const floorDist = 380;
  const rad = (-currentRotation * Math.PI) / 180;
  const spotOffsetX = Math.tan(rad) * floorDist;

  // Beam width at floor (in pixels)
  const spotWidth = Math.tan((beamAngle * Math.PI) / 360) * floorDist * 2.2 + 40;
  const spotHeight = spotWidth * 0.45;

  // Distance from center of pedestal (pedestal is centered at X=0)
  const pedestalDist = Math.abs(spotOffsetX);
  const pedestalIlluminance = Math.max(0, 1 - pedestalDist / (spotWidth * 0.85)) * peakIntensity;

  return (
    <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-16 bg-[#0A0A0A] text-[#F5F3EE] border-t border-b border-white/10 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E8C45A] uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>REALTIME OPTICAL PHYSICS SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-light uppercase tracking-tight text-white">
              ИНТЕРАКТИВНЫЙ ИНСТРУМЕНТ СВЕТА
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#A6A39D] max-w-lg leading-relaxed">
            Наведите курсор на холст для физического поворота светильника. Переключайте угол луча, диммирование и температуру, чтобы увидеть реалистичный оптический эффект и тень.
          </p>
        </div>

        {/* Interactive Canvas & Fixture Stage */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setTargetRotation(12);
          }}
          style={{ touchAction: 'pan-y' }}
          className="relative w-full h-[520px] sm:h-[600px] md:h-[680px] bg-[#0C0C0C] rounded-3xl border border-white/15 overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-10 cursor-crosshair select-none shadow-2xl"
        >
          {/* Architectural Background Grid Texture */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#ffffff12 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Stationary Ceiling Track Mount & Mobile Quick Angle Buttons */}
          <div className="relative z-30 flex flex-col items-center pt-2 gap-3">
            <div className="px-4 sm:px-6 py-1.5 min-w-[220px] sm:min-w-[280px] bg-[#181818] border border-white/20 rounded-lg shadow-xl flex items-center justify-between gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E8C45A] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono text-[#A6A39D] tracking-widest whitespace-nowrap uppercase">ALEDO SONIC TRACK</span>
              <span className="w-2 h-2 rounded-full bg-[#E8C45A] animate-pulse shrink-0" />
            </div>

            {/* Quick Angle Preset Buttons for Mobile & Quick Control */}
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[10px] sm:text-xs font-mono">
              <span className="text-[#A6A39D] hidden xs:inline mr-1">УГОЛ:</span>
              {[-40, -20, 0, 20, 40].map((deg) => (
                <button
                  key={deg}
                  type="button"
                  onClick={() => setTargetRotation(deg)}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    Math.abs(Math.round(targetRotation) - deg) <= 5
                      ? 'bg-[#E8C45A] text-[#0A0A0A] font-bold'
                      : 'bg-[#1C1C1C] text-[#A6A39D] hover:text-white'
                  }`}
                >
                  {deg > 0 ? `+${deg}°` : `${deg}°`}
                </button>
              ))}
            </div>

            {/* Rotating Mechanical Luminaire Body */}
            <div
              className="relative flex flex-col items-center origin-top pointer-events-none"
              style={{ transform: `rotate(${currentRotation}deg)` }}
            >
              {/* Fixture Yoke / Stem */}
              <div className="w-3 h-7 bg-gradient-to-b from-[#222] to-[#161616] border-x border-white/10" />

              {/* Aluminum Fixture Head Housing */}
              <div className="relative w-16 sm:w-20 h-28 sm:h-32 bg-[#161616] border border-white/30 rounded-2xl shadow-2xl flex flex-col justify-end items-center p-2.5">
                {/* Heat-sink Rib Lines */}
                <div className="w-full flex justify-center gap-1 mb-3">
                  <div className="w-1 h-6 bg-white/10 rounded-full" />
                  <div className="w-1 h-6 bg-white/10 rounded-full" />
                  <div className="w-1 h-6 bg-white/10 rounded-full" />
                </div>

                {/* LED Engraving / Gold Accent Ring */}
                <div className="w-full h-1.5 bg-[#E8C45A]/60 rounded-full mb-1.5" />

                {/* TIR Lens Aperture with Glowing Reflector Core */}
                <div
                  className="w-12 sm:w-16 h-3 sm:h-4 rounded-full border border-white/60 transition-all shadow-[0_0_20px_rgba(232,196,90,0.8)]"
                  style={{
                    backgroundColor: `rgb(${colorRgbStr})`,
                    boxShadow: `0 0 ${15 * peakIntensity}px rgba(${colorRgbStr}, 0.8)`,
                  }}
                />
              </div>

              {/* Volumetric Optical Cone Beam Emission (Trapezoid Geometry) */}
              <div
                className="absolute top-[130px] sm:top-[160px] left-1/2 -translate-x-1/2 pointer-events-none origin-top transition-all duration-100 h-[300px] sm:h-[340px] md:h-[400px]"
                style={{
                  width: `${spotWidth * 0.9}px`,
                  background: `linear-gradient(to bottom, rgba(${colorRgbStr}, ${0.85 * peakIntensity}) 0%, rgba(${colorRgbStr}, ${0.35 * peakIntensity}) 40%, rgba(${colorRgbStr}, ${0.08 * peakIntensity}) 85%, transparent 100%)`,
                  clipPath: `polygon(${(50 - beamAngle * 0.45)}% 0%, ${(50 + beamAngle * 0.45)}% 0%, 100% 100%, 0% 100%)`,
                }}
              />
            </div>
          </div>

          {/* Interactive Architectural Object (Pedestal & Modern Sculpture) in Floor Center */}
          <div className="absolute bottom-6 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
            {/* Minimalist Geometry Art Piece */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-white/20 transition-all duration-150 flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
              style={{
                backgroundColor: `rgba(28, 28, 28, ${0.7 + pedestalIlluminance * 0.3})`,
                boxShadow: pedestalIlluminance > 0.1
                  ? `0 -10px 30px rgba(${colorRgbStr}, ${pedestalIlluminance * 0.6})`
                  : 'none',
              }}
            >
              {/* Highlight Shading on Object */}
              <div
                className="absolute inset-0 transition-opacity duration-150"
                style={{
                  background: `linear-gradient(${180 - currentRotation}deg, rgba(${colorRgbStr}, ${pedestalIlluminance * 0.8}) 0%, transparent 70%)`,
                }}
              />
              <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-widest z-10">ALEDO</span>
            </div>

            {/* Pedestal Block */}
            <div className="w-22 h-12 sm:w-28 sm:h-16 bg-[#181818] border border-white/10 rounded-t-lg shadow-2xl relative overflow-hidden">
              <div
                className="absolute inset-0 transition-opacity duration-150"
                style={{
                  background: `linear-gradient(${180 - currentRotation * 1.5}deg, rgba(${colorRgbStr}, ${pedestalIlluminance * 0.5}) 0%, transparent 80%)`,
                }}
              />
            </div>

            {/* Dynamic Cast Shadow Behind/Opposite Light Direction */}
            <div
              className="h-2 rounded-full bg-black/90 blur-sm transition-all duration-100"
              style={{
                width: `${60 + pedestalIlluminance * 30}px`,
                transform: `translateX(${spotOffsetX * -0.35}px) scaleY(${0.5 + pedestalIlluminance * 0.5})`,
                opacity: 0.2 + pedestalIlluminance * 0.6,
              }}
            />
          </div>

          {/* Floor Reflection Light Pool (Elliptical Photometric Spot) */}
          <div className="absolute bottom-2 sm:bottom-6 left-0 right-0 z-10 flex justify-center pointer-events-none">
            <div
              className="rounded-full blur-2xl transition-all duration-75 relative"
              style={{
                width: `${spotWidth}px`,
                height: `${spotHeight}px`,
                transform: `translateX(${spotOffsetX}px) rotate(${currentRotation * 0.2}deg)`,
                backgroundColor: `rgba(${colorRgbStr}, ${0.5 * peakIntensity})`,
                boxShadow: `0 0 80px 30px rgba(${colorRgbStr}, ${0.35 * peakIntensity})`,
              }}
            >
              {/* Hot Specular Core (Center Photometric Peak) */}
              <div
                className="absolute inset-2 sm:inset-4 rounded-full blur-md"
                style={{
                  backgroundColor: `rgba(${colorRgbStr}, ${0.85 * peakIntensity})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Telemetry & Specifications Panel (Technical Metrics Row) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 bg-[#0F0F0F] p-4 sm:p-6 rounded-2xl border border-white/15 shadow-xl">
          <div>
            <span className="block text-[10px] sm:text-xs font-mono text-[#E8C45A] uppercase tracking-wider mb-1">
              COLOR RENDERING (CRI)
            </span>
            <span className="text-lg sm:text-2xl font-bold font-sans text-[#E8C45A] block">
              CRI 98+
            </span>
            <span className="block text-[10px] sm:text-xs text-[#A6A39D] font-mono mt-0.5">SunLike Spectrum</span>
          </div>

          <div>
            <span className="block text-[10px] sm:text-xs font-mono text-[#E8C45A] uppercase tracking-wider mb-1">
              COLOR TEMP (CCT)
            </span>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorData.hex }}
              />
              <span className="text-lg sm:text-2xl font-bold font-sans text-white block">
                {colorTemp}K
              </span>
            </div>
            <span className="block text-[10px] sm:text-xs text-[#A6A39D] font-mono mt-0.5">Tunable White</span>
          </div>

          <div>
            <span className="block text-[10px] sm:text-xs font-mono text-[#E8C45A] uppercase tracking-wider mb-1">
              BEAM ANGLE OPTICS
            </span>
            <span className="text-lg sm:text-2xl font-bold font-sans text-[#E8C45A] block">
              {beamAngle}°
            </span>
            <span className="block text-[10px] sm:text-xs text-[#A6A39D] font-mono mt-0.5">TIR Reflector Lens</span>
          </div>

          <div>
            <span className="block text-[10px] sm:text-xs font-mono text-[#E8C45A] uppercase tracking-wider mb-1">
              CALCULATED ILLUMINANCE
            </span>
            <span className="text-lg sm:text-2xl font-bold font-sans text-white block">
              {Math.round(peakIntensity * 650)} LX
            </span>
            <span className="block text-[10px] sm:text-xs text-[#A6A39D] font-mono mt-0.5">@ 3.0m Distance</span>
          </div>
        </div>

        {/* Realtime Adjustment Controls */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#121212] p-5 sm:p-6 rounded-2xl border border-white/10">
          {/* Fixture Tilt Angle Control */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#F5F3EE]">
              <span>ПОВОРОТ СВЕТИЛЬНИКА (TILT)</span>
              <span className="text-[#E8C45A] font-bold">{Math.round(targetRotation)}°</span>
            </div>
            <input
              type="range"
              min={-45}
              max={45}
              step={1}
              value={Math.round(targetRotation)}
              onChange={(e) => setTargetRotation(Number(e.target.value))}
              className="w-full accent-[#E8C45A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A6A39D] mt-1.5">
              <span>-40° (Влево)</span>
              <span>0° (Прямо)</span>
              <span>+40° (Вправо)</span>
            </div>
          </div>

          {/* Beam Angle Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#F5F3EE]">
              <span>ОПТИЧЕСКИЙ УГОЛ (BEAM)</span>
              <span className="text-[#E8C45A] font-bold">{beamAngle}°</span>
            </div>
            <input
              type="range"
              min={12}
              max={60}
              step={1}
              value={beamAngle}
              onChange={(e) => setBeamAngle(Number(e.target.value))}
              className="w-full accent-[#E8C45A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A6A39D] mt-1.5">
              <span>12° (Spot)</span>
              <span>24° (Medium)</span>
              <span>60° (Wide)</span>
            </div>
          </div>

          {/* Color Temperature Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#F5F3EE]">
              <span>ТЕМПЕРАТУРА (KELVIN)</span>
              <span className="text-[#E8C45A] font-bold">{colorTemp}K</span>
            </div>
            <input
              type="range"
              min={2400}
              max={4500}
              step={100}
              value={colorTemp}
              onChange={(e) => setColorTemp(Number(e.target.value))}
              className="w-full accent-[#E8C45A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A6A39D] mt-1.5">
              <span>2400K</span>
              <span>3000K</span>
              <span>4500K</span>
            </div>
          </div>

          {/* Dimmer Level Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-mono text-[#F5F3EE]">
              <span>ЯРКОСТЬ (DIMMER)</span>
              <span className="text-[#E8C45A] font-bold">{dimmer}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={dimmer}
              onChange={(e) => setDimmer(Number(e.target.value))}
              className="w-full accent-[#E8C45A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A6A39D] mt-1.5">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


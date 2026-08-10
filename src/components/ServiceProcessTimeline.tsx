import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Layers, FileCheck, Truck, Wrench } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS, SERVICE_STEPS } from '../data/aledoData';

interface ServiceProcessTimelineProps {
  currentLang: Language;
}

export const ServiceProcessTimeline: React.FC<ServiceProcessTimelineProps> = ({ currentLang }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const t = ALEDO_TRANSLATIONS[currentLang];

  return (
    <section id="solutions" className="py-28 md:py-44 px-6 md:px-16 bg-[#0A0A0A] text-[#F5F3EE]">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E8C45A]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E8C45A]">
                FULL-SERVICE WORKFLOW
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold font-syne uppercase tracking-tight text-white whitespace-pre-line leading-[0.95]">
              {t.servicesHeadline}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base font-light text-[#A6A39D]">
            {currentLang === 'UZ'
              ? "Biz loyihani har bir bosqichda — bosh rejadagi birinchi chizmalardan tortib ochilish oldidan nurlarni yo'naltirishgacha kuzatib boramiz."
              : "Мы сопровождаем проект на каждом этапе — от первого наброска светильников на генплане до юстировки лучей перед открытием."}
          </p>
        </div>

        {/* Horizontal Timeline Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 mb-12">
          {SERVICE_STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 sm:p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-36 sm:h-40 md:h-44 min-w-0 overflow-hidden relative ${
                activeStep === idx
                  ? 'bg-[#E8C45A] text-[#0A0A0A] border-[#E8C45A] shadow-[0_0_30px_rgba(232,196,90,0.3)]'
                  : 'bg-[#111111] text-[#F5F3EE] border-white/10 hover:border-white/30'
              }`}
            >
              <span
                className={`text-xl sm:text-2xl font-mono font-bold ${
                  activeStep === idx ? 'text-[#0A0A0A]' : 'text-[#E8C45A]'
                }`}
              >
                {step.number}
              </span>
              <span className="text-[11px] sm:text-xs xl:text-sm font-bold font-syne uppercase leading-snug break-words [word-break:break-word] hyphens-auto w-full">
                {currentLang === 'UZ' && step.titleUZ ? step.titleUZ : step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Step Detail Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#141414] border border-white/15 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#E8C45A] text-[#0A0A0A] font-mono text-xs font-bold rounded-full">
                STAGE {SERVICE_STEPS[activeStep].number} OF 06
              </span>
              <span className="text-xs font-mono text-[#A6A39D]">PRO-LEVEL CAPABILITY</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold font-syne text-white uppercase">
              {currentLang === 'UZ' && SERVICE_STEPS[activeStep].titleUZ ? SERVICE_STEPS[activeStep].titleUZ : SERVICE_STEPS[activeStep].title}
            </h3>

            <p className="text-base md:text-xl font-light text-[#A6A39D] leading-relaxed">
              {currentLang === 'UZ' && SERVICE_STEPS[activeStep].descriptionUZ ? SERVICE_STEPS[activeStep].descriptionUZ : SERVICE_STEPS[activeStep].description}
            </p>
          </div>

          <div className="md:col-span-5 bg-[#0A0A0A] p-6 md:p-8 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-xs font-mono text-[#E8C45A] uppercase tracking-widest border-b border-white/10 pb-3">
              {currentLang === 'UZ' ? 'BOSQICH NATIJASI (DELIVERABLES)' : 'РЕЗУЛЬТАТ ЭТАПА (DELIVERABLES)'}
            </h4>
            <ul className="space-y-3">
              {(currentLang === 'UZ' && SERVICE_STEPS[activeStep].deliverablesUZ ? SERVICE_STEPS[activeStep].deliverablesUZ : SERVICE_STEPS[activeStep].deliverables).map((item, dIdx) => (
                <li key={dIdx} className="flex items-center gap-3 text-xs md:text-sm font-mono text-white">
                  <CheckCircle className="w-4 h-4 text-[#E8C45A] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

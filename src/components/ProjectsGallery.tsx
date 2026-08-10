import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, MapPin, Layers, Sun, Moon, Sparkles } from 'lucide-react';
import { Language, ProjectItem } from '../types';
import { ALEDO_TRANSLATIONS, ALEDO_PROJECTS } from '../data/aledoData';

interface ProjectsGalleryProps {
  currentLang: Language;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ currentLang }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [nightModeToggle, setNightModeToggle] = useState<boolean>(true);
  const t = ALEDO_TRANSLATIONS[currentLang];

  return (
    <section id="projects" className="py-20 sm:py-28 md:py-44 px-4 sm:px-6 md:px-16 bg-[#0A0A0A] text-[#F5F3EE]">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-[#E8C45A] shrink-0" />
              <span className="text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#E8C45A]">
                ALEDO PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-bold font-syne uppercase tracking-tight text-white leading-tight">
              {t.projectsHeadline}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base font-light text-[#A6A39D]">
            {t.projectsSub}
          </p>
        </div>

        {/* Asymmetrical Architectural Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {ALEDO_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              role="button"
              tabIndex={0}
              aria-label={`View case study for ${project.title}, ${project.location}`}
              onClick={() => {
                setSelectedProject(project);
                setNightModeToggle(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                  setNightModeToggle(true);
                }
              }}
              className={`group cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] focus-visible:ring-offset-8 focus-visible:ring-offset-[#0A0A0A] rounded-2xl ${
                idx % 2 === 1 ? 'md:mt-16' : ''
              }`}
              data-cursor="VIEW PROJECT"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#111111] mb-6 border border-white/10 group-hover:border-[#E8C45A]/60 transition-all duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

                {/* Number Badge */}
                <div className="absolute top-6 left-6 text-xl font-mono font-bold text-[#E8C45A] bg-[#0A0A0A]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  {project.number}
                </div>

                {/* Location Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono text-[#F5F3EE] bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#E8C45A]" aria-hidden="true" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8C45A] block mb-1">
                    {currentLang === 'UZ' && project.categoryUZ ? project.categoryUZ : project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-syne text-[#F5F3EE] group-hover:text-[#E8C45A] group-hover:translate-x-2 transition-all duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="p-3 rounded-full bg-[#1C1C1C] text-white group-hover:bg-[#E8C45A] group-hover:text-[#0A0A0A] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl bg-[#111111] border border-white/15 rounded-3xl overflow-hidden p-6 md:p-12 my-8 text-[#F5F3EE]"
            >
              {/* Close button */}
              <button
                type="button"
                aria-label="Close project modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-[#0A0A0A] text-white transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 pr-12">
                <span className="text-xs font-mono text-[#E8C45A] uppercase tracking-widest block mb-2">
                  CASE STUDY {selectedProject.number} // {currentLang === 'UZ' && selectedProject.categoryUZ ? selectedProject.categoryUZ : selectedProject.category}
                </span>
                <h2 id="project-modal-title" className="text-3xl md:text-5xl font-bold font-syne text-white uppercase">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-xs font-mono text-[#A6A39D] mt-3">
                  <span>{selectedProject.location}</span>
                  <span>•</span>
                  <span>{selectedProject.architect}</span>
                  <span>•</span>
                  <span>{selectedProject.area}</span>
                </div>
              </div>

              {/* Interactive Before/After Night Light Toggle Stage */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10 bg-[#0A0A0A]">
                <img
                  src={nightModeToggle ? selectedProject.imageNight : selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />

                {/* Light Toggle Switch */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-[#0A0A0A]/90 backdrop-blur-md p-2 rounded-full border border-white/15" role="group" aria-label="Lighting condition scenario toggle">
                  <button
                    type="button"
                    aria-pressed={!nightModeToggle}
                    aria-label="Switch to daytime light scenario"
                    onClick={() => setNightModeToggle(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] ${
                      !nightModeToggle ? 'bg-white text-black font-bold' : 'text-[#A6A39D]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{currentLang === 'UZ' ? 'KUNDUZGI NUR' : 'ДНЕВНОЙ СВЕТ'}</span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={nightModeToggle}
                    aria-label="Switch to evening light scenario"
                    onClick={() => setNightModeToggle(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] ${
                      nightModeToggle ? 'bg-[#E8C45A]' : 'text-[#A6A39D]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{currentLang === 'UZ' ? 'KECHKI SSENARIY' : 'ВЕЧЕРНИЙ СЦЕНАРИЙ'}</span>
                  </button>
                </div>
              </div>

              {/* Case Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/10">
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E8C45A]">
                    {currentLang === 'UZ' ? 'ARXITEKTURA YECHIMI' : 'АРХИТЕКТУРНОЕ РЕШЕНИЕ'}
                  </h4>
                  <p className="text-sm md:text-base font-light text-[#A6A39D] leading-relaxed">
                    {currentLang === 'UZ' && selectedProject.descriptionUZ ? selectedProject.descriptionUZ : selectedProject.description}
                  </p>
                </div>

                <div className="md:col-span-5 space-y-4 bg-[#1C1C1C] p-6 rounded-2xl border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#E8C45A]">
                    {currentLang === 'UZ' ? 'ISHLATILGAN USKUNALAR' : 'ИСПОЛЬЗОВАННОЕ ОБОРУДОВАНИЕ'}
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-white">
                    {selectedProject.fixturesUsed.map((fixture, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8C45A]" />
                        <span>{fixture}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                    <span className="text-[#A6A39D]">{currentLang === 'UZ' ? "O'RTACHA YORITILGANLIK:" : 'СРЕДНЯЯ ОСВЕЩЕННОСТЬ:'}</span>
                    <span className="text-[#E8C45A] font-bold">{selectedProject.luxLevel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

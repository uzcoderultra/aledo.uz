import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IntroductionSection } from './components/IntroductionSection';
import { AledoNumbers } from './components/AledoNumbers';
import { ProductExperience } from './components/ProductExperience';
import { ProductExplorerInteractive } from './components/ProductExplorerInteractive';
import { FeaturedSonic } from './components/FeaturedSonic';
import { ProjectsGallery } from './components/ProjectsGallery';
import { UzbekistanIdentity } from './components/UzbekistanIdentity';
import { ServiceProcessTimeline } from './components/ServiceProcessTimeline';
import { LightLabExperimental } from './components/LightLabExperimental';
import { LightingScenarios } from './components/LightingScenarios';
import { SvetovayaSredaEducation } from './components/SvetovayaSredaEducation';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';

import { LightingCalculatorModal } from './components/LightingCalculatorModal';
import { SearchAndCatalogModal } from './components/SearchAndCatalogModal';
import { ProjectDiscussionModal } from './components/ProjectDiscussionModal';

import { Language, ProductItem, ProjectItem } from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('RU');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState<boolean>(false);
  const [discussModalOpen, setDiscussModalOpen] = useState<boolean>(false);
  const [discussMessage, setDiscussMessage] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDiscussWithMessage = (msg: string) => {
    setDiscussMessage(msg);
    setDiscussModalOpen(true);
  };

  const handleDownloadSpec = (systemName: string) => {
    handleOpenDiscussWithMessage(`Запрос файлов спек-листа, IES и 3D BIM для системы: ${systemName}`);
  };

  const handleSelectProduct = (product: ProductItem) => {
    handleOpenDiscussWithMessage(`Запрос спецификации по продукту ALEDO: ${product.name} (${product.specs.power}, ${product.specs.cri})`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EE] relative selection:bg-[#E8C45A] selection:text-[#0A0A0A]">
      {/* Custom Interactive Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navigation
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
        onOpenDiscuss={() => handleOpenDiscussWithMessage('')}
      />


      {/* Main Page Content Sections with Cross-Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentLang}
          initial={{ opacity: 0.88, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.88, y: -3 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {/* 1. Hero Section */}
          <HeroSection
            currentLang={currentLang}
            onOpenCatalog={() => setSearchModalOpen(true)}
            onExploreProjects={() => {
              const projectsEl = document.querySelector('#projects');
              if (projectsEl) projectsEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 2. Manifesto / Introduction */}
          <IntroductionSection currentLang={currentLang} />

          {/* 3. Editorial Numbers & Scale */}
          <AledoNumbers currentLang={currentLang} />

          {/* 4. Product Ecosystem Experience */}
          <ProductExperience
            currentLang={currentLang}
            onSelectProduct={handleSelectProduct}
          />

          {/* 5. Interactive 3D / Canvas Optics Spotlight Explorer */}
          <ProductExplorerInteractive currentLang={currentLang} />

          {/* 6. Flagship System: SONIC Configurator */}
          <FeaturedSonic
            currentLang={currentLang}
            onDownloadSpec={handleDownloadSpec}
          />

          {/* 7. Architectural Projects Gallery (Uzbekistan Case Studies) */}
          <ProjectsGallery currentLang={currentLang} />

          {/* 8. Interactive Lighting Scenarios (Work, Relax, Gallery, Night) */}
          <LightingScenarios
            currentLang={currentLang}
            onOpenDiscuss={(initialMsg) => handleOpenDiscussWithMessage(initialMsg || '')}
          />

          {/* 9. Uzbekistan Modern Architecture Identity */}
          <UzbekistanIdentity currentLang={currentLang} />

          {/* 9. Lighting Design Full Service Workflow */}
          <ServiceProcessTimeline currentLang={currentLang} />

          {/* 10. Light Lab / Physics & Optics Experiments */}
          <LightLabExperimental currentLang={currentLang} />

          {/* 11. Svetovaya Sreda / Educational Magazine & Events */}
          <SvetovayaSredaEducation currentLang={currentLang} />

          {/* 12. Minimalist Dark CTA */}
          <CtaSection
            currentLang={currentLang}
            onOpenDiscuss={() => handleOpenDiscussWithMessage('')}
          />
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenDiscuss={() => handleOpenDiscussWithMessage('')}
      />

      {/* Modals & Overlays */}
      <LightingCalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
        onOpenDiscussWithData={(summary) => handleOpenDiscussWithMessage(summary)}
        currentLang={currentLang}
      />

      <SearchAndCatalogModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
        onSelectProject={() => {
          setSearchModalOpen(false);
          const projectsEl = document.querySelector('#projects');
          if (projectsEl) projectsEl.scrollIntoView({ behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />

      <ProjectDiscussionModal
        isOpen={discussModalOpen}
        onClose={() => setDiscussModalOpen(false)}
        initialMessage={discussMessage}
        currentLang={currentLang}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            key="back-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-[#1C1C1C]/90 backdrop-blur-md text-[#F5F3EE] border border-white/15 hover:border-[#E8C45A] hover:bg-[#E8C45A] hover:text-[#0A0A0A] transition-all duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A] group"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Paperclip, CheckCircle2, Phone, Mail, MapPin, MessageSquare, Instagram, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { ALEDO_TRANSLATIONS } from '../data/aledoData';

interface ProjectDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  currentLang: Language;
}

export const ProjectDiscussionModal: React.FC<ProjectDiscussionModalProps> = ({
  isOpen,
  onClose,
  initialMessage = '',
  currentLang
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: initialMessage
  });
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = ALEDO_TRANSLATIONS[currentLang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          fileName: fileName || '',
          source: 'Форма "Обсудить проект" на сайте ALEDO'
        })
      });
    } catch (err) {
      console.error('Failed to submit lead to backend:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="discussion-modal-title"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-[#111111] border border-white/15 rounded-3xl p-5 sm:p-8 md:p-12 my-auto text-[#F5F3EE] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-h-[92vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close project discussion modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#1C1C1C] hover:bg-[#E8C45A] hover:text-black text-white transition-all border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C45A]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Left Contact Info Column */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#E8C45A] uppercase tracking-widest block mb-2">
                ALEDO UZBEKISTAN
              </span>
              <h2 id="discussion-modal-title" className="text-3xl md:text-5xl font-bold font-syne uppercase text-white mb-6">
                {currentLang === 'UZ' ? 'LOYIHANI MUHOKAMA QILISH' : 'ОБСУДИТЬ ПРОЕКТ'}
              </h2>
              <p className="text-xs md:text-sm font-light text-[#A6A39D] leading-relaxed mb-8">
                {currentLang === 'UZ'
                  ? 'Yoritish hisobi, uskunalarni tanlash va obektga borish uchun Toshkentdagi muhandislik jamoamiz bilan bog\'laning.'
                  : 'Свяжитесь с нашей инженерной командой в Ташкенте для светотехнического расчета, подбора оборудования и выезда на объект.'}
              </p>

              <div className="space-y-4 text-xs font-mono text-[#F5F3EE]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#161616] border border-white/10">
                  <MapPin className="w-4 h-4 text-[#E8C45A]" />
                  <span>{currentLang === 'UZ' ? 'Toshkent sh., Mirobod t., Nukus ko\'ch., 29B' : 'г. Ташкент, Мирабадский р-н, ул. Нукус, 29B'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#161616] border border-white/10">
                  <Phone className="w-4 h-4 text-[#E8C45A]" />
                  <span>+998 (71) 200-00-88</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#161616] border border-white/10">
                  <Mail className="w-4 h-4 text-[#E8C45A]" />
                  <span>tashkent@aledo.uz</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-xs font-mono text-[#A6A39D]">
              <a href="https://t.me/aledo_uz" target="_blank" rel="noreferrer" className="hover:text-[#E8C45A]">
                TELEGRAM: @ALEDO_UZ
              </a>
              <span>•</span>
              <a href="https://instagram.com/aledo.uz" target="_blank" rel="noreferrer" className="hover:text-[#E8C45A]">
                INSTAGRAM
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#161616] p-6 md:p-8 rounded-2xl border border-white/10">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8C45A] text-[#0A0A0A] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(232,196,90,0.5)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-syne text-white">
                  {currentLang === 'UZ' ? 'SO\'ROV MUVAPFAQIYATLI YUBORILDI' : 'ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА'}
                </h3>
                <p className="text-xs font-mono text-[#A6A39D] max-w-md mx-auto">
                  {currentLang === 'UZ'
                    ? 'Rahmat! ALEDO Uzbekistan yoritish muhandisi 30 daqiqa ichida siz bilan bog\'lanadi.'
                    : 'Спасибо! Светотехник ALEDO Uzbekistan свяжется с вами в течение 30 минут.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-8 py-3 bg-[#E8C45A] text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest rounded-full"
                >
                  {currentLang === 'UZ' ? 'O\'LCHAMNI YOPISH' : 'ЗАКРЫТЬ ОКНО'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="discussion-form-name" className="block text-[10px] font-mono text-[#A6A39D] uppercase tracking-widest mb-1">
                    {currentLang === 'UZ' ? 'ISMINGIZ *' : 'ВАШЕ ИМЯ *'}
                  </label>
                  <input
                    id="discussion-form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={currentLang === 'UZ' ? 'Alisher Karimov' : 'Алишер Каримов'}
                    className="w-full bg-[#0A0A0A] border border-white/15 focus:border-[#E8C45A] focus-visible:ring-2 focus-visible:ring-[#E8C45A] rounded-xl p-3 text-xs font-mono text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="discussion-form-company" className="block text-[10px] font-mono text-[#A6A39D] uppercase tracking-widest mb-1">
                      {currentLang === 'UZ' ? 'KOMPANIYA / BYURO' : 'КОМПАНИЯ / БЮРО'}
                    </label>
                    <input
                      id="discussion-form-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Studio Architecture"
                      className="w-full bg-[#0A0A0A] border border-white/15 focus:border-[#E8C45A] focus-visible:ring-2 focus-visible:ring-[#E8C45A] rounded-xl p-3 text-xs font-mono text-white outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="discussion-form-phone" className="block text-[10px] font-mono text-[#A6A39D] uppercase tracking-widest mb-1">
                      {currentLang === 'UZ' ? 'TELEFON *' : 'ТЕЛЕФОН *'}
                    </label>
                    <input
                      id="discussion-form-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+998 90 123 45 67"
                      className="w-full bg-[#0A0A0A] border border-white/15 focus:border-[#E8C45A] focus-visible:ring-2 focus-visible:ring-[#E8C45A] rounded-xl p-3 text-xs font-mono text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="discussion-form-email" className="block text-[10px] font-mono text-[#A6A39D] uppercase tracking-widest mb-1">
                    EMAIL
                  </label>
                  <input
                    id="discussion-form-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="architect@studio.uz"
                    className="w-full bg-[#0A0A0A] border border-white/15 focus:border-[#E8C45A] focus-visible:ring-2 focus-visible:ring-[#E8C45A] rounded-xl p-3 text-xs font-mono text-white outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="discussion-form-message" className="block text-[10px] font-mono text-[#A6A39D] uppercase tracking-widest mb-1">
                    {currentLang === 'UZ' ? 'LOYIHA HAQIDA GAPIRING' : 'РАССКАЖИТЕ О ПРОЕКТЕ'}
                  </label>
                  <textarea
                    id="discussion-form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={currentLang === 'UZ' ? 'Obekt turi, maydoni, amalga oshirish muddatlari va yorug\'likka bo\'lgan talablar...' : 'Тип объекта, площадь, сроки реализации и требования к свету...'}
                    className="w-full bg-[#0A0A0A] border border-white/15 focus:border-[#E8C45A] focus-visible:ring-2 focus-visible:ring-[#E8C45A] rounded-xl p-3 text-xs font-mono text-white outline-none resize-none"
                  />
                </div>

                {/* Attachment Dropzone */}
                <div className="relative border border-dashed border-white/20 hover:border-[#E8C45A] p-4 rounded-xl text-center bg-[#0A0A0A] transition-colors cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#A6A39D]">
                    <Paperclip className="w-4 h-4 text-[#E8C45A]" />
                    <span>{fileName ? fileName : (currentLang === 'UZ' ? 'CHIZMALARNI BIRIKTIRISH / DWG / PDF' : 'ПРИКРЕПИТЬ ЧЕРТЕЖИ / DWG / PDF')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#E8C45A] hover:bg-white text-[#0A0A0A] font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,196,90,0.3)]"
                >
                  <span>
                    {isSubmitting
                      ? (currentLang === 'UZ' ? 'YUBORILMOQDA...' : 'ОТПРАВКА...')
                      : (currentLang === 'UZ' ? 'SO\'ROVNI YUBORISH →' : 'ОТПРАВИТЬ ЗАЯВКУ →')}
                  </span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

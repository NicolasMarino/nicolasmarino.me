'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="group flex flex-col items-center justify-end p-1.5 rounded-[10px] transition-all duration-200 gap-1 w-14 min-h-[32px] hover:bg-white/10 hover:pb-1.5 max-md:p-[4px_6px] max-md:w-10 max-md:min-w-10 max-md:min-h-[28px] max-md:shrink-0 max-md:hover:pb-1 max-[480px]:w-9 max-[480px]:min-w-9 max-[480px]:p-[3px_4px]"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <Globe className="w-[18px] h-[18px] text-white/70 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 max-md:w-4 max-md:h-4 max-md:group-hover:-translate-y-[1px] max-[480px]:w-[14px] max-[480px]:h-[14px]" />
      <span className="font-mono text-[8px] font-normal tracking-[0.03em] text-white/90 whitespace-nowrap lowercase max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out group-hover:max-h-[12px] group-hover:opacity-100 max-md:text-[6px] max-md:group-hover:max-h-[10px]">
        {t('language.switch')}
      </span>
    </button>
  );
}

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import en from './en.json';
import es from './es.json';

type Language = 'en' | 'es';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Translations> = { en, es };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type NestedObject = Record<string, unknown>;

function getNestedValue(obj: NestedObject, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as NestedObject)[part];
    }
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = (newLang: Language) => {
    if (newLang === initialLanguage) return;
    const newPath = pathname.replace(`/${initialLanguage}`, `/${newLang}`);
    router.push(newPath);
  };

  const t = (key: string): string => {
    return getNestedValue(translations[initialLanguage], key);
  };

  return (
    <LanguageContext.Provider value={{ language: initialLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

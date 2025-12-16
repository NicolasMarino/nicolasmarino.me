'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, BookOpen, Mail, Github, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import LanguageSwitcher from './language-switcher';

export default function DockNavbar() {
  const { t, language } = useLanguage();

  const navItems = [
    { href: `/${language}`, icon: Home, labelKey: 'nav.home' },
    { href: '#projects', icon: FolderOpen, labelKey: 'nav.projects' },
    { href: '#experience', icon: Briefcase, labelKey: 'nav.experience' },
    { href: `/${language}/blog`, icon: BookOpen, labelKey: 'nav.blog' },
    { href: '#contact', icon: Mail, labelKey: 'nav.contact' },
  ];

  const resumeUrl = language === 'es' ? '/cv/es.pdf' : '/cv/en.pdf';

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none max-md:pb-4 max-md:left-2 max-md:right-2 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[120px] max-md:before:h-[100px] before:bg-gradient-to-t before:from-background before:via-background/60 before:to-transparent before:pointer-events-none"
    >
      <div className="flex items-end gap-2 p-2.5 pb-2 bg-[#111111]/95 backdrop-blur-xl rounded-2xl shadow-2xl pointer-events-auto overflow-visible max-md:gap-0.5 max-md:p-2 max-md:pb-1.5 max-md:rounded-[14px] max-md:flex-nowrap max-md:overflow-x-auto max-md:max-w-full max-md:scrollbar-none max-[480px]:gap-[1px] max-[480px]:p-[6px] max-[480px]:pb-1">
        {navItems.map((item) => (
          <Link
            key={item.labelKey}
            href={item.href}
            className="group flex flex-col items-center justify-end p-1.5 rounded-[10px] transition-all duration-200 no-underline gap-1 w-14 min-h-[32px] hover:bg-white/10 hover:pb-1.5 max-md:p-[4px_6px] max-md:w-10 max-md:min-w-10 max-md:min-h-[28px] max-md:shrink-0 max-md:hover:pb-1 max-[480px]:w-9 max-[480px]:min-w-9 max-[480px]:p-[3px_4px]"
            aria-label={t(item.labelKey)}
          >
            <item.icon className="w-[18px] h-[18px] text-white/70 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 max-md:w-4 max-md:h-4 max-md:group-hover:-translate-y-[1px] max-[480px]:w-[14px] max-[480px]:h-[14px]" />
            <span className="font-mono text-[8px] font-normal tracking-[0.03em] text-white/90 whitespace-nowrap lowercase max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out group-hover:max-h-[12px] group-hover:opacity-100 max-md:text-[6px] max-md:group-hover:max-h-[10px]">
              {t(item.labelKey)}
            </span>
          </Link>
        ))}

        <div className="w-px h-7 bg-white/15 mx-1 max-md:h-[22px] max-md:mx-0.5 max-md:shrink-0 max-[480px]:h-5 max-[480px]:mx-[1px]" />

        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-end p-1.5 rounded-[10px] transition-all duration-200 no-underline gap-1 w-14 min-h-[32px] hover:bg-white/10 hover:pb-1.5 max-md:p-[4px_6px] max-md:w-10 max-md:min-w-10 max-md:min-h-[28px] max-md:shrink-0 max-md:hover:pb-1 max-[480px]:w-9 max-[480px]:min-w-9 max-[480px]:p-[3px_4px]"
          aria-label="GitHub Profile"
        >
          <Github className="w-[18px] h-[18px] text-white/70 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 max-md:w-4 max-md:h-4 max-md:group-hover:-translate-y-[1px] max-[480px]:w-[14px] max-[480px]:h-[14px]" />
          <span className="font-mono text-[8px] font-normal tracking-[0.03em] text-white/90 whitespace-nowrap lowercase max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out group-hover:max-h-[12px] group-hover:opacity-100 max-md:text-[6px] max-md:group-hover:max-h-[10px]">
            {t('nav.github')}
          </span>
        </Link>

        <Link
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-end p-1.5 rounded-[10px] transition-all duration-200 no-underline gap-1 w-14 min-h-[32px] hover:bg-white/10 hover:pb-1.5 max-md:p-[4px_6px] max-md:w-10 max-md:min-w-10 max-md:min-h-[28px] max-md:shrink-0 max-md:hover:pb-1 max-[480px]:w-9 max-[480px]:min-w-9 max-[480px]:p-[3px_4px]"
          aria-label="View Resume"
        >
          <FileText className="w-[18px] h-[18px] text-white/70 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 max-md:w-4 max-md:h-4 max-md:group-hover:-translate-y-[1px] max-[480px]:w-[14px] max-[480px]:h-[14px]" />
          <span className="font-mono text-[8px] font-normal tracking-[0.03em] text-white/90 whitespace-nowrap lowercase max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out group-hover:max-h-[12px] group-hover:opacity-100 max-md:text-[6px] max-md:group-hover:max-h-[10px]">
            {t('nav.resume')}
          </span>
        </Link>

        <div className="w-px h-7 bg-white/15 mx-1 max-md:h-[22px] max-md:mx-0.5 max-md:shrink-0 max-[480px]:h-5 max-[480px]:mx-[1px]" />

        <LanguageSwitcher />
      </div>
    </motion.nav>
  );
}

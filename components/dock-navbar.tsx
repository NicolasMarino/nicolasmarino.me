'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, BookOpen, Mail, FileText, User } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import LanguageSwitcher from './language-switcher';
import ThemeToggle from './theme-toggle';

export default function DockNavbar() {
  const { t, language } = useLanguage();

  const navItems = [
    { href: `/${language}`, icon: Home, labelKey: 'nav.home' },
    { href: `/${language}#about`, icon: User, labelKey: 'nav.about' },
    { href: `/${language}#experience`, icon: Briefcase, labelKey: 'nav.experience' },
    { href: `/${language}#projects`, icon: FolderOpen, labelKey: 'nav.projects' },
    { href: `/${language}/blog`, icon: BookOpen, labelKey: 'nav.blog' },
    { href: `/${language}#contact`, icon: Mail, labelKey: 'nav.contact' },
  ];

  const resumeUrl = language === 'es' ? '/cv/es.pdf' : '/cv/en.pdf';

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="dock-nav dock-nav-mobile-gradient"
    >
      <div className="dock-container">
        {navItems.map((item) => (
          <Link
            key={item.labelKey}
            href={item.href}
            className="dock-item"
            aria-label={t(item.labelKey)}
          >
            <item.icon className="dock-icon" />
            <span className="dock-label">{t(item.labelKey)}</span>
          </Link>
        ))}

        <div className="hidden md:block dock-separator" />

        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex dock-item"
          aria-label="GitHub Profile"
        >
          <SiGithub className="dock-icon" />
          <span className="dock-label">{t('nav.github')}</span>
        </Link>

        <Link
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex dock-item"
          aria-label="View Resume"
        >
          <FileText className="dock-icon" />
          <span className="dock-label">{t('nav.resume')}</span>
        </Link>

        <div className="dock-separator" />

        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </motion.nav>
  );
}

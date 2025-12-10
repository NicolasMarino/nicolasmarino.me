'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, BookOpen, Mail, Github, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import LanguageSwitcher from './language-switcher';

const NAV_ITEMS = [
  { href: '/', icon: Home, labelKey: 'nav.home' },
  { href: '#projects', icon: FolderOpen, labelKey: 'nav.projects' },
  { href: '#experience', icon: Briefcase, labelKey: 'nav.experience' },
  { href: '/blog', icon: BookOpen, labelKey: 'nav.blog' },
  { href: '#contact', icon: Mail, labelKey: 'nav.contact' },
];

export default function DockNavbar() {
  const { t } = useLanguage();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="dock-navbar"
    >
      <div className="dock-container">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.labelKey}
            href={item.href}
            className="dock-item"
            aria-label={t(item.labelKey)}
          >
            <item.icon className="dock-icon" />
            <span className="dock-tooltip">{t(item.labelKey)}</span>
          </Link>
        ))}

        <div className="dock-separator" />

        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-item"
          aria-label="GitHub Profile"
        >
          <Github className="dock-icon" />
          <span className="dock-tooltip">{t('nav.github')}</span>
        </Link>

        <Link href={siteConfig.resume} className="dock-item" aria-label="View Resume">
          <FileText className="dock-icon" />
          <span className="dock-tooltip">{t('nav.resume')}</span>
        </Link>

        <div className="dock-separator" />

        <LanguageSwitcher />
      </div>
    </motion.nav>
  );
}

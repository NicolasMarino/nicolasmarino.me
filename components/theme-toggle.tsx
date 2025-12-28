'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();

  // SSR-safe way to detect if we're mounted on the client
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button className="dock-item theme-toggle" aria-label="Toggle theme">
        <div className="dock-icon" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="dock-item theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="dock-icon" /> : <Moon className="dock-icon" />}
      <span className="dock-label">{isDark ? t('theme.light') : t('theme.dark')}</span>
    </button>
  );
}

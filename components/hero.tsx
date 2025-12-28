'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { siteConfig } from '@/config/site';
import { FlipWords } from '@/components/ui/flip-words';

export default function Hero() {
  const { t } = useLanguage();

  const words = [t('hero.flipWord1'), t('hero.flipWord2'), t('hero.flipWord3')];

  return (
    <section className="flex flex-col items-center justify-center text-center gap-4 md:gap-6 pt-6 md:pt-8 pb-6 md:pb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-32 h-32 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-green-200 to-green-600 p-1">
          <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center">
            <Image
              src={siteConfig.avatar}
              alt={t('hero.name')}
              width={180}
              height={180}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">{t('hero.name')}</span>
        </h1>
        <div className="text-sm md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mt-2 h-6 md:h-8 flex items-center justify-center">
          <FlipWords words={words} duration={1500} className="text-primary font-medium" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href={`mailto:${siteConfig.email}`}
          className="btn-base btn-primary text-sm md:text-base"
        >
          {t('hero.cta')}
        </Link>
      </motion.div>
    </section>
  );
}

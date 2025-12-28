import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import '../globals.css';
import DockNavbar from '@/components/dock-navbar';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { ThemeProvider } from '@/components/theme-provider';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs
    ? 'Nicolás Marino - Ingeniero de Software'
    : 'Nicolas Marino - Software Engineer';
  const description = isEs
    ? 'Portfolio personal y blog de Nicolás Marino, Ingeniero de Software especializado en Backend y Ciencia de Datos.'
    : 'Personal portfolio and blog of Nicolas Marino, a Software Engineer focused on Backend and Data Science.';

  return {
    title,
    description,
    keywords: ['portfolio', 'software engineer', 'developer', 'web development', 'data science'],
    authors: [{ name: 'Nicolas Marino' }],
    creator: 'Nicolas Marino',
    openGraph: {
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      url: 'https://nicolasmarino.me',
      title,
      description,
      siteName: 'Nicolas Marino',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@nicolasmarino',
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const validLang = (['en', 'es'].includes(lang) ? lang : 'en') as 'en' | 'es';

  return (
    <html lang={validLang} className={`${firaCode.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.vectorlogo.zone" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider initialLanguage={validLang}>
            {children}
            <DockNavbar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

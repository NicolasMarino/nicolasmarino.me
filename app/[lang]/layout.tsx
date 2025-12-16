import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import '../globals.css';
import DockNavbar from '@/components/dock-navbar';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nicolas Marino - Software Engineer',
  description: 'Software Engineer based in Colombia.',
  keywords: ['portfolio', 'software engineer', 'developer', 'web development'],
  authors: [{ name: 'Nicolas Marino' }],
  creator: 'Nicolas Marino',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nicolasmarino.me',
    title: 'Nicolas Marino - Software Engineer',
    description: 'Software Engineer based in Colombia.',
    siteName: 'Nicolas Marino',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nicolas Marino - Software Engineer',
    description: 'Software Engineer based in Colombia.',
    creator: '@nicolasmarino',
  },
};

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
    <html lang={validLang} className={`${firaCode.variable}`}>
      <body className="antialiased">
        <LanguageProvider initialLanguage={validLang}>
          {children}
          <DockNavbar />
        </LanguageProvider>
      </body>
    </html>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const targetLang = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
    router.replace(`/${targetLang}`);
  }, [router]);

  return null;
}

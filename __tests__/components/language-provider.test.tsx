import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, waitFor, renderHook } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/lib/i18n/LanguageContext';

vi.mock('@/lib/i18n/en.json', () => ({
  default: {
    hero: { title: 'Hello World', subtitle: 'Welcome' },
    common: { button: 'Click me' },
  },
}));

vi.mock('@/lib/i18n/es.json', () => ({
  default: {
    hero: { title: 'Hola Mundo', subtitle: 'Bienvenido' },
    common: { button: 'Clickeame' },
  },
}));

const mockStorage = new Map<string, string>();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn((key: string) => mockStorage.get(key) || null),
    setItem: vi.fn((key: string, value: string) => mockStorage.set(key, value)),
    clear: vi.fn(() => mockStorage.clear()),
    removeItem: vi.fn((key: string) => mockStorage.delete(key)),
  },
});

describe('LanguageProvider', () => {
  beforeEach(() => {
    mockStorage.clear();
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <LanguageProvider>
        <div data-testid="child">Content</div>
      </LanguageProvider>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('defaults to Spanish (es)', () => {
    const TestComponent = () => {
      const { language } = useLanguage();
      return <span data-testid="lang">{language}</span>;
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId('lang')).toHaveTextContent('es');
  });

  it('initializes with stored language', async () => {
    mockStorage.set('language', 'en');

    const TestComponent = () => {
      const { language } = useLanguage();
      return <span data-testid="lang">{language}</span>;
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('lang')).toHaveTextContent('en');
    });
  });

  it('translates keys correctly', () => {
    const TestComponent = () => {
      const { t } = useLanguage();
      return <h1>{t('hero.title')}</h1>;
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Hola Mundo');
  });

  it('switches language and persists', async () => {
    const TestComponent = () => {
      const { language, setLanguage, t } = useLanguage();
      return (
        <div>
          <span data-testid="current-lang">{language}</span>
          <span data-testid="translated">{t('common.button')}</span>
          <button onClick={() => setLanguage('en')}>Switch</button>
        </div>
      );
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es');
    expect(screen.getByTestId('translated')).toHaveTextContent('Clickeame');

    await act(async () => {
      screen.getByText('Switch').click();
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translated')).toHaveTextContent('Click me');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'en');
  });

  it('handles nested keys gracefully', () => {
    const TestComponent = () => {
      const { t } = useLanguage();
      return <span>{t('hero.subtitle')}</span>;
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );
    expect(screen.getByText('Bienvenido')).toBeInTheDocument();
  });

  it('returns key path for missing translations', () => {
    const TestComponent = () => {
      const { t } = useLanguage();
      return <span>{t('hero.missing.key')}</span>;
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );
    expect(screen.getByText('hero.missing.key')).toBeInTheDocument();
  });
});

describe('useLanguage', () => {
  it('throws error outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used within a LanguageProvider',
    );
    consoleError.mockRestore();
  });
});

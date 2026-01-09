import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, renderHook } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/lib/i18n/LanguageContext';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/es/about',
}));

vi.mock('@/lib/i18n/en.json', () => ({
  default: { greeting: 'Hello', nested: { message: 'Welcome' } },
}));

vi.mock('@/lib/i18n/es.json', () => ({
  default: { greeting: 'Hola', nested: { message: 'Bienvenido' } },
}));

beforeEach(() => vi.clearAllMocks());

function TestConsumer({ translationKey }: { translationKey?: string }) {
  const { language, t, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      {translationKey && <span data-testid="text">{t(translationKey)}</span>}
      <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}>Toggle</button>
    </div>
  );
}

describe('LanguageProvider', () => {
  it('should render children', () => {
    render(
      <LanguageProvider initialLanguage="es">
        <div>Child</div>
      </LanguageProvider>,
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  it('should use the initial language', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <TestConsumer />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('should translate keys', () => {
    render(
      <LanguageProvider initialLanguage="es">
        <TestConsumer translationKey="greeting" />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('text')).toHaveTextContent('Hola');
  });

  it('should handle nested keys', () => {
    render(
      <LanguageProvider initialLanguage="en">
        <TestConsumer translationKey="nested.message" />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('text')).toHaveTextContent('Welcome');
  });

  it('should return the key when translation is missing', () => {
    render(
      <LanguageProvider initialLanguage="es">
        <TestConsumer translationKey="missing.key" />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('text')).toHaveTextContent('missing.key');
  });

  it('should navigate when changing language', async () => {
    render(
      <LanguageProvider initialLanguage="es">
        <TestConsumer />
      </LanguageProvider>,
    );

    await act(async () => {
      screen.getByText('Toggle').click();
    });

    expect(mockPush).toHaveBeenCalledWith('/en/about');
  });

  it('should not navigate when setting the same language', async () => {
    render(
      <LanguageProvider initialLanguage="en">
        <TestConsumer />
      </LanguageProvider>,
    );

    // Initial state is 'en'. Try setting it to 'en' again.
    const { setLanguage } = useLanguageFromHook();

    await act(async () => {
      setLanguage('en');
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});

type LanguageContextReturn = ReturnType<typeof useLanguage>;

// Helper to access context from outside render for cleaner tests
function useLanguageFromHook(): LanguageContextReturn {
  let result: LanguageContextReturn | undefined;
  function HookConsumer() {
    result = useLanguage();
    return null;
  }
  render(
    <LanguageProvider initialLanguage="en">
      <HookConsumer />
    </LanguageProvider>,
  );
  return result!;
}

describe('useLanguage', () => {
  it('should throw when used outside provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      'useLanguage must be used within a LanguageProvider',
    );
  });
});

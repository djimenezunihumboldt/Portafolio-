import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { useLanguage } from '../../hooks/useLanguage';

// Test component that uses the language context
const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="translation">{t('hero.greeting')}</span>
      <button onClick={() => setLanguage('en')}>Switch to English</button>
      <button onClick={() => setLanguage('es')}>Switch to Spanish</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides default Spanish language', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
  });

  it('translates text correctly in Spanish', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('es');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('translation')).toHaveTextContent('Hola, soy');
  });

  it('switches language to English', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('es');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const switchButton = screen.getByText('Switch to English');
    fireEvent.click(switchButton);
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('translation')).toHaveTextContent("Hi, I'm");
  });

  it('persists language preference to localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('es');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const switchButton = screen.getByText('Switch to English');
    fireEvent.click(switchButton);
    
    expect(window.localStorage.setItem).toHaveBeenCalledWith('language', 'en');
  });

  it('loads saved language from localStorage', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('en');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
  });

  it('returns key when translation is missing', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('es');
    
    const TestMissingKey = () => {
      const { t } = useLanguage();
      return <span data-testid="missing">{t('non.existent.key')}</span>;
    };
    
    render(
      <LanguageProvider>
        <TestMissingKey />
      </LanguageProvider>
    );

    expect(screen.getByTestId('missing')).toHaveTextContent('non.existent.key');
  });
});

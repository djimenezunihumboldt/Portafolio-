import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface HighContrastContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

export function HighContrastProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highContrast');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    localStorage.setItem('highContrast', JSON.stringify(newState));
  };

  return (
    <HighContrastContext.Provider value={{ highContrast, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  );
}

export function useHighContrast() {
  const context = useContext(HighContrastContext);
  if (context === undefined) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
}

// Toggle Component
import { Eye, EyeOff } from 'lucide-react';

export function HighContrastToggle() {
  const { highContrast, toggleHighContrast } = useHighContrast();
  const { language } = useLanguage();

  return (
    <button
      onClick={toggleHighContrast}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label={
        highContrast
          ? (language === 'es' ? 'Desactivar alto contraste' : 'Disable high contrast')
          : (language === 'es' ? 'Activar alto contraste' : 'Enable high contrast')
      }
      title={
        highContrast
          ? (language === 'es' ? 'Alto contraste activado' : 'High contrast enabled')
          : (language === 'es' ? 'Alto contraste desactivado' : 'High contrast disabled')
      }
    >
      {highContrast ? (
        <Eye className="w-5 h-5 text-yellow-500" />
      ) : (
        <EyeOff className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}

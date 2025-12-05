import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnalyticsEvents } from '../utils/analytics';

export type ColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  themes: { id: ColorTheme; name: string; primary: string; accent: string }[];
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

// Color theme definitions
const themes: { id: ColorTheme; name: string; primary: string; accent: string; css: Record<string, string> }[] = [
  {
    id: 'blue',
    name: 'Azul',
    primary: '#3B82F6',
    accent: '#8B5CF6',
    css: {
      '--color-primary-50': '239 246 255',
      '--color-primary-100': '219 234 254',
      '--color-primary-200': '191 219 254',
      '--color-primary-300': '147 197 253',
      '--color-primary-400': '96 165 250',
      '--color-primary-500': '59 130 246',
      '--color-primary-600': '37 99 235',
      '--color-primary-700': '29 78 216',
      '--color-primary-800': '30 64 175',
      '--color-primary-900': '30 58 138',
      '--color-accent-400': '167 139 250',
      '--color-accent-500': '139 92 246',
      '--color-accent-600': '124 58 237',
    }
  },
  {
    id: 'green',
    name: 'Verde',
    primary: '#10B981',
    accent: '#14B8A6',
    css: {
      '--color-primary-50': '236 253 245',
      '--color-primary-100': '209 250 229',
      '--color-primary-200': '167 243 208',
      '--color-primary-300': '110 231 183',
      '--color-primary-400': '52 211 153',
      '--color-primary-500': '16 185 129',
      '--color-primary-600': '5 150 105',
      '--color-primary-700': '4 120 87',
      '--color-primary-800': '6 95 70',
      '--color-primary-900': '6 78 59',
      '--color-accent-400': '45 212 191',
      '--color-accent-500': '20 184 166',
      '--color-accent-600': '13 148 136',
    }
  },
  {
    id: 'purple',
    name: 'Morado',
    primary: '#8B5CF6',
    accent: '#EC4899',
    css: {
      '--color-primary-50': '250 245 255',
      '--color-primary-100': '243 232 255',
      '--color-primary-200': '233 213 255',
      '--color-primary-300': '216 180 254',
      '--color-primary-400': '192 132 252',
      '--color-primary-500': '139 92 246',
      '--color-primary-600': '124 58 237',
      '--color-primary-700': '109 40 217',
      '--color-primary-800': '91 33 182',
      '--color-primary-900': '76 29 149',
      '--color-accent-400': '244 114 182',
      '--color-accent-500': '236 72 153',
      '--color-accent-600': '219 39 119',
    }
  },
  {
    id: 'orange',
    name: 'Naranja',
    primary: '#F97316',
    accent: '#EAB308',
    css: {
      '--color-primary-50': '255 247 237',
      '--color-primary-100': '255 237 213',
      '--color-primary-200': '254 215 170',
      '--color-primary-300': '253 186 116',
      '--color-primary-400': '251 146 60',
      '--color-primary-500': '249 115 22',
      '--color-primary-600': '234 88 12',
      '--color-primary-700': '194 65 12',
      '--color-primary-800': '154 52 18',
      '--color-primary-900': '124 45 18',
      '--color-accent-400': '250 204 21',
      '--color-accent-500': '234 179 8',
      '--color-accent-600': '202 138 4',
    }
  },
  {
    id: 'pink',
    name: 'Rosa',
    primary: '#EC4899',
    accent: '#F43F5E',
    css: {
      '--color-primary-50': '253 242 248',
      '--color-primary-100': '252 231 243',
      '--color-primary-200': '251 207 232',
      '--color-primary-300': '249 168 212',
      '--color-primary-400': '244 114 182',
      '--color-primary-500': '236 72 153',
      '--color-primary-600': '219 39 119',
      '--color-primary-700': '190 24 93',
      '--color-primary-800': '157 23 77',
      '--color-primary-900': '131 24 67',
      '--color-accent-400': '251 113 133',
      '--color-accent-500': '244 63 94',
      '--color-accent-600': '225 29 72',
    }
  },
  {
    id: 'teal',
    name: 'Turquesa',
    primary: '#14B8A6',
    accent: '#06B6D4',
    css: {
      '--color-primary-50': '240 253 250',
      '--color-primary-100': '204 251 241',
      '--color-primary-200': '153 246 228',
      '--color-primary-300': '94 234 212',
      '--color-primary-400': '45 212 191',
      '--color-primary-500': '20 184 166',
      '--color-primary-600': '13 148 136',
      '--color-primary-700': '15 118 110',
      '--color-primary-800': '17 94 89',
      '--color-primary-900': '19 78 74',
      '--color-accent-400': '34 211 238',
      '--color-accent-500': '6 182 212',
      '--color-accent-600': '8 145 178',
    }
  }
];

export const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('colorTheme');
      return (saved as ColorTheme) || 'blue';
    }
    return 'blue';
  });

  const applyTheme = (theme: ColorTheme) => {
    const selectedTheme = themes.find(t => t.id === theme);
    if (selectedTheme) {
      const root = document.documentElement;
      Object.entries(selectedTheme.css).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
  };

  useEffect(() => {
    applyTheme(colorTheme);
  }, [colorTheme]);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('colorTheme', theme);
    applyTheme(theme);
    AnalyticsEvents.themeChange(theme);
  };

  return (
    <ColorThemeContext.Provider value={{ 
      colorTheme, 
      setColorTheme,
      themes: themes.map(t => ({ id: t.id, name: t.name, primary: t.primary, accent: t.accent }))
    }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};

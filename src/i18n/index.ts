import { es } from './es';
import { en } from './en';

export type Language = 'es' | 'en';

export type TranslationKey = string;

export const translations = {
  es,
  en,
};

/**
 * Utility function to get nested translation value
 * @param obj - The translations object
 * @param path - Dot-separated path like 'nav.inicio'
 * @returns The translated string or the key if not found
 */
export function getNestedTranslation(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }
  
  return typeof result === 'string' ? result : path;
}

/**
 * Get all available languages
 */
export const availableLanguages: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇻🇪' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export { es, en };
export default translations;

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../contexts/LanguageContext';
import flagVE from '../assets/flag-ve.png';
import flagUS from '../assets/flag-us.png';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es' as Language, name: 'Español', flag: flagVE },
    { code: 'en' as Language, name: 'English', flag: flagUS }
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label={t('nav.changeLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <img
          src={currentLanguage?.flag}
          alt={currentLanguage?.name}
          className="w-5 h-4 object-cover rounded-sm"
        />
        <span className="text-sm font-medium text-secondary-900 dark:text-white hidden sm:block">
          {currentLanguage?.name}
        </span>
        <ChevronDown
          size={16}
          className={`text-secondary-600 dark:text-secondary-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-gray-200 dark:border-secondary-600 overflow-hidden z-50 min-w-[150px] animate-fade-in"
          role="listbox"
          aria-label={t('nav.changeLanguage')}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              role="option"
              aria-selected={language === lang.code}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-secondary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${
                language === lang.code
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-secondary-900 dark:text-white'
              }`}
            >
              <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full"></div>}
            </button>
          ))}
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default LanguageSelector;
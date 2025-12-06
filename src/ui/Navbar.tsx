import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../hooks/useLanguage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: t('nav.inicio') },
    { id: 'about', label: t('nav.acerca') },
    { id: 'projects', label: t('nav.proyectos') },
    { id: 'skills', label: t('nav.habilidades') },
    { id: 'experience', label: t('nav.experiencia') },
    { id: 'certifications', label: language === 'es' ? 'Certificaciones' : 'Certifications' },
    { id: 'contact', label: t('nav.contacto') },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="relative group"
            >
              <div className="relative inline-block">
                {/* Fondo degradado */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Texto principal */}
                <span className="relative block text-2xl font-bold px-4 py-2 rounded-lg 
                  bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-accent-400
                  text-white dark:text-white
                  shadow-lg dark:shadow-primary-500/30
                  group-hover:shadow-xl group-hover:shadow-primary-500/50 dark:group-hover:shadow-primary-500/50
                  transition-all duration-300">
                  {t('nav.portfolio')}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-secondary-800 rounded-md"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Language Selector */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu" role="menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md rounded-lg shadow-lg animate-fade-in">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-secondary-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  role="menuitem"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
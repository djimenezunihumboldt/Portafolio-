import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { useLanguage } from '../hooks/useLanguage';

const ColorThemeSelector = () => {
  const { colorTheme, setColorTheme, themes } = useColorTheme();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={language === 'es' ? 'Cambiar tema de color' : 'Change color theme'}
      >
        <Palette className="w-5 h-5 text-secondary-600 dark:text-secondary-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-secondary-800 rounded-xl shadow-xl p-4 w-64"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                {language === 'es' ? 'Tema de Color' : 'Color Theme'}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      setColorTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`relative p-3 rounded-lg transition-all ${
                      colorTheme === theme.id
                        ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-secondary-800 ring-primary-500'
                        : 'hover:bg-gray-100 dark:hover:bg-secondary-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={theme.name}
                  >
                    {/* Color preview */}
                    <div className="flex items-center justify-center gap-1">
                      <div
                        className="w-5 h-5 rounded-full shadow-inner"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-3 h-3 rounded-full shadow-inner"
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>
                    
                    {/* Checkmark for selected */}
                    {colorTheme === theme.id && (
                      <motion.div
                        className="absolute -top-1 -right-1 bg-primary-500 text-white w-4 h-4 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-3 h-3" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Current theme name */}
              <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center mt-3">
                {themes.find(t => t.id === colorTheme)?.name}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorThemeSelector;

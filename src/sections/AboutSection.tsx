import { useLanguage } from '../hooks/useLanguage';
import { useEffect, useState } from 'react';

const AboutSection = () => {
  const { t } = useLanguage();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="about" className="py-20 bg-white dark:bg-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            {t('about.title')} <span className="text-primary-600 dark:text-primary-400">{t('about.me')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="space-y-6">
            <p className={`text-lg text-secondary-700 dark:text-secondary-200 leading-relaxed text-justify transition-all duration-[3000ms] ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const ExperienceSection = () => {
  const { t } = useLanguage();
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-collapse cuando el usuario scrollea fuera de la sección
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !showMore) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isVisible) {
        setShowMore(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showMore]);

  const mainExperiences = [
    {
      title: t('experience.cinepic.title'),
      company: t('experience.cinepic.company'),
      period: t('experience.cinepic.period'),
      description: t('experience.cinepic.desc'),
      color: 'from-blue-500 to-blue-600',
  logo: `${import.meta.env.BASE_URL}cinepic-logo.png`,
      link: 'https://cinepic.com.ve/es-AR?gad_source=1&gad_campaignid=21890163799&gbraid=0AAAAApnyOzIWVL7pMHNL4_-WCXswcG8Wp&gclid=Cj0KCQjwtMHEBhC-ARIsABua5iR8ggVZ_Fk1M3xTiVOMP_ce2O5OUdfoWCq9fDJG0FfvUAM5-YRAhZQaAmksEALw_wcB'
    },
    {
      title: t('experience.lido.title'),
      company: t('experience.lido.company'),
      period: t('experience.lido.period'),
      description: t('experience.lido.desc'),
      color: 'from-green-500 to-green-600',
  logo: `${import.meta.env.BASE_URL}lidotel-logo.jpg`,
      link: 'https://lidotel.com/'
    },
    {
      title: t('experience.sambil.title'),
      company: t('experience.sambil.company'),
      period: t('experience.sambil.period'),
      description: t('experience.sambil.desc'),
      color: 'from-purple-500 to-purple-600',
  logo: `${import.meta.env.BASE_URL}sambil-logo.jpg`,
      link: 'https://gruposambil.com/en/construction/'
    }
  ];

  // Experiencias adicionales del CV
  const additionalExperiences = [
    {
      title: t('experience.avec.title'),
      company: t('experience.avec.company'),
      period: t('experience.avec.period'),
      description: t('experience.avec.desc'),
      color: 'from-orange-500 to-orange-600',
  logo: `${import.meta.env.BASE_URL}avec-logo.png`,
      link: 'https://www.avec.org.ve/'
    }
  ];

  const allExperiences = showMore ? [...mainExperiences, ...additionalExperiences] : mainExperiences;

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-secondary-900 dark:to-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            {t('experience.title')}{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {t('experience.subtitle')}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            <div className="space-y-8">
              {allExperiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  className="relative flex items-start"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${exp.color} rounded-full flex items-center justify-center shadow-lg z-10`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2 + 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Briefcase className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <motion.div 
                      className="group relative bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Decorative glow */}
                      <div className={`absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br ${exp.color} opacity-0 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <motion.h3 
                          className="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                        >
                          {exp.title}
                        </motion.h3>
                        <motion.div 
                          className="flex items-center text-primary-600 dark:text-primary-400 mt-2 md:mt-0"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.4 }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm font-semibold bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center text-secondary-600 dark:text-secondary-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        {exp.link ? (
                          <motion.a 
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-3 py-2 -ml-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {exp.logo && (
                              <div className="w-12 h-12 bg-white dark:bg-white rounded-lg flex items-center justify-center shadow-md border border-gray-200 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                <img
                                  src={exp.logo}
                                  alt={`Logo ${exp.company}`}
                                  className="w-10 h-10 object-contain"
                                  onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    if (!target.dataset.fallback) {
                                      target.dataset.fallback = '1';
                                      const simple = target.src.split('/').pop();
                                      if (simple) target.src = simple;
                                    }
                                  }}
                                />
                              </div>
                            )}
                            <span className="font-semibold text-secondary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 underline decoration-dashed decoration-primary-400/50 underline-offset-4">
                              {exp.company}
                            </span>
                            <motion.span
                              className="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              <ExternalLink size={16} />
                            </motion.span>
                          </motion.a>
                        ) : (
                          <span className="font-semibold">{exp.company}</span>
                        )}
                      </div>
                      
                      <motion.p 
                        className="relative text-secondary-600 dark:text-secondary-400 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        {exp.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Botón Ver más */}
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                {showMore ? (
                  <>
                    <ChevronUp size={20} />
                    {t('experience.showLess')}
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} />
                    {t('experience.showMore')}
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

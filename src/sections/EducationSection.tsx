import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, ExternalLink } from 'lucide-react';

const EducationSection = () => {
  const { t } = useLanguage();

  const educationItems = [
    {
      degree: t('about.education.degree'),
      period: t('about.education.period'),
      university: t('about.education.university'),
      description: t('about.education.description'),
      logo: `${import.meta.env.BASE_URL}uah-logo.jpg`,
      logoFallback: 'uah-logo.jpg',
      link: 'https://www.unihumboldt.edu.ve/',
      color: 'from-primary-500 to-primary-600',
      periodColor: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
    },
    {
      degree: t('about.education.ucab.degree'),
      period: t('about.education.ucab.period'),
      university: t('about.education.ucab.university'),
      description: t('about.education.ucab.description'),
      logo: `${import.meta.env.BASE_URL}ucab-logo.webp`,
      logoFallback: 'ucab-logo.webp',
      link: 'https://www.ucab.edu.ve/',
      color: 'from-blue-500 to-blue-600',
      periodColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
    },
    {
      degree: t('about.education.technical'),
      period: t('about.education.technical.year'),
      university: t('about.education.technical.school'),
      description: t('about.education.technical.desc'),
      logo: `${import.meta.env.BASE_URL}savi-logo.webp`,
      logoFallback: 'savi-logo.webp',
      link: 'https://uepsanvicente.wordpress.com/historia/',
      color: 'from-accent-500 to-accent-600',
      periodColor: 'text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20'
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Education Section */}
        <div>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('about.education.title')}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-blue-500 to-accent-500"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              <div className="space-y-8">
                {educationItems.map((edu, index) => (
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
                      className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${edu.color} rounded-full flex items-center justify-center shadow-lg z-10`}
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
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <motion.div 
                        className="group relative bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Background gradient on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                        
                        {/* Decorative glow */}
                        <div className={`absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br ${edu.color} opacity-0 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                        
                        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <motion.h4 
                            className="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.3 }}
                          >
                            {edu.degree}
                          </motion.h4>
                          <motion.div 
                            className="flex items-center mt-2 md:mt-0"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.4 }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${edu.periodColor}`}>
                              {edu.period}
                            </span>
                          </motion.div>
                        </div>
                        
                        <motion.a 
                          href={edu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group/link flex items-center gap-3 mb-4 px-3 py-2 -ml-3 rounded-xl hover:bg-gray-50 dark:hover:bg-secondary-700/50 transition-all duration-300"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="w-12 h-12 bg-white dark:bg-secondary-700 rounded-lg flex items-center justify-center shadow-md border border-gray-200 dark:border-secondary-600 group-hover/link:shadow-lg group-hover/link:scale-110 transition-all duration-300">
                            <img
                              src={edu.logo}
                              alt={`Logo ${edu.university}`}
                              className="w-10 h-10 object-contain rounded"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                if (!target.dataset.fallback) {
                                  target.dataset.fallback = '1';
                                  target.src = edu.logoFallback;
                                }
                              }}
                            />
                          </div>
                          <span className="text-lg font-semibold text-secondary-700 dark:text-secondary-300 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 transition-colors duration-300 underline decoration-dashed decoration-primary-400/50 underline-offset-4">
                            {edu.university}
                          </span>
                          <motion.span
                            className="text-primary-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ExternalLink size={16} />
                          </motion.span>
                        </motion.a>
                        
                        <motion.p 
                          className="relative text-secondary-600 dark:text-secondary-400 leading-relaxed"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.5 }}
                        >
                          {edu.description}
                        </motion.p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

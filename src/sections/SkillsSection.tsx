import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Server, Database, Cloud, Wrench, Zap, Layers } from 'lucide-react';
import reactIcon from '../assets/react-icon.png';
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiHtml5, 
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiGit,
  SiFigma,
  SiDocker,
  SiAmazon,
  SiVite,
  SiJest,
  SiCss3,
  SiSass,
  SiRedux,
  SiVuedotjs,
  SiPython,
  SiFirebase,
  SiMysql,
  SiPrisma,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiPostman,
  SiNpm,
  SiWebpack,
  SiLinux
} from 'react-icons/si';

const SkillsSection = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'skills' | 'services'>('skills');
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: t('skills.frontend'),
      color: 'from-cyan-500 to-blue-600',
      iconComponent: <Code className="w-5 h-5 text-white" />,
      skills: [
        { name: 'React', level: 90, icon: <img src={reactIcon} alt="React" className="w-5 h-5" /> },
        { name: 'TypeScript', level: 85, icon: <SiTypescript className="w-5 h-5 text-blue-600" /> },
        { name: 'JavaScript', level: 92, icon: <SiJavascript className="w-5 h-5 text-yellow-400" /> },
        { name: 'Next.js', level: 82, icon: <SiNextdotjs className="w-5 h-5 text-black dark:text-white" /> },
        { name: 'Tailwind CSS', level: 88, icon: <SiTailwindcss className="w-5 h-5 text-cyan-500" /> },
        { name: 'HTML5', level: 95, icon: <SiHtml5 className="w-5 h-5 text-orange-600" /> },
        { name: 'CSS3', level: 90, icon: <SiCss3 className="w-5 h-5 text-blue-500" /> },
        { name: 'Sass/SCSS', level: 80, icon: <SiSass className="w-5 h-5 text-pink-500" /> },
        { name: 'Redux', level: 78, icon: <SiRedux className="w-5 h-5 text-purple-600" /> },
        { name: 'Vue.js', level: 70, icon: <SiVuedotjs className="w-5 h-5 text-green-500" /> }
      ]
    },
    {
      title: t('skills.backend'),
      color: 'from-green-500 to-emerald-600',
      iconComponent: <Server className="w-5 h-5 text-white" />,
      skills: [
        { name: 'Node.js', level: 87, icon: <SiNodedotjs className="w-5 h-5 text-green-600" /> },
        { name: 'Express.js', level: 85, icon: <SiExpress className="w-5 h-5 text-gray-600 dark:text-gray-300" /> },
        { name: 'Python', level: 75, icon: <SiPython className="w-5 h-5 text-yellow-500" /> },
        { name: 'PostgreSQL', level: 80, icon: <SiPostgresql className="w-5 h-5 text-blue-600" /> },
        { name: 'MongoDB', level: 78, icon: <SiMongodb className="w-5 h-5 text-green-500" /> },
        { name: 'MySQL', level: 82, icon: <SiMysql className="w-5 h-5 text-blue-700" /> },
        { name: 'Firebase', level: 80, icon: <SiFirebase className="w-5 h-5 text-yellow-500" /> },
        { name: 'REST APIs', level: 90, icon: '🔌' },
        { name: 'GraphQL', level: 75, icon: <SiGraphql className="w-5 h-5 text-pink-600" /> },
        { name: 'Prisma', level: 72, icon: <SiPrisma className="w-5 h-5 text-teal-600" /> }
      ]
    },
    {
      title: t('skills.tools'),
      color: 'from-purple-500 to-pink-600',
      iconComponent: <Wrench className="w-5 h-5 text-white" />,
      skills: [
        { name: 'Git', level: 90, icon: <SiGit className="w-5 h-5 text-orange-500" /> },
        { name: 'GitHub', level: 90, icon: <SiGithub className="w-5 h-5 text-gray-800 dark:text-white" /> },
        { name: 'Docker', level: 75, icon: <SiDocker className="w-5 h-5 text-blue-500" /> },
        { name: 'Vite', level: 85, icon: <SiVite className="w-5 h-5 text-purple-500" /> },
        { name: 'Webpack', level: 70, icon: <SiWebpack className="w-5 h-5 text-blue-400" /> },
        { name: 'Jest', level: 80, icon: <SiJest className="w-5 h-5 text-red-600" /> },
        { name: 'Postman', level: 85, icon: <SiPostman className="w-5 h-5 text-orange-500" /> },
        { name: 'Vercel', level: 85, icon: <SiVercel className="w-5 h-5 text-black dark:text-white" /> },
        { name: 'Netlify', level: 80, icon: <SiNetlify className="w-5 h-5 text-teal-500" /> },
        { name: 'AWS', level: 70, icon: <SiAmazon className="w-5 h-5 text-orange-400" /> },
        { name: 'Linux', level: 75, icon: <SiLinux className="w-5 h-5 text-yellow-600" /> },
        { name: 'Figma', level: 75, icon: <SiFigma className="w-5 h-5 text-purple-600" /> },
        { name: 'npm', level: 88, icon: <SiNpm className="w-5 h-5 text-red-500" /> }
      ]
    }
  ];

  const services = [
    {
      icon: <Code className="w-7 h-7" />,
      title: t('services.web.title'),
      description: t('services.web.desc'),
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-900/20'
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: t('services.mobile.title'),
      description: t('services.mobile.desc'),
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-900/20'
    },
    {
      icon: <Server className="w-7 h-7" />,
      title: t('services.api.title'),
      description: t('services.api.desc'),
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-900/20'
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: t('services.database.title'),
      description: t('services.database.desc'),
      color: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-900/20'
    },
    {
      icon: <Cloud className="w-7 h-7" />,
      title: t('services.deployment.title'),
      description: t('services.deployment.desc'),
      color: 'from-cyan-500 to-cyan-600',
      bgLight: 'bg-cyan-50',
      bgDark: 'dark:bg-cyan-900/20'
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.desc'),
      color: 'from-pink-500 to-pink-600',
      bgLight: 'bg-pink-50',
      bgDark: 'dark:bg-pink-900/20'
    }
  ];

  const tabs = [
    { 
      id: 'skills' as const, 
      label: language === 'es' ? 'Habilidades Técnicas' : 'Technical Skills',
      icon: <Zap className="w-5 h-5" />
    },
    { 
      id: 'services' as const, 
      label: language === 'es' ? 'Especialidades' : 'Specialties',
      icon: <Layers className="w-5 h-5" />
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            {language === 'es' ? 'Habilidades' : 'Skills'}{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              & {language === 'es' ? 'Especialidades' : 'Specialties'}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex bg-white dark:bg-secondary-800 rounded-2xl p-2 shadow-lg border border-gray-100 dark:border-secondary-700 relative">
            {/* Hint indicator for inactive tab */}
            <motion.div 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-secondary-500 dark:text-secondary-400 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span>👆</span>
              <span>{language === 'es' ? 'Toca para cambiar' : 'Tap to switch'}</span>
            </motion.div>
            
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: activeTab !== tab.id ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                animate={activeTab !== tab.id ? {
                  boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0)', '0 0 0 4px rgba(99, 102, 241, 0.3)', '0 0 0 0 rgba(99, 102, 241, 0)']
                } : {}}
                transition={activeTab !== tab.id ? {
                  boxShadow: { repeat: Infinity, duration: 2, delay: index * 0.5 }
                } : {}}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
                
                {/* Indicator dot for inactive tab */}
                {activeTab !== tab.id && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'skills' ? (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div 
                  key={categoryIndex} 
                  className="group relative bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-secondary-700 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Decorative Glow Element */}
                  <div className={`absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br ${category.color} opacity-0 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {category.iconComponent}
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="relative space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex} 
                        className="group/skill"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg flex items-center justify-center w-6 h-6 group-hover/skill:scale-110 transition-transform duration-200">
                              {skill.icon}
                            </span>
                            <span className="font-medium text-secondary-800 dark:text-secondary-200">{skill.name}</span>
                          </div>
                          <span className="text-sm text-primary-600 dark:text-primary-400 font-bold">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-100 dark:bg-secondary-700 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 + 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={`group relative bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-secondary-700 overflow-hidden`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`relative w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative text-xl font-bold text-secondary-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="relative text-secondary-600 dark:text-secondary-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Decorative Element */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { value: '33+', label: language === 'es' ? 'Tecnologías' : 'Technologies' },
            { value: '6', label: language === 'es' ? 'Especialidades' : 'Specialties' },
            { value: '5+', label: language === 'es' ? 'Años Aprendiendo' : 'Years Learning' },
            { value: '∞', label: language === 'es' ? 'Ganas de Crecer' : 'Desire to Grow' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-lg border border-gray-100 dark:border-secondary-700"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-secondary-600 dark:text-secondary-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
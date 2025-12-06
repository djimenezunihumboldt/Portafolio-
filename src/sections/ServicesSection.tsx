import { Code, Smartphone, Server, Database, Cloud, Wrench } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: t('services.web.title'),
      description: t('services.web.desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t('services.mobile.title'),
      description: t('services.mobile.desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: t('services.api.title'),
      description: t('services.api.desc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t('services.database.title'),
      description: t('services.database.desc'),
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: t('services.deployment.title'),
      description: t('services.deployment.desc'),
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.desc'),
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            {t('services.title')}{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              {t('services.subtitle')}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-secondary-700"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface Certification {
  id: number;
  title: string;
  titleEn: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  image: string;
  verified: boolean;
  featured?: boolean;
}

const CertificationsSection = () => {
  const { language } = useLanguage();

  const certifications: Certification[] = [
    {
      id: 1,
      title: 'Fundamentos del Desarrollo Web',
      titleEn: 'Web Development Fundamentals',
      issuer: 'LinkedIn Learning',
      date: '2024',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/4c7ece888d459f3edc7e0548552a86bbef1403831698eb5060d1af86f19a8b5e',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      image: `${import.meta.env.BASE_URL}fundamentos-desarrollo-web.jpeg`,
      verified: true,
      featured: true
    },
    {
      id: 2,
      title: 'Fundamentos de Gestión del Tiempo',
      titleEn: 'Time Management Fundamentals',
      issuer: 'LinkedIn Learning',
      date: '2024',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/d44eb059b360890a11ef65605fb49b7b01c4ff576e2b29571df08f42283c5ffc',
      skills: ['Productividad', 'Organización', 'Planificación'],
      image: `${import.meta.env.BASE_URL}fundamentos-gestion-tiempo.jpeg`,
      verified: true,
      featured: true
    },
    {
      id: 3,
      title: 'IA en práctica para el entorno de trabajo',
      titleEn: 'AI in Practice for the Workplace',
      issuer: 'Google Gemini / Power IA',
      date: '2025',
      credentialUrl: 'https://verified.sertifier.com/es/verify/50213616820036/',
      skills: ['Google Gemini', 'Inteligencia Artificial', 'Productividad', 'Automatización'],
      image: `${import.meta.env.BASE_URL}IA en práctica para el entorno de trabajo.png`,
      verified: true,
      featured: true
    },
    {
      id: 4,
      title: 'Fundamentos profesionales del análisis de datos',
      titleEn: 'Professional Foundations of Data Analysis',
      issuer: 'Microsoft & LinkedIn',
      date: '2024',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/0db3335a1020f01e044915bc165e268a6b08e4895f2427148a32ad062a399150',
      skills: ['Análisis de Datos', 'Microsoft Excel', 'Power BI', 'Visualización de Datos'],
      image: `${import.meta.env.BASE_URL}Fundamentos profesionales del análisis de datos, por Microsoft y LinkedIn.jpeg`,
      verified: true,
      featured: true
    },
    {
      id: 5,
      title: 'Aprende análisis de datos: fundamentos',
      titleEn: 'Learn Data Analysis: Fundamentals',
      issuer: 'LinkedIn Learning',
      date: '2024',
      credentialUrl: 'https://www.linkedin.com/learning/certificates/9118e51c85cd9c5ed750f9b156ffa09e23863b251ba06c1c7208515c23e5f702',
      skills: ['Análisis de Datos', 'Estadística', 'Visualización', 'Toma de Decisiones'],
      image: `${import.meta.env.BASE_URL}Aprende análisis de datos fundamentos.jpeg`,
      verified: true,
      featured: true
    }
  ];

  const featuredCerts = certifications.filter(c => c.featured);

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-secondary-900 dark:to-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white">
              {language === 'es' ? 'Certificaciones' : 'Certifications'}
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Formación continua y certificaciones que respaldan mi experiencia profesional'
              : 'Continuous learning and certifications that back my professional experience'}
          </p>
        </motion.div>

        {/* Certifications - Large Cards */}
        {featuredCerts.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {featuredCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="group bg-white dark:bg-secondary-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-secondary-700"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-2/5 relative">
                      <a href={cert.image} target="_blank" rel="noopener noreferrer">
                        <img
                          src={cert.image}
                          alt={language === 'es' ? cert.title : cert.titleEn}
                          className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    
                    {/* Content */}
                    <div className="md:w-3/5 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                          {cert.issuer}
                        </span>
                        {cert.verified && (
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle size={12} />
                            {language === 'es' ? 'Verificado' : 'Verified'}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {language === 'es' ? cert.title : cert.titleEn}
                      </h4>
                      
                      <div className="flex items-center gap-2 text-secondary-500 dark:text-secondary-400 text-sm mb-4">
                        <Calendar size={14} />
                        <span>{cert.date}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 px-2 py-1 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm transition-colors"
                        >
                          <ExternalLink size={16} />
                          {language === 'es' ? 'Ver certificado' : 'View certificate'}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: '5+', label: language === 'es' ? 'Certificaciones' : 'Certifications' },
            { value: '100+', label: language === 'es' ? 'Horas de estudio' : 'Study Hours' },
            { value: '4', label: language === 'es' ? 'Plataformas' : 'Platforms' },
            { value: '2024', label: language === 'es' ? 'Última actualización' : 'Last Update' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white dark:bg-secondary-800 rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {stat.value}
              </div>
              <div className="text-secondary-600 dark:text-secondary-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;

import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import AnimatedSection from '../components/AnimatedSection';

interface TimelineItem {
  id: number;
  type: 'work' | 'education';
  title: {
    es: string;
    en: string;
  };
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: {
    es: string;
    en: string;
  };
  skills?: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: {
      es: 'Desarrollador Full Stack Senior',
      en: 'Senior Full Stack Developer',
    },
    organization: 'Tech Company Inc.',
    location: 'Madrid, España',
    startDate: '2022',
    endDate: 'Presente',
    description: {
      es: 'Liderando el desarrollo de aplicaciones web escalables utilizando React, Node.js y servicios cloud de AWS.',
      en: 'Leading the development of scalable web applications using React, Node.js and AWS cloud services.',
    },
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
  },
  {
    id: 2,
    type: 'work',
    title: {
      es: 'Desarrollador Frontend',
      en: 'Frontend Developer',
    },
    organization: 'Digital Agency',
    location: 'Barcelona, España',
    startDate: '2020',
    endDate: '2022',
    description: {
      es: 'Desarrollo de interfaces de usuario modernas y responsivas para clientes enterprise.',
      en: 'Development of modern and responsive user interfaces for enterprise clients.',
    },
    skills: ['Vue.js', 'React', 'SASS', 'JavaScript'],
  },
  {
    id: 3,
    type: 'education',
    title: {
      es: 'Máster en Desarrollo Web',
      en: 'Master in Web Development',
    },
    organization: 'Universidad Tecnológica',
    location: 'Online',
    startDate: '2019',
    endDate: '2020',
    description: {
      es: 'Especialización en tecnologías web modernas y arquitectura de software.',
      en: 'Specialization in modern web technologies and software architecture.',
    },
  },
  {
    id: 4,
    type: 'work',
    title: {
      es: 'Desarrollador Junior',
      en: 'Junior Developer',
    },
    organization: 'StartupXYZ',
    location: 'Valencia, España',
    startDate: '2018',
    endDate: '2020',
    description: {
      es: 'Inicio de carrera profesional trabajando en proyectos de e-commerce y aplicaciones móviles.',
      en: 'Start of professional career working on e-commerce projects and mobile applications.',
    },
    skills: ['JavaScript', 'PHP', 'MySQL', 'HTML/CSS'],
  },
  {
    id: 5,
    type: 'education',
    title: {
      es: 'Grado en Ingeniería Informática',
      en: 'Computer Science Degree',
    },
    organization: 'Universidad Politécnica',
    location: 'Valencia, España',
    startDate: '2014',
    endDate: '2018',
    description: {
      es: 'Formación en fundamentos de programación, algoritmos, bases de datos y sistemas.',
      en: 'Training in programming fundamentals, algorithms, databases and systems.',
    },
  },
];

export default function Timeline() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredData = timelineData.filter(
    (item) => filter === 'all' || item.type === filter
  );

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {language === 'es' ? 'Mi Trayectoria' : 'My Journey'}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Un recorrido por mi experiencia profesional y formación académica'
              : 'A journey through my professional experience and academic background'}
          </p>
        </AnimatedSection>

        {/* Filter Buttons */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-4 mb-12">
            {[
              { key: 'all', labelEs: 'Todo', labelEn: 'All' },
              { key: 'work', labelEs: 'Trabajo', labelEn: 'Work' },
              { key: 'education', labelEs: 'Educación', labelEn: 'Education' },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key as typeof filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === btn.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {language === 'es' ? btn.labelEs : btn.labelEn}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full hidden md:block" />

          {filteredData.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <div
                className={`relative flex flex-col md:flex-row items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <div
                    className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                      expandedId === item.id
                        ? 'border-primary'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    {/* Type Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                      item.type === 'work'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    }`}>
                      {item.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                      {item.type === 'work'
                        ? (language === 'es' ? 'Trabajo' : 'Work')
                        : (language === 'es' ? 'Educación' : 'Education')}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title[language]}
                    </h3>

                    {/* Organization */}
                    <p className="text-primary font-medium mb-2">{item.organization}</p>

                    {/* Meta Info */}
                    <div className={`flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-primary" />
                        {item.startDate} - {item.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-primary" />
                        {item.location}
                      </span>
                    </div>

                    {/* Description (Expandable) */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      expandedId === item.id ? 'max-h-96' : 'max-h-0'
                    }`}>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {item.description[language]}
                      </p>
                      
                      {/* Skills */}
                      {item.skills && (
                        <div className={`flex flex-wrap gap-2 ${
                          index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                        }`}>
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expand Indicator */}
                    <div className="text-center mt-2">
                      <span className="text-xs text-gray-400">
                        {expandedId === item.id
                          ? (language === 'es' ? 'Click para cerrar' : 'Click to close')
                          : (language === 'es' ? 'Click para más detalles' : 'Click for more details')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Point */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-4 border-primary items-center justify-center z-10 shadow-lg">
                  {item.type === 'work' ? (
                    <FaBriefcase className="text-primary" />
                  ) : (
                    <FaGraduationCap className="text-primary" />
                  )}
                </div>

                {/* Empty Space for opposite side */}
                <div className="hidden md:block w-5/12" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

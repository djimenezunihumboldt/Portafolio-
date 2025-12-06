import { useState, useMemo } from 'react';
import { Github, ExternalLink, Calendar, Eye, Filter, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import ProjectModal from '../components/ProjectModal';
import AnimatedSection from '../components/AnimatedSection';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  date: string;
  category: string;
  images?: string[];
  features?: string[];
}

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const allProjects: ProjectData[] = [
    {
      id: 1,
      title: t('projects.items.aerovizla.title'),
      description: t('projects.items.aerovizla.desc'),
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      technologies: ['HTML5', 'JavaScript', 'TailwindCSS', 'Chart.js', 'Node.js', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/djimenezunihumboldt/AeroVizla',
      liveUrl: 'https://djimenezunihumboldt.github.io/AeroVizla/',
      date: '2025',
      category: t('projects.backend'),
      images: [
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop'
      ],
      features: language === 'es'
        ? ['Dashboard interactivo con KPIs', 'Análisis de aerolíneas y puntualidad', 'Explorador de rutas aéreas', 'Gráficos con Chart.js', 'Colores patrios de Venezuela', 'API REST con Node.js']
        : ['Interactive dashboard with KPIs', 'Airlines and punctuality analysis', 'Flight routes explorer', 'Chart.js visualizations', 'Venezuela patriotic colors', 'REST API with Node.js']
    },
    {
      id: 2,
      title: t('projects.items.weather.title'),
      description: t('projects.items.weather.desc'),
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'React Query', 'Zustand', 'OpenWeather API', 'Framer Motion'],
      githubUrl: 'https://github.com/djimenezunihumboldt/weather-app',
      liveUrl: 'https://djimenezunihumboldt.github.io/weather-app/',
      date: '2025',
      category: t('projects.frontend'),
      images: [
        'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&h=600&fit=crop'
      ],
      features: language === 'es'
        ? ['Pronóstico en tiempo real', 'Geolocalización automática', 'Búsqueda de ciudades', 'Pronóstico de 5 días', 'Ciudades favoritas', 'Fondo dinámico según clima']
        : ['Real-time forecast', 'Automatic geolocation', 'City search', '5-day forecast', 'Favorite cities', 'Dynamic weather background']
    },
    {
      id: 3,
      title: t('projects.items.analytics.title'),
      description: t('projects.items.analytics.desc'),
      image: `${import.meta.env.BASE_URL}analytics-dashboard.png`,
      technologies: ['React', 'Vite', 'Chart.js', 'TypeScript'],
      githubUrl: 'https://github.com/djimenezunihumboldt/Analytics-Dashboard-pro',
      liveUrl: 'https://djimenezunihumboldt.github.io/Analytics-Dashboard-pro/',
      date: '2025',
      category: t('projects.frontend'),
      images: [
        `${import.meta.env.BASE_URL}analytics-dashboard.png`,
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      ],
      features: language === 'es'
        ? ['Dashboard interactivo', 'Gráficos con Chart.js', 'Análisis de datos', 'Exportar reportes']
        : ['Interactive dashboard', 'Chart.js graphs', 'Data analysis', 'Export reports']
    },
    {
      id: 4,
      title: t('projects.items.university.title'),
      description: t('projects.items.university.desc'),
      image: `${import.meta.env.BASE_URL}proyecto1.png`,
      technologies: ['React', 'Vite', 'TypeScript'],
      githubUrl: 'https://github.com/djimenezunihumboldt/web/tree/prueba1',
      liveUrl: 'https://djimenezunihumboldt.github.io/web/',
      date: '2025',
      category: t('projects.frontend'),
      images: [
        `${import.meta.env.BASE_URL}proyecto1.png`,
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop'
      ],
      features: language === 'es'
        ? ['Sistema universitario', 'Gestión de estudiantes', 'Panel administrativo', 'API REST']
        : ['University system', 'Student management', 'Admin panel', 'REST API']
    },
    {
      id: 5,
      title: t('projects.items.finanzas.title'),
      description: t('projects.items.finanzas.desc'),
      image: `${import.meta.env.BASE_URL}Finanzas Personales VE.png`,
      technologies: ['React', 'Vite', 'TypeScript', 'TailwindCSS', 'LocalStorage'],
      githubUrl: 'https://github.com/djimenezunihumboldt/Finanzas-Personales-Ve',
      liveUrl: 'https://djimenezunihumboldt.github.io/Finanzas-Personales-Ve/',
      date: '2025',
      category: t('projects.frontend'),
      images: [
        `${import.meta.env.BASE_URL}Finanzas Personales VE.png`,
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      ],
      features: language === 'es' 
        ? ['Gestión de gastos e ingresos', 'Gráficos interactivos', 'Almacenamiento local', 'Interfaz responsive']
        : ['Expense and income management', 'Interactive charts', 'Local storage', 'Responsive interface']
    },
    {
      id: 6,
      title: t('projects.items.portfolio.title'),
      description: t('projects.items.portfolio.desc'),
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop',
      technologies: ['JavaScript', 'Phaser 3', 'Vite', 'HTML5 Canvas', 'LocalStorage'],
      githubUrl: 'https://github.com/djimenezunihumboldt/sobreviviente-cosmico',
      liveUrl: 'https://djimenezunihumboldt.github.io/sobreviviente-cosmico/',
      date: '2025',
      category: t('projects.frontend'),
      images: [
        'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1534996858221-380b92700493?w=800&h=600&fit=crop'
      ],
      features: language === 'es'
        ? ['Control de nave espacial', 'Sistema de vidas y puntuación', 'Power-ups (Escudo, Disparo Rápido)', 'Enemigos perseguidores', 'High Score guardado', 'Efectos de sonido']
        : ['Spaceship control', 'Lives and score system', 'Power-ups (Shield, Rapid Fire)', 'Chaser enemies', 'Saved High Score', 'Sound effects']
    }
  ];
  
  // Number of projects to show initially
  const INITIAL_PROJECTS_COUNT = 6;

  // Fixed categories: All, Frontend, Backend
  const categories = [
    { key: 'all', label: language === 'es' ? 'Todos' : 'All' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' }
  ];
  
  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      // Category filter - compare with translation keys
      const projectCategoryLower = project.category.toLowerCase();
      const matchesCategory = activeFilter === 'all' || projectCategoryLower === activeFilter;
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [allProjects, activeFilter, searchQuery]);
  
  // Limit projects shown unless showAll is true
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = activeFilter !== 'all' || searchQuery !== '';

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-secondary-800 transition-colors duration-300">
      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        project={selectedProject ? {
          title: selectedProject.title,
          description: selectedProject.description,
          images: selectedProject.images || [selectedProject.image],
          technologies: selectedProject.technologies,
          liveUrl: selectedProject.liveUrl,
          githubUrl: selectedProject.githubUrl,
          features: selectedProject.features
        } : null}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              {t('projects.title')} <span className="text-primary-600 dark:text-primary-400">{t('projects.subtitle')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        {/* Search and Filter Section */}
        <AnimatedSection delay={0.1}>
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />
              <input
                type="text"
                placeholder={language === 'es' ? 'Buscar proyectos...' : 'Search projects...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-gray-100 dark:bg-secondary-700 border-0 rounded-xl text-secondary-900 dark:text-white placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 mr-4 text-secondary-500 dark:text-secondary-400">
                <Filter size={18} />
                <span className="text-sm font-medium">{language === 'es' ? 'Categoría:' : 'Category:'}</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveFilter(category.key)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category.key
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                      : 'bg-gray-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Active Filters & Clear Button */}
            {hasActiveFilters && (
              <div className="flex items-center justify-center gap-3">
                <span className="text-sm text-secondary-500">
                  {filteredProjects.length} {language === 'es' ? 'proyectos encontrados' : 'projects found'}
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <X size={14} />
                  {language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Projects Grid with Animation */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="perspective-1000"
            >
            <AnimatedSection delay={index * 0.1}>
              <motion.div 
                className="group bg-white dark:bg-secondary-800 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                whileHover={{ 
                  boxShadow: "0 0 40px rgba(99, 102, 241, 0.6), 0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated border gradient on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
                    padding: '2px',
                  }}
                />
                
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = '1';
                        const simple = target.src.split('/').pop();
                        if (simple) target.src = simple;
                      }
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Category Badge with animation */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Links overlay with staggered animation */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center space-x-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      onClick={() => openModal(project)}
                      className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors duration-200 shadow-lg"
                      aria-label={language === 'es' ? 'Ver detalles' : 'View details'}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors duration-200 shadow-lg"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-colors duration-200 shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </motion.div>
                </div>

              {/* Project Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <motion.h3 
                      className="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center text-secondary-600 dark:text-secondary-400 text-sm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Calendar size={14} className="mr-1" />
                      {project.date}
                    </motion.div>
                  </div>

                  <motion.p 
                    className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3 leading-relaxed flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.25 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies with staggered animation */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="bg-gray-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <motion.span 
                        className="bg-gray-100 dark:bg-secondary-700 text-secondary-500 px-3 py-1 rounded-full text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        +{project.technologies.length - 4}
                      </motion.span>
                    )}
                  </div>

                  {/* Action Buttons with animation */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      onClick={() => openModal(project)}
                      className="flex-1 bg-gray-100 dark:bg-secondary-700 hover:bg-gray-200 dark:hover:bg-secondary-600 text-secondary-900 dark:text-white px-4 py-2 rounded-lg font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye size={16} />
                      <span>{language === 'es' ? 'Detalles' : 'Details'}</span>
                    </motion.button>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={16} />
                      <span>{t('projects.demo')}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-secondary-500 dark:text-secondary-400 text-lg">
              {language === 'es' 
                ? 'No se encontraron proyectos con los filtros seleccionados.' 
                : 'No projects found with selected filters.'}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              {language === 'es' ? 'Limpiar filtros' : 'Clear filters'}
            </button>
          </motion.div>
        )}

        {/* Show More/Less Button */}
        {filteredProjects.length > INITIAL_PROJECTS_COUNT && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {showAll ? (
                <>
                  <ChevronUp size={20} />
                  {language === 'es' ? 'Ver menos' : 'Show less'}
                </>
              ) : (
                <>
                  <ChevronDown size={20} />
                  {language === 'es' ? `Ver ${filteredProjects.length - INITIAL_PROJECTS_COUNT} más` : `Show ${filteredProjects.length - INITIAL_PROJECTS_COUNT} more`}
                </>
              )}
            </button>
          </div>
        )}

        {/* Compact GitHub CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="https://github.com/djimenezunihumboldt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            <span>{t('projects.more')}</span>
            <ExternalLink size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaArrowRight, FaTag } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import AnimatedSection from '../components/AnimatedSection';

interface BlogPost {
  id: number;
  title: {
    es: string;
    en: string;
  };
  excerpt: {
    es: string;
    en: string;
  };
  content?: {
    es: string;
    en: string;
  };
  image: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: {
      es: 'Mejores prácticas en React 2024',
      en: 'React Best Practices 2024',
    },
    excerpt: {
      es: 'Descubre las últimas tendencias y mejores prácticas para desarrollar aplicaciones React modernas y escalables.',
      en: 'Discover the latest trends and best practices for developing modern and scalable React applications.',
    },
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    date: '2024-01-15',
    readTime: 8,
    category: 'React',
    tags: ['React', 'JavaScript', 'Frontend'],
  },
  {
    id: 2,
    title: {
      es: 'Introducción a TypeScript para Principiantes',
      en: 'Introduction to TypeScript for Beginners',
    },
    excerpt: {
      es: 'Una guía completa para empezar con TypeScript y mejorar la calidad de tu código JavaScript.',
      en: 'A complete guide to getting started with TypeScript and improving your JavaScript code quality.',
    },
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    date: '2024-01-10',
    readTime: 12,
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Tutorial'],
  },
  {
    id: 3,
    title: {
      es: 'Optimización de rendimiento en aplicaciones web',
      en: 'Web Application Performance Optimization',
    },
    excerpt: {
      es: 'Técnicas avanzadas para optimizar el rendimiento de tus aplicaciones web y mejorar la experiencia del usuario.',
      en: 'Advanced techniques to optimize your web application performance and improve user experience.',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    date: '2024-01-05',
    readTime: 10,
    category: 'Performance',
    tags: ['Performance', 'Web', 'Optimization'],
  },
  {
    id: 4,
    title: {
      es: 'Diseño de APIs RESTful',
      en: 'RESTful API Design',
    },
    excerpt: {
      es: 'Principios y patrones para diseñar APIs RESTful robustas y fáciles de mantener.',
      en: 'Principles and patterns for designing robust and maintainable RESTful APIs.',
    },
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    date: '2023-12-20',
    readTime: 15,
    category: 'Backend',
    tags: ['API', 'REST', 'Backend'],
  },
];

const categories = ['All', 'React', 'TypeScript', 'Performance', 'Backend'];

export default function BlogSection() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredPosts = blogPosts.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-20 bg-secondary/30 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {language === 'es' ? 'Blog & Artículos' : 'Blog & Articles'}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Comparto mis conocimientos y experiencias sobre desarrollo web'
              : 'I share my knowledge and experiences about web development'}
          </p>
        </AnimatedSection>

        {/* Categories Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
                }`}
              >
                {category === 'All' ? (language === 'es' ? 'Todos' : 'All') : category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <article
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title[language]}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hoveredId === post.id ? 'scale-110' : 'scale-100'
                    }`}
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-primary" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-primary" />
                      {post.readTime} {language === 'es' ? 'min lectura' : 'min read'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                    {post.title[language]}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt[language]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        <FaTag className="text-[10px]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <button
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                    onClick={() => {
                      // Here you could navigate to a full blog post page
                      alert(language === 'es' 
                        ? '¡Próximamente! Esta función abrirá el artículo completo.' 
                        : 'Coming soon! This feature will open the full article.');
                    }}
                  >
                    {language === 'es' ? 'Leer más' : 'Read more'}
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
              {language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
              <FaArrowRight />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import AnimatedSection from '../components/AnimatedSection';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: {
    es: string;
    en: string;
  };
  linkedin?: string;
  github?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María García',
    role: 'CTO',
    company: 'TechStartup Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    text: {
      es: 'Un profesional excepcional. Su capacidad para resolver problemas complejos y entregar soluciones de alta calidad superó nuestras expectativas.',
      en: 'An exceptional professional. Their ability to solve complex problems and deliver high-quality solutions exceeded our expectations.',
    },
    linkedin: '#',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Product Manager',
    company: 'Digital Solutions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    text: {
      es: 'Trabajar con él fue una experiencia increíble. Su conocimiento técnico y habilidades de comunicación hicieron que el proyecto fuera un éxito.',
      en: 'Working with them was an incredible experience. Their technical knowledge and communication skills made the project a success.',
    },
    linkedin: '#',
    github: '#',
  },
  {
    id: 3,
    name: 'Laura Martínez',
    role: 'CEO',
    company: 'InnovateTech',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    text: {
      es: 'Demostró un nivel de profesionalismo y dedicación que es difícil de encontrar. Recomiendo absolutamente sus servicios.',
      en: 'Demonstrated a level of professionalism and dedication that is hard to find. I absolutely recommend their services.',
    },
    linkedin: '#',
  },
  {
    id: 4,
    name: 'David López',
    role: 'Lead Developer',
    company: 'CodeMasters',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    text: {
      es: 'Su código es limpio, bien documentado y fácil de mantener. Un verdadero profesional del desarrollo de software.',
      en: 'Their code is clean, well-documented, and easy to maintain. A true software development professional.',
    },
    github: '#',
  },
];

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-secondary/30 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Lo que dicen mis clientes y colegas sobre mi trabajo'
              : 'What my clients and colleagues say about my work'}
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <AnimatedSection delay={0.2}>
            <div 
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden transition-all duration-500"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Quote Icons */}
              <FaQuoteLeft className="absolute top-4 left-4 text-4xl text-primary/20" />
              <FaQuoteRight className="absolute bottom-4 right-4 text-4xl text-primary/20" />

              {/* Content */}
              <div className="text-center relative z-10">
                {/* Avatar */}
                <div className="mb-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary shadow-lg object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Quote Text */}
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{currentTestimonial.text[language]}"
                </p>

                {/* Author Info */}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-primary font-medium">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {currentTestimonial.company}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {currentTestimonial.linkedin && (
                    <a
                      href={currentTestimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label={`${currentTestimonial.name} LinkedIn`}
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  )}
                  {currentTestimonial.github && (
                    <a
                      href={currentTestimonial.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                      aria-label={`${currentTestimonial.name} GitHub`}
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                aria-label={language === 'es' ? 'Anterior testimonio' : 'Previous testimonial'}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                aria-label={language === 'es' ? 'Siguiente testimonio' : 'Next testimonial'}
              >
                <FaChevronRight />
              </button>
            </div>
          </AnimatedSection>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                }`}
                aria-label={`${language === 'es' ? 'Ir al testimonio' : 'Go to testimonial'} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

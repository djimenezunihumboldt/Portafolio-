import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    features?: string[];
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = useCallback(() => {
    if (!project) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  }, [project]);

  const prevImage = useCallback(() => {
    if (!project) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }, [isOpen, isFullscreen, onClose, nextImage, prevImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-4' 
            : 'max-w-5xl w-full max-h-[90vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <FaExpand className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={language === 'es' ? 'Cerrar' : 'Close'}
            >
              <FaTimes className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className={`${isFullscreen ? 'flex h-[calc(100%-60px)]' : 'md:flex'} overflow-y-auto`}>
          {/* Image Gallery */}
          <div className={`${isFullscreen ? 'w-2/3' : 'md:w-3/5'} relative bg-gray-100 dark:bg-gray-800`}>
            {/* Main Image */}
            <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-video'}`}>
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - ${language === 'es' ? 'Imagen' : 'Image'} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label={language === 'es' ? 'Imagen anterior' : 'Previous image'}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label={language === 'es' ? 'Siguiente imagen' : 'Next image'}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {project.images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {project.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-primary ring-2 ring-primary/50'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className={`${isFullscreen ? 'w-1/3' : 'md:w-2/5'} p-6 overflow-y-auto`}>
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'es' ? 'Descripción' : 'Description'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {language === 'es' ? 'Tecnologías' : 'Technologies'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {language === 'es' ? 'Características' : 'Features'}
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-primary mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <FaExternalLinkAlt />
                  {language === 'es' ? 'Ver Demo' : 'View Demo'}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaGithub />
                  GitHub
                </a>
              )}
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400">
                {language === 'es' ? 'Atajos: ' : 'Shortcuts: '}
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">←</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs ml-1">→</kbd>
                {language === 'es' ? ' navegar, ' : ' navigate, '}
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">Esc</kbd>
                {language === 'es' ? ' cerrar' : ' close'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

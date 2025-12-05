import { ArrowDown, Github, Linkedin, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';
import { useLanguage } from '../hooks/useLanguage';
import ParticlesBackground from '../components/ParticlesBackground';
import TypingEffect from '../components/TypingEffect';

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const HeroSection = () => {
  const { t, language } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const typingTexts = language === 'es' 
    ? ['Desarrollador Full Stack', 'Ingeniero de Software', 'Creador de Experiencias Web', 'Apasionado por la Tecnología']
    : ['Full Stack Developer', 'Software Engineer', 'Web Experience Creator', 'Technology Enthusiast'];
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800 relative overflow-hidden transition-colors duration-300">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Floating decorative elements with parallax */}
      <div 
        className="absolute top-20 left-10 w-20 h-20 bg-primary-400/20 rounded-full blur-xl animate-float"
        style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
      />
      <div 
        className="absolute top-40 right-20 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-float"
        style={{ transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`, animationDelay: '1s' }}
      />
      <div 
        className="absolute bottom-40 left-20 w-24 h-24 bg-primary-500/15 rounded-full blur-xl animate-float"
        style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`, animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-20 right-10 w-16 h-16 bg-accent-500/20 rounded-full blur-xl animate-float"
        style={{ transform: `translate(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px)`, animationDelay: '0.5s' }}
      />
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image mejorada */}
          <motion.div className="mt-24 mb-16" variants={imageVariants}>
            <motion.div 
              className="mx-auto w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-primary-500 via-primary-400 to-accent-500 p-[3px] shadow-2xl"
              animate={floatAnimation}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-secondary-900 ring-2 ring-white dark:ring-secondary-800 overflow-hidden">
                <img
                  src={profileImage}
                  alt="Foto de perfil de Daniel Jiménez"
                  className="w-full h-full rounded-full object-cover object-top antialiased select-none"
                  loading="eager"
                  decoding="async"
                  width={224}
                  height={224}
                  sizes="(min-width: 768px) 14rem, 11rem"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-secondary-900 dark:text-white mb-4"
            variants={itemVariants}
          >
            {t('hero.greeting')}{' '}
            <motion.span 
              className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Daniel Jiménez
            </motion.span>
          </motion.h1>
          
          {/* Typing Effect */}
          <motion.div 
            className="text-2xl md:text-3xl text-primary-600 dark:text-primary-400 font-semibold mb-8 h-10"
            variants={itemVariants}
          >
            <TypingEffect 
              texts={typingTexts} 
              speed={80} 
              deleteSpeed={40} 
              pauseTime={2500}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="group relative bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">{t('hero.viewProjects')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {t('hero.contact')}
            </motion.button>
            <motion.a
              href={`${import.meta.env.BASE_URL}cv-daniel-jimenez.pdf`}
              download="CV-Daniel-Jimenez.pdf"
              className="group flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              {t('hero.downloadCV')}
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-12"
            variants={itemVariants}
          >
            <motion.a
              href="https://github.com/djimenezunihumboldt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
              aria-label="Visitar perfil de GitHub"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={28} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/daniel-jim%C3%A9nez-p%C3%A9rez-64b512133/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
              aria-label="Visitar perfil de LinkedIn"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={28} />
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2"
            aria-label="Desplazarse hacia abajo para ver más contenido"
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
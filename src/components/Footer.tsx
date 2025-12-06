import { Heart, Github, Linkedin, ArrowUp, Mail } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import { useLanguage } from '../hooks/useLanguage';

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      url: 'https://github.com/djimenezunihumboldt', 
      label: 'GitHub',
      hoverColor: 'hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      url: 'https://www.linkedin.com/in/daniel-jim%C3%A9nez-p%C3%A9rez-64b512133/', 
      label: 'LinkedIn',
      hoverColor: 'hover:bg-blue-600 hover:text-white'
    },
    { 
      icon: <BsTwitterX className="w-5 h-5" />, 
      url: 'https://x.com', 
      label: 'X (Twitter)',
      hoverColor: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      url: 'mailto:canelodaniel1997@gmail.com', 
      label: 'Email',
      hoverColor: 'hover:bg-red-500 hover:text-white'
    }
  ];

  const quickLinks = [
    { id: 'hero', label: language === 'es' ? 'Inicio' : 'Home' },
    { id: 'about', label: language === 'es' ? 'Acerca de' : 'About' },
    { id: 'services', label: language === 'es' ? 'Servicios' : 'Services' },
    { id: 'projects', label: language === 'es' ? 'Proyectos' : 'Projects' },
    { id: 'contact', label: language === 'es' ? 'Contacto' : 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8 border-b border-white/10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Daniel Jiménez
            </h3>
            <p className="text-secondary-300 text-sm leading-relaxed max-w-xs">
              {language === 'es' 
                ? 'Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales.'
                : 'Full Stack Developer passionate about creating exceptional digital experiences.'}
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-secondary-300 transition-all duration-300 transform hover:scale-110 ${social.hoverColor}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {language === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-secondary-300 hover:text-primary-400 text-sm transition-colors duration-300 text-left hover:translate-x-1 transform"
                >
                  → {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              {language === 'es' ? 'Contacto' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm text-secondary-300">
              <p className="flex items-center gap-2">
                <span className="text-primary-400">📍</span>
                Caracas, Venezuela
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary-400">📱</span>
                +58 0412-3924758
              </p>
              <a 
                href="mailto:canelodaniel1997@gmail.com"
                className="flex items-center gap-2 hover:text-primary-400 transition-colors"
              >
                <span className="text-primary-400">✉️</span>
                canelodaniel1997@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-400 text-sm flex items-center gap-1">
            © {currentYear} Daniel Jiménez. 
            <span className="hidden sm:inline">
              {language === 'es' ? ' Hecho con' : ' Made with'}
            </span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse inline mx-1" />
            <span className="hidden sm:inline">
              {language === 'es' ? 'en Venezuela' : 'in Venezuela'}
            </span>
          </p>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-secondary-400 hover:text-primary-400 text-sm transition-all duration-300"
            aria-label={language === 'es' ? 'Volver arriba' : 'Back to top'}
          >
            <span>{language === 'es' ? 'Volver arriba' : 'Back to top'}</span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:-translate-y-1 transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

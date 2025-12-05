import React, { createContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

// Permitir claves de traducción dinámicas, incluyendo cursos adicionales
type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

// Traducciones por idioma y clave (permitir indexación dinámica)
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navbar
    'nav.inicio': 'Inicio',
    'nav.acerca': 'Acerca de',
    'nav.servicios': 'Servicios',
    'nav.habilidades': 'Habilidades',
    'nav.experiencia': 'Experiencia',
    'nav.proyectos': 'Proyectos',
    'nav.contacto': 'Contacto',
    'nav.portfolio': 'Portafolio',
  'nav.changeLanguage': 'Cambiar idioma',
    
    // Hero Section
    'hero.greeting': 'Hola, soy',
    'hero.description': 'Ing. en Informática y Desarrollador Full Stack.',
    'hero.viewProjects': 'Ver Proyectos',
    'hero.contact': 'Contactar',
    'hero.downloadCV': 'Descargar CV',
    
    // Services Section
    'services.title': 'Mis',
    'services.subtitle': 'Especialidades',
    'services.description': 'Áreas de expertise donde puedo aportar valor a tu proyecto',
    'services.web.title': 'Desarrollo Web',
    'services.web.desc': 'Aplicaciones web modernas y responsivas con React, Node.js y tecnologías de vanguardia.',
    'services.mobile.title': 'Desarrollo Mobile',
    'services.mobile.desc': 'Aplicaciones móviles nativas y multiplataforma con React Native y tecnologías híbridas.',
    'services.api.title': 'APIs y Backend',
    'services.api.desc': 'Desarrollo de APIs RESTful, microservicios y arquitecturas backend escalables.',
    'services.database.title': 'Bases de Datos',
    'services.database.desc': 'Diseño, optimización y gestión de bases de datos SQL y NoSQL para soluciones eficientes.',
    'services.deployment.title': 'DevOps & Deployment',
    'services.deployment.desc': 'Implementación, automatización y gestión de infraestructura en la nube.',
    'services.maintenance.title': 'Mantenimiento & Soporte',
    'services.maintenance.desc': 'Soporte técnico continuo, actualizaciones y optimización de aplicaciones existentes.',
    
    // About Section
    'about.title': 'Acerca de',
    'about.me': 'Mí',
    'about.description': 'Desarrollador Full Stack apasionado por crear soluciones digitales innovadoras. Especializado en React, Node.js y TypeScript, transformo ideas en experiencias web excepcionales. Comprometido con el código limpio, el aprendizaje continuo y la excelencia técnica.',
    'about.description1': 'Soy un desarrollador full-stack con más de 3 años de experiencia creando aplicaciones web modernas y escalables. Mi pasión por la tecnología me impulsa a estar siempre aprendiendo y explorando nuevas herramientas.',
    'about.description2': 'Especializado en React, Node.js, TypeScript y tecnologías cloud. Me encanta trabajar en equipo y crear soluciones que realmente marquen la diferencia para los usuarios finales.',
    'about.description3': 'Cuando no estoy programando, disfruto contribuir a proyectos open source, escribir artículos técnicos y explorar las últimas tendencias en desarrollo web.',
    'about.development': 'Desarrollo',
    'about.development.desc': 'Crear soluciones elegantes y funcionales con las últimas tecnologías.',
    'about.innovation': 'Innovación',
    'about.innovation.desc': 'Siempre buscando nuevas formas de resolver problemas complejos.',
    'about.objectives': 'Objetivos',
    'about.objectives.desc': 'Enfocado en entregar resultados que superen las expectativas.',
    'about.education': 'Educación',
    'about.education.title': 'Formación Académica',
    'about.education.university': 'Universidad Alejandro de Humboldt',
    'about.education.degree': 'Ingeniería Informática',
    'about.education.period': '2025 - En curso',
    'about.education.description': 'Actualmente cursando las etapas finales de la carrera de Ingeniería Informática.',
    'about.education.ucab.university': 'Universidad Católica Andrés Bello (UCAB)',
    'about.education.ucab.degree': 'Ingeniería Informática',
    'about.education.ucab.period': '2018 - 2021',
    'about.education.ucab.description': 'Completé 6 semestres de la carrera de Ingeniería Informática, adquiriendo bases sólidas en programación, matemáticas y ciencias de la computación.',
    'about.education.technical': 'Educación Media Técnica en Comercio y Servicios Administrativos Mención Informática',
    'about.education.technical.school': 'U.E.P. Escuela San Vicente, El Paraíso',
    'about.education.technical.year': '2016',
    // Cursos
    'about.education.certificationsTitle': 'Certificaciones',
    'about.education.certification1.title': 'Fundamentos de la gestión del tiempo',
    'about.education.certification1.platform': 'LinkedIn Learning',
    'about.education.certification1.date': '12 abr 2021',
    'about.education.certification2.title': 'Fundamentos del desarrollo web: Full Stack o Front-end',
    'about.education.certification2.platform': 'LinkedIn Learning',
    'about.education.certification2.date': '22 mar 2021',
    
    // Experience Section
    'experience.title': 'Experiencia',
    'experience.subtitle': 'Laboral',
    'experience.description': 'Mi trayectoria profesional en el desarrollo de software',
    'experience.current': 'Actual',
    'experience.cinepic.title': 'Desarrollador de Sistemas de Gestión',
    'experience.cinepic.company': 'Cine Cinepic - Centro Comercial Sambil La Candelaria',
    'experience.cinepic.period': 'may. 2024 - ago. 2024',
    'experience.cinepic.desc': 'Desarrollo e implementación de sistemas de gestión de inventario. Automatización de procesos mediante soluciones de software personalizadas. Optimización de flujos de trabajo con herramientas digitales.',
    'experience.lido.title': 'Desarrollador de Software Jr.',
    'experience.lido.company': 'Lidotel Centro Lido - Hotel Lido Chacao El Rosal',
    'experience.lido.period': 'feb. 2022 - may. 2023',
    'experience.lido.desc': 'Desarrollo de scripts y herramientas de automatización. Implementación de soluciones tecnológicas para optimizar procesos internos. Colaboración con equipos de TI en proyectos de desarrollo y mejoras de sistemas.',
    'experience.sambil.title': 'Programador Full Stack y Auxiliar de Soporte Técnico',
    'experience.sambil.company': 'Constructora Sambil - Centro Comercial Lido Chacao',
    'experience.sambil.period': 'feb. 2020 - dic. 2021',
    'experience.sambil.desc': 'Desarrollo de CRM para el departamento de informática. Desarrollo de aplicaciones web completas utilizando JavaScript, HTML, CSS, Node.js y React. Implementación de bases de datos relacionales y no relacionales.',
    
    // Skills Section
    'skills.title': 'Mis',
    'skills.subtitle': 'Habilidades',
    'skills.description': 'Tecnologías y herramientas que domino para crear soluciones completas y escalables',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Herramientas',
    
    // Projects Section
    'projects.title': 'Mis',
    'projects.subtitle': 'Proyectos',
    'projects.description': 'Una colección de proyectos que demuestran mis habilidades y experiencia en desarrollo web',
    'projects.fullstack': 'Full Stack',
    'projects.frontend': 'Frontend',
    'projects.backend': 'Backend',
    'projects.code': 'Código',
    'projects.demo': 'Demo',
    'projects.more': 'Explora mi código en GitHub',
    'projects.more.desc': 'Descubre más proyectos, contribuciones open source y mi evolución como desarrollador.',
    'projects.github': 'Ver GitHub',
  // Projects items (detalles)
  'projects.items.finanzas.title': 'Finanzas Personales VE',
  'projects.items.finanzas.desc': 'Aplicación móvil y web para el control personal de gastos e ingresos con soporte de doble moneda (USD y Bs.S), presupuestos y balances.',
  'projects.items.analytics.title': 'Panel de Analítica',
  'projects.items.analytics.desc': 'Dashboard interactivo para visualizar y analizar métricas clave en tiempo real con gráficos dinámicos y filtros avanzados.',
  'projects.items.university.title': 'Sitio Web Institucional (Universidad)',
  'projects.items.university.desc': 'Sitio institucional responsivo para informar sobre la universidad, cursos y contacto, desarrollado con React y Vite.',
  'projects.items.portfolio.title': 'Sobreviviente Cósmico',
  'projects.items.portfolio.desc': 'Juego espacial arcade desarrollado con Phaser 3. Controla una nave, recolecta estrellas, destruye enemigos y sobrevive el mayor tiempo posible.',
  'projects.items.taskmanager.title': 'Gestor de Tareas',
  'projects.items.taskmanager.desc': 'Aplicación full stack para gestión de tareas con autenticación, drag & drop y sincronización en tiempo real.',
  'projects.items.ecommerce.title': 'E-Commerce Platform',
  'projects.items.ecommerce.desc': 'Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración.',
  'projects.items.weather.title': 'App del Clima',
  'projects.items.weather.desc': 'Aplicación meteorológica con geolocalización, pronóstico extendido y datos en tiempo real de OpenWeather API.',
  'projects.items.chat.title': 'Chat en Tiempo Real',
  'projects.items.chat.desc': 'Aplicación de chat con mensajería instantánea, salas de conversación y notificaciones push usando Socket.io.',
    
    // Contact Section
    'contact.title': 'Hablemos',
    'contact.description': '¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad.',
    'contact.form.title': 'Envíame un mensaje',
    'contact.form.name': 'Nombre',
    'contact.form.name.placeholder': 'Tu nombre',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Asunto',
    'contact.form.subject.placeholder': '¿En qué puedo ayudarte?',
    'contact.form.message': 'Mensaje',
    'contact.form.message.placeholder': 'Cuéntame sobre tu proyecto...',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.success': '¡Mensaje enviado! Te contactaré pronto.',
    'contact.phone': 'Teléfono / WhatsApp',
    'contact.location': 'Ubicación',
    'contact.cv': 'Curriculum',
    'contact.social': 'Sígueme en redes',
    'contact.why': '¿Por qué trabajar conmigo?',
    'contact.why.response': 'Respuesta rápida (24-48 horas)',
    'contact.why.communication': 'Comunicación constante durante el proyecto',
    'contact.why.code': 'Código limpio y bien documentado',
    'contact.why.support': 'Soporte post-lanzamiento',
    'contact.footer': '© 2025 Daniel Jiménez.'
  ,
  // Contact alerts y estados
  'contact.alert.required': 'Por favor, completa todos los campos obligatorios.',
  'contact.alert.emailInvalid': 'Por favor, ingresa un email válido.',
  'contact.alert.configError': 'Error de configuración: No se han configurado las credenciales de EmailJS. Por favor, contacta al administrador.',
  'contact.alert.sendError': 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
  'contact.form.sending': 'Enviando...',
  'contact.call': 'Llamar',

  // Experience extra
  'experience.showMore': 'Ver más experiencias',
  'experience.showLess': 'Ocultar experiencias',
  'experience.avec.title': 'Desarrollador Web y Asistente de TI',
  'experience.avec.company': 'Asociación Venezolana de Educación Católica (AVEC)',
  'experience.avec.period': 'ene. 2016 - dic. 2020',
  'experience.avec.desc': 'Desarrollo y mantenimiento de sistemas web para instituciones educativas (PHP, MySQL, Laravel, WordPress). Soporte técnico, administración de bases de datos, mantenimiento de servidores, equipos y redes. Creación de interfaces responsive y automatización de procesos.',

  // About extra
  'about.education.technical.desc': 'Bachiller Técnico Medio en Comercio y Servicios Administrativos con especialización en Informática.'
  },
  en: {
    // Navbar
    'nav.inicio': 'Home',
    'nav.acerca': 'About',
    'nav.servicios': 'Services',
    'nav.habilidades': 'Skills',
    'nav.experiencia': 'Experience',
    'nav.proyectos': 'Projects',
    'nav.contacto': 'Contact',
    'nav.portfolio': 'Portfolio',
  'nav.changeLanguage': 'Change language',
    
    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.description': 'Computer Engineer and Full Stack Developer. Creating exceptional digital experiences with clean code and intuitive design.',
    'hero.viewProjects': 'View Projects',
    'hero.contact': 'Contact',
    'hero.downloadCV': 'Download CV',
    
    // Services Section
    'services.title': 'My',
    'services.subtitle': 'Specialties',
    'services.description': 'Areas of expertise where I can add value to your project',
    'services.web.title': 'Web Development',
    'services.web.desc': 'Modern and responsive web applications with React, Node.js and cutting-edge technologies.',
    'services.mobile.title': 'Mobile Development',
    'services.mobile.desc': 'Native and cross-platform mobile applications with React Native and hybrid technologies.',
    'services.api.title': 'APIs & Backend',
    'services.api.desc': 'Development of RESTful APIs, microservices and scalable backend architectures.',
    'services.database.title': 'Databases',
    'services.database.desc': 'Design, optimization and management of SQL and NoSQL databases for efficient solutions.',
    'services.deployment.title': 'DevOps & Deployment',
    'services.deployment.desc': 'Implementation, automation and cloud infrastructure management.',
    'services.maintenance.title': 'Maintenance & Support',
    'services.maintenance.desc': 'Continuous technical support, updates and optimization of existing applications.',
    
    // About Section
    'about.title': 'About',
    'about.me': 'Me',
    'about.description': 'Full Stack Developer passionate about creating innovative digital solutions. Specialized in React, Node.js, and TypeScript, I transform ideas into exceptional web experiences. Committed to clean code, continuous learning, and technical excellence.',
    'about.description1': 'I\'m a full-stack developer with over 3 years of experience creating modern and scalable web applications. My passion for technology drives me to always be learning and exploring new tools.',
    'about.description2': 'Specialized in React, Node.js, TypeScript and cloud technologies. I love working in teams and creating solutions that really make a difference for end users.',
    'about.description3': 'When I\'m not coding, I enjoy contributing to open source projects, writing technical articles and exploring the latest trends in web development.',
    'about.development': 'Development',
    'about.development.desc': 'Creating elegant and functional solutions with the latest technologies.',
    'about.innovation': 'Innovation',
    'about.innovation.desc': 'Always looking for new ways to solve complex problems.',
    'about.objectives': 'Goals',
    'about.objectives.desc': 'Focused on delivering results that exceed expectations.',
    'about.education': 'Education',
    'about.education.title': 'Academic Background',
    'about.education.university': 'Universidad Alejandro de Humboldt',
    'about.education.degree': 'Computer Engineering',
    'about.education.period': '2025 - In Progress',
    'about.education.description': 'Currently pursuing the final stages of Computer Engineering degree.',
    'about.education.ucab.university': 'Universidad Católica Andrés Bello (UCAB)',
    'about.education.ucab.degree': 'Computer Engineering',
    'about.education.ucab.period': '2018 - 2021',
    'about.education.ucab.description': 'Completed 6 semesters of Computer Engineering, acquiring solid foundations in programming, mathematics, and computer science.',
    'about.education.technical': 'Technical High School Education in Commerce and Administrative Services with Computer Science Specialization',
    'about.education.technical.school': 'U.E.P. Escuela San Vicente, El Paraíso',
    'about.education.technical.year': '2016',
    // Certifications
    'about.education.certificationsTitle': 'Certifications',
    'about.education.certification1.title': 'Foundations of Time Management',
    'about.education.certification1.platform': 'LinkedIn Learning',
    'about.education.certification1.date': 'Apr 12, 2021',
    'about.education.certification2.title': 'Foundations of Web Development: Full Stack or Front-End',
    'about.education.certification2.platform': 'LinkedIn Learning',
    'about.education.certification2.date': 'Mar 22, 2021',
    
    // Skills Section
    'skills.title': 'My',
    'skills.subtitle': 'Skills',
    'skills.description': 'Technologies and tools I master to create complete and scalable solutions',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools',
    
    // Experience Section
    'experience.title': 'Work',
    'experience.subtitle': 'Experience',
    'experience.description': 'My professional journey in software development',
    'experience.current': 'Current',
    'experience.cinepic.title': 'Management Systems Developer',
    'experience.cinepic.company': 'Cine Cinepic - Centro Comercial Sambil La Candelaria',
    'experience.cinepic.period': 'May 2024 - Aug 2024',
    'experience.cinepic.desc': 'Development and implementation of inventory management systems. Process automation through custom software solutions. Workflow optimization with digital tools.',
    'experience.lido.title': 'Jr. Software Developer',
    'experience.lido.company': 'Lidotel Centro Lido - Hotel Lido Chacao El Rosal',
    'experience.lido.period': 'Feb 2022 - May 2023',
    'experience.lido.desc': 'Development of automation scripts and tools. Implementation of technological solutions to optimize internal processes. Collaboration with IT teams on development projects and system improvements.',
    'experience.sambil.title': 'Full Stack Programmer and Technical Support Assistant',
    'experience.sambil.company': 'Constructora Sambil - Centro Comercial Lido Chacao',
    'experience.sambil.period': 'Feb 2020 - Dec 2021',
    'experience.sambil.desc': 'Development of CRM for the IT department. Development of complete web applications using JavaScript, HTML, CSS, Node.js and React. Implementation of relational and non-relational databases.',
    
    // Projects Section
    'projects.title': 'My',
    'projects.subtitle': 'Projects',
    'projects.description': 'A collection of projects that demonstrate my skills and experience in web development',
    'projects.fullstack': 'Full Stack',
    'projects.frontend': 'Frontend',
    'projects.backend': 'Backend',
    'projects.code': 'Code',
    'projects.demo': 'Demo',
    'projects.more': 'Explore my code on GitHub',
    'projects.more.desc': 'Discover more projects, open source contributions, and my journey as a developer.',
    'projects.github': 'View GitHub',
  // Projects items (details)
  'projects.items.finanzas.title': 'Personal Finance VE',
  'projects.items.finanzas.desc': 'Mobile and web app for personal expense and income tracking with dual currency support (USD and Bs.S), budgets, and balances.',
  'projects.items.analytics.title': 'Analytics Dashboard',
  'projects.items.analytics.desc': 'Interactive dashboard to visualize and analyze key metrics in real time with dynamic charts and advanced filters.',
  'projects.items.university.title': 'Institutional Website (University)',
  'projects.items.university.desc': 'Responsive institutional site to present university info, courses, and contact, built with React and Vite.',
  'projects.items.portfolio.title': 'Cosmic Survivor',
  'projects.items.portfolio.desc': 'Arcade space game developed with Phaser 3. Control a ship, collect stars, destroy enemies and survive as long as possible.',
  'projects.items.taskmanager.title': 'Task Manager',
  'projects.items.taskmanager.desc': 'Full stack task management application with authentication, drag & drop and real-time synchronization.',
  'projects.items.ecommerce.title': 'E-Commerce Platform',
  'projects.items.ecommerce.desc': 'Complete e-commerce platform with shopping cart, payment gateway and admin panel.',
  'projects.items.weather.title': 'Weather App',
  'projects.items.weather.desc': 'Weather application with geolocation, extended forecast and real-time data from OpenWeather API.',
  'projects.items.chat.title': 'Real-Time Chat',
  'projects.items.chat.desc': 'Chat application with instant messaging, chat rooms and push notifications using Socket.io.',
    
    // Contact Section
    'contact.title': 'Let\'s Talk',
    'contact.description': 'Do you have a project in mind? I\'d love to hear your ideas and help you make them a reality.',
    'contact.form.title': 'Send me a message',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'How can I help you?',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell me about your project...',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Message sent! I\'ll contact you soon.',
    'contact.phone': 'Phone / WhatsApp',
    'contact.location': 'Location',
    'contact.cv': 'Resume',
    'contact.social': 'Follow me on social media',
    'contact.why': 'Why work with me?',
    'contact.why.response': 'Quick response (24-48 hours)',
    'contact.why.communication': 'Constant communication during the project',
    'contact.why.code': 'Clean and well-documented code',
    'contact.why.support': 'Post-launch support',
    'contact.footer': '© 2025 Daniel Jiménez.'
  ,
  // Contact alerts and states
  'contact.alert.required': 'Please complete all required fields.',
  'contact.alert.emailInvalid': 'Please enter a valid email.',
  'contact.alert.configError': 'Configuration error: EmailJS credentials are missing. Please contact the administrator.',
  'contact.alert.sendError': 'Error sending the message. Please try again.',
  'contact.form.sending': 'Sending...',
  'contact.call': 'Call',

  // Experience extra
  'experience.showMore': 'View more experiences',
  'experience.showLess': 'Hide experiences',
  'experience.avec.title': 'Web Developer and IT Assistant',
  'experience.avec.company': 'Venezuelan Association of Catholic Education (AVEC)',
  'experience.avec.period': 'Jan 2016 - Dec 2020',
  'experience.avec.desc': 'Development and maintenance of web systems for educational institutions (PHP, MySQL, Laravel, WordPress). Technical support, database administration, server and network maintenance. Responsive UIs and process automation.',

  // About extra
  'about.education.technical.desc': 'Technical High School diploma in Commerce and Administrative Services, Computer Science specialization.'
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// useLanguage hook moved to a separate file for Fast Refresh compatibility.

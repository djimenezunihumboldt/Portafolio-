import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowUp } from 'lucide-react';
import Navbar from './ui/Navbar';
import HeroSection from './sections/HeroSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import EasterEgg from './components/EasterEgg';
import ChatBot from './components/ChatBot';
import Preloader from './components/Preloader';
import { SoundProvider } from './hooks/useSoundEffects';
import { HighContrastProvider } from './contexts/HighContrastContext';
import { SectionLoader, TimelineLoader } from './components/LazyLoad';
import { StructuredData } from './hooks/useSEO';
import { useReducedMotion } from './hooks/useAccessibility';

// Lazy loaded sections for better performance
const AboutSection = lazy(() => import('./sections/AboutSection'));
const EducationSection = lazy(() => import('./sections/EducationSection'));
const SkillsSection = lazy(() => import('./sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const CertificationsSection = lazy(() => import('./sections/CertificationsSection'));
const AnimatedStats = lazy(() => import('./components/AnimatedStats'));

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: reducedMotion ? 'auto' : 'smooth' 
    });
  };

  // Show preloader only on first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return (
    <HighContrastProvider>
      <SoundProvider>
        {/* SEO: Structured Data */}
        <StructuredData />
        
        {/* Preloader */}
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
        
        <div className={`min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300 ${isLoading ? 'overflow-hidden' : ''}`}>
          {/* Scroll Progress Bar */}
          <ScrollProgress />
          
          {/* Easter Egg - Konami Code */}
          <EasterEgg />
          
          {/* ChatBot */}
          <ChatBot />
          
          <Navbar />
          <main 
            id="main-content" 
            role="main"
            tabIndex={-1}
            className="outline-none"
          >
            <HeroSection />
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
            {/* Animated Stats Section - After About */}
            <Suspense fallback={<SectionLoader />}>
              <AnimatedStats />
            </Suspense>
            {/* Projects Section */}
            <Suspense fallback={<SectionLoader />}>
              <ProjectsSection />
            </Suspense>
            {/* Skills & Services Section - Combined */}
            <Suspense fallback={<SectionLoader />}>
              <SkillsSection />
            </Suspense>
            {/* Experience Section - After Skills */}
            <Suspense fallback={<TimelineLoader />}>
              <ExperienceSection />
            </Suspense>
            {/* Education Section - Separated from About */}
            <Suspense fallback={<SectionLoader />}>
              <EducationSection />
            </Suspense>
            {/* Certifications Section */}
            <Suspense fallback={<SectionLoader />}>
              <CertificationsSection />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
          </main>
          <Footer />
          
          {/* Floating scroll to top button */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 left-8 z-50 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-secondary-900 ${
              showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
            }`}
            aria-label="Volver al inicio de la página"
            title="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </SoundProvider>
    </HighContrastProvider>
  );
}

export default App;
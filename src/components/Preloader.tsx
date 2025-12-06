import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function Preloader({ onComplete, minDuration = 2000 }: PreloaderProps) {
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const elapsed = Date.now() - startTime;
        const naturalProgress = Math.min((elapsed / minDuration) * 100, 100);
        const newProgress = prev + (naturalProgress - prev) * 0.1;
        
        if (newProgress >= 99.5) {
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [minDuration]);

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true);
      setTimeout(() => {
        setIsHiding(true);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 300);
    }
  }, [progress, isComplete, onComplete]);

  if (isHiding) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none">
        {/* Empty during hide animation */}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer Ring */}
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                className="text-primary transition-all duration-300"
                transform="rotate(-90 50 50)"
              />
            </svg>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary animate-pulse">
                {'</>'}
              </span>
            </div>
          </div>

          {/* Glowing Effect */}
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-primary/20 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">
          {language === 'es' ? 'Cargando' : 'Loading'}
          <span className="animate-dots">...</span>
        </h2>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-gray-400 mt-3 text-sm font-mono">
          {Math.round(progress)}%
        </p>

        {/* Loading Messages */}
        <div className="mt-6 text-gray-500 text-sm animate-fade-in">
          {progress < 30 && (language === 'es' ? 'Inicializando...' : 'Initializing...')}
          {progress >= 30 && progress < 60 && (language === 'es' ? 'Cargando componentes...' : 'Loading components...')}
          {progress >= 60 && progress < 90 && (language === 'es' ? 'Preparando experiencia...' : 'Preparing experience...')}
          {progress >= 90 && (language === 'es' ? '¡Casi listo!' : 'Almost ready!')}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
        .animate-dots::after {
          content: '...';
          animation: dots 1.5s infinite;
        }
        .animate-dots {
          display: inline-block;
          width: 20px;
          text-align: left;
        }
      `}</style>
    </div>
  );
}

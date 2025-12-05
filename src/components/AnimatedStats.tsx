import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { Code, Briefcase, FolderGit2, Award, Sparkles, TrendingUp, Users, Coffee } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  labelEs: string;
  labelEn: string;
  color: string;
}

const AnimatedStats = () => {
  const { language } = useLanguage();
  const [currentSet, setCurrentSet] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  // Dos conjuntos de estadísticas
  const statSets: StatItem[][] = [
    [
      {
        icon: <Code className="w-8 h-8" />,
        value: 5,
        suffix: '+',
        labelEs: 'Años de Experiencia',
        labelEn: 'Years of Experience',
        color: 'from-blue-400 to-blue-600'
      },
      {
        icon: <FolderGit2 className="w-8 h-8" />,
        value: 15,
        suffix: '+',
        labelEs: 'Proyectos Completados',
        labelEn: 'Projects Completed',
        color: 'from-green-400 to-green-600'
      },
      {
        icon: <Briefcase className="w-8 h-8" />,
        value: 4,
        suffix: '',
        labelEs: 'Empresas',
        labelEn: 'Companies',
        color: 'from-purple-400 to-purple-600'
      },
      {
        icon: <Award className="w-8 h-8" />,
        value: 10,
        suffix: '+',
        labelEs: 'Tecnologías Dominadas',
        labelEn: 'Technologies Mastered',
        color: 'from-orange-400 to-orange-600'
      }
    ],
    [
      {
        icon: <TrendingUp className="w-8 h-8" />,
        value: 100,
        suffix: '%',
        labelEs: 'Compromiso',
        labelEn: 'Commitment',
        color: 'from-pink-400 to-pink-600'
      },
      {
        icon: <Users className="w-8 h-8" />,
        value: 20,
        suffix: '+',
        labelEs: 'Clientes Satisfechos',
        labelEn: 'Happy Clients',
        color: 'from-cyan-400 to-cyan-600'
      },
      {
        icon: <Coffee className="w-8 h-8" />,
        value: 999,
        suffix: '+',
        labelEs: 'Tazas de Café',
        labelEn: 'Cups of Coffee',
        color: 'from-amber-400 to-amber-600'
      },
      {
        icon: <Sparkles className="w-8 h-8" />,
        value: 24,
        suffix: '/7',
        labelEs: 'Pasión por Código',
        labelEn: 'Passion for Code',
        color: 'from-rose-400 to-rose-600'
      }
    ]
  ];

  // Cambiar entre sets cada 6 segundos
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentSet((prev) => (prev + 1) % statSets.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [inView, statSets.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  return (
    <div ref={ref} className="py-12 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating orbs */}
      <motion.div 
        className="absolute top-5 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-5 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl"
        animate={{ 
          x: [0, -20, 0], 
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Set indicator dots */}
        <div className="flex justify-center gap-2 mb-6">
          {statSets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSet(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSet === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Ver estadísticas ${index + 1}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSet}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {statSets[currentSet].map((stat, index) => (
              <StatCard
                key={`${currentSet}-${index}`}
                stat={stat}
                language={language}
                inView={inView}
                delay={index * 150}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface StatCardProps {
  stat: StatItem;
  language: string;
  inView: boolean;
  delay: number;
}

const StatCard = ({ stat, language, inView, delay }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const countRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCount(0);
    setIsComplete(false);
    
    if (inView) {
      const startTime = Date.now();
      const duration = 2000;

      const animate = () => {
        const elapsed = Date.now() - startTime - delay;
        if (elapsed < 0) {
          countRef.current = setTimeout(animate, 16);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * stat.value);
        
        setCount(currentCount);

        if (progress < 1) {
          countRef.current = setTimeout(animate, 16);
        } else {
          setIsComplete(true);
        }
      };

      animate();

      return () => {
        if (countRef.current) clearTimeout(countRef.current);
      };
    }
  }, [inView, stat.value, delay]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="text-center text-white relative group"
      variants={cardVariants}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      
      {/* Card content */}
      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
        {/* Icon with pulse animation */}
        <motion.div 
          className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-3 shadow-lg`}
          animate={isComplete ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={inView ? { 
              rotate: [0, 360] 
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: delay / 1000 + 0.3,
              ease: "easeOut"
            }}
          >
            {stat.icon}
          </motion.div>
        </motion.div>

        {/* Number with celebration effect */}
        <motion.div 
          className="text-3xl md:text-4xl font-bold mb-1"
          animate={isComplete ? {
            scale: [1, 1.15, 1],
          } : {}}
          transition={{ duration: 0.4 }}
        >
          {count}{stat.suffix}
          
          {/* Sparkle effect when complete */}
          {isComplete && (
            <motion.span
              className="absolute -top-2 -right-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.span>
          )}
        </motion.div>

        <motion.div 
          className="text-white/80 text-sm md:text-base font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay / 1000 + 0.5 }}
        >
          {language === 'es' ? stat.labelEs : stat.labelEn}
        </motion.div>

        {/* Progress bar animation */}
        <motion.div 
          className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay / 1000 + 0.3 }}
        >
          <motion.div 
            className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2, 
              delay: delay / 1000,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimatedStats;

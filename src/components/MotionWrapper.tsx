import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { 
  fadeInUp,
  staggerContainer,
  staggerItem
} from '../constants/animationVariants';

// Componente wrapper con animación en viewport
interface MotionSectionProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export const MotionSection = ({ 
  children, 
  variants = fadeInUp, 
  className = '',
  delay = 0,
  ...props 
}: MotionSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      className={className}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Componente para elementos que aparecen en secuencia
interface MotionListProps {
  children: ReactNode;
  className?: string;
}

export const MotionList = ({ children, className = '' }: MotionListProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionItem = ({ children, className = '' }: MotionListProps) => {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
};

// Componente para tarjetas con hover interactivo
interface MotionCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
}

export const MotionCard = ({ 
  children, 
  className = '', 
  hoverScale = 1.02,
  hoverRotate = 0,
  ...props 
}: MotionCardProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      whileHover={{ 
        scale: hoverScale, 
        rotate: hoverRotate,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Componente para texto con animación letra por letra
interface MotionTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const MotionText = ({ text, className = '', delay = 0 }: MotionTextProps) => {
  const letters = text.split('');
  
  return (
    <motion.span 
      className={`inline-flex ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: delay + index * 0.03,
                duration: 0.3
              }
            }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Componente para imágenes con animación
interface MotionImageProps extends HTMLMotionProps<'img'> {
  src: string;
  alt: string;
  className?: string;
}

export const MotionImage = ({ src, alt, className = '', ...props }: MotionImageProps) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
      {...props}
    />
  );
};

// Componente para botones con animación
interface MotionButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
}

export const MotionButton = ({ children, className = '', ...props }: MotionButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Componente para links con animación
interface MotionLinkProps extends HTMLMotionProps<'a'> {
  children: ReactNode;
  href: string;
  className?: string;
}

export const MotionLink = ({ children, href, className = '', ...props }: MotionLinkProps) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

// Animación de page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// Export motion para uso directo
export { motion, type Variants };

// Re-export variantes para compatibilidad
export {
  fadeInUp,
  staggerContainer,
  staggerItem
} from '../constants/animationVariants';

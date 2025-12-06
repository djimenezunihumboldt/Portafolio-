import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animations: Record<AnimationType, { hidden: string; visible: string }> = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-12',
    visible: 'opacity-100 translate-y-0'
  },
  'fade-down': {
    hidden: 'opacity-0 -translate-y-12',
    visible: 'opacity-100 translate-y-0'
  },
  'fade-left': {
    hidden: 'opacity-0 translate-x-12',
    visible: 'opacity-100 translate-x-0'
  },
  'fade-right': {
    hidden: 'opacity-0 -translate-x-12',
    visible: 'opacity-100 translate-x-0'
  },
  'zoom-in': {
    hidden: 'opacity-0 scale-90',
    visible: 'opacity-100 scale-100'
  },
  'zoom-out': {
    hidden: 'opacity-0 scale-110',
    visible: 'opacity-100 scale-100'
  },
  'flip': {
    hidden: 'opacity-0 rotateX-90',
    visible: 'opacity-100 rotateX-0'
  }
};

const AnimatedSection = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.1
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  });

  const { hidden, visible } = animations[animation];

  return (
    <div
      ref={ref}
      className={`transform transition-all ease-out ${inView ? visible : hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

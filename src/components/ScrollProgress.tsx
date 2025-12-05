import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progressPercentage = (scrollPosition / totalHeight) * 100;
      setProgress(progressPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 transition-all duration-150 ease-out shadow-lg shadow-primary-500/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;

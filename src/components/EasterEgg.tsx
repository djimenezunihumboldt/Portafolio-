import { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

interface EasterEggProps {
  onActivate?: () => void;
}

const EasterEgg = ({ onActivate }: EasterEggProps) => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Big burst in the center
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors
      });
    }, 500);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const newSequence = [...keySequence, e.code].slice(-KONAMI_CODE.length);
    setKeySequence(newSequence);

    // Check if sequence matches
    if (newSequence.length === KONAMI_CODE.length) {
      const isMatch = newSequence.every((key, index) => key === KONAMI_CODE[index]);
      
      if (isMatch && !isActivated) {
        setIsActivated(true);
        setShowMessage(true);
        triggerConfetti();
        onActivate?.();

        // Hide message after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      }
    }
  }, [keySequence, isActivated, triggerConfetti, onActivate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!showMessage) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-6 rounded-2xl shadow-2xl transform animate-bounce-slow">
        <div className="text-center">
          <div className="text-4xl mb-2">🎉 ¡Easter Egg Desbloqueado! 🎮</div>
          <p className="text-lg opacity-90">
            ¡Encontraste el código Konami secreto!
          </p>
          <p className="text-sm mt-2 opacity-75">
            ↑ ↑ ↓ ↓ ← → ← → B A
          </p>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;

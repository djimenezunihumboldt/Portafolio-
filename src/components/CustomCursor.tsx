import { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const target = e.target as HTMLElement;
    const isClickable = 
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      !!target.closest('button') ||
      !!target.closest('a') ||
      window.getComputedStyle(target).cursor === 'pointer';
    
    setIsPointer(isClickable);
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseLeave = useCallback(() => setIsHidden(true), []);
  const handleMouseEnter = useCallback(() => setIsHidden(false), []);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      // Hide default cursor
      document.body.style.cursor = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.body.style.cursor = 'auto';
      };
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            isPointer ? 'w-4 h-4' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Outer ring */}
      <div
        className={`fixed pointer-events-none z-[9998] rounded-full border-2 border-primary-400 transition-all duration-300 ease-out ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? 50 : 35,
          height: isPointer ? 50 : 35,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.9 : 1})`,
        }}
      />

      {/* Trailing effect */}
      <div
        className={`fixed pointer-events-none z-[9997] rounded-full bg-accent-500/30 transition-all duration-500 ease-out ${
          isHidden ? 'opacity-0' : 'opacity-50'
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? 60 : 45,
          height: isPointer ? 60 : 45,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <style>{`
        * {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

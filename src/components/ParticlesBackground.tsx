import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
}

interface GlowOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  pulsePhase: number;
  pulseSpeed: number;
}

// Light theme - Matrix rain
interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  charIndex: number;
  opacity: number;
  fontSize: number;
  color: string;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { isDark } = useTheme();
  
  // Dark theme refs
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const glowOrbsRef = useRef<GlowOrb[]>([]);
  
  // Light theme refs - Matrix
  const matrixColumnsRef = useRef<MatrixColumn[]>([]);
  
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        setDimensions({
          width: canvasRef.current.parentElement.offsetWidth,
          height: canvasRef.current.parentElement.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    // ===== DARK THEME INITIALIZATION =====
    if (isDark) {
      // Initialize stars
      const starCount = Math.min(100, Math.floor((dimensions.width * dimensions.height) / 8000));
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      }));

      // Initialize shooting stars
      shootingStarsRef.current = Array.from({ length: 5 }, () => ({
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        opacity: 0,
        angle: 0,
        active: false
      }));

      // Initialize glow orbs
      const orbColors = [
        'rgba(59, 130, 246, 0.35)',
        'rgba(245, 158, 11, 0.3)',
        'rgba(139, 92, 246, 0.25)',
        'rgba(6, 182, 212, 0.25)',
        'rgba(236, 72, 153, 0.2)',
      ];
      
      glowOrbsRef.current = Array.from({ length: 6 }, (_, i) => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * 200 + 150,
        color: orbColors[i % orbColors.length],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008
      }));
    } 
    // ===== LIGHT THEME INITIALIZATION - MATRIX STYLE =====
    else {
      // Characters for matrix rain - only popular programming languages
      const allChars = ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'Rust', 'Go', 'Swift', 'PHP', 'Ruby', 'HTML', 'CSS', 'SQL', 'Docker', 'Git', 'AWS', 'Vue', 'Angular'];
      
      // Colors for light theme matrix - vibrant, vivid colors
      const colors = [
        '#2563EB', // bright blue
        '#DC2626', // bright red
        '#16A34A', // bright green
        '#9333EA', // bright purple
        '#EA580C', // bright orange
        '#0891B2', // bright cyan
        '#C026D3', // bright magenta
        '#0D9488', // bright teal
        '#4F46E5', // bright indigo
      ];
      
      const fontSize = Math.max(12, Math.min(14, dimensions.width * 0.01));
      const columnSpacing = 120; // Espacio fijo entre columnas
      const columns = Math.floor(dimensions.width / columnSpacing);
      
      matrixColumnsRef.current = Array.from({ length: columns }, (_, i) => {
        const charCount = Math.floor(dimensions.height / 30) + 5; // Menos caracteres por columna
        return {
          x: i * columnSpacing + columnSpacing / 2,
          y: -Math.random() * dimensions.height, // Inicio escalonadoInicio escalonado
          speed: 1.2 + Math.random() * 0.6, // Velocidad más uniforme
          chars: Array.from({ length: charCount }, () =>
            allChars[Math.floor(Math.random() * allChars.length)]
          ),
          charIndex: 0,
          opacity: 0.85 + Math.random() * 0.15,
          fontSize: fontSize,
          color: colors[i % colors.length] // Colores en orden para más organización
        };
      });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      if (isDark) {
        // ===== DARK THEME ANIMATION =====
        
        // Draw glow orbs (aurora effect)
        glowOrbsRef.current.forEach((orb) => {
          orb.x += orb.speedX;
          orb.y += orb.speedY;

          const dx = mouseRef.current.x - orb.x;
          const dy = mouseRef.current.y - orb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            orb.x += dx * 0.001;
            orb.y += dy * 0.001;
          }

          if (orb.x < -orb.radius) orb.x = dimensions.width + orb.radius;
          if (orb.x > dimensions.width + orb.radius) orb.x = -orb.radius;
          if (orb.y < -orb.radius) orb.y = dimensions.height + orb.radius;
          if (orb.y > dimensions.height + orb.radius) orb.y = -orb.radius;

          orb.pulsePhase += orb.pulseSpeed;
          const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.2;

          const gradient = ctx.createRadialGradient(
            orb.x, orb.y, 0,
            orb.x, orb.y, orb.radius * pulseScale
          );
          gradient.addColorStop(0, orb.color);
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        });

        // Draw stars with twinkling
        starsRef.current.forEach((star) => {
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
          const currentOpacity = star.opacity * (0.3 + twinkle * 0.7);
          const currentSize = star.size * (0.8 + twinkle * 0.4);

          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, currentSize * 3
          );
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          glowGradient.addColorStop(0.5, `rgba(200, 220, 255, ${currentOpacity * 0.3})`);
          glowGradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
        });

        // Handle shooting stars
        shootingStarsRef.current.forEach((star) => {
          if (!star.active && Math.random() < 0.004) {
            star.active = true;
            star.x = Math.random() * dimensions.width * 0.7;
            star.y = Math.random() * dimensions.height * 0.4;
            star.length = Math.random() * 120 + 80;
            star.speed = Math.random() * 12 + 8;
            star.opacity = 1;
            star.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
          }

          if (star.active) {
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.012;

            if (star.opacity > 0) {
              const tailX = star.x - Math.cos(star.angle) * star.length;
              const tailY = star.y - Math.sin(star.angle) * star.length;

              const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
              gradient.addColorStop(0, 'transparent');
              gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.4})`);
              gradient.addColorStop(0.8, `rgba(200, 220, 255, ${star.opacity * 0.8})`);
              gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

              ctx.beginPath();
              ctx.moveTo(tailX, tailY);
              ctx.lineTo(star.x, star.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 3;
              ctx.lineCap = 'round';
              ctx.stroke();

              const glowGradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
              glowGradient.addColorStop(0, 'transparent');
              glowGradient.addColorStop(0.7, `rgba(100, 150, 255, ${star.opacity * 0.2})`);
              glowGradient.addColorStop(1, `rgba(150, 200, 255, ${star.opacity * 0.5})`);

              ctx.beginPath();
              ctx.moveTo(tailX, tailY);
              ctx.lineTo(star.x, star.y);
              ctx.strokeStyle = glowGradient;
              ctx.lineWidth = 8;
              ctx.stroke();

              const headGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 12);
              headGlow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
              headGlow.addColorStop(0.3, `rgba(200, 220, 255, ${star.opacity * 0.8})`);
              headGlow.addColorStop(1, 'transparent');
              
              ctx.beginPath();
              ctx.arc(star.x, star.y, 12, 0, Math.PI * 2);
              ctx.fillStyle = headGlow;
              ctx.fill();

              ctx.beginPath();
              ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
              ctx.fill();
            } else {
              star.active = false;
            }
          }
        });

        // Dark theme wave at bottom
        ctx.beginPath();
        ctx.moveTo(0, dimensions.height);
        for (let x = 0; x <= dimensions.width; x += 5) {
          const y = dimensions.height - 50 + 
            Math.sin(x * 0.01 + timeRef.current) * 15 +
            Math.sin(x * 0.02 + timeRef.current * 1.5) * 10;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(dimensions.width, dimensions.height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, dimensions.height - 80, 0, dimensions.height);
        waveGradient.addColorStop(0, 'transparent');
        waveGradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
        ctx.fillStyle = waveGradient;
        ctx.fill();

      } else {
        // ===== LIGHT THEME ANIMATION - MATRIX RAIN =====
        
        // Very subtle background - almost transparent to let characters show
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Draw matrix rain
        matrixColumnsRef.current.forEach((column) => {
          // Update position
          column.y += column.speed;
          
          // Reset when column goes off screen
          if (column.y > dimensions.height + column.chars.length * 30) {
            column.y = -column.chars.length * 30;
            column.speed = 1.2 + Math.random() * 0.6;
            // Randomize characters
            const refreshChars = ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'Rust', 'Go', 'Swift', 'PHP', 'Ruby', 'HTML', 'CSS', 'SQL', 'Docker', 'Git', 'AWS', 'Vue', 'Angular'];
            column.chars = column.chars.map(() => 
              refreshChars[Math.floor(Math.random() * refreshChars.length)]
            );
          }
          
          // Draw characters in column
          ctx.font = `${column.fontSize}px 'Fira Code', 'Consolas', monospace`;
          
          column.chars.forEach((char, i) => {
            const charY = column.y + i * 30; // Espaciado vertical fijo de 30px
            
            // Only draw if visible
            if (charY > -30 && charY < dimensions.height + 30) {
              // Calculate opacity based on position in trail
              let charOpacity = column.opacity;
              
              // Head of the trail is brightest
              if (i === column.chars.length - 1) {
                charOpacity = 1;
                ctx.shadowColor = column.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = column.color;
                ctx.font = `bold ${column.fontSize}px 'Segoe UI', sans-serif`;
              } else if (i >= column.chars.length - 3) {
                charOpacity = 0.9;
                ctx.shadowBlur = 8;
                ctx.fillStyle = column.color;
                ctx.font = `bold ${column.fontSize}px 'Segoe UI', sans-serif`;
              } else {
                charOpacity = column.opacity * 0.7;
                ctx.shadowBlur = 0;
                ctx.fillStyle = column.color;
                ctx.font = `${column.fontSize}px 'Segoe UI', sans-serif`;
              }
              
              ctx.globalAlpha = charOpacity;
              ctx.fillText(char, column.x, charY);
              
              // Randomly change some characters
              if (Math.random() < 0.005) {
                const randomChars = ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'Go', 'Swift', 'PHP', 'Ruby', 'HTML', 'CSS', 'Vue'];
                column.chars[i] = randomChars[Math.floor(Math.random() * randomChars.length)];
              }
            }
          });
          
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        });

        // Draw decorative elements
        
        // Top gradient overlay - smaller fade
        const topFade = ctx.createLinearGradient(0, 0, 0, 50);
        topFade.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        topFade.addColorStop(1, 'transparent');
        ctx.fillStyle = topFade;
        ctx.fillRect(0, 0, dimensions.width, 50);
        
        // Bottom gradient overlay - smaller fade
        const bottomFade = ctx.createLinearGradient(0, dimensions.height - 50, 0, dimensions.height);
        bottomFade.addColorStop(0, 'transparent');
        bottomFade.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
        ctx.fillStyle = bottomFade;
        ctx.fillRect(0, dimensions.height - 50, dimensions.width, 50);

        // Animated corner brackets
        const bracketSize = 35 + Math.sin(timeRef.current * 2) * 5;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        
        // Top-left
        ctx.strokeStyle = 'rgba(30, 64, 175, 0.4)';
        ctx.shadowColor = 'rgba(30, 64, 175, 0.6)';
        ctx.beginPath();
        ctx.moveTo(15, 15 + bracketSize);
        ctx.lineTo(15, 15);
        ctx.lineTo(15 + bracketSize, 15);
        ctx.stroke();

        // Top-right
        ctx.strokeStyle = 'rgba(14, 116, 144, 0.4)';
        ctx.shadowColor = 'rgba(14, 116, 144, 0.6)';
        ctx.beginPath();
        ctx.moveTo(dimensions.width - 15 - bracketSize, 15);
        ctx.lineTo(dimensions.width - 15, 15);
        ctx.lineTo(dimensions.width - 15, 15 + bracketSize);
        ctx.stroke();

        // Bottom-right
        ctx.strokeStyle = 'rgba(4, 120, 87, 0.4)';
        ctx.shadowColor = 'rgba(4, 120, 87, 0.6)';
        ctx.beginPath();
        ctx.moveTo(dimensions.width - 15, dimensions.height - 15 - bracketSize);
        ctx.lineTo(dimensions.width - 15, dimensions.height - 15);
        ctx.lineTo(dimensions.width - 15 - bracketSize, dimensions.height - 15);
        ctx.stroke();

        // Bottom-left
        ctx.strokeStyle = 'rgba(30, 64, 175, 0.4)';
        ctx.shadowColor = 'rgba(30, 64, 175, 0.6)';
        ctx.beginPath();
        ctx.moveTo(15 + bracketSize, dimensions.height - 15);
        ctx.lineTo(15, dimensions.height - 15);
        ctx.lineTo(15, dimensions.height - 15 - bracketSize);
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        // Scanning line effect
        const scanY = (timeRef.current * 80) % (dimensions.height + 200) - 100;
        const scanGradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
        scanGradient.addColorStop(0, 'transparent');
        scanGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
        scanGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGradient;
        ctx.fillRect(0, scanY - 2, dimensions.width, 4);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isDark]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ParticlesBackground;

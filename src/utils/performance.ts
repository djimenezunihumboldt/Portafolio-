import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for lazy loading images with Intersection Observer
 */
export function useLazyImage(src: string, placeholder?: string) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = src;
            img.classList.remove('blur-sm');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(image);

    return () => observer.disconnect();
  }, [src]);

  return { imageRef, placeholder };
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Hook for measuring component render performance
 */
export function usePerformanceMeasure(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (startTime.current === null) {
      startTime.current = performance.now();
    }
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (import.meta.env.DEV) {
      console.log(
        `[Performance] ${componentName} - Render #${renderCount.current}: ${renderTime.toFixed(2)}ms`
      );
    }

    startTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
    measureRender: () => {
      const now = performance.now();
      const elapsed = now - (startTime.current ?? now);
      startTime.current = now;
      return elapsed;
    },
  };
}

/**
 * Preload critical images
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          img.src = url;
        })
    )
  );
}

/**
 * Preload critical resources (fonts, scripts, etc.)
 */
export function preloadResource(
  url: string,
  type: 'script' | 'style' | 'font' | 'image'
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;

  switch (type) {
    case 'script':
      link.as = 'script';
      break;
    case 'style':
      link.as = 'style';
      break;
    case 'font':
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      break;
    case 'image':
      link.as = 'image';
      break;
  }

  document.head.appendChild(link);
}

/**
 * Hook for detecting slow network connections
 */
interface NetworkInformation {
  effectiveType?: string;
  saveData?: boolean;
  downlink?: number;
  rtt?: number;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

export function useNetworkStatus() {
  const getConnectionInfo = useCallback(() => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    
    if (!connection) {
      return { effectiveType: 'unknown', saveData: false };
    }

    return {
      effectiveType: connection.effectiveType || 'unknown',
      saveData: connection.saveData || false,
      downlink: connection.downlink,
      rtt: connection.rtt,
    };
  }, []);

  return getConnectionInfo();
}

/**
 * Optimize animation frame updates
 */
export function useAnimationFrame(callback: (time: number) => void) {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        callback(time - previousTimeRef.current);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
}

/**
 * Detect if the browser supports WebP images
 */
export async function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

export default {
  useLazyImage,
  debounce,
  throttle,
  usePerformanceMeasure,
  preloadImages,
  preloadResource,
  useNetworkStatus,
  useAnimationFrame,
  supportsWebP,
};

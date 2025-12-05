import { useRef, useCallback } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'error' | 'notification';

interface SoundOptions {
  volume?: number;
  enabled?: boolean;
}

// Generate tones using Web Audio API (no external files needed)
const createOscillator = (
  context: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.1
) => {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  
  gainNode.gain.setValueAtTime(volume, context.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration);
};

const soundConfigs: Record<SoundType, { frequencies: number[]; duration: number; type: OscillatorType }> = {
  click: { frequencies: [800], duration: 0.05, type: 'sine' },
  hover: { frequencies: [600], duration: 0.03, type: 'sine' },
  success: { frequencies: [523, 659, 784], duration: 0.15, type: 'sine' },
  error: { frequencies: [200, 150], duration: 0.2, type: 'square' },
  notification: { frequencies: [880, 1047], duration: 0.1, type: 'sine' },
};

export function useSoundEffects(options: SoundOptions = {}) {
  const { volume = 0.1, enabled = true } = options;
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!enabled) return;
    
    try {
      const context = getAudioContext();
      const config = soundConfigs[type];
      
      config.frequencies.forEach((freq, index) => {
        setTimeout(() => {
          createOscillator(context, freq, config.duration, config.type, volume);
        }, index * 100);
      });
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }, [enabled, volume, getAudioContext]);

  return { playSound };
}

// Sound Effect Provider Component
import { createContext, useContext, useState, ReactNode } from 'react';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soundEnabled');
      return saved !== null ? JSON.parse(saved) : false; // Disabled by default
    }
    return false;
  });

  const { playSound } = useSoundEffects({ enabled: soundEnabled, volume: 0.05 });

  const handleSetSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', JSON.stringify(enabled));
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, soundEnabled, setSoundEnabled: handleSetSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

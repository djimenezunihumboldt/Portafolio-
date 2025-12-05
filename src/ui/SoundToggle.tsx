import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useSound } from '../hooks/useSoundEffects';
import { useLanguage } from '../hooks/useLanguage';

export default function SoundToggle() {
  const { soundEnabled, setSoundEnabled, playSound } = useSound();
  const { language } = useLanguage();

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      // Play a sound to confirm it's working
      setTimeout(() => playSound('success'), 100);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label={
        soundEnabled
          ? (language === 'es' ? 'Desactivar sonido' : 'Disable sound')
          : (language === 'es' ? 'Activar sonido' : 'Enable sound')
      }
      title={
        soundEnabled
          ? (language === 'es' ? 'Sonido activado' : 'Sound enabled')
          : (language === 'es' ? 'Sonido desactivado' : 'Sound disabled')
      }
    >
      {soundEnabled ? (
        <FaVolumeUp className="w-5 h-5 text-primary" />
      ) : (
        <FaVolumeMute className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}

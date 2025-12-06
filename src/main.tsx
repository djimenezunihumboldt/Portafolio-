import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ColorThemeProvider } from './contexts/ColorThemeContext';
import { registerServiceWorker, setupInstallPrompt } from './utils/pwaUtils';
import { initGA, setupScrollTracking, setupTimeTracking } from './utils/analytics';
import './index.css';

// Initialize EmailJS
const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailjsPublicKey) {
  emailjs.init(emailjsPublicKey);
}

// Register service worker for PWA
if (import.meta.env.PROD) {
  registerServiceWorker();
  setupInstallPrompt();
}

// Initialize Google Analytics
initGA();
setupScrollTracking();
setupTimeTracking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ColorThemeProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ColorThemeProvider>
    </LanguageProvider>
  </StrictMode>
);

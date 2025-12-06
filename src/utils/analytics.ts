// Google Analytics 4 Integration
// Add your GA4 Measurement ID to .env file as VITE_GA4_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: Measurement ID not configured');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('event', eventName, eventParams);
};

// Common tracking events for portfolio
export const AnalyticsEvents = {
  // Navigation events
  navClick: (section: string) => trackEvent('navigation_click', { section }),
  
  // Project events
  projectView: (projectName: string) => trackEvent('project_view', { project_name: projectName }),
  projectDemo: (projectName: string) => trackEvent('project_demo_click', { project_name: projectName }),
  projectGithub: (projectName: string) => trackEvent('project_github_click', { project_name: projectName }),
  
  // Contact events
  contactFormStart: () => trackEvent('contact_form_start'),
  contactFormSubmit: () => trackEvent('contact_form_submit'),
  contactFormError: (error: string) => trackEvent('contact_form_error', { error_message: error }),
  
  // Download events
  cvDownload: () => trackEvent('cv_download'),
  
  // Social events
  socialClick: (platform: string) => trackEvent('social_click', { platform }),
  
  // Engagement events
  scrollDepth: (percentage: number) => trackEvent('scroll_depth', { percentage }),
  timeOnPage: (seconds: number) => trackEvent('time_on_page', { seconds }),
  
  // Theme events
  themeChange: (theme: string) => trackEvent('theme_change', { theme }),
  languageChange: (language: string) => trackEvent('language_change', { language }),
  
  // Easter egg
  easterEggFound: () => trackEvent('easter_egg_found'),
  
  // Chatbot events
  chatbotOpen: () => trackEvent('chatbot_open'),
  chatbotMessage: () => trackEvent('chatbot_message'),
};

// Track scroll depth
export const setupScrollTracking = (): void => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          AnalyticsEvents.scrollDepth(threshold);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Track time on page
export const setupTimeTracking = (): void => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const intervals = [30, 60, 120, 300, 600]; // seconds
  const tracked = new Set<number>();

  const checkTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    
    intervals.forEach(interval => {
      if (elapsed >= interval && !tracked.has(interval)) {
        tracked.add(interval);
        AnalyticsEvents.timeOnPage(interval);
      }
    });
  };

  setInterval(checkTime, 10000); // Check every 10 seconds
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  AnalyticsEvents,
};

import { useEffect, useCallback } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
}

const defaultSEO: SEOProps = {
  title: 'Daniel Jiménez | Desarrollador Full Stack',
  description: 'Portfolio profesional de Daniel Jiménez. Desarrollador Full Stack especializado en React, Node.js, TypeScript. Creando experiencias digitales excepcionales.',
  keywords: ['desarrollador', 'full stack', 'react', 'node.js', 'typescript', 'portfolio', 'venezuela', 'caracas', 'web developer'],
  image: 'https://djimenezunihumboldt.github.io/project-bolt-sb1-afdjf5g4/og-image.png',
  url: 'https://djimenezunihumboldt.github.io/project-bolt-sb1-afdjf5g4/',
  type: 'website',
  author: 'Daniel Jiménez',
  locale: 'es_VE',
};

/**
 * Custom hook for managing SEO meta tags dynamically
 */
export function useSEO(props: SEOProps = {}) {
  const seo = { ...defaultSEO, ...props };

  const updateMetaTag = useCallback((name: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  }, []);

  useEffect(() => {
    // Update title
    if (seo.title) {
      document.title = seo.title;
    }

    // Update meta description
    if (seo.description) {
      updateMetaTag('description', seo.description);
    }

    // Update keywords
    if (seo.keywords?.length) {
      updateMetaTag('keywords', seo.keywords.join(', '));
    }

    // Update author
    if (seo.author) {
      updateMetaTag('author', seo.author);
    }

    // Open Graph tags
    if (seo.title) {
      updateMetaTag('og:title', seo.title, true);
    }
    if (seo.description) {
      updateMetaTag('og:description', seo.description, true);
    }
    if (seo.image) {
      updateMetaTag('og:image', seo.image, true);
    }
    if (seo.url) {
      updateMetaTag('og:url', seo.url, true);
    }
    if (seo.type) {
      updateMetaTag('og:type', seo.type, true);
    }
    if (seo.locale) {
      updateMetaTag('og:locale', seo.locale, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    if (seo.title) {
      updateMetaTag('twitter:title', seo.title);
    }
    if (seo.description) {
      updateMetaTag('twitter:description', seo.description);
    }
    if (seo.image) {
      updateMetaTag('twitter:image', seo.image);
    }

    // Article specific tags
    if (seo.type === 'article') {
      if (seo.publishedTime) {
        updateMetaTag('article:published_time', seo.publishedTime, true);
      }
      if (seo.modifiedTime) {
        updateMetaTag('article:modified_time', seo.modifiedTime, true);
      }
      if (seo.author) {
        updateMetaTag('article:author', seo.author, true);
      }
    }

  }, [seo, updateMetaTag]);
}

/**
 * Generate structured data (JSON-LD) for SEO
 */
export function generateStructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daniel Jiménez',
    jobTitle: 'Full Stack Developer',
    url: 'https://djimenezunihumboldt.github.io/project-bolt-sb1-afdjf5g4/',
    image: 'https://djimenezunihumboldt.github.io/project-bolt-sb1-afdjf5g4/profile.jpg',
    sameAs: [
      'https://github.com/djimenezunihumboldt',
      'https://www.linkedin.com/in/daniel-jim%C3%A9nez-p%C3%A9rez-64b512133/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Caracas',
      addressCountry: 'Venezuela',
    },
    knowsAbout: [
      'React',
      'TypeScript',
      'Node.js',
      'Full Stack Development',
      'Web Development',
      'JavaScript',
      'TailwindCSS',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Daniel Jiménez Portfolio',
    url: 'https://djimenezunihumboldt.github.io/project-bolt-sb1-afdjf5g4/',
    description: 'Portfolio profesional de Daniel Jiménez - Desarrollador Full Stack',
    author: {
      '@type': 'Person',
      name: 'Daniel Jiménez',
    },
  };

  return { personSchema, websiteSchema };
}

/**
 * Component to inject structured data into the page
 */
export function StructuredData() {
  useEffect(() => {
    const { personSchema, websiteSchema } = generateStructuredData();
    
    // Remove existing structured data
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    
    // Add person schema
    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.textContent = JSON.stringify(personSchema);
    document.head.appendChild(personScript);
    
    // Add website schema
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(websiteScript);
    
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, []);

  return null;
}

export default useSEO;

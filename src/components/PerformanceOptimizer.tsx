
import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Préchargement immédiat des images critiques
    const criticalImages = [
      '/hero-consignation.webp',
      '/hero-manutention.webp',
      '/hero-transit.webp'
    ];

    criticalImages.forEach((href, index) => {
      const link = document.createElement('link');
      link.rel = index === 0 ? 'preload' : 'prefetch';
      link.href = href;
      link.as = 'image';
      if (index === 0) {
        link.setAttribute('fetchpriority', 'high');
      }
      document.head.appendChild(link);
    });

    // Optimisations DNS et ressources
    const resourceHints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
    ];

    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossOrigin) {
        link.crossOrigin = hint.crossOrigin;
      }
      document.head.appendChild(link);
    });

    // Optimisation du défilement
    if (CSS.supports('scroll-behavior', 'smooth')) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Cleanup
    return () => {
      criticalImages.forEach(href => {
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink && document.head.contains(existingLink)) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;

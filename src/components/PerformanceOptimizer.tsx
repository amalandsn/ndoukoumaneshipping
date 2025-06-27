
import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Add performance hints for hero images
    const prefetchHints = [
      '/hero-manutention.webp',
      '/hero-transit.webp'
    ];

    prefetchHints.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = 'image';
      document.head.appendChild(link);
    });

    // Add resource hints for better performance
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

    // Cleanup function
    return () => {
      // Remove prefetch links when component unmounts
      prefetchHints.forEach(href => {
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink && document.head.contains(existingLink)) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default PerformanceOptimizer;

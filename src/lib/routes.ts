
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  QUOTE_FR: '/devis',
  QUOTE_EN: '/quote',
  REFERENCES: '/references',
  CAREERS: '/careers',
  LEGAL: '/legal',
  BLOG: '/actualites',
  INDUSTRY_NEWS: '/industry-news'
} as const;

export const getQuoteRoute = (locale: 'fr' | 'en'): string => {
  return locale === 'fr' ? ROUTES.QUOTE_FR : ROUTES.QUOTE_EN;
};

export const getCareersRoute = (locale: 'fr' | 'en'): string => {
  return locale === 'fr' ? '/carrieres' : ROUTES.CAREERS;
};

export const getBlogRoute = (locale: 'fr' | 'en'): string => {
  return locale === 'fr' ? ROUTES.BLOG : ROUTES.BLOG;
};

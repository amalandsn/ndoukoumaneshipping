
import { create } from 'zustand';

interface LanguageStore {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;
}

// Basic translation function - in a real app this would be more sophisticated
const translations = {
  fr: {
    // Common translations will be added as needed
  },
  en: {
    // Common translations will be added as needed
  }
};

// Force French as default language
const getInitialLanguage = (): 'fr' | 'en' => {
  // Always start with French as default
  let initialLang: 'fr' | 'en' = 'fr';
  
  if (typeof window !== 'undefined') {
    // Only check saved preference if it exists
    const saved = localStorage.getItem("lang");
    if (saved === 'en') {
      initialLang = 'en';
    }
    
    // Set DOM to match our choice
    document.documentElement.lang = initialLang;
  }
  
  return initialLang;
};

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    // Update localStorage and DOM when language changes
    if (typeof window !== 'undefined') {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    }
    set({ language: lang });
  },
  t: (key) => {
    const { language } = get();
    return translations[language]?.[key] || key;
  }
}));

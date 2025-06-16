
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

// Initialize with French as default, check saved preference, then DOM language
const getInitialLanguage = (): 'fr' | 'en' => {
  if (typeof window !== 'undefined') {
    // First check if there's a saved preference
    const saved = localStorage.getItem("lang");
    if (saved) {
      return saved.startsWith("fr") ? "fr" : "en";
    }
    
    // If no saved preference, check DOM language but default to French
    const domLang = document.documentElement.lang;
    if (domLang && domLang.startsWith("en")) {
      return "en";
    }
  }
  
  // Always default to French
  return 'fr';
};

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    // Update localStorage when language changes
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

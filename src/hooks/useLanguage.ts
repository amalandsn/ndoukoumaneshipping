
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

// Initialize with DOM language or fallback to French
const getInitialLanguage = (): 'fr' | 'en' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem("lang");
    if (saved) {
      return saved.startsWith("fr") ? "fr" : "en";
    }
    const domLang = document.documentElement.lang;
    return domLang.startsWith("fr") ? "fr" : "en";
  }
  return 'fr';
};

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => {
    const { language } = get();
    return translations[language]?.[key] || key;
  }
}));

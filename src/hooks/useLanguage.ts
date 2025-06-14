
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

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: 'fr', // Default to French
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => {
    const { language } = get();
    return translations[language]?.[key] || key;
  }
}));

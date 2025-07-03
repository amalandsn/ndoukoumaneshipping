import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
const LanguageSwitcher = () => {
  const {
    language,
    setLanguage
  } = useLanguage();

  // Initialize DOM with French default on mount
  useEffect(() => {
    // Force French as default if no language is set
    if (!document.documentElement.lang || document.documentElement.lang === '') {
      document.documentElement.lang = 'fr';
      setLanguage('fr');
    }
    const syncWithDOM = () => {
      const domLang = document.documentElement.lang || 'fr';
      const currentLang = domLang.startsWith("en") ? "en" : "fr";
      if (currentLang !== language) {
        setLanguage(currentLang);
      }
    };

    // Initial sync
    syncWithDOM();

    // Listen for lang-change events
    window.addEventListener("lang-change", syncWithDOM);
    return () => {
      window.removeEventListener("lang-change", syncWithDOM);
    };
  }, [language, setLanguage]);
  const handleLanguageSwitch = () => {
    const nextLang = language === "fr" ? "en" : "fr";

    // Update DOM
    document.documentElement.lang = nextLang;
    localStorage.setItem("lang", nextLang);

    // Update Zustand store
    setLanguage(nextLang);

    // Dispatch event for other components
    window.dispatchEvent(new Event("lang-change"));
  };
  return <div className="flex items-center space-x-1 mx-[3px]">
      <Globe className="h-4 w-4 text-gray-600 px-0 py-0 my-0 mx-[5px]" />
      <Button variant="ghost" size="sm" onClick={handleLanguageSwitch} className="text-sm font-medium">
        {language === 'fr' ? 'EN' : 'FR'}
      </Button>
    </div>;
};
export default LanguageSwitcher;
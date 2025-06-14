
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1">
      <Globe className="h-4 w-4 text-gray-600" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
        className="text-sm font-medium"
      >
        {language === 'fr' ? 'EN' : 'FR'}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;

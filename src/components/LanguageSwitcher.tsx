
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  // On initial load, before render, set the saved lang if present
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("lang");
    if (saved && document.documentElement.lang !== saved) {
      document.documentElement.lang = saved;
    }
  }

  // lang may not be in state, so recompute on each render
  const isFR = typeof document !== "undefined" && document.documentElement.lang.startsWith("fr");

  return (
    <div className="flex items-center space-x-1">
      <Globe className="h-4 w-4 text-gray-600" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const next = document.documentElement.lang.startsWith("fr") ? "en" : "fr";
          document.documentElement.lang = next;
          localStorage.setItem("lang", next);  // remember choice
          window.dispatchEvent(new Event("lang-change"));
        }}
        className="text-sm font-medium"
      >
        {isFR ? 'EN' : 'FR'}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;


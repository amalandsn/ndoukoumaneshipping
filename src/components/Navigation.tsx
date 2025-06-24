
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, FileText } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = {
    fr: [
      { label: 'Accueil', href: '/' },
      { label: 'À propos', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Références', href: '/references' },
      { label: 'Actualités', href: '/actualites' },
      { label: 'Carrières', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ],
    en: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'References', href: '/references' },
      { label: 'News', href: '/actualites' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ]
  };

  const items = navigationItems[language];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+221774021825';
  };

return (
  <nav className="bg-white shadow-lg sticky top-0 z-50">
    <div className="container mx-auto px-4">
      <div className="flex items-center py-3">
        {/* --------------  Bloc logo + marque -------------- */}
        <Link to="/" className="flex items-start gap-3 shrink-0">
          <img
            src="/logo.webp"
            alt="Ndoukoumane Groupe"
            className="h-14 w-auto object-contain"
          />

          {/* Marque : max-width pour éviter qu’elle s’étale */}
          <div className="leading-tight max-w-[9rem]">
            <h1 className="text-lg md:text-xl font-bold text-blue-900 font-serif">
              Ndoukoumane<br />Shipping &amp; Services
            </h1>
            <p className="text-xs text-gray-600">
              {language === "fr" ? "Services Maritimes" : "Maritime Services"}
            </p>
          </div>
        </Link>

        {/* --------------  Menu desktop -------------- */}
        <ul className="hidden lg:flex items-center gap-10 ml-12 xl:ml-16">
          {items.map((item) => (
            <li key={item.label} className="whitespace-nowrap">
              <Link
                to={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* --------------  Burger mobile -------------- */}
        <button
          className="lg:hidden ml-auto"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <Menu className="h-6 w-6 text-blue-900" />
        </button>
      </div>
    </div>
  </nav>
);
};

export default Navigation;

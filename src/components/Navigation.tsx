
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
      <div className="flex items-center py-4">
        {/* -----------------------------------------------------  Bloc gauche  */}
        <Link to="/" className="flex items-start gap-3 shrink-0">
          {/* Logo : 56 px de haut */}
          <img
            src="/logo.webp"
            alt="Ndoukoumane Groupe"
            className="h-14 w-auto object-contain"
          />

          {/* Texte : jamais réduit, largeur min fixe   */}
          <div className="min-w-max">
            <div className="text-xl font-bold text-blue-900 font-serif leading-tight">
              Ndoukoumane<br />
              Shipping &amp; Services
            </div>
            <div className="text-xs text-gray-600">
              {language === "fr" ? "Services Maritimes" : "Maritime Services"}
            </div>
          </div>
        </Link>

        {/* -----------------------------------------------------  Menu desktop  */}
        <ul className="hidden lg:flex items-center gap-8 ml-auto">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-900 whitespace-nowrap"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* -----------------------------------------------------  Burger mobile  */}
        <button
          className="lg:hidden ml-auto"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {/* Icône burger déjà importée */}
          <Menu className="h-6 w-6 text-blue-900" />
        </button>
      </div>
    </div>
  </nav>
);
};

export default Navigation;

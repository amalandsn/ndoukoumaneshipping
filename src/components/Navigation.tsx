
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, FileText } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';

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
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.webp"
              alt="Ndoukoumane Shipping & Services"
              className="h-12 w-auto sm:h-14 object-contain"
            />
            <div>
              <div className="text-xl font-bold text-blue-900 font-serif">
                Ndoukoumane Shipping & Services
              </div>
              <div className="text-xs text-gray-600">
                {language === 'fr' ? 'Services Maritimes' : 'Maritime Services'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {items.map((item) => {
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium transition-colors duration-200 relative group border-b-2 pb-1 ${
                    isActive
                      ? 'text-blue-900 border-orange-500'
                      : 'text-gray-700 border-transparent hover:text-blue-900'
                  }`}
                >
                  {item.label}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                  )}
                </Link>
              );
            })}
            
            <LanguageSwitcher />
            
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleQuoteClick}>
              <FileText className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Demande de devis' : 'Quote request'}
            </Button>
            
            <Button className="bg-blue-900 hover:bg-blue-800 text-white" onClick={handleCallClick}>
              <Phone className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Appelez 24/7' : 'Call Us 24/7'}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src="/logo.webp"
                        alt="Ndoukoumane"
                        className="h-6 w-auto"
                      />
                      <span className="font-bold text-blue-900">Ndoukoumane</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {items.map((item) => {
                    const isActive = isActiveLink(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`text-lg font-medium py-2 border-b border-gray-100 transition-colors ${
                          isActive
                            ? 'text-blue-900 border-orange-500'
                            : 'text-gray-700 hover:text-blue-900'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white mt-6" 
                    onClick={() => {
                      handleQuoteClick();
                      setIsOpen(false);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Demande de devis' : 'Quote request'}
                  </Button>
                  
                  <Button className="bg-blue-900 hover:bg-blue-800 text-white" onClick={handleCallClick}>
                    <Phone className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Appelez 24/7' : 'Call Us 24/7'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, FileText, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    language
  } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const navigationItems = {
    fr: [{
      label: 'Accueil',
      href: '/'
    }, {
      label: 'À propos',
      href: '/about'
    }, {
      label: 'Nos Prestations',
      href: '#',
      submenu: [{
        label: 'Services',
        href: '/services'
      }, {
        label: 'Activités',
        href: '/activites'
      }, {
        label: 'Nos entrepôts',
        href: '/entrepots'
      }]
    }, {
      label: 'Références',
      href: '/references'
    }, {
      label: 'Actualités',
      href: '/actualites'
    }, {
      label: 'Carrières',
      href: '/careers'
    }, {
      label: 'Contact',
      href: '/contact'
    }],
    en: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'About',
      href: '/about'
    }, {
      label: 'Our Services',
      href: '#',
      submenu: [{
        label: 'Services',
        href: '/services'
      }, {
        label: 'Activities',
        href: '/activites'
      }, {
        label: 'Our warehouses',
        href: '/entrepots'
      }]
    }, {
      label: 'References',
      href: '/references'
    }, {
      label: 'News',
      href: '/actualites'
    }, {
      label: 'Careers',
      href: '/careers'
    }, {
      label: 'Contact',
      href: '/contact'
    }]
  };
  const items = navigationItems[language];
  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };
  const isActiveSubmenu = (submenu: any[]) => {
    return submenu.some(item => location.pathname === item.href);
  };
  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };
  return <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 mx-0">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6 flex-shrink-0">
            <img src="/logo.webp" alt="Ndoukouman Shipping & Services" className="h-28 w-auto object-contain" />
            <div className="min-w-0 ml-2">
              <div className="text-xl font-bold font-serif leading-tight" style={{
              color: '#0553A5'
            }}>
                <div>Ndoukouman</div>
                <div>Shipping & Services</div>
              </div>
              <div className="text-sm" style={{
              color: '#0553A5'
            }}>
                {language === 'fr' ? 'Services Maritimes' : 'Maritime Services'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center ml-6">
            {items.map(item => {
            if (item.submenu) {
              const isActive = isActiveSubmenu(item.submenu);
              return <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className={`font-medium transition-colors duration-200 relative group border-b-2 pb-1 text-sm flex items-center gap-1 ${isActive ? 'border-blue-600' : 'border-transparent'}`} style={{
                  color: '#0553A5'
                }}>
                      {item.label}
                      <ChevronDown className="h-4 w-4" style={{
                    color: '#0553A5'
                  }} />
                      {!isActive && <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{
                    backgroundColor: '#0553A5'
                  }}></span>}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-lg border rounded-md p-1 z-50">
                      {item.submenu.map(subItem => <DropdownMenuItem key={subItem.href} asChild>
                          <Link to={subItem.href} className="block px-4 py-2 text-sm hover:bg-muted rounded-sm cursor-pointer" style={{
                      color: '#0553A5'
                    }}>
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>)}
                    </DropdownMenuContent>
                  </DropdownMenu>;
            }
            const isActive = isActiveLink(item.href);
            return <Link key={item.href} to={item.href} className={`font-medium transition-colors duration-200 relative group border-b-2 pb-1 text-sm ${isActive ? 'border-blue-600' : 'border-transparent'}`} style={{
              color: '#0553A5'
            }}>
                  {item.label}
                  {!isActive && <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{
                backgroundColor: '#0553A5'
              }}></span>}
                </Link>;
          })}
          </div>
          
          {/* Right side - Language Switcher and Quote Button for desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <LanguageSwitcher />
            <Button className="text-white text-sm" style={{
            backgroundColor: '#0553A5'
          }} onClick={handleQuoteClick}>
              <FileText className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" style={{
                  color: '#0553A5'
                }} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img src="/logo.webp" alt="Ndoukouman" className="h-12 w-auto" />
                      <span className="font-bold" style={{
                      color: '#0553A5'
                    }}>Ndoukouman</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" style={{
                      color: '#0553A5'
                    }} />
                    </Button>
                  </div>
                  
                  {/* Mobile menu items with space-y-4 for 1rem gap */}
                  <div className="space-y-4">
                    {items.map(item => {
                    if (item.submenu) {
                      const isActive = isActiveSubmenu(item.submenu);
                      return <div key={item.label}>
                            <div className={`text-lg font-medium py-2 border-b border-border ${isActive ? 'border-blue-600' : ''}`} style={{
                          color: '#0553A5'
                        }}>
                              {item.label}
                            </div>
                            <div className="ml-4 space-y-2 mt-2">
                              {item.submenu.map(subItem => {
                            const isSubActive = isActiveLink(subItem.href);
                            return <Link key={subItem.href} to={subItem.href} className={`block text-base py-1 transition-colors ${isSubActive ? 'font-medium' : 'opacity-80'}`} style={{
                              color: '#0553A5'
                            }} onClick={() => setIsOpen(false)}>
                                    {subItem.label}
                                  </Link>;
                          })}
                            </div>
                          </div>;
                    }
                    const isActive = isActiveLink(item.href);
                    return <Link key={item.href} to={item.href} className={`text-lg font-medium py-2 border-b border-border transition-colors ${isActive ? 'border-blue-600' : ''}`} style={{
                      color: '#0553A5'
                    }} onClick={() => setIsOpen(false)}>
                          {item.label}
                        </Link>;
                  })}
                  </div>
                  
                  <Button className="text-white mt-6" style={{
                  backgroundColor: '#0553A5'
                }} onClick={() => {
                  handleQuoteClick();
                  setIsOpen(false);
                }}>
                    <FileText className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Demande de devis' : 'Quote request'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;
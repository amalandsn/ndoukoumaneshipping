
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';
import ServicesLinks from './footer/ServicesLinks';
import QuickLinks from './footer/QuickLinks';
import ContactInfo from './footer/ContactInfo';

const Footer = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const footerContent = {
    fr: {
      company: {
        description: "plusieurs années d'expérience dans la consignation et manutention transit avec solution logistique.",
        address: "Central Park ex 4 c Avenue Malick Sy Bureau 3008 Dakar",
        phone: "+221 33 822 29 80",
        urgent: "+221 77 644 96 42",
        email: "contact@ndoukoumaneshipping.com"
      },
      services: {
        title: "Nos Services",
        items: [
          "Fret Maritime & Routier",
          "Fret Aérien (Agent IATA)", 
          "Transit & Douane",
          "Entrepôts & Stockage"
        ]
      },
      quickLinks: {
        title: "Liens Rapides",
        items: [
          { label: "À propos", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Contact", href: "/contact" },
          { label: "Mentions légales", href: "/legal" }
        ]
      },
      contact: {
        title: "Contact",
        hours: "Lun–Ven : 8h–18h\nSam–Dim : 8h–12h",
        office: "Bureau",
        urgent: "Urgence 24/7"
      },
      copyright: "© 2024 Ndoukouman Shipping & Services. Tous droits réservés."
    },
    en: {
      company: {
        description: "several years of experience in consignment and handling transit with logistics solutions.",
        address: "Central Park ex 4 c Avenue Malick Sy Bureau 3008 Dakar",
        phone: "+221 33 822 29 80",
        urgent: "+221 77 644 96 42",
        email: "contact@ndoukoumaneshipping.com"
      },
      services: {
        title: "Our Services",
        items: [
          "Sea & Road Freight",
          "Air Freight (IATA Agent)",
          "Customs Brokerage & Transit", 
          "Warehousing"
        ]
      },
      quickLinks: {
        title: "Quick Links",
        items: [
          { label: "About", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Contact", href: "/contact" },
          { label: "Legal", href: "/legal" }
        ]
      },
      contact: {
        title: "Contact",
        hours: "Mon–Fri: 8h–18h\nSat–Sun: 8h–12h",
        office: "Office",
        urgent: "24/7 Emergency"
      },
      copyright: "© 2024 Ndoukouman Shipping & Services. All rights reserved."
    }
  };

  const content = footerContent[language];

  const handleLinkClick = (href: string) => {
    // Si on est déjà sur la page, forcer le scroll vers le haut
    if (window.location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };

  return (
    <footer className="bg-blue-deep text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Section - Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src="/logof.webp"
                alt="Ndoukouman Shipping & Services"
                className="h-16 w-auto mb-4"
              />
              <div className="text-xl font-bold font-serif leading-tight text-white mb-2">
                Ndoukouman Shipping & Services
              </div>
              <div className="text-white text-sm mb-4">
                {language === 'fr' ? 'Services Maritimes' : 'Maritime Services'}
              </div>
              <p className="text-white leading-relaxed text-sm">
                {content.company.description}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm leading-relaxed">
                  {content.company.address}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <div className="text-white text-sm leading-relaxed">
                  <div className="mb-1">{content.contact.office}: {content.company.phone}</div>
                  <div className="text-white">{content.contact.urgent}: {content.company.urgent}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <span className="text-white text-sm">
                  {content.company.email}
                </span>
              </div>
            </div>
          </div>

          {/* Services Section with Button */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">
              {content.services.title}
            </h3>
            <ul className="space-y-3">
              {content.services.items.map((service, index) => (
                <li key={index} className="text-white/80 hover:text-white transition-colors text-sm">
                  {service}
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <Button 
                className="bg-white text-blue-deep hover:bg-white/90 w-full text-sm"
                onClick={handleQuoteClick}
              >
                {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <QuickLinks content={content} onLinkClick={handleLinkClick} />
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <ContactInfo content={content} language={language} />
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/80 text-sm">
            {content.copyright}
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link 
              to="/legal#politique-confidentialite" 
              className="text-white/80 hover:text-white/80 hover:underline transition-all duration-200"
              onClick={() => handleLinkClick('/legal')}
            >
              {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </Link>
            <Link 
              to="/legal#conditions-utilisation" 
              className="text-white/80 hover:text-white/80 hover:underline transition-all duration-200"
              onClick={() => handleLinkClick('/legal')}
            >
              {language === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

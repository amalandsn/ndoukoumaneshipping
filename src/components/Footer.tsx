import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/hooks/useLanguage';
import CompanyInfo from './footer/CompanyInfo';
import ServicesLinks from './footer/ServicesLinks';
import QuickLinks from './footer/QuickLinks';
import ContactInfo from './footer/ContactInfo';

const Footer = () => {
  const { language } = useLanguage();

  const footerContent = {
    fr: {
      company: {
        description: "6 ans d'expérience dans la consignation et manutention transit avec solution logistique.",
        address: "Central Park, face Brigade Nationale des Sapeurs-Pompiers, Dakar",
        phone: "+221 33 822 29 80",
        urgent: "+221 77 402 18 25",
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
      copyright: "© 2024 Ndoukoumane Shipping & Services. Tous droits réservés."
    },
    en: {
      company: {
        description: "6 years of experience in consignment and handling transit with logistics solutions.",
        address: "Central Park, opposite the National Fire Brigade HQ, Dakar",
        phone: "+221 33 822 29 80",
        urgent: "+221 77 402 18 25",
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
      copyright: "© 2024 Ndoukoumane Shipping & Services. All rights reserved."
    }
  };

  const content = footerContent[language];

  const handleLinkClick = (href: string) => {
    // Si on est déjà sur la page, forcer le scroll vers le haut
    if (window.location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CompanyInfo content={content} />
          <ServicesLinks content={content} onLinkClick={handleLinkClick} />
          <QuickLinks content={content} onLinkClick={handleLinkClick} />
          <ContactInfo content={content} language={language} />
        </div>
      </div>

      <Separator className="bg-blue-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-blue-300 text-sm">
            {content.copyright}
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link 
              to="/legal#politique-confidentialite" 
              className="text-blue-300 hover:text-white transition-colors"
              onClick={() => handleLinkClick('/legal')}
            >
              {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </Link>
            <Link 
              to="/legal#conditions-utilisation" 
              className="text-blue-300 hover:text-white transition-colors"
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

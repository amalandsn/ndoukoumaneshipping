import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Ship, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Linkedin,
  Twitter
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const { language } = useLanguage();

  const footerContent = {
    fr: {
      company: {
        description: "Leader en services maritimes au Sénégal avec plus de 20 ans d'expérience dans la consignation, manutention et transit douanier.",
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
        hours: "Lun-Ven: 8h00-18h00\nSam: 8h00-12h00",
        office: "Bureau",
        urgent: "Urgence 24/7"
      },
      copyright: "© 2024 Ndoukoumane Shipping & Services. Tous droits réservés."
    },
    en: {
      company: {
        description: "Leading maritime services in Senegal with over 20 years of experience in consignment, handling and customs transit.",
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
        hours: "Mon-Fri: 8:00-18:00\nSat: 8:00-12:00",
        office: "Office",
        urgent: "24/7 Emergency"
      },
      copyright: "© 2024 Ndoukoumane Shipping & Services. All rights reserved."
    }
  };

  const content = footerContent[language];

  return (
    <footer className="bg-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Ship className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold font-serif">
                  Ndoukoumane Shipping & Services
                </div>
                <div className="text-blue-300 text-sm">
                  {language === 'fr' ? 'Services Maritimes' : 'Maritime Services'}
                </div>
              </div>
            </div>
            
            <p className="text-blue-200 mb-6 leading-relaxed">
              {content.company.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200 text-sm">
                  {content.company.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <div className="text-blue-200 text-sm">
                  <div>{content.contact.office}: {content.company.phone}</div>
                  <div className="text-orange-300">{content.contact.urgent}: {content.company.urgent}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">
                  {content.company.email}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">
              {content.services.title}
            </h3>
            <ul className="space-y-3">
              {content.services.items.map((service, index) => (
                <li key={index}>
                  <Link 
                    to="/services" 
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">
              {content.quickLinks.title}
            </h3>
            <ul className="space-y-3">
              {content.quickLinks.items.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">
              {content.contact.title}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-200 text-sm whitespace-pre-line">
                  {content.contact.hours}
                </div>
              </div>
              
              <div>
                <p className="text-blue-200 text-sm mb-4">
                  {language === 'fr' ? 'Suivez-nous' : 'Follow us'}
                </p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="p-2 text-blue-200 hover:text-white hover:bg-blue-800">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-blue-200 hover:text-white hover:bg-blue-800">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-blue-200 hover:text-white hover:bg-blue-800">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
            <Link to="/legal" className="text-blue-300 hover:text-white transition-colors">
              {language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </Link>
            <Link to="/legal" className="text-blue-300 hover:text-white transition-colors">
              {language === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

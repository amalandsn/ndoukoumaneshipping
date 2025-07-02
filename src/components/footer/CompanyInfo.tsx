
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';
import { useLanguage } from '@/hooks/useLanguage';

interface CompanyInfoProps {
  content: {
    company: {
      description: string;
      address: string;
      phone: string;
      urgent: string;
      email: string;
    };
    contact: {
      office: string;
      urgent: string;
    };
  };
}

const CompanyInfo = ({ content }: CompanyInfoProps) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };

  return (
    <div className="lg:col-span-1">
      <div className="flex items-center space-x-3 mb-6">
        <img 
          src="/logof.webp"
          alt="Ndoukoumane Shipping & Services"
          className="h-16 w-auto"
        />
        <div className="flex-1">
          <div className="text-xl font-bold font-serif leading-tight">
            Ndoukoumane Shipping & Services
          </div>
          <div className="text-blue-300 text-sm mt-1">
            {language === 'fr' ? 'Services Maritimes' : 'Maritime Services'}
          </div>
        </div>
      </div>
      
      <p className="text-blue-200 mb-6 leading-relaxed">
        {content.company.description}
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
          <span className="text-blue-200 text-sm leading-relaxed">
            {content.company.address}
          </span>
        </div>
        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
          <div className="text-blue-200 text-sm leading-relaxed">
            <div className="mb-1">{content.contact.office}: {content.company.phone}</div>
            <div className="text-blue-100">{content.contact.urgent}: {content.company.urgent}</div>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
          <span className="text-blue-200 text-sm">
            {content.company.email}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          className="bg-white text-blue-deep hover:bg-white/90 w-full"
          onClick={handleQuoteClick}
        >
          {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
        </Button>
      </div>
    </div>
  );
};

export default CompanyInfo;

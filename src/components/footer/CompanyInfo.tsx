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
      <div className="flex items-start gap-8 mb-6">
        <img 
          src="/logof.webp"
          alt="Ndoukoumane Shipping & Services"
          className="h-28 w-auto flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-xl font-bold font-serif leading-tight text-white">
            <div>Ndoukoumane</div>
            <div>Shipping & Services</div>
          </div>
          <div className="text-white text-sm mt-1">
            {language === 'fr' ? 'Services Maritimes' : 'Maritime Services'}
          </div>
        </div>
      </div>
      
      <p className="text-white mb-6 leading-relaxed text-sm">
        {content.company.description}
      </p>
      
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

      <div className="mt-6">
        <Button 
          className="bg-white text-blue-deep hover:bg-white/90 w-full text-sm"
          onClick={handleQuoteClick}
        >
          {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
        </Button>
      </div>
    </div>
  );
};

export default CompanyInfo;

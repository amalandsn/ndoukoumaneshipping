
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
      <div className="flex items-start space-x-3 mb-6">
        <div className="flex-shrink-0 w-12 h-12">
          <img 
            src="/lovable-uploads/66d42876-b91f-404d-8969-4c661b04326f.png" 
            alt="Ndoukoumane Groupe" 
            className="w-full h-full object-contain"
            onError={(e) => {
              console.log('Footer logo failed to load');
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => console.log('Footer logo loaded successfully')}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-lg font-bold font-serif text-white break-words">
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
          <span className="text-blue-200 text-sm break-words">
            {content.company.address}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
          <div className="text-blue-200 text-sm min-w-0">
            <div className="break-words">{content.contact.office}: {content.company.phone}</div>
            <div className="text-orange-300 break-words">{content.contact.urgent}: {content.company.urgent}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
          <span className="text-blue-200 text-sm break-words">
            {content.company.email}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white w-full"
          onClick={handleQuoteClick}
        >
          {language === 'fr' ? 'Demander un devis' : 'Request a quote'}
        </Button>
      </div>
    </div>
  );
};

export default CompanyInfo;

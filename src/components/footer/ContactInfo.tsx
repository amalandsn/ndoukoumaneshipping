
import React from 'react';
import { Clock } from 'lucide-react';
import SocialLinks from './SocialLinks';

interface ContactInfoProps {
  content: {
    contact: {
      title: string;
      hours: string;
    };
  };
  language: 'fr' | 'en';
}

const ContactInfo = ({ content, language }: ContactInfoProps) => {
  return (
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
        
        <SocialLinks 
          followText={language === 'fr' ? 'Suivez-nous' : 'Follow us'}
        />
      </div>
    </div>
  );
};

export default ContactInfo;

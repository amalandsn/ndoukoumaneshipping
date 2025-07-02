
import React from 'react';
import { Link } from 'react-router-dom';

interface ServicesLinksProps {
  content: {
    services: {
      title: string;
      items: string[];
    };
  };
  onLinkClick: (href: string) => void;
}

const ServicesLinks = ({ content, onLinkClick }: ServicesLinksProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6 text-blue-300">
        {content.services.title}
      </h3>
      <ul className="space-y-3">
        {content.services.items.map((service, index) => (
          <li key={index}>
            <Link 
              to="/services" 
              className="text-blue-200 hover:text-white transition-colors text-sm"
              onClick={() => onLinkClick('/services')}
            >
              {service}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesLinks;

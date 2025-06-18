
import React from 'react';
import { Link } from 'react-router-dom';

interface QuickLinksProps {
  content: {
    quickLinks: {
      title: string;
      items: { label: string; href: string }[];
    };
  };
  onLinkClick: (href: string) => void;
}

const QuickLinks = ({ content, onLinkClick }: QuickLinksProps) => {
  return (
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
              onClick={() => onLinkClick(link.href)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;


import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { ServiceData } from '@/data/services';

interface ServiceCardProps extends ServiceData {}

const ServiceCard: React.FC<ServiceCardProps> = ({
  img,
  icon: Icon,
  titleFr,
  titleEn,
  bulletsFr,
  bulletsEn
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();

  const title = language === 'fr' ? titleFr : titleEn;
  const bullets = language === 'fr' ? bulletsFr : bulletsEn;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300 bg-white group cursor-pointer"
    >
      {/* Image with overlay */}
      <div className="relative h-48">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-4 left-4">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Title section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {language === 'fr' ? titleEn : titleFr}
        </p>
      </div>

      {/* Hover bullets overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-white p-6 transition-all duration-300 ease-in-out ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
        style={{ 
          boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <div className="space-y-2">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;


import React from 'react';
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
  const { language } = useLanguage();

  return (
    <div className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Hero - optimized smaller image */}
      <div className="relative">
        <img
          src={img}
          alt={titleFr}
          className="h-28 md:h-36 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20" />
        <div className="absolute top-2 left-2 text-white text-lg md:text-xl">
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">
            {language === 'en' ? titleEn : titleFr}
          </h3>
        </div>

        <ul className="list-disc list-inside marker:text-orange-500 space-y-1 text-sm leading-relaxed text-gray-700">
          {language === 'en' 
            ? bulletsEn.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))
            : bulletsFr.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))
          }
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;

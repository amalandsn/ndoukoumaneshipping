
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
      {/* Hero */}
      <div className="relative">
        <img src={img} alt={titleFr} className="h-40 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20" />
        <div className="absolute top-3 left-3 text-white text-xl">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">{titleFr}</h3>
          <p className="text-sm text-gray-500">{titleEn}</p>
        </div>

        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed text-gray-700">
          {bulletsFr.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
        
        <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed text-gray-400 mt-2">
          {bulletsEn.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;

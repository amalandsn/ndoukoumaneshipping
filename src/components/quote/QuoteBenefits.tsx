import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Briefcase, DollarSign } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const QuoteBenefits = () => {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: Clock,
      titleFr: '24 h réponse',
      titleEn: '24 h reply',
      descriptionFr: 'Engagement de réponse sous 24 heures',
      descriptionEn: 'Commitment to respond within 24 hours'
    },
    {
      icon: Briefcase,
      titleFr: 'Expertise portuaire CEDEAO',
      titleEn: 'Port expertise ECOWAS',
      descriptionFr: 'Connaissance approfondie des ports ouest-africains',
      descriptionEn: 'Deep knowledge of West African ports'
    },
    {
      icon: DollarSign,
      titleFr: 'Optimisation des coûts',
      titleEn: 'Cost optimisation',
      descriptionFr: 'Tarifs compétitifs et solutions sur mesure',
      descriptionEn: 'Competitive rates and tailored solutions'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-2xl h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-serif">
          {language === 'fr' ? 'Pourquoi nous choisir ?' : 'Why choose us?'}
        </h2>
      </motion.div>

      <div className="grid gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <benefit.icon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? benefit.titleFr : benefit.titleEn}
            </h3>
            <p className="text-gray-600">
              {language === 'fr' ? benefit.descriptionFr : benefit.descriptionEn}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuoteBenefits;

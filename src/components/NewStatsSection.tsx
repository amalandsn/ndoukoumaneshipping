
import React from 'react';
import { motion } from 'framer-motion';
import StatsCounter from '@/components/StatsCounter';
import { useLanguage } from '@/hooks/useLanguage';

const NewStatsSection = () => {
  const { language } = useLanguage();

  const statsContent = {
    fr: {
      title: "Notre Excellence en Chiffres",
      stats: [
        { label: "Chiffre d'affaires", number: 10000000000, suffix: " FCFA+", display: "10 Md FCFA+" },
        { label: "Investissement initial", number: 4000000000, suffix: " FCFA", display: "4 Md FCFA" },
        { label: "Part de marché SN", number: 4.5, suffix: "%", display: "4.5%" },
        { label: "Service commercial", number: 24, suffix: "/7", display: "24/7" }
      ]
    },
    en: {
      title: "Our Excellence in Numbers",
      stats: [
        { label: "Revenue", number: 10000000000, suffix: " FCFA+", display: "10 Bn FCFA+" },
        { label: "Initial Investment", number: 4000000000, suffix: " FCFA", display: "4 Bn FCFA" },
        { label: "Market Share SN", number: 4.5, suffix: "%", display: "4.5%" },
        { label: "Commercial Desk", number: 24, suffix: "/7", display: "24/7" }
      ]
    }
  };

  const content = language === 'fr'
    ? statsContent.fr
    : statsContent.en;

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif text-white">
            {content.title}
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl lg:text-4xl font-bold text-orange-500 mb-2">
                {stat.display}
              </div>
              <div className="text-blue-900 text-sm lg:text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewStatsSection;


import React from 'react';
import { motion } from 'framer-motion';
import StatsCounter from '@/components/StatsCounter';
import { useLanguage } from '@/hooks/useLanguage';

const statsContent = {
  fr: {
    title: "Notre Excellence en Chiffres",
    stats: [
      { label: "Années d'expérience", number: 6, prefix: "+", suffix: "" },
      { label: "TEUs par an", number: 150000, prefix: "+", suffix: "" },
      { label: "Employés qualifiés", number: 85, prefix: "", suffix: "" },
      { label: "Ports desservis", number: 12, prefix: "", suffix: "" }
    ]
  },
  en: {
    title: "Our Excellence in Numbers",
    stats: [
      { label: "Years of experience", number: 6, prefix: "+", suffix: "" },
      { label: "TEUs per year", number: 150000, prefix: "+", suffix: "" },
      { label: "Qualified employees", number: 85, prefix: "", suffix: "" },
      { label: "Ports served", number: 12, prefix: "", suffix: "" }
    ]
  }
};

const StatsSection = () => {
  const { language } = useLanguage();
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
            >
              <StatsCounter
                label={stat.label}
                targetNumber={stat.number}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;


import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const ServicesSection = () => {
  const { language } = useLanguage();

  const services = [
    {
      img: "/hero-consignation.webp",
      title: language === 'fr' ? "Consignation Maritime" : "Maritime Consignment",
      desc: language === 'fr'
        ? "Représentation complète de vos navires avec suivi en temps réel des escales et formalités portuaires."
        : "Complete vessel representation with real-time call & port formalities tracking."
    },
    {
      img: "/hero-manutention.webp",
      title: language === 'fr' ? "Manutention Portuaire" : "Port Handling",
      desc: language === 'fr'
        ? "Opérations de chargement / déchargement optimisés avec équipements modernes et équipes expérimentées."
        : "Optimized loading/unloading operations with advanced equipment and teams."
    },
    {
      img: "/hero-transit.webp",
      title: language === 'fr' ? "Transit Douanier" : "Customs Transit",
      desc: language === 'fr'
        ? "Dédouanement accéléré et suivi réglementaire complet de vos marchandises."
        : "Accelerated customs clearance and full regulatory tracking of your cargo."
    },
    {
      img: "/hero-conseil.webp",
      title: language === 'fr' ? "Conseil Maritime" : "Maritime Advisory",
      desc: language === 'fr'
        ? "Expertise stratégique et accompagnement pour optimiser vos opérations."
        : "Strategic expertise and support to optimize your operations."
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
            {language === 'fr' ? "Nos Services" : "Our Services"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? "Solutions complètes pour vos opérations maritimes"
              : "Complete solutions for your maritime operations"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="rounded-xl shadow-lg hover:scale-[1.02] transition bg-white overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002A5Ccc] via-transparent rounded-t-xl" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-[#002A5C]">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

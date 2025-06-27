
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Import, Waves, Factory } from 'lucide-react';

const ActivitiesSection = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Nos Activités",
      subtitle: "Trois secteurs clés au cœur de notre expertise maritime",
      activities: [
        {
          title: "Import/Export",
          icon: Import,
          text: "Nous facilitons vos opérations d'import/export avec une expertise complète en consignation maritime, manutention portuaire et transit douanier. Notre équipe expérimentée assure un suivi rigoureux de vos marchandises du port d'origine jusqu'à leur destination finale, optimisant les délais et minimisant les coûts logistiques pour une satisfaction client maximale.",
          image: "/hero-consignation.webp"
        },
        {
          title: "Offshore & Énergie",
          icon: Waves,
          text: "Spécialisés dans le support logistique des projets offshore et énergétiques au Sénégal. Nous offrons des services de consignation pour navires spécialisés, manutention d'équipements lourds et coordination des opérations complexes. Notre expertise couvre les secteurs pétrolier, gazier et des énergies renouvelables marines avec un accompagnement technique de premier plan.",
          image: "/hero-amarre.webp"
        },
        {
          title: "Projets Industriels",
          icon: Factory,
          text: "Accompagnement complet pour vos projets industriels nécessitant des solutions logistiques sur-mesure. De la réception d'équipements industriels lourds à leur acheminement vers les sites de production, nous coordonnons chaque étape avec précision. Notre réseau de partenaires garantit une exécution sans faille et le respect des délais les plus stricts.",
          image: "/hero-manutention.webp"
        }
      ]
    },
    en: {
      title: "Our Activities",
      subtitle: "Three key sectors at the heart of our maritime expertise",
      activities: [
        {
          title: "Import/Export",
          icon: Import,
          text: "We facilitate your import/export operations with comprehensive expertise in maritime consignment, port handling and customs transit. Our experienced team ensures rigorous tracking of your goods from origin port to final destination, optimizing delivery times and minimizing logistics costs for maximum client satisfaction.",
          image: "/hero-consignation.webp"
        },
        {
          title: "Offshore & Energy",
          icon: Waves,
          text: "Specialized in logistics support for offshore and energy projects in Senegal. We offer consignment services for specialized vessels, heavy equipment handling and coordination of complex operations. Our expertise covers oil, gas and marine renewable energy sectors with first-class technical support.",
          image: "/hero-amarre.webp"
        },
        {
          title: "Industrial Projects",
          icon: Factory,
          text: "Complete support for your industrial projects requiring tailor-made logistics solutions. From receiving heavy industrial equipment to transporting it to production sites, we coordinate each step with precision. Our partner network guarantees flawless execution and adherence to the strictest deadlines.",
          image: "/hero-manutention.webp"
        }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
            {currentContent.title}
          </h2>
          <p className="text-xl text-gray-600">
            {currentContent.subtitle}
          </p>
        </motion.div>

        <div className="space-y-16">
          {currentContent.activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <activity.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 font-serif">
                    {activity.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {activity.text}
                </p>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;

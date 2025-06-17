
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Building2, Target, TrendingUp, MapPin, Eye } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Ndoukouman Shipping Services : Intelligence maritime au service de l'Afrique",
      mission: {
        title: "Notre Mission",
        bullets: [
          "Solutions logistiques 360° – maritime, aérien, routier",
          "Ponctualité & traçabilité en temps réel",
          "Excellence opérationnelle et qualité certifiée"
        ]
      },
      vision: {
        title: "Notre Vision",
        bullets: [
          "Hub maritime multi-modal de l'Afrique de l'Ouest",
          "20% de part de marché nationale d'ici 2028",
          "Innovation & développement durable"
        ]
      },
      location: {
        title: "Notre Localisation",
        bullets: [
          "Central Park, face Brigade Nationale des Sapeurs-Pompiers",
          "2 ha de terre-plein stratégique – Dakar",
          "Connexion Autoroute Dakar-Bamako & Port de Ndayane"
        ]
      },
      credo: {
        title: "Notre Credo",
        values: [
          "Professionnalisme",
          "Innovation",
          "Conformité aux normes"
        ]
      },
      keyNumbers: "Chiffres Clés"
    },
    en: {
      title: "Ndoukouman Shipping Services: Maritime Intelligence Serving Africa",
      mission: {
        title: "Our Mission",
        bullets: [
          "360° logistics – sea, air & road",
          "On-time delivery & real-time tracking",
          "Operational excellence & certified quality"
        ]
      },
      vision: {
        title: "Our Vision",
        bullets: [
          "West Africa's leading multi-modal hub",
          "20% national market share by 2028",
          "Innovation & sustainable growth"
        ]
      },
      location: {
        title: "Our Location",
        bullets: [
          "Central Park, opposite National Fire Brigade HQ",
          "2-ha strategic platform – Dakar",
          "Direct link to Dakar-Bamako highway & Ndayane port"
        ]
      },
      credo: {
        title: "Our Credo",
        values: [
          "Professionalism",
          "Innovation",
          "Standards Compliance"
        ]
      },
      keyNumbers: "Key Numbers"
    }
  };

  const keyMetrics = [
    {
      icon: TrendingUp,
      value: "10 000 000 000 FCFA+",
      label_fr: "Chiffre d'affaires",
      label_en: "Revenue"
    },
    {
      icon: Building2,
      value: "4 000 000 000 FCFA",
      label_fr: "Investissement initial",
      label_en: "Initial Investment"
    },
    {
      icon: Target,
      value: "4.5%",
      label_fr: "Part de marché SN",
      label_en: "Market Share SN"
    },
    {
      icon: MapPin,
      value: "2018",
      label_fr: "Année de création",
      label_en: "Founded"
    }
  ];

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight">
              {currentContent.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Key Numbers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
              {currentContent.keyNumbers}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <metric.icon className="h-12 w-12 text-orange-500 mx-auto" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {language === 'fr' ? metric.label_fr : metric.label_en}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Location Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            
            {/* Mission Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <Target className="text-orange-500 text-2xl h-6 w-6" />
                <h3 className="text-lg font-semibold text-blue-900">{currentContent.mission.title}</h3>
              </div>
              <ul className="list-disc list-inside leading-relaxed text-sm text-gray-700">
                {currentContent.mission.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
              {language === 'en' && (
                <ul className="list-disc list-inside leading-relaxed text-xs text-gray-400 mt-3">
                  {content.fr.mission.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <Eye className="text-orange-500 text-2xl h-6 w-6" />
                <h3 className="text-lg font-semibold text-blue-900">{currentContent.vision.title}</h3>
              </div>
              <ul className="list-disc list-inside leading-relaxed text-sm text-gray-700">
                {currentContent.vision.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
              {language === 'en' && (
                <ul className="list-disc list-inside leading-relaxed text-xs text-gray-400 mt-3">
                  {content.fr.vision.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Location Card with Map */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1550.6807077226875!2d-17.4455!3d14.6825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQwJzU2LjEiTiAxN8KwMjYnNDMuOCJX!5e0!3m2!1sfr!2ssn!4v1718555555"
                loading="lazy"
                className="w-full h-40 md:h-[180px]"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Ndoukoumane"
              />
              
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500 text-2xl h-6 w-6" />
                  <h3 className="text-lg font-semibold text-blue-900">{currentContent.location.title}</h3>
                </div>
                <ul className="list-disc list-inside leading-relaxed text-sm text-gray-700">
                  {currentContent.location.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
                {language === 'en' && (
                  <ul className="list-disc list-inside leading-relaxed text-xs text-gray-400 mt-3">
                    {content.fr.location.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Credo Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
              {currentContent.credo.title}
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {currentContent.credo.values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-5xl font-extrabold text-orange-500 block mb-4">
                  {index + 1}
                </span>
                <p className="text-lg font-semibold text-blue-900">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

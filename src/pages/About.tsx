
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Building2, Target, TrendingUp, MapPin } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Ndoukouman Shipping Services : Intelligence maritime au service de l'Afrique",
      mission: {
        title: "Notre Mission",
        text: "Ndoukouman Shipping & Services s'est imposé comme un acteur majeur de la logistique au Sénégal depuis sa création en août 2018. Avec un investissement initial de 4 milliards de FCFA, nous avons développé une expertise reconnue dans le transport maritime, aérien et routier, générant aujourd'hui un chiffre d'affaires de plus de 10 milliards de FCFA."
      },
      vision: {
        title: "Notre Vision",
        text: "Nous aspirons à devenir le leader incontournable de la logistique en Afrique de l'Ouest, en portant notre part de marché à 20% au Sénégal et 5,5% dans la zone CEDEAO. Notre projet ambitieux de port sec sur 2 hectares témoigne de notre engagement vers l'excellence opérationnelle."
      },
      location: {
        title: "Notre Localisation Stratégique",
        text: "Basés à Dakar, au cœur de l'Afrique de l'Ouest, nous bénéficions d'une position géographique privilégiée pour servir les corridors commerciaux entre l'Afrique, l'Europe et les Amériques."
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
        text: "Ndoukouman Shipping & Services has established itself as a major logistics player in Senegal since its founding in August 2018. With an initial investment of 4 billion FCFA, we have developed recognized expertise in maritime, air and road transport, now generating revenue of over 10 billion FCFA."
      },
      vision: {
        title: "Our Vision",
        text: "We aspire to become the undisputed leader in West African logistics, growing our market share to 20% in Senegal and 5.5% in the ECOWAS region. Our ambitious 2-hectare dry port project demonstrates our commitment to operational excellence."
      },
      location: {
        title: "Our Strategic Location",
        text: "Based in Dakar, at the heart of West Africa, we benefit from a privileged geographical position to serve trade corridors between Africa, Europe and the Americas."
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

      {/* Content Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-6 font-serif">
                {currentContent.mission.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentContent.mission.text}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-6 font-serif">
                {currentContent.vision.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentContent.vision.text}
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-6 font-serif">
                {currentContent.location.title}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentContent.location.text}
              </p>
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

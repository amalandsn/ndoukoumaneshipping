
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Import, Waves, Factory } from 'lucide-react';

const Activities = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Nos Activités",
      subtitle: "Trois secteurs clés au cœur de notre expertise maritime",
      keyFigures: {
        title: "Chiffres Clés",
        teu: "+150 000 TEU/an",
        calls: "+500 Escales",
        clients: "+85 Clients actifs"
      },
      sectors: [
        {
          title: "Import/Export",
          icon: Import,
          text: "Nous facilitons vos opérations d'import/export avec une expertise complète en consignation maritime, manutention portuaire et transit douanier. Notre équipe expérimentée assure un suivi rigoureux de vos marchandises du port d'origine jusqu'à leur destination finale, optimisant les délais et minimisant les coûts logistiques.",
          image: "/hero-consignation.webp"
        },
        {
          title: "Offshore & Énergie",
          icon: Waves,
          text: "Spécialisés dans le support logistique des projets offshore et énergétiques au Sénégal. Nous offrons des services de consignation pour navires spécialisés, manutention d'équipements lourds et coordination des opérations complexes. Notre expertise couvre les secteurs pétrolier, gazier et des énergies renouvelables marines.",
          image: "/hero-amarre.webp"
        },
        {
          title: "Projets Industriels",
          icon: Factory,
          text: "Accompagnement complet pour vos projets industriels nécessitant des solutions logistiques sur-mesure. De la réception d'équipements industriels lourds à leur acheminement vers les sites de production, nous coordonnons chaque étape avec précision. Notre réseau de partenaires garantit une exécution sans faille.",
          image: "/hero-manutention.webp"
        }
      ]
    },
    en: {
      title: "Our Activities",
      subtitle: "Three key sectors at the heart of our maritime expertise",
      keyFigures: {
        title: "Key Figures",
        teu: "+150,000 TEU/year",
        calls: "+500 Calls",
        clients: "+85 Active clients"
      },
      sectors: [
        {
          title: "Import/Export",
          icon: Import,
          text: "We facilitate your import/export operations with comprehensive expertise in maritime consignment, port handling and customs transit. Our experienced team ensures rigorous tracking of your goods from origin port to final destination, optimizing delivery times and minimizing logistics costs.",
          image: "/hero-consignation.webp"
        },
        {
          title: "Offshore & Energy",
          icon: Waves,
          text: "Specialized in logistics support for offshore and energy projects in Senegal. We offer consignment services for specialized vessels, heavy equipment handling and coordination of complex operations. Our expertise covers oil, gas and marine renewable energy sectors.",
          image: "/hero-amarre.webp"
        },
        {
          title: "Industrial Projects",
          icon: Factory,
          text: "Complete support for your industrial projects requiring tailor-made logistics solutions. From receiving heavy industrial equipment to transporting it to production sites, we coordinate each step with precision. Our partner network guarantees flawless execution.",
          image: "/hero-manutention.webp"
        }
      ]
    }
  };

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
            <p className="text-xl lg:text-2xl text-blue-100 font-medium">
              {currentContent.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {currentContent.sectors.map((sector, index) => (
              <motion.div
                key={sector.title}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <sector.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-900 font-serif">
                      {sector.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {sector.text}
                  </p>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={sector.image} 
                      alt={sector.title}
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

      {/* Key Figures Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">
              {currentContent.keyFigures.title}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {currentContent.keyFigures.teu}
              </div>
              <div className="text-blue-100 font-medium">
                {language === 'fr' ? 'Containers traités' : 'Containers handled'}
              </div>
            </motion.div>
            <motion.div
              className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {currentContent.keyFigures.calls}
              </div>
              <div className="text-blue-100 font-medium">
                {language === 'fr' ? 'Navires traités' : 'Vessels handled'}
              </div>
            </motion.div>
            <motion.div
              className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {currentContent.keyFigures.clients}
              </div>
              <div className="text-blue-100 font-medium">
                {language === 'fr' ? 'Partenaires fidèles' : 'Loyal partners'}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Activities;

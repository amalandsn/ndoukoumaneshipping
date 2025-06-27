
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Warehouse, Anchor, Thermometer, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Warehouses = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Nos Entrepôts",
      subtitle: "Infrastructures modernes au cœur du Port Autonome de Dakar",
      heroTitle: "Installations Portuaires de Pointe",
      heroSubtitle: "Entrepôts stratégiquement situés pour optimiser vos opérations logistiques",
      kpis: [
        {
          title: "Surface Totale",
          value: "50 000 m²",
          icon: Warehouse,
          description: "Espaces de stockage sécurisés"
        },
        {
          title: "Tirant d'Eau",
          value: "12 mètres",
          icon: Anchor,
          description: "Accès direct aux grands navires"
        },
        {
          title: "Zones Contrôlées",
          value: "Température",
          icon: Thermometer,
          description: "Stockage réfrigéré disponible"
        },
        {
          title: "Sécurité",
          value: "24/7",
          icon: Shield,
          description: "Surveillance continue"
        }
      ],
      location: {
        title: "Localisation Stratégique",
        text: "Nos entrepôts sont idéalement situés dans l'enceinte du Port Autonome de Dakar, première infrastructure portuaire de l'Afrique de l'Ouest. Cette position stratégique nous permet d'offrir un accès direct aux navires et une connexion optimale avec les réseaux de transport terrestres. Bénéficiant d'une situation géographique exceptionnelle, nos installations facilitent les échanges commerciaux entre l'Europe, l'Amérique et l'Afrique subsaharienne."
      }
    },
    en: {
      title: "Our Warehouses",
      subtitle: "Modern infrastructure at the heart of Dakar Autonomous Port",
      heroTitle: "State-of-the-Art Port Facilities",
      heroSubtitle: "Warehouses strategically located to optimize your logistics operations",
      kpis: [
        {
          title: "Total Surface",
          value: "50,000 m²",
          icon: Warehouse,
          description: "Secure storage spaces"
        },
        {
          title: "Draft",
          value: "12 meters",
          icon: Anchor,
          description: "Direct access to large vessels"
        },
        {
          title: "Controlled Zones",
          value: "Temperature",
          icon: Thermometer,
          description: "Refrigerated storage available"
        },
        {
          title: "Security",
          value: "24/7",
          icon: Shield,
          description: "Continuous surveillance"
        }
      ],
      location: {
        title: "Strategic Location",
        text: "Our warehouses are ideally located within the Dakar Autonomous Port, the leading port infrastructure in West Africa. This strategic position allows us to offer direct access to vessels and optimal connection with land transport networks. Benefiting from an exceptional geographical location, our facilities facilitate trade between Europe, America and sub-Saharan Africa."
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section with Full-Width Header */}
      <section className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(1, 43, 108, 0.6), rgba(1, 43, 108, 0.6)), url('/transit-douane.webp')`
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight">
              {currentContent.heroTitle}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 font-medium">
              {currentContent.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPI Cards Slider Section */}
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
              {currentContent.title}
            </h2>
            <p className="text-xl text-gray-600">
              {currentContent.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.kpis.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-blue-900/90 to-blue-800/90 text-white border-none shadow-xl backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <kpi.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{kpi.title}</h3>
                    <div className="text-3xl font-bold text-orange-500 mb-3">
                      {kpi.value}
                    </div>
                    <p className="text-blue-100 text-sm">
                      {kpi.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6 font-serif">
                {currentContent.location.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentContent.location.text}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/livraison.webp" 
                  alt={currentContent.location.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
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

export default Warehouses;

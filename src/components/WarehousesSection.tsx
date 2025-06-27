
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Warehouse, Anchor, Thermometer, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WarehousesSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    fr: {
      heroTitle: "Nos entrepôts & infrastructures",
      heroSubtitle: "Surface totale 50 000 m² • Quai 12 m",
      textTitle: "Localisation Stratégique",
      text: "Nos entrepôts sont idéalement situés dans l'enceinte du Port Autonome de Dakar, première infrastructure portuaire de l'Afrique de l'Ouest. Cette position stratégique nous permet d'offrir un accès direct aux navires et une connexion optimale avec les réseaux de transport terrestres. Nos installations comprennent des zones de stockage réfrigérées pour les produits sensibles, des espaces sécurisés avec surveillance 24h/24 et 7j/7, ainsi que des équipements de manutention modernes. Bénéficiant d'une situation géographique exceptionnelle, nos entrepôts facilitent les échanges commerciaux entre l'Europe, l'Amérique et l'Afrique subsaharienne, garantissant efficacité et sécurité pour vos marchandises.",
      button: "Découvrir nos entrepôts",
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
      ]
    },
    en: {
      heroTitle: "Our warehouses & infrastructure",
      heroSubtitle: "Total surface 50,000 m² • 12 m draft",
      textTitle: "Strategic Location",
      text: "Our warehouses are ideally located within the Dakar Autonomous Port, the leading port infrastructure in West Africa. This strategic position allows us to offer direct access to vessels and optimal connection with land transport networks. Our facilities include refrigerated storage areas for sensitive products, secure spaces with 24/7 surveillance, and modern handling equipment. Benefiting from an exceptional geographical location, our warehouses facilitate trade between Europe, America and sub-Saharan Africa, guaranteeing efficiency and security for your goods.",
      button: "Discover our warehouses",
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
      ]
    }
  };

  const currentContent = content[language];

  const handleWarehouseClick = () => {
    navigate('/entrepots');
  };

  return (
    <section className="py-0 bg-white">
      {/* Hero Header */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(rgba(1, 43, 108, 0.6), rgba(1, 43, 108, 0.6)), url('/entrepot1.webp')`
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight">
              {currentContent.heroTitle}
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 font-medium">
              {currentContent.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-blue-900 mb-6 font-serif">
              {currentContent.textTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {currentContent.text}
            </p>
            <Button 
              onClick={handleWarehouseClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              {currentContent.button}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="/entrepot1.webp" 
                alt={currentContent.textTitle}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* KPI Slider */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {currentContent.kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-900/90 to-blue-800/90 text-white border-none shadow-xl backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <kpi.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{kpi.title}</h4>
                  <div className="text-2xl font-bold text-orange-500 mb-2">
                    {kpi.value}
                  </div>
                  <p className="text-blue-100 text-sm">
                    {kpi.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WarehousesSection;


import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Warehouse, Anchor, Thermometer, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const WarehousesSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    fr: {
      heroTitle: "Nos entrepôts & infrastructures",
      heroSubtitle: "Surface totale 9000 m² • Quai 12 m",
      textTitle: "Hub Logistique de Diamniadio",
      text: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Implanté au cœur de la zone industrielle de Diamniadio, notre hub logistique regroupe <strong>5 hangars totalisant plus de 8 700 m²</strong>. Cette surface, extensible à 9 000 m², constitue un atout majeur pour le stockage sous douane, la préparation de commandes et la distribution régionale.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">• Capacités d'entreposage</h4>
              <ul className="ml-4 space-y-1 text-gray-700">
                <li>- Stockage sec et zones contrôlées pour produits sensibles</li>
                <li>- Organisation modulable pour optimiser la préparation de commandes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">• Flotte interne</h4>
              <ul className="ml-4 space-y-1 text-gray-700">
                <li>- 59 camions plateaux pour le vrac conteneurisé</li>
                <li>- 5 bennes pour les agrégats</li>
                <li>- 1 camionnette 10 roues & 1 camionnette grue pour les opérations de levage</li>
                <li>- 1 camionnette citerne pour le vrac liquide</li>
                <li>- 1 camion Volvo pour le transport longue distance</li>
                <li>- 2 camions frigos pour la chaîne du froid</li>
                <li>- 3 chariots élévateurs (deux 4 T et un 10 T) pour un chargement-déchargement rapide</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      connectivity: (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">• Connectivité stratégique</h4>
          <ul className="ml-4 space-y-1 text-gray-700">
            <li>- À moins de 25 minutes du Port autonome de Dakar</li>
            <li>- Proximité immédiate de l'aéroport international Blaise-Diagne</li>
            <li>- Accès direct aux principaux axes autoroutiers (RN1, Dakar-Bamako, etc.)</li>
          </ul>
        </div>
      ),
      conclusion: (
        <p className="text-gray-700 leading-relaxed text-lg">
          Cette combinaison d'un vaste espace de stockage, d'un parc roulant diversifié et d'une excellente connectivité fait de Diamniadio le point névralgique idéal pour vos opérations logistiques au Sénégal et dans toute la sous-région.
        </p>
      ),
      button: "Découvrir nos entrepôts",
      kpis: [
        {
          title: "Surface Totale",
          value: "9000 m²",
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
      heroSubtitle: "Total surface 9,000 m² • 12 m draft",
      textTitle: "Diamniadio Logistics Hub",
      text: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Located at the heart of the Diamniadio industrial zone, our logistics hub combines <strong>5 hangars totaling more than 8,700 m²</strong>. This surface, expandable to 9,000 m², constitutes a major asset for bonded storage, order preparation and regional distribution.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">• Storage capacities</h4>
              <ul className="ml-4 space-y-1 text-gray-700">
                <li>- Dry storage and controlled zones for sensitive products</li>
                <li>- Modular organization to optimize order preparation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">• Internal fleet</h4>
              <ul className="ml-4 space-y-1 text-gray-700">
                <li>- 59 flatbed trucks for containerized bulk</li>
                <li>- 5 dump trucks for aggregates</li>
                <li>- 1 10-wheel truck & 1 crane truck for lifting operations</li>
                <li>- 1 tanker truck for liquid bulk</li>
                <li>- 1 Volvo truck for long-distance transport</li>
                <li>- 2 refrigerated trucks for the cold chain</li>
                <li>- 3 forklifts (two 4 T and one 10 T) for fast loading-unloading</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      connectivity: (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">• Strategic connectivity</h4>
          <ul className="ml-4 space-y-1 text-gray-700">
            <li>- Less than 25 minutes from the Port of Dakar</li>
            <li>- Immediate proximity to Blaise-Diagne International Airport</li>
            <li>- Direct access to major highways (RN1, Dakar-Bamako, etc.)</li>
          </ul>
        </div>
      ),
      conclusion: (
        <p className="text-gray-700 leading-relaxed text-lg">
          This combination of vast storage space, diversified rolling stock and excellent connectivity makes Diamniadio the ideal nerve center for your logistics operations in Senegal and throughout the sub-region.
        </p>
      ),
      button: "Discover our warehouses",
      kpis: [
        {
          title: "Total Surface",
          value: "9,000 m²",
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

  const carouselImages = [
    "/entrepot1.webp",
    "/entrepot2.webp",
    "/entrepot3.webp",
    "/entrepot4.webp",
    "/entrepot5.webp"
  ];

  const handleWarehouseClick = () => {
    navigate('/entrepots');
  };

  return (
    <section className="py-0 bg-white">
      {/* Hero Header */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.6)), url('/entrepot1.webp')`
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
            <p className="text-xl lg:text-2xl text-white/80 font-medium">
              {currentContent.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-primary mb-6 font-serif">
              {currentContent.textTitle}
            </h3>
            <div className="mb-8">
              {currentContent.text}
            </div>
            <Button 
              onClick={handleWarehouseClick}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
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
              <Carousel
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {carouselImages.map((imageSrc, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={imageSrc} 
                        alt={`${currentContent.textTitle} ${index + 1}`}
                        className="w-full h-80 object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            
            {/* Connectivity Section - moved here under carousel */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentContent.connectivity}
              <div className="mt-6">
                {currentContent.conclusion}
              </div>
            </motion.div>
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
              <Card className="h-full bg-gradient-to-br from-primary/90 to-primary/80 text-white border-none shadow-xl backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <kpi.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{kpi.title}</h4>
                  <div className="text-2xl font-bold text-white mb-2">
                    {kpi.value}
                  </div>
                  <p className="text-white/80 text-sm">
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


import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Ship, Plane, Truck, Warehouse, Package, Users, Container } from 'lucide-react';

const Services = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Nos Services",
      subtitle: "Solutions logistiques complètes pour vos opérations commerciales"
    },
    en: {
      title: "Our Services",
      subtitle: "Complete logistics solutions for your commercial operations"
    }
  };

  const services = [
    {
      icon: Ship,
      title_fr: "Fret Maritime & Routier",
      title_en: "Sea & Road Freight",
      description_fr: "Interface avec les compagnies maritimes ; expéditions sécurisées de conteneurs/palettes ; Sénégal–Mali–Maghreb–Amériques ; 10-21 jours.",
      description_en: "Interface with shipping lines; secure container/pallet shipments; Senegal–Mali–Maghreb–Americas; 10-21 days.",
      image: "/hero-consignation.webp"
    },
    {
      icon: Plane,
      title_fr: "Fret Aérien (Agent IATA)",
      title_en: "Air Freight (IATA Agent)",
      description_fr: "Suivi en temps réel ; vols directs ; optimisation des coûts ; « rapidité & confiance ».",
      description_en: "Real-time tracking; direct flights; cost optimisation; 'speed & trust'.",
      image: "/hero-transit.webp"
    },
    {
      icon: Truck,
      title_fr: "Transit & Douane",
      title_en: "Customs Brokerage & Transit",
      description_fr: "Architecte du transport ; gestion des opérations administratives/commerciales ; bureau 24/7.",
      description_en: "Architect of transport; handles admin/commercial ops; 24/7 desk.",
      image: "/hero-manutention.webp"
    },
    {
      icon: Warehouse,
      title_fr: "Entrepôts & Stockage",
      title_en: "Warehousing",
      description_fr: "Espaces flexibles / température contrôlée ; inventaire en temps réel.",
      description_en: "Flexible / temperature-controlled space; real-time inventory.",
      image: "/hero-conseil.webp"
    },
    {
      icon: Package,
      title_fr: "Emballage & Palettisation",
      title_en: "Packaging & Palletising",
      description_fr: "Sur-mesure pour œuvres d'art, marchandises fragiles ; palettisation pour groupage.",
      description_en: "Tailor-made for artworks, fragile goods; palletisation for groupage.",
      image: "/livraison.webp"
    },
    {
      icon: Users,
      title_fr: "Conteneurs de Groupage",
      title_en: "Groupage Containers",
      description_fr: "Expertise SN, MLI, Maghreb, Amériques ; cartons & malles autorisés, sacs/valises refusés.",
      description_en: "Expertise SN, MLI, Maghreb, Americas; cartons & trunks allowed, bags/suitcases refused.",
      image: "/transit-douane.webp"
    },
    {
      icon: Container,
      title_fr: "Conteneurs Individuels",
      title_en: "Full Containers",
      description_fr: "Dry 20' (33 m²) & 40' (60 m²) ; reefer/OT sur demande.",
      description_en: "Dry 20' (33 m²) & 40' (60 m²); reefer/OT on request.",
      image: "/hero-arrivee.webp"
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
            <p className="text-xl lg:text-2xl text-blue-100 font-medium">
              {currentContent.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={language === 'fr' ? service.title_fr : service.title_en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {language === 'fr' ? service.title_fr : service.title_en}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'fr' ? service.description_fr : service.description_en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

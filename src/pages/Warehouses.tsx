
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Warehouse, Anchor, Thermometer, Shield, Star, Truck, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Warehouses = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    fr: {
      title: "Entrepôts logistiques Dakar – Ndoukouman",
      subtitle: "Infrastructures modernes au cœur du Port Autonome de Dakar",
      heroTitle: "Installations Portuaires de Pointe",
      heroSubtitle: "Entrepôts stratégiquement situés à Diamniadio pour optimiser vos opérations logistiques",
      capacities: {
        title: "Nos Capacités",
        subtitle: "Des infrastructures adaptées à tous vos besoins de stockage"
      },
      kpis: [
        {
          title: "Surface Totale",
          value: "9000 m²",
          icon: Warehouse,
          description: "Espaces de stockage sécurisés et modulables"
        },
        {
          title: "Tirant d'Eau",
          value: "12 mètres",
          icon: Anchor,
          description: "Accès direct aux grands navires commerciaux"
        },
        {
          title: "Zones Froides",
          value: "Contrôlées",
          icon: Thermometer,
          description: "Stockage réfrigéré pour produits sensibles"
        },
        {
          title: "Sécurité",
          value: "24/7",
          icon: Shield,
          description: "Surveillance continue et contrôle d'accès"
        }
      ],
      warehouses: {
        title: "Nos entrepôts",
        subtitle: "Diamniadio – 5 hangars",
        items: [
          { name: "Hangar 1", size: "2000 m²" },
          { name: "Hangar 2", size: "2000 m²" },
          { name: "Hangar 3", size: "1900 m²" },
          { name: "Hangar 4", size: "1800 m²" },
          { name: "Hangar 5", size: "1000 m²" }
        ],
        total: "Total : 8700 m² — extensible à 9000 m²"
      },
      logistics: {
        title: "Notre logistique",
        items: [
          "59 camions plateaux",
          "05 bennes",
          "01 camionnette 10 roues",
          "01 camionnette grue",
          "01 camionnette citerne",
          "01 camion Volvo",
          "2 camions frigos",
          "2 chariots élévateurs 4 T",
          "1 chariot élévateur 10 T"
        ]
      },
      gallery: {
        title: "Nos Installations",
        images: [
          {
            src: "/entrepot1.webp",
            caption: "Allées intérieures spacieuses dédiées à la préparation de commandes"
          },
          {
            src: "/entrepot2.webp",
            caption: "Flotte interne de camions plateaux prête pour l'expédition régionale"
          },
          {
            src: "/entrepot3.webp",
            caption: "Stockage sous douane : balles textiles conditionnées et empilées"
          },
          {
            src: "/entrepot4.webp",
            caption: "Façade principale des cinq hangars de Diamniadio"
          },
          {
            src: "/entrepot5.webp",
            caption: "Stockage sous douane : balles textiles conditionnées et empilées"
          }
        ]
      },
      testimonial: {
        quote: "Ndoukouman Shipping offre des solutions de stockage exceptionnelles. Leur professionnalisme et la qualité de leurs infrastructures nous permettent d'optimiser notre chaîne logistique au Sénégal.",
        author: "Directeur Logistique",
        company: "Groupe Commercial International"
      },
      cta: {
        title: "Besoin d'une solution de stockage ?",
        subtitle: "Contactez-nous pour un devis personnalisé adapté à vos besoins",
        button: "Demander un devis stockage"
      },
      location: {
        title: "Localisation Stratégique",
        text: "Nos entrepôts sont idéalement situés dans l'enceinte du Port Autonome de Dakar, première infrastructure portuaire de l'Afrique de l'Ouest. Cette position stratégique nous permet d'offrir un accès direct aux navires et une connexion optimale avec les réseaux de transport terrestres. Bénéficiant d'une situation géographique exceptionnelle, nos installations facilitent les échanges commerciaux entre l'Europe, l'Amérique et l'Afrique subsaharienne."
      }
    },
    en: {
      title: "Dakar Logistics Warehouses – Ndoukouman",
      subtitle: "Modern infrastructure at the heart of Dakar Autonomous Port",
      heroTitle: "State-of-the-Art Port Facilities",
      heroSubtitle: "Warehouses strategically located in Diamniadio to optimize your logistics operations",
      capacities: {
        title: "Our Capabilities",
        subtitle: "Infrastructure adapted to all your storage needs"
      },
      kpis: [
        {
          title: "Total Surface",
          value: "9,000 m²",
          icon: Warehouse,
          description: "Secure and modular storage spaces"
        },
        {
          title: "Draft",
          value: "12 meters",
          icon: Anchor,
          description: "Direct access to large commercial vessels"
        },
        {
          title: "Cold Zones",
          value: "Controlled",
          icon: Thermometer,
          description: "Refrigerated storage for sensitive products"
        },
        {
          title: "Security",
          value: "24/7",
          icon: Shield,
          description: "Continuous surveillance and access control"
        }
      ],
      warehouses: {
        title: "Our warehouses",
        subtitle: "Diamniadio – 5 hangars",
        items: [
          { name: "Hangar 1", size: "2,000 m²" },
          { name: "Hangar 2", size: "2,000 m²" },
          { name: "Hangar 3", size: "1,900 m²" },
          { name: "Hangar 4", size: "1,800 m²" },
          { name: "Hangar 5", size: "1,000 m²" }
        ],
        total: "Total: 8,700 m² — expandable to 9,000 m²"
      },
      logistics: {
        title: "Our logistics",
        items: [
          "59 flatbed trucks",
          "05 dump trucks",
          "01 10-wheel truck",
          "01 crane truck",
          "01 tanker truck",
          "01 Volvo truck",
          "2 refrigerated trucks",
          "2 forklifts 4 T",
          "1 forklift 10 T"
        ]
      },
      gallery: {
        title: "Our Facilities",
        images: [
          {
            src: "/entrepot1.webp",
            caption: "Spacious interior aisles dedicated to order preparation"
          },
          {
            src: "/entrepot2.webp",
            caption: "Internal fleet of flatbed trucks ready for regional shipping"
          },
          {
            src: "/entrepot3.webp",
            caption: "Bonded storage: conditioned and stacked textile bales"
          },
          {
            src: "/entrepot4.webp",
            caption: "Main façade of the five Diamniadio hangars"
          },
          {
            src: "/entrepot5.webp",
            caption: "Bonded storage: conditioned and stacked textile bales"
          }
        ]
      },
      testimonial: {
        quote: "Ndoukouman Shipping offers exceptional storage solutions. Their professionalism and quality infrastructure help us optimize our supply chain in Senegal.",
        author: "Logistics Director",
        company: "International Commercial Group"
      },
      cta: {
        title: "Need a storage solution?",
        subtitle: "Contact us for a personalized quote adapted to your needs",
        button: "Request storage quote"
      },
      location: {
        title: "Strategic Location",
        text: "Our warehouses are ideally located within the Dakar Autonomous Port, the leading port infrastructure in West Africa. This strategic position allows us to offer direct access to vessels and optimal connection with land transport networks. Benefiting from an exceptional geographical location, our facilities facilitate trade between Europe, America and sub-Saharan Africa."
      }
    }
  };

  const currentContent = content[language];

  const handleQuoteClick = () => {
    navigate(getQuoteRoute(language));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.6)), url('/entrepot1.webp')`
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
            <p className="text-xl lg:text-2xl text-white/80 font-medium">
              {currentContent.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warehouses and Logistics Section - Side by Side */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 space-y-12 lg:space-y-0">
            {/* Left Column - Warehouses */}
            <div>
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-serif">
                  {currentContent.warehouses.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  {currentContent.warehouses.subtitle}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {currentContent.warehouses.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow h-auto">
                      <CardContent className="p-4 text-center">
                        <Building2 className="h-5 w-5 text-primary mx-auto mb-3" />
                        <h3 className="text-sm font-semibold text-primary mb-2 leading-tight">{item.name}</h3>
                        <p className="text-lg font-bold text-muted-foreground">{item.size}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-lg font-semibold text-primary">{currentContent.warehouses.total}</p>
              </motion.div>
            </div>

            {/* Right Column - Logistics */}
            <div>
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-serif">
                  {currentContent.logistics.title}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.logistics.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capacities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-serif">
              {currentContent.capacities.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {currentContent.capacities.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {currentContent.kpis.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-primary/90 to-primary/80 text-white border-none shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <kpi.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">{kpi.title}</h3>
                    </div>
                    <div className="text-2xl font-bold text-white mb-3">
                      {kpi.value}
                    </div>
                    <p className="text-white/80 text-sm">
                      {kpi.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 font-serif">
              {currentContent.gallery.title}
            </h2>
          </motion.div>

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
              {currentContent.gallery.images.map((image, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden shadow-xl">
                      <div className="relative">
                        <img 
                          src={image.src} 
                          alt={image.caption}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground font-medium">{image.caption}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Star className="h-12 w-12 text-white mx-auto mb-6" />
            <blockquote className="text-xl lg:text-2xl font-medium mb-8 italic">
              "{currentContent.testimonial.quote}"
            </blockquote>
            <div className="text-white font-semibold">
              {currentContent.testimonial.author}
            </div>
            <div className="text-white/80">
              {currentContent.testimonial.company}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 font-serif">
                {currentContent.location.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">
              {currentContent.cta.title}
            </h2>
            <p className="text-xl mb-8">
              {currentContent.cta.subtitle}
            </p>
            <Button 
              onClick={handleQuoteClick}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 font-semibold"
            >
              {currentContent.cta.button}
            </Button>
          </motion.div>
        </div>
      </section>

      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default Warehouses;

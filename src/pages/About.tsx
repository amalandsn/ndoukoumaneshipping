import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, Target, TrendingUp, MapPin, Eye } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";

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
          "Excellence opérationnelle certifiée"
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
          "Central Park ex 4 c Avenue Malick Sy Bureau 3008",
          "Plate-forme stratégique de 2 ha – Dakar",
          "Accès Autoroute Dakar-Bamako & Port de Ndayane"
        ]
      },
      ceo: {
        title: "Mot du Président Directeur Général",
        content: "Ndoukoumane est un groupe créé en 2018 et 100 % sénégalais, fondé par moi-même, El Hadj Mor Ndao, opérateur économique à Dakar. Agréé dans les activités portuaires – manutention, transit, gestion de stock, tierce détention, logistique terrestre, aérienne et maritime, ainsi que consignataire de navires – nous ambitionnons de fluidifier l'acheminement des marchandises entre le port de Dakar et toute la sous-région.",
        mission: "Notre mission : contribuer au positionnement du port de Dakar comme hub de transbordement et d'éclatement pour l'Afrique de l'Ouest.",
        signature: "M. El Hadj Mor Ndao – Fondateur & Président Directeur Général"
      },
      team: {
        title: "La team Ndoukouman Shipping & Services",
        members: [
          {
            image: "fman.webp",
            name: "Mme Mame Diodio Ndao",
            title: "CEO & Financial Manager",
            description: "Pilote la stratégie financière et l'expansion régionale avec des années d'expérience en banques et shipping."
          },
          {
            image: "as.webp",
            name: "M. Abdourahmane Sall",
            title: "Directeur d'exploitation",
            description: "Fort de plus de quarante ans d'expérience dans la gestion des opérations portuaires et logistiques, M. Sall supervise l'optimisation des flux, la sécurité des sites et la satisfaction client au quotidien."
          },
          {
            image: "cds.webp",
            name: "Mme Dienaba Hane",
            title: "Chef Département Shipping",
            description: "Orchestre les opérations portuaires 24/7 et garantit un taux de ponctualité escale supérieur à 98 %."
          },
          {
            image: "stran.webp",
            name: "M. Omar F. Dramé",
            title: "Responsable Transit",
            description: "Expert en dédouanement express : maîtrise LC BCEAO et corridors Dakar–Bamako–Niamey."
          },
         {
            image: "manu.webp",
            name: "M. Khadim Bamba Ndiaye",
            title: "Responsable Manutention",
            description: "Supervise les opérations de quai et garantit la sécurité des chargements."
          },
          {
            image: "fact.webp",
            name: "Mme Maguette Samb",
            title: "Spécialiste Facturation",
            description: "Émet des factures précises, suit les coûts et optimise la trésorerie clients."
          },
          {
            image: "fact.webp",
            name: "Mme Aissata Diallo",
            title: "Gestionnaire Comptes d’Escale",
            description: "Coordonne formalités portuaires et relations armateurs pour des escales fluides."
          }
        ]
      },
      credo: {
        title: "Notre Credo : PIN",
        values: [
          "Professionnalisme",
          "Innovation",
          "Normes"
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
          "Certified operational excellence"
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
          "Central Park ex 4 c Avenue Malick Sy Bureau 3008",
          "2-ha strategic platform – Dakar",
          "Direct link to Dakar-Bamako Highway & Ndayane Port"
        ]
      },
      ceo: {
        title: "Message from the CEO",
        content: "Ndoukouman is a group created in 2018 and 100% Senegalese, founded by myself, El Hadj Mor Ndao, economic operator in Dakar. Approved in port activities – handling, transit, stock management, third-party detention, land, air and maritime logistics, as well as ship consignee – we aim to streamline the routing of goods between the port of Dakar and the entire sub-region.",
        mission: "Our mission: contribute to positioning the port of Dakar as a transhipment and breakbulk hub for West Africa.",
        signature: "M. El Hadj Mor Ndao – Founder & CEO"
      },
      team: {
        title: "The Ndoukouman Shipping & Services Team",
        members: [
          {
            image: "fman.webp",
            name: "Mrs. Mame Diodio Ndao",
            title: "CEO & Financial Manager",
            description: "Drives financial strategy and regional expansion with 15 years of experience in banking and shipping."
          },
          {
            image: "as.webp",
            name: "Mr. Abdourahmane Sall",
            title: "Operations Director",
            description: "With over forty years of experience in port and logistics operations management, Mr. Sall supervises flow optimization, site security, and daily customer satisfaction."
          },
          {
            image: "cds.webp",
            name: "Mrs. Dienaba Hane",
            title: "Shipping Department Head",
            description: "Orchestrates port operations 24/7 and guarantees a call punctuality rate above 98%."
          },
          {
            image: "stran.webp",
            name: "Mr. Omar F. Dramé",
            title: "Transit Manager",
            description: "Expert in express customs clearance: masters LC BCEAO and Dakar–Bamako–Niamey corridors."
          },
          {
            image: "manu.webp",
            name: "Mr. Khadim Bamba Ndiaye",
            title: "Stevedoring Supervisor",
            description: "Oversees quay operations and ensures safe cargo handling."
          },
          {
            image: "fact.webp",
            name: "Ms Maguette Samb",
            title: "Billing Specialist",
            description: "Issues accurate invoices, monitors costs, and optimises client cash flow."
          },
          {
            image: "fact.webp",
            name: "Ms Aissata Diallo",
            title: "Port Call Coordinator",
            description: "Coordinates port formalities and liaises with shipowners for smooth port calls."
          }
        ]
      },
      credo: {
        title: "Our Credo: PIC",
        values: [
          "Professionalism",
          "Innovation",
          "Compliance"
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
      <section className="py-20 bg-blue-deep text-white">
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

      {/* Main Two-Column Layout */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 space-y-24 lg:space-y-0">
          
          {/* Left Column */}
          <div className="space-y-24">
            
            {/* 1. CEO Message */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* Decorative vertical line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-deep/20"></div>
                  
                  <blockquote className="pl-8 space-y-6">
                    <div className="text-xl italic text-gray-700 leading-relaxed">
                      "{currentContent.ceo.content.split('.')[0]}."
                    </div>
                    
                    <div className="text-gray-700 leading-relaxed">
                      {currentContent.ceo.content.substring(currentContent.ceo.content.indexOf('.') + 1).trim()}
                    </div>
                    
                    <div className="text-lg font-medium text-blue-deep">
                      {currentContent.ceo.mission}
                    </div>
                    
                    <div className="text-blue-deep font-semibold">
                      {currentContent.ceo.signature}
                    </div>
                  </blockquote>
                </div>
              </motion.div>
            </section>

            {/* 2. Notre Credo */}
            <section>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-deep mb-8 font-serif leading-tight">
                  <div>Notre credo :</div>
                  <div className="text-5xl lg:text-6xl mt-2">PIN</div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {currentContent.credo.values.map((value, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-4xl font-extrabold text-blue-deep block mb-4 font-mono">
                        {index + 1}
                      </span>
                      <p className="text-base font-semibold text-blue-deep">
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* 4. Mission / Vision / Location Cards */}
            <section>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Mission Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="text-blue-deep text-2xl h-6 w-6" />
                    <h3 className="text-lg font-semibold text-blue-deep">{currentContent.mission.title}</h3>
                  </div>
                  <ul className="list-disc list-inside marker:text-blue-deep space-y-1 text-sm leading-relaxed text-gray-700">
                    {currentContent.mission.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="text-blue-deep text-2xl h-6 w-6" />
                    <h3 className="text-lg font-semibold text-blue-deep">{currentContent.vision.title}</h3>
                  </div>
                  <ul className="list-disc list-inside marker:text-blue-deep space-y-1 text-sm leading-relaxed text-gray-700">
                    {currentContent.vision.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                {/* Location Card with Map */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.155446!2d-17.4425914!3d14.6825705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec17295e1775ef1%3A0x1ee2e80b10007d39!2sCentral%20Park%20Dakar!5e0!3m2!1sfr!2ssn!4v1703069584000!5m2!1sfr!2ssn"
                    loading="lazy"
                    className="w-full h-32"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte Central Park Dakar"
                  />
                  
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="text-blue-deep text-2xl h-6 w-6" />
                      <h3 className="text-lg font-semibold text-blue-deep">{currentContent.location.title}</h3>
                    </div>
                    <ul className="list-disc list-inside marker:text-blue-deep space-y-1 text-sm leading-relaxed text-gray-700">
                      {currentContent.location.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-24">
            
            {/* 1. CEO Photo - aligned with middle of blockquote */}
            <section className="flex justify-center lg:justify-start lg:items-center lg:h-auto">
              <motion.div
                className="text-center lg:mt-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="dg.webp" 
                  alt="Portrait de M. El Hadj Mor Ndao, Directeur Général"
                  className="w-56 h-56 object-cover object-top rounded-full ring-4 ring-white shadow-lg"
                />
              </motion.div>
            </section>

            {/* Team Carousel */}
            <section>
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-deep mb-4 font-serif">
                  {currentContent.team.title}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: true,
                      stopOnMouseEnter: true,
                      stopOnFocusIn: true,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {currentContent.team.members.map((member, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                          <div className="p-6 text-center">
                            <div className="mb-6">
                              <img 
                                src={`/${member.image}`}
                                alt={`Portrait de ${member.name}`}
                                className="w-36 h-36 mx-auto object-cover object-top rounded-full shadow-md"
                                onError={(e) => {
                                  console.log(`Failed to load image: ${member.image}`);
                                  e.currentTarget.src = '/placeholder.svg';
                                }}
                              />
                            </div>
                            
                            <h3 className="text-lg font-bold text-blue-deep mb-1">
                              {member.name}
                            </h3>
                            <div className="text-blue-deep/70 font-medium text-sm mb-3">
                              {member.title}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {member.description}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </motion.div>
            </section>

            {/* 5. Key Numbers - with additional spacing */}
            <section className="mt-10">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-deep mb-4 font-serif">
                  {currentContent.keyNumbers}
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {keyMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4">
                      <metric.icon className="h-8 w-8 text-blue-deep mx-auto" />
                    </div>
                    <div className="text-xl font-bold text-blue-deep mb-2 font-mono">
                      {metric.value}
                    </div>
                    <div className="text-muted-foreground font-medium text-sm">
                      {language === 'fr' ? metric.label_fr : metric.label_en}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default About;

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
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
          "Central Park, face Brigade Nationale des Sapeurs-Pompiers",
          "Plate-forme stratégique de 2 ha – Dakar",
          "Accès Autoroute Dakar-Bamako & Port de Ndayane"
        ]
      },
      ceo: {
        title: "Mot du Directeur Général",
        content: "Ndoukouman est un groupe créé en 2018 et 100 % sénégalais, fondé par moi-même, El Hadj Mor Ndao, opérateur économique à Dakar. Agréé dans les activités portuaires – manutention, transit, gestion de stock, tierce détention, logistique terrestre, aérienne et maritime, ainsi que consignataire de navires – nous ambitionnons de fluidifier l'acheminement des marchandises entre le port de Dakar et toute la sous-région.",
        mission: "Notre mission : contribuer au positionnement du port de Dakar comme hub de transbordement et d'éclatement pour l'Afrique de l'Ouest.",
        signature: "M. El Hadj Mor Ndao – Fondateur & Directeur Général"
      },
      team: {
        title: "Présentation de l'équipe",
        members: [
          {
            image: "fman.webp",
            name: "Mme Mame Diodio Ndao",
            title: "CEO & Financial Manager",
            description: "Pilote la stratégie financière et l'expansion régionale avec 15 ans d'expérience en banques et shipping."
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
          "Central Park, opposite National Fire Brigade HQ",
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
        title: "Team Presentation",
        members: [
          {
            image: "fman.webp",
            name: "Mrs. Mame Diodio Ndao",
            title: "CEO & Financial Manager",
            description: "Drives financial strategy and regional expansion with 15 years of experience in banking and shipping."
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
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-orange-500 text-2xl h-6 w-6" />
                <h3 className="text-lg font-semibold text-blue-900">{currentContent.mission.title}</h3>
              </div>
              <ul className="list-disc list-inside marker:text-orange-500 space-y-1 text-sm leading-relaxed text-gray-700">
                {currentContent.mission.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-orange-500 text-2xl h-6 w-6" />
                <h3 className="text-lg font-semibold text-blue-900">{currentContent.vision.title}</h3>
              </div>
              <ul className="list-disc list-inside marker:text-orange-500 space-y-1 text-sm leading-relaxed text-gray-700">
                {currentContent.vision.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.155446!2d-17.4425914!3d14.6825705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec17295e1775ef1%3A0x1ee2e80b10007d39!2sCentral%20Park%20Dakar!5e0!3m2!1sfr!2ssn!4v1703069584000!5m2!1sfr!2ssn"
                loading="lazy"
                className="w-full h-40 md:h-[180px]"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Central Park Dakar"
              />
              
              <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-orange-500 text-2xl h-6 w-6" />
                  <h3 className="text-lg font-semibold text-blue-900">{currentContent.location.title}</h3>
                </div>
                <ul className="list-disc list-inside marker:text-orange-500 space-y-1 text-sm leading-relaxed text-gray-700">
                  {currentContent.location.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6 font-serif">
                  {currentContent.ceo.title}
                </h2>
                
                <div className="text-2xl italic text-gray-700 mb-6 leading-relaxed">
                  "{currentContent.ceo.content.split('.')[0]}."
                </div>
                
                <div className="text-gray-700 leading-relaxed mb-6">
                  {currentContent.ceo.content.substring(currentContent.ceo.content.indexOf('.') + 1).trim()}
                </div>
                
                <div className="text-lg font-medium text-orange-500 mb-4">
                  {currentContent.ceo.mission}
                </div>
                
                <div className="text-blue-900 font-semibold">
                  {currentContent.ceo.signature}
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src="dg.webp" 
                    alt="Portrait de M. El Hadj Mor Ndao, Directeur Général"
                    className="w-full max-w-sm mx-auto aspect-[3/4] object-cover object-top rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
              {currentContent.team.title}
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {currentContent.team.members.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`Portrait de ${member.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-orange-500 font-medium text-sm mb-3">
                    {member.title}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile slider version */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
              {currentContent.team.members.map((member, index) => (
                <div
                  key={index}
                  className="flex-none w-80 bg-white rounded-xl shadow-md overflow-hidden snap-start"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={`Portrait de ${member.name}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-1">
                      {member.name}
                    </h3>
                    <div className="text-orange-500 font-medium text-sm mb-3">
                      {member.title}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
      <ChatAssistant />
    </div>
  );
};

export default About;

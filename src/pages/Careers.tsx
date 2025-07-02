import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Users, Send, Heart, Zap, Shield, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Rejoignez Notre Équipe",
      subtitle: "Construisons ensemble l'avenir du transport maritime au Sénégal",
      whyJoinTitle: "Pourquoi nous rejoindre ?",
      openPositionsTitle: "Postes Ouverts",
      benefitsTitle: "Avantages & Bénéfices",
      noPositions: "Aucun poste ouvert actuellement",
      talentSearch: "Mais nous sommes toujours à la recherche de talents ! Envoyez-nous votre candidature spontanée à",
      benefits: {
        training: "Formation Continue",
        insurance: "Assurance Santé",
        growth: "Évolution de Carrière",
        bonus: "Primes Performance"
      }
    },
    en: {
      title: "Join Our Team",
      subtitle: "Let's build the future of maritime transport in Senegal together",
      whyJoinTitle: "Why Join Us?",
      openPositionsTitle: "Open Positions",
      benefitsTitle: "Benefits & Perks",
      noPositions: "No open positions currently",
      talentSearch: "But we are always looking for talent! Send us your spontaneous application to",
      benefits: {
        training: "Continuous Training",
        insurance: "Health Insurance",
        growth: "Career Growth",
        bonus: "Performance Bonuses"
      }
    }
  };

  const currentContent = content[language];

  const whyJoinReasons = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: language === 'fr' ? "Environnement Bienveillant" : "Supportive Environment",
      description: language === 'fr' 
        ? "Une équipe soudée où chacun compte et peut s'épanouir professionnellement"
        : "A close-knit team where everyone matters and can grow professionally"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: language === 'fr' ? "Innovation & Croissance" : "Innovation & Growth",
      description: language === 'fr'
        ? "Participez à la modernisation du secteur maritime en Afrique de l'Ouest"
        : "Participate in modernizing the maritime sector in West Africa"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: language === 'fr' ? "Stabilité & Sécurité" : "Stability & Security",
      description: language === 'fr'
        ? "Une entreprise solide avec plus de 15 ans d'expérience sur le marché"
        : "A solid company with over 15 years of market experience"
    }
  ];

  const benefits = [
    { icon: <Users className="h-5 w-5" />, text: currentContent.benefits.training },
    { icon: <Shield className="h-5 w-5" />, text: currentContent.benefits.insurance },
    { icon: <Zap className="h-5 w-5" />, text: currentContent.benefits.growth },
    { icon: <DollarSign className="h-5 w-5" />, text: currentContent.benefits.bonus }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentContent.title}
          </motion.h1>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.whyJoinTitle}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {whyJoinReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.openPositionsTitle}
          </motion.h2>

          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-lg shadow-lg"
            >
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-xl font-semibold mb-4">
                {currentContent.noPositions}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentContent.talentSearch}
              </p>
              <a 
                href="mailto:recrutement@ndoukoumaneshipping.com" 
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                recrutement@ndoukoumaneshipping.com
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.benefitsTitle}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-full text-primary mb-3">
                  {benefit.icon}
                </div>
                <p className="text-sm font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;

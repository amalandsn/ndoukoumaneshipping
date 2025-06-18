
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Users, MapPin, Clock, DollarSign, Send, Heart, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      applyButton: "Postuler",
      contactText: "Intéressé(e) ? Contactez-nous à",
      noPositions: "Aucun poste ouvert actuellement. Envoyez-nous votre candidature spontanée !",
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
      applyButton: "Apply",
      contactText: "Interested? Contact us at",
      noPositions: "No open positions currently. Send us your spontaneous application!",
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

  const jobPositions = [
    {
      title: language === 'fr' ? "Responsable des Opérations Portuaires" : "Port Operations Manager",
      department: language === 'fr' ? "Opérations" : "Operations",
      location: "Dakar, Sénégal",
      type: language === 'fr' ? "CDI" : "Full-time",
      salary: language === 'fr' ? "Selon expérience" : "Based on experience",
      description: language === 'fr'
        ? "Supervision des opérations de consignation et coordination avec les équipes terrain"
        : "Supervision of stevedoring operations and coordination with field teams",
      requirements: language === 'fr' 
        ? ["5+ ans d'expérience portuaire", "Maîtrise de l'anglais", "Leadership et organisation"]
        : ["5+ years port experience", "English proficiency", "Leadership and organization"]
    },
    {
      title: language === 'fr' ? "Agent de Transit Douanier" : "Customs Transit Agent",
      department: language === 'fr' ? "Transit" : "Transit",
      location: "Dakar, Sénégal",
      type: language === 'fr' ? "CDI" : "Full-time",
      salary: "400,000 - 600,000 FCFA",
      description: language === 'fr'
        ? "Gestion des procédures douanières et suivi des dossiers d'importation/exportation"
        : "Management of customs procedures and monitoring import/export files",
      requirements: language === 'fr'
        ? ["Formation en transit", "Connaissance réglementation douanière", "Rigueur et autonomie"]
        : ["Transit training", "Knowledge of customs regulations", "Rigor and autonomy"]
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
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-20">
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
                <div className="inline-flex p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
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

          <div className="max-w-4xl mx-auto space-y-6">
            {jobPositions.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{job.department}</Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => window.location.href = 'mailto:contact@ndoukoumaneshipping.sn?subject=Candidature - ' + job.title}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {currentContent.applyButton}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">
                        {language === 'fr' ? 'Profil recherché :' : 'Required profile:'}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact for applications */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">
              {currentContent.contactText}
            </p>
            <a 
              href="mailto:contact@ndoukoumaneshipping.sn" 
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              contact@ndoukoumaneshipping.sn
            </a>
          </motion.div>
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
                <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-3">
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

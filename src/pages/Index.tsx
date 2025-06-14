
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Anchor, 
  Ship, 
  Truck, 
  FileText, 
  Users, 
  Phone,
  Mail,
  Shield,
  Clock,
  Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import HeroVideo from '@/components/HeroVideo';
import StatsCounter from '@/components/StatsCounter';
import ProcessTimeline from '@/components/ProcessTimeline';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { language } = useLanguage();

  // Services content
  const servicesContent = {
    fr: {
      title: "Nos Services",
      subtitle: "Solutions complètes pour vos opérations maritimes",
      services: [
        {
          icon: <Anchor className="h-8 w-8" />,
          title: "Consignation Maritime",
          description: "Représentation complète de vos navires avec suivi en temps réel des escales et formalités portuaires."
        },
        {
          icon: <Truck className="h-8 w-8" />,
          title: "Manutention Portuaire",
          description: "Operations de chargement/déchargement avec équipements modernes et équipes expérimentées."
        },
        {
          icon: <FileText className="h-8 w-8" />,
          title: "Transit Douanier",
          description: "Dédouanement accéléré et suivi des marchandises avec expertise réglementaire complète."
        },
        {
          icon: <Users className="h-8 w-8" />,
          title: "Conseil Maritime",
          description: "Expertise stratégique et accompagnement personnalisé pour optimiser vos opérations."
        }
      ]
    },
    en: {
      title: "Our Services",
      subtitle: "Complete solutions for your maritime operations",
      services: [
        {
          icon: <Anchor className="h-8 w-8" />,
          title: "Maritime Consignment",
          description: "Complete representation of your vessels with real-time tracking of calls and port formalities."
        },
        {
          icon: <Truck className="h-8 w-8" />,
          title: "Port Handling",
          description: "Loading/unloading operations with modern equipment and experienced teams."
        },
        {
          icon: <FileText className="h-8 w-8" />,
          title: "Customs Transit",
          description: "Expedited customs clearance and cargo tracking with complete regulatory expertise."
        },
        {
          icon: <Users className="h-8 w-8" />,
          title: "Maritime Advisory",
          description: "Strategic expertise and personalized support to optimize your operations."
        }
      ]
    }
  };

  // Stats content
  const statsContent = {
    fr: {
      title: "Notre Excellence en Chiffres",
      stats: [
        { label: "Années d'expérience", number: 20, suffix: "+" },
        { label: "TEUs par an", number: 150000, suffix: "+" },
        { label: "Employés qualifiés", number: 85, suffix: "" },
        { label: "Ports desservis", number: 12, suffix: "" }
      ]
    },
    en: {
      title: "Our Excellence in Numbers",
      stats: [
        { label: "Years of experience", number: 20, suffix: "+" },
        { label: "TEUs per year", number: 150000, suffix: "+" },
        { label: "Qualified employees", number: 85, suffix: "" },
        { label: "Ports served", number: 12, suffix: "" }
      ]
    }
  };

  const content = language === 'fr' ? 
    { services: servicesContent.fr, stats: statsContent.fr } :
    { services: servicesContent.en, stats: statsContent.en };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Video Section */}
      <HeroVideo />

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif text-white">
              {content.stats.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {content.stats.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <StatsCounter
                  label={stat.label}
                  targetNumber={stat.number}
                  suffix={stat.suffix}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              {content.services.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.services.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full text-blue-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-blue-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Testimonials Slider */}
      <TestimonialsSlider />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-serif">
              {language === 'fr' ? 
                'Prêt à optimiser vos opérations maritimes ?' : 
                'Ready to optimize your maritime operations?'
              }
            </h2>
            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
              {language === 'fr' ? 
                'Contactez notre équipe d\'experts pour un accompagnement personnalisé et des solutions sur mesure.' : 
                'Contact our team of experts for personalized support and customized solutions.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 transform transition-transform hover:scale-105">
                <Phone className="h-5 w-5 mr-2" />
                {language === 'fr' ? 'Nous appeler' : 'Call us'}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 transform transition-transform hover:scale-105">
                <Mail className="h-5 w-5 mr-2" />
                {language === 'fr' ? 'Nous écrire' : 'Email us'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full text-green-600 w-fit">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {language === 'fr' ? 'Sécurité Garantie' : 'Guaranteed Security'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' ? 
                  'Certifications ISO et protocoles de sécurité internationaux' : 
                  'ISO certifications and international security protocols'
                }
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full text-blue-600 w-fit">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {language === 'fr' ? 'Rapidité d\'Exécution' : 'Fast Execution'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' ? 
                  'Traitement accéléré et délais respectés sur toutes nos prestations' : 
                  'Accelerated processing and deadlines met on all our services'
                }
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 p-4 bg-orange-100 rounded-full text-orange-600 w-fit">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {language === 'fr' ? 'Innovation Continue' : 'Continuous Innovation'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' ? 
                  'Technologies de pointe et solutions digitales avancées' : 
                  'Cutting-edge technologies and advanced digital solutions'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Index;

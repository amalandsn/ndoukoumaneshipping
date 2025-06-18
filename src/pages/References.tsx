
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Building2, Ship, Truck, Award, Star, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const References = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Nos Références",
      subtitle: "La confiance de nos clients, notre plus grande fierté",
      clientsTitle: "Clients Principaux",
      testimonialsTitle: "Témoignages",
      projectsTitle: "Projets Réalisés",
      stats: {
        clients: "Clients Actifs",
        projects: "Projets Réalisés",
        experience: "Années d'Expérience",
        satisfaction: "Satisfaction Client"
      }
    },
    en: {
      title: "Our References",
      subtitle: "Our clients' trust is our greatest pride",
      clientsTitle: "Key Clients",
      testimonialsTitle: "Testimonials",
      projectsTitle: "Completed Projects",
      stats: {
        clients: "Active Clients",
        projects: "Completed Projects",
        experience: "Years of Experience",
        satisfaction: "Client Satisfaction"
      }
    }
  };

  const currentContent = content[language];

  const clients = [
    {
      name: "MSC Mediterranean Shipping Company",
      sector: language === 'fr' ? "Transport Maritime" : "Maritime Transport",
      description: language === 'fr' 
        ? "Partenaire privilégié pour les opérations de consignation et manutention au Port de Dakar"
        : "Privileged partner for stevedoring and handling operations at Dakar Port",
      logo: "🚢"
    },
    {
      name: "CMA CGM Group",
      sector: language === 'fr' ? "Logistique Maritime" : "Maritime Logistics",
      description: language === 'fr'
        ? "Services complets de transit et logistique pour les lignes Afrique de l'Ouest"
        : "Complete transit and logistics services for West Africa lines",
      logo: "🌊"
    },
    {
      name: "Bollore Transport & Logistics",
      sector: language === 'fr' ? "Logistique Intégrée" : "Integrated Logistics",
      description: language === 'fr'
        ? "Collaboration stratégique pour l'optimisation des chaînes d'approvisionnement"
        : "Strategic collaboration for supply chain optimization",
      logo: "📦"
    }
  ];

  const testimonials = [
    {
      name: "Amadou Diallo",
      company: "MSC Dakar",
      role: language === 'fr' ? "Directeur des Opérations" : "Operations Director",
      text: language === 'fr'
        ? "Ndoukoumane Shipping & Services nous accompagne depuis 5 ans avec un professionnalisme exemplaire. Leur réactivité et expertise font la différence."
        : "Ndoukoumane Shipping & Services has been supporting us for 5 years with exemplary professionalism. Their responsiveness and expertise make all the difference.",
      rating: 5
    },
    {
      name: "Marie Dubois",
      company: "CMA CGM Sénégal",
      role: language === 'fr' ? "Responsable Logistique" : "Logistics Manager",
      text: language === 'fr'
        ? "Une équipe dédiée qui comprend nos enjeux. Les délais sont respectés et la qualité de service est constante."
        : "A dedicated team that understands our challenges. Deadlines are met and service quality is consistent.",
      rating: 5
    }
  ];

  const projects = [
    {
      title: language === 'fr' ? "Modernisation Terminal Conteneurs" : "Container Terminal Modernization",
      client: "Port Autonome de Dakar",
      year: "2023",
      description: language === 'fr'
        ? "Optimisation des opérations de manutention avec réduction de 30% des temps d'attente"
        : "Handling operations optimization with 30% reduction in waiting times",
      icon: <Ship className="h-6 w-6" />
    },
    {
      title: language === 'fr' ? "Corridor Logistique Mali-Sénégal" : "Mali-Senegal Logistics Corridor",
      client: "Groupement Transitaires",
      year: "2023",
      description: language === 'fr'
        ? "Mise en place d'une chaîne logistique intégrée pour l'acheminement vers le Mali"
        : "Implementation of integrated logistics chain for Mali-bound cargo",
      icon: <Truck className="h-6 w-6" />
    }
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

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: currentContent.stats.clients },
              { value: "200+", label: currentContent.stats.projects },
              { value: "15+", label: currentContent.stats.experience },
              { value: "98%", label: currentContent.stats.satisfaction }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.clientsTitle}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{client.logo}</div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge variant="secondary">{client.sector}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {client.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.testimonialsTitle}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-blue-200 mb-4" />
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                        <div className="text-sm text-blue-600">{testimonial.company}</div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {currentContent.projectsTitle}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        {project.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Badge variant="outline">{project.client}</Badge>
                          <span>•</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default References;

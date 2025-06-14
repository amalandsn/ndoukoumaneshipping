
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award,
  Shield,
  CheckCircle,
  Globe,
  Users,
  Anchor
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { useLanguage } from '@/hooks/useLanguage';

const About = () => {
  const { language } = useLanguage();

  const aboutContent = {
    fr: {
      title: "À propos de Ndoukoumane Shipping",
      mission: {
        headline: "Leader maritime au Sénégal depuis 2010 - Services portuaires rapides, sécurisés et transparents",
        description: "Ndoukoumane Shipping s'impose comme le partenaire de référence pour tous vos besoins en services maritimes au Sénégal. Notre expertise couvre la consignation de navires, la manutention portuaire, le transit douanier et le conseil maritime."
      },
      timeline: {
        title: "Notre Histoire",
        events: [
          {
            year: "2010",
            title: "Création de l'entreprise",
            description: "Fondation de Ndoukoumane Shipping avec une vision claire : révolutionner les services maritimes au Sénégal."
          },
          {
            year: "2014", 
            title: "Expansion des services",
            description: "Élargissement de notre offre avec l'ajout des services de manutention portuaire et de transit douanier."
          },
          {
            year: "2019",
            title: "Certification internationale",
            description: "Obtention des certifications ISO 9001 et ISPS, confirmant notre engagement envers la qualité et la sécurité."
          },
          {
            year: "2024",
            title: "Innovation digitale",
            description: "Lancement de notre plateforme digitale pour un suivi en temps réel et une meilleure expérience client."
          }
        ]
      },
      certifications: {
        title: "Nos Certifications & Agréments",
        items: [
          {
            name: "ISO 9001:2015",
            description: "Management de la qualité",
            icon: "Award"
          },
          {
            name: "Code ISPS",
            description: "Sécurité portuaire internationale",
            icon: "Shield"
          },
          {
            name: "Agrément Douanier",
            description: "Commissionnaire en douane agréé",
            icon: "CheckCircle"
          },
          {
            name: "IMDG Code",
            description: "Transport de marchandises dangereuses",
            icon: "Globe"
          },
          {
            name: "OEA Sénégal",
            description: "Opérateur Économique Agréé",
            icon: "Users"
          },
          {
            name: "Port de Dakar",
            description: "Consignataire agréé",
            icon: "Anchor"
          }
        ]
      }
    },
    en: {
      title: "About Ndoukoumane Shipping",
      mission: {
        headline: "Maritime leader in Senegal since 2010 - Fast, secure and transparent port services",
        description: "Ndoukoumane Shipping stands as the reference partner for all your maritime service needs in Senegal. Our expertise covers ship consignment, port handling, customs transit and maritime advisory."
      },
      timeline: {
        title: "Our History",
        events: [
          {
            year: "2010",
            title: "Company Foundation",
            description: "Establishment of Ndoukoumane Shipping with a clear vision: revolutionizing maritime services in Senegal."
          },
          {
            year: "2014",
            title: "Service Expansion", 
            description: "Broadening our offering with the addition of port handling and customs transit services."
          },
          {
            year: "2019",
            title: "International Certification",
            description: "Achievement of ISO 9001 and ISPS certifications, confirming our commitment to quality and security."
          },
          {
            year: "2024",
            title: "Digital Innovation",
            description: "Launch of our digital platform for real-time tracking and enhanced customer experience."
          }
        ]
      },
      certifications: {
        title: "Our Certifications & Approvals",
        items: [
          {
            name: "ISO 9001:2015",
            description: "Quality management",
            icon: "Award"
          },
          {
            name: "ISPS Code",
            description: "International port security",
            icon: "Shield"
          },
          {
            name: "Customs License",
            description: "Licensed customs broker",
            icon: "CheckCircle"
          },
          {
            name: "IMDG Code",
            description: "Dangerous goods transport",
            icon: "Globe"
          },
          {
            name: "AEO Senegal",
            description: "Authorized Economic Operator",
            icon: "Users"
          },
          {
            name: "Port of Dakar",
            description: "Approved ship agent",
            icon: "Anchor"
          }
        ]
      }
    }
  };

  const content = aboutContent[language];

  const getIcon = (iconName: string) => {
    const icons = {
      Award: <Award className="h-8 w-8" />,
      Shield: <Shield className="h-8 w-8" />,
      CheckCircle: <CheckCircle className="h-8 w-8" />,
      Globe: <Globe className="h-8 w-8" />,
      Users: <Users className="h-8 w-8" />,
      Anchor: <Anchor className="h-8 w-8" />
    };
    return icons[iconName as keyof typeof icons] || <Award className="h-8 w-8" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6 font-serif">
            {content.title}
          </h1>
          
          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 leading-relaxed">
              {content.mission.headline}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.mission.description}
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12 font-serif">
            {content.timeline.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {content.timeline.events.map((event, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Badge className="bg-orange-500 text-white text-lg font-bold px-4 py-2">
                        {event.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline connector */}
                  {index < content.timeline.events.length - 1 && (
                    <div className="hidden md:block absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-px h-8 bg-orange-300"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12 font-serif">
            {content.certifications.title}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.certifications.items.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-orange-200">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-900 rounded-full text-white">
                      {getIcon(cert.icon)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {cert.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {cert.description}
                  </p>
                  
                  <Badge variant="outline" className="mt-3 border-orange-500 text-orange-600">
                    Certifié
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-900 text-white rounded-xl p-8 mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 font-serif">
            {language === 'fr' ? 'Prêt à travailler avec nous ?' : 'Ready to work with us?'}
          </h2>
          <p className="text-blue-200 mb-6">
            {language === 'fr' 
              ? 'Découvrez comment notre expertise peut optimiser vos opérations maritimes.'
              : 'Discover how our expertise can optimize your maritime operations.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              {language === 'fr' ? 'Nos Services' : 'Our Services'}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors">
              {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default About;

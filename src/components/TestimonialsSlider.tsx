
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// On utilise les images locales du dossier public
const imageMap: Record<string, string> = {
  "Amadou Diallo": "/Amadou-Diallo.webp",
  "Bousso Cisse": "/Bousso-Cisse.webp",
  "Abdoulaye Sow": "/Abdoulaye-Sow.webp"
};

const TestimonialsSlider = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = {
    fr: [
      {
        name: "Amadou Diallo",
        company: "Senegal Export Corp",
        role: "Directeur Logistique",
        content: "Ndoukouman shipping & Services nous accompagne depuis 5 ans avec un professionnalisme exemplaire. Leurs équipes réactives et leur maîtrise des procédures douanières nous font gagner un temps précieux.",
        rating: 5,
        image: imageMap["Amadou Diallo"]
      },
      {
        name: "Bousso Cisse",
        company: "West Africa Trading",
        role: "Responsable Import",
        content: "Un service de consignation maritime de qualité supérieure. La transparence dans les opérations et le suivi en temps réel sont remarquables. Je recommande vivement leurs services.",
        rating: 5,
        image: imageMap["Bousso Cisse"]
      },
      {
        name: "Abdoulaye Sow",
        company: "Atlantic Freight Solutions",
        role: "CEO",
        content: "Partenaire de confiance pour nos opérations portuaires. Leur expertise et leur réactivité nous permettent d'optimiser nos délais de livraison. Un service client exceptionnel.",
        rating: 5,
        image: imageMap["Abdoulaye Sow"]
      }
    ],
    en: [
      {
        name: "Amadou Diallo",
        company: "Senegal Export Corp",
        role: "Logistics Director",
        content: "Ndoukouman shipping & Services has been supporting us for 5 years with exemplary professionalism. Their responsive teams and mastery of customs procedures save us precious time.",
        rating: 5,
        image: imageMap["Amadou Diallo"]
      },
      {
        name: "Bousso Cisse",
        company: "West Africa Trading",
        role: "Import Manager",
        content: "Superior quality maritime consignment service. The transparency in operations and real-time tracking are remarkable. I highly recommend their services.",
        rating: 5,
        image: imageMap["Bousso Cisse"]
      },
      {
        name: "Abdoulaye Sow",
        company: "Atlantic Freight Solutions",
        role: "CEO",
        content: "Trusted partner for our port operations. Their expertise and responsiveness allow us to optimize our delivery times. Exceptional customer service.",
        rating: 5,
        image: imageMap["Abdoulaye Sow"]
      }
    ]
  };

  const currentTestimonials = testimonials[language];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentTestimonials.length]);

  // Utilitaire pour initiales (Marie-Claire Ndiaye → "MC")
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);
  }

  return (
    <section className="py-20 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">
            {language === 'fr' ? 'Témoignages Clients' : 'Client Testimonials'}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'La satisfaction de nos clients est notre priorité absolue'
              : "Our clients' satisfaction is our absolute priority"
            }
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Ken Burns background effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden opacity-10"
                animate={{ scale: [1, 1.05] }}
                transition={{ duration: 6, ease: "linear" }}
              >
                <img
                  src={currentTestimonials[currentIndex].image}
                  alt=""
                  className="w-full h-full object-cover"
                  key={`bg-${currentTestimonials[currentIndex].name}`}
                />
              </motion.div>

              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-8 lg:p-12 text-center">
                  <Quote className="h-12 w-12 text-white mx-auto mb-6" />
                  <blockquote className="text-lg lg:text-xl leading-relaxed mb-8 italic">
                    "{currentTestimonials[currentIndex].content}"
                  </blockquote>
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(currentTestimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-white fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-white">
                      <AvatarImage
                        src={currentTestimonials[currentIndex].image}
                        alt={currentTestimonials[currentIndex].name}
                        key={`avatar-img-${currentTestimonials[currentIndex].name}`}
                        className="object-cover w-16 h-16"
                      />
                      <AvatarFallback className="bg-white text-primary border-2 border-white text-sm font-semibold w-16 h-16 flex items-center justify-center">
                        {getInitials(currentTestimonials[currentIndex].name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold text-lg">
                        {currentTestimonials[currentIndex].name}
                      </div>
                      <div className="text-white/80 text-sm">
                        {currentTestimonials[currentIndex].role}
                      </div>
                      <div className="text-white text-sm font-medium">
                        {currentTestimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {currentTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;

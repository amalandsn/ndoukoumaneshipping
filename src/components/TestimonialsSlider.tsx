import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
        content: "Ndoukoumane Shipping & Services nous accompagne depuis 5 ans avec un professionnalisme exemplaire. Leurs équipes réactives et leur maîtrise des procédures douanières nous font gagner un temps précieux.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=400&fit=crop&crop=faces" // Personne africaine
      },
      {
        name: "Marie-Claire Ndiaye",
        company: "West Africa Trading",
        role: "Responsable Import",
        content: "Un service de consignation maritime de qualité supérieure. La transparence dans les opérations et le suivi en temps réel sont remarquables. Je recommande vivement leurs services.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop&crop=faces" // Personne/femme africaine
      },
      {
        name: "Jean-Baptiste Sarr",
        company: "Atlantic Freight Solutions",
        role: "CEO",
        content: "Partenaire de confiance pour nos opérations portuaires. Leur expertise et leur réactivité nous permettent d'optimiser nos délais de livraison. Un service client exceptionnel.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=400&fit=crop&crop=faces" // Personne africaine ou scène africaine
      }
    ],
    en: [
      {
        name: "Amadou Diallo",
        company: "Senegal Export Corp",
        role: "Logistics Director",
        content: "Ndoukoumane Shipping & Services has been supporting us for 5 years with exemplary professionalism. Their responsive teams and mastery of customs procedures save us precious time.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=400&fit=crop&crop=faces"
      },
      {
        name: "Marie-Claire Ndiaye",
        company: "West Africa Trading",
        role: "Import Manager",
        content: "Superior quality maritime consignment service. The transparency in operations and real-time tracking are remarkable. I highly recommend their services.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop&crop=faces"
      },
      {
        name: "Jean-Baptiste Sarr",
        company: "Atlantic Freight Solutions",
        role: "CEO",
        content: "Trusted partner for our port operations. Their expertise and responsiveness allow us to optimize our delivery times. Exceptional customer service.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=400&fit=crop&crop=faces"
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
    <section className="py-20 bg-blue-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">
            {language === 'fr' ? 'Témoignages Clients' : 'Client Testimonials'}
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'La satisfaction de nos clients est notre priorité absolue'
              : 'Our clients\' satisfaction is our absolute priority'
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
                  <Quote className="h-12 w-12 text-orange-400 mx-auto mb-6" />
                  <blockquote className="text-lg lg:text-xl leading-relaxed mb-8 italic">
                    "{currentTestimonials[currentIndex].content}"
                  </blockquote>
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(currentTestimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-orange-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-orange-400">
                      <AvatarImage
                        src={currentTestimonials[currentIndex].image}
                        alt={currentTestimonials[currentIndex].name}
                        key={`avatar-img-${currentTestimonials[currentIndex].name}`}
                        className="object-cover w-16 h-16"
                      />
                      <AvatarFallback className="bg-blue-900 text-white border-2 border-orange-400 text-sm font-semibold w-16 h-16 flex items-center justify-center">
                        {getInitials(currentTestimonials[currentIndex].name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold text-lg">
                        {currentTestimonials[currentIndex].name}
                      </div>
                      <div className="text-blue-200 text-sm">
                        {currentTestimonials[currentIndex].role}
                      </div>
                      <div className="text-orange-400 text-sm font-medium">
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
                  index === currentIndex ? 'bg-orange-400' : 'bg-white/30'
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


import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Ship, 
  FileText, 
  Truck, 
  CheckCircle, 
  Clock, 
  Anchor 
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const processImages = [
  "/hero-arrivee.webp",      // 1. vessel arrival
  "/hero-formalites.webp",   // 2. customs officer
  "/hero-amarre.webp",       // 3. orange rope on bollard
  "/hero-manut-step.webp",   // 4. container sling
  "/transit-douane.webp",    // 5. customs transit
  "/livraison.webp"          // 6. delivery
];

const ProcessTimeline = () => {
  const { language } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  const processSteps = {
    fr: [
      {
        icon: <Ship className="h-8 w-8" />,
        title: "Arrivée du navire",
        description: "Notification et préparation de l'escale"
      },
      {
        icon: <FileText className="h-8 w-8" />,
        title: "Formalités portuaires",
        description: "Traitement des documents et autorisations"
      },
      {
        icon: <Anchor className="h-8 w-8" />,
        title: "Amarrage",
        description: "Positionnement et sécurisation du navire"
      },
      {
        icon: <Truck className="h-8 w-8" />,
        title: "Manutention",
        description: "Chargement/déchargement des marchandises"
      },
      {
        icon: <Clock className="h-8 w-8" />,
        title: "Transit douanier",
        description: "Dédouanement et contrôles réglementaires"
      },
      {
        icon: <CheckCircle className="h-8 w-8" />,
        title: "Livraison",
        description: "Remise des marchandises au destinataire"
      }
    ],
    en: [
      {
        icon: <Ship className="h-8 w-8" />,
        title: "Vessel arrival",
        description: "Notification and call preparation"
      },
      {
        icon: <FileText className="h-8 w-8" />,
        title: "Port formalities",
        description: "Document processing and authorizations"
      },
      {
        icon: <Anchor className="h-8 w-8" />,
        title: "Mooring",
        description: "Vessel positioning and securing"
      },
      {
        icon: <Truck className="h-8 w-8" />,
        title: "Cargo handling",
        description: "Loading/unloading operations"
      },
      {
        icon: <Clock className="h-8 w-8" />,
        title: "Customs transit",
        description: "Clearance and regulatory controls"
      },
      {
        icon: <CheckCircle className="h-8 w-8" />,
        title: "Delivery",
        description: "Goods handover to consignee"
      }
    ]
  };

  const steps = processSteps[language];

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isScrolling) return;

    let animationId: number;
    let startTime: number;
    const scrollSpeed = 30; // pixels per second
    const pauseDuration = 2000; // pause at each end for 2 seconds
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // Calculate scroll position with pauses at both ends
      const cycleDuration = (maxScroll / scrollSpeed * 1000) + (pauseDuration * 2);
      const cycleProgress = (elapsed % cycleDuration) / cycleDuration;
      
      let scrollPosition = 0;
      if (cycleProgress < 0.1) {
        // Pause at start
        scrollPosition = 0;
      } else if (cycleProgress < 0.45) {
        // Scroll to end
        const scrollProgress = (cycleProgress - 0.1) / 0.35;
        scrollPosition = scrollProgress * maxScroll;
      } else if (cycleProgress < 0.55) {
        // Pause at end
        scrollPosition = maxScroll;
      } else if (cycleProgress < 0.9) {
        // Scroll back to start
        const scrollProgress = (cycleProgress - 0.55) / 0.35;
        scrollPosition = maxScroll * (1 - scrollProgress);
      } else {
        // Pause at start
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isScrolling]);

  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
            {language === 'fr' ? 'Notre Processus' : 'Our Process'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Six étapes optimisées pour un service efficace et transparent'
              : 'Six optimized steps for efficient and transparent service'
            }
          </p>
        </div>

        {/* Desktop Scrolling Timeline */}
        <div className="hidden lg:block">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Duplicate steps for seamless infinite scroll effect */}
            {[...steps, ...steps].map((step, index) => (
              <motion.div
                key={`${index}-${index >= steps.length ? 'duplicate' : 'original'}`}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % steps.length) * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                    <img
                      src={processImages[index % steps.length]}
                      alt={step.title}
                      className="h-full w-full object-cover rounded-t-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002A5Ccc] via-transparent rounded-t-xl" />
                    <div className="absolute left-3 top-3 bg-[#FF7A00] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow">
                      {String((index % steps.length) + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <CardContent className="p-8 text-center pt-4">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Static Grid */}
        <div className="lg:hidden">
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg">
                  <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
                    <img
                      src={processImages[index]}
                      alt={step.title}
                      className="h-full w-full object-cover rounded-t-xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002A5Ccc] via-transparent rounded-t-xl" />
                    <div className="absolute left-3 top-3 bg-[#FF7A00] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <CardContent className="p-6 text-center pt-3">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

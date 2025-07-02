
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getQuoteRoute } from '@/lib/routes';

type Slide = {
  src: string;
  fallback: string;
  alt: string;
  titleFR: string;
  titleEN: string;
  subtitleFR: string;
  subtitleEN: string;
};

const slides: Slide[] = [
  {
    src: "/hero-consignation.webp",
    fallback: "/hero-consignation.webp",
    alt: "Grue chargeant des conteneurs – consignation",
    titleFR: "Votre partenaire logistique 360°",
    subtitleFR: "Maritime, aérien, routier",
    titleEN: "Your 360° Logistics Partner",
    subtitleEN: "Sea, Air & Road",
  },
  {
    src: "/hero-manutention.webp",
    fallback: "/hero-manutention.webp",
    alt: "Manutention de conteneurs en Afrique de l'Ouest",
    titleFR: "Manutention rapide & sécurisée",
    subtitleFR: "Chargement et déchargement optimisés",
    titleEN: "Fast & secure cargo handling",
    subtitleEN: "Optimised loading and unloading",
  },
  {
    src: "/hero-transit.webp",
    fallback: "/hero-transit.webp",
    alt: "Camions quittant le port – transit",
    titleFR: "Transit & logistique intégrés",
    subtitleFR: "Acheminement fluide de vos marchandises",
    titleEN: "Seamless transit logistics",
    subtitleEN: "Smooth transportation of your goods",
  },
];

const fx = {
  enter: (d: number) => ({ opacity: 0, scale: 1, x: d > 0 ? 60 : -60 }),
  center:              { opacity: 1, scale: 1.05, x: 0 },
  exit:  (d: number) => ({ opacity: 0, scale: 1.1, x: d > 0 ? -60 : 60 }),
};
const TRANS = { duration: 1, ease: [0.4, 0, 0.2, 1] as const };

export default function HeroCarousel() {
  const [lang, setLang] = useState(document.documentElement.lang);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setLang(document.documentElement.lang);
    window.addEventListener("lang-change", handler);
    return () => window.removeEventListener("lang-change", handler);
  }, []);
  const isFR = lang.startsWith("fr");

  const [[idx, dir], set] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const id = setInterval(() => set(([i]) => [(i + 1) % slides.length, 1]), 7000);
    return () => clearInterval(id);
  }, []);
  const paginate = (d: number) => set(([i]) => [(i + d + slides.length) % slides.length, d]);

  const { src, fallback, alt, titleFR, titleEN, subtitleFR, subtitleEN } = slides[idx];

  const handleQuoteClick = () => {
    const locale = isFR ? 'fr' : 'en';
    navigate(getQuoteRoute(locale));
  };

  // Preload first image for better LCP
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = slides[0].src;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          variants={fx}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANS}
          className="absolute inset-0 w-full h-full kenburns"
        >
          <motion.img
            src={src}
            onError={(e) => (e.currentTarget.src = fallback)}
            alt={alt}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "low"}
            decoding={idx === 0 ? "sync" : "async"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              contentVisibility: idx === 0 ? 'visible' : 'auto',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay : texte spécifique au slide */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md mb-2">
          {isFR ? titleFR : titleEN}
        </h1>
        <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md">
          {isFR ? subtitleFR : subtitleEN}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleQuoteClick}
            className="bg-white text-primary py-3 px-6 rounded-lg shadow-lg hover:bg-white/90 transition font-semibold"
          >
            {isFR ? "Demander un devis" : "Request a quote"}
          </button>
          <a
            href="tel:+221774021825"
            className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 font-semibold"
          >
            <Phone className="h-4 w-4" />
            {isFR ? "Appelez 24/7" : "Call Us 24/7"}
          </a>
        </div>
      </div>

      {/* Flèches à 10 % */}
      <button
        aria-label="Slide précédente"
        onClick={() => paginate(-1)}
        className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        aria-label="Slide suivante"
        onClick={() => paginate(1)}
        className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full backdrop-blur-sm"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
}

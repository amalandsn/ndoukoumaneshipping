
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  fallback: string;
  alt: string;
  titleFR: string;
  titleEN: string;
};

const slides: Slide[] = [
  {
    src: "/hero-africa-crane.webp",
    fallback: "https://images.unsplash.com/photo-1604136262309-bc3b9985f31c?auto=format&fit=crop&w=1920&q=80",
    alt: "Grue chargeant des conteneurs – consignation",
    titleFR: "Experts en consigne portuaire",
    titleEN: "World-class vessel agency",
  },
  {
    src: "/hero-africa-forklift.webp",
    fallback: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80",
    alt: "Manutention de conteneurs en Afrique de l'Ouest",
    titleFR: "Manutention rapide & sécurisée",
    titleEN: "Safe & swift cargo handling",
  },
  {
    src: "/hero-africa-truck.webp",
    fallback: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1920&q=80",
    alt: "Camions quittant le port – transit",
    titleFR: "Transit & logistique intégrés",
    titleEN: "Seamless transit logistics",
  },
];

const fx = {
  enter: (d: number) => ({ opacity: 0, scale: 1, x: d > 0 ? 60 : -60 }),
  center:              { opacity: 1, scale: 1.05, x: 0 },
  exit:  (d: number) => ({ opacity: 0, scale: 1.1, x: d > 0 ? -60 : 60 }),
};
const TRANS = { duration: 1, ease: [0.4, 0, 0.2, 1] as const };

export default function HeroCarousel() {
  const [[idx, dir], set] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const id = setInterval(() => set(([i]) => [(i + 1) % slides.length, 1]), 7000);
    return () => clearInterval(id);
  }, []);
  const paginate = (d: number) => set(([i]) => [(i + d + slides.length) % slides.length, d]);

  const { src, fallback, alt, titleFR, titleEN } = slides[idx];

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={idx}
          src={src}
          onError={(e) => (e.currentTarget.src = fallback)}
          alt={alt}
          custom={dir}
          variants={fx}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANS}
          className="absolute inset-0 w-full h-full object-cover kenburns"
        />
      </AnimatePresence>

      {/* Overlay : texte spécifique au slide */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md leading-snug">
          {titleFR}
          <br />
          <span className="text-base md:text-xl font-light">{titleEN}</span>
        </h1>
        <a
          href="#contact"
          className="mt-6 bg-[#FF7A00] text-white py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Demander un devis
        </a>
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

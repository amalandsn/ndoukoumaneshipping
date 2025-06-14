
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = { src: string; fallback: string; alt: string };

const slides: Slide[] = [
  {
    src: "/hero-port-dakar.webp",
    fallback: "https://images.unsplash.com/photo-1588096743696-41a32196a27c?auto=format&fit=crop&w=1920&q=80",
    alt: "Container terminal in Dakar",
  },
  {
    src: "/hero-forklift.webp",
    fallback: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1920&q=80",
    alt: "Forklift stacking containers",
  },
  {
    src: "/hero-african-port.webp",
    fallback: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1920&q=80",
    alt: "Crane loading ship in an African port",
  },
];

const fx: Variants = {
  enter: (d: number) => ({ opacity: 0, scale: 1, x: d > 0 ? 50 : -50 }),
  center:              { opacity: 1, scale: 1.05, x: 0 },
  exit:  (d: number) => ({ opacity: 0, scale: 1.1, x: d > 0 ? -50 : 50 }),
};

const TRANSITION: Transition = { duration: 1, ease: [0.4, 0, 0.2, 1] };

export default function HeroCarousel() {
  const [[i, dir], set] = useState<[number, number]>([0, 0]);

  /* autoplay every 7 s */
  useEffect(() => {
    const id = setInterval(() => set(([x]) => [(x + 1) % slides.length, 1]), 7000);
    return () => clearInterval(id);
  }, []);

  const paginate = (d: number) => set(([x]) => [(x + d + slides.length) % slides.length, d]);

  const { src, fallback, alt } = slides[i];

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={i}
          src={src}
          onError={(e) => (e.currentTarget.src = fallback)}
          alt={alt}
          custom={dir}
          variants={fx}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="absolute inset-0 w-full h-full object-cover kenburns"
        />
      </AnimatePresence>

      {/* Overlay headline + CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md leading-snug">
          Construisons le futur de la consignation<br />
          <span className="text-base md:text-xl font-light">
            Building the future of stevedoring
          </span>
        </h1>
        <a
          href="#contact"
          className="mt-6 bg-[#FF7A00] text-white py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Demander un devis
        </a>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white p-2 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white p-2 rounded-full backdrop-blur-sm"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
}

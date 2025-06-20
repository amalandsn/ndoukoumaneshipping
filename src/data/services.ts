
import { Ship, Plane, Truck, Warehouse, Package, Users, Container } from 'lucide-react';

export interface ServiceData {
  slug: string;
  img: string;
  icon: any;
  titleFr: string;
  titleEn: string;
  bulletsFr: string[];
  bulletsEn: string[];
}

export const servicesData: ServiceData[] = [
  {
    slug: "sea-road",
    img: "/hero-consignation.webp",
    icon: Ship,
    titleFr: "Fret Maritime & Routier",
    titleEn: "Sea & Road Freight",
    bulletsFr: [
      "Interface avec les compagnies maritimes",
      "Expéditions sécurisées de conteneurs/palettes",
      "Sénégal–Mali–Maghreb–Amériques",
      "Délais optimisés : 10-21 jours"
    ],
    bulletsEn: [
      "Interface with shipping lines",
      "Secure container/pallet shipments",
      "Senegal–Mali–Maghreb–Americas",
      "Optimized delivery: 10-21 days"
    ]
  },
  {
    slug: "air-freight",
    img: "/hero-transit.webp",
    icon: Plane,
    titleFr: "Fret Aérien (Agent IATA)",
    titleEn: "Air Freight (IATA Agent)",
    bulletsFr: [
      "Suivi en temps réel",
      "Vols directs disponibles",
      "Optimisation des coûts",
      "Service « rapidité & confiance »"
    ],
    bulletsEn: [
      "Real-time tracking",
      "Direct flights available",
      "Cost optimization",
      "'Speed & trust' service"
    ]
  },
  {
    slug: "customs-transit",
    img: "/hero-manutention.webp",
    icon: Truck,
    titleFr: "Transit & Douane",
    titleEn: "Customs Brokerage & Transit",
    bulletsFr: [
      "Gestion des opérations administratives",
      "Pilotage commercial complet",
      "Bureau de suivi 24/7",
      "Expertise réglementaire"
    ],
    bulletsEn: [
      "Administrative operations management",
      "Complete commercial coordination",
      "24/7 monitoring desk",
      "Regulatory expertise"
    ]
  },
  {
    slug: "warehousing",
    img: "/hero-conseil.webp",
    icon: Warehouse,
    titleFr: "Entrepôts & Stockage",
    titleEn: "Warehousing & Storage",
    bulletsFr: [
      "Espaces flexibles disponibles",
      "Stockage à température contrôlée",
      "Inventaire en temps réel",
      "Solutions sur-mesure"
    ],
    bulletsEn: [
      "Flexible storage spaces",
      "Temperature-controlled storage",
      "Real-time inventory",
      "Tailor-made solutions"
    ]
  },
  {
    slug: "packaging",
    img: "/livraison.webp",
    icon: Package,
    titleFr: "Emballage & Palettisation",
    titleEn: "Packaging & Palletising",
    bulletsFr: [
      "Emballage sur-mesure",
      "Spécialisation œuvres d'art",
      "Protection marchandises fragiles",
      "Palettisation pour groupage"
    ],
    bulletsEn: [
      "Custom packaging",
      "Artwork specialization",
      "Fragile goods protection",
      "Palletisation for groupage"
    ]
  },
  {
    slug: "groupage",
    img: "/transit-douane.webp",
    icon: Users,
    titleFr: "Conteneurs de Groupage",
    titleEn: "Groupage Containers",
    bulletsFr: [
      "Expertise SN, MLI, Maghreb, Amériques",
      "Cartons & malles autorisés",
      "Service économique",
      "Délais réguliers garantis"
    ],
    bulletsEn: [
      "Expertise SN, MLI, Maghreb, Americas",
      "Cartons & trunks allowed",
      "Economical service",
      "Regular delivery guaranteed"
    ]
  },
  {
    slug: "full-containers",
    img: "/hero-arrivee.webp",
    icon: Container,
    titleFr: "Conteneurs Individuels",
    titleEn: "Full Containers",
    bulletsFr: [
      "Conteneurs dry 20' (33 m³)",
      "Conteneurs dry 40' (60 m³)",
      "Reefer disponible sur demande",
      "Options Open Top (OT)"
    ],
    bulletsEn: [
      "Dry containers 20' (33 m³)",
      "Dry containers 40' (60 m³)",
      "Reefer available on request",
      "Open Top (OT) options"
    ]
  }
];

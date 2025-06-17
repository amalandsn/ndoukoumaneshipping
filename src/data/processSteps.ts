
import { Ship, FileText, Truck, CheckCircle, Clock, Anchor } from 'lucide-react';

export const processImages = [
  "/hero-arrivee.webp",      // 1. vessel arrival
  "/hero-formalites.webp",   // 2. customs officer
  "/hero-amarre.webp",       // 3. orange rope on bollard
  "/hero-manut-step.webp",   // 4. container sling
  "/transit-douane.webp",    // 5. customs transit
  "/livraison.webp"          // 6. delivery
];

export const processStepsData = {
  fr: [
    {
      icon: Ship,
      title: "Arrivée du navire",
      description: "Notification et préparation de l'escale"
    },
    {
      icon: FileText,
      title: "Formalités portuaires",
      description: "Traitement des documents et autorisations"
    },
    {
      icon: Anchor,
      title: "Amarrage",
      description: "Positionnement et sécurisation du navire"
    },
    {
      icon: Truck,
      title: "Manutention",
      description: "Chargement/déchargement des marchandises"
    },
    {
      icon: Clock,
      title: "Transit douanier",
      description: "Dédouanement et contrôles réglementaires"
    },
    {
      icon: CheckCircle,
      title: "Livraison",
      description: "Remise des marchandises au destinataire"
    }
  ],
  en: [
    {
      icon: Ship,
      title: "Vessel arrival",
      description: "Notification and call preparation"
    },
    {
      icon: FileText,
      title: "Port formalities",
      description: "Document processing and authorizations"
    },
    {
      icon: Anchor,
      title: "Mooring",
      description: "Vessel positioning and securing"
    },
    {
      icon: Truck,
      title: "Cargo handling",
      description: "Loading/unloading operations"
    },
    {
      icon: Clock,
      title: "Customs transit",
      description: "Clearance and regulatory controls"
    },
    {
      icon: CheckCircle,
      title: "Delivery",
      description: "Goods handover to consignee"
    }
  ]
};


export interface BlogPost {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string;
  meta_description_fr: string;
  meta_description_en: string;
  keywords: string[];
  hero_image: string;
  infographic?: string;
  content_fr: string;
  content_en: string;
  key_figure_fr: string;
  key_figure_en: string;
  published_date: string;
  last_updated: string;
  category: string;
}

// Example blog posts data - this will be replaced by Supabase CMS in phase 2
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "expeditions-dakar-europe-guide-complet",
    title_fr: "Guide complet des expéditions maritimes Dakar → Europe",
    title_en: "Complete Guide to Dakar → Europe Maritime Shipments",
    meta_description_fr: "Découvrez les étapes clés pour réussir vos expéditions maritimes du port de Dakar vers l'Europe avec Ndoukoumane Shipping.",
    meta_description_en: "Discover the key steps for successful maritime shipments from Dakar port to Europe with Ndoukoumane Shipping.",
    keywords: ["expédition maritime", "port de Dakar", "Europe", "transport maritime", "logistique"],
    hero_image: "/hero-transit.webp",
    infographic: "/transit-douane.webp",
    content_fr: `
## Préparation de votre expédition maritime

L'expédition maritime depuis le **port de Dakar** vers l'Europe nécessite une planification rigoureuse. Notre équipe accompagne chaque client dans cette démarche complexe qui implique plusieurs étapes cruciales.

### Documentation et formalités douanières

La réussite de votre expédition repose sur une documentation complète :
• Facture commerciale détaillée
• Liste de colisage (packing list)
• Certificat d'origine
• Déclaration d'exportation
• Documents sanitaires si nécessaire

### Choix du type de conteneur

Selon la nature de vos marchandises, nous recommandons :
• **Conteneur 20' dry** : marchandises sèches standard
• **Conteneur 40' HC** : volumes importants
• **Conteneur frigorifique** : produits périssables
• **Conteneur open-top** : charges lourdes

## Optimisation des coûts de transport

Notre expertise du **corridor Dakar-Europe** nous permet d'optimiser vos coûts de transport maritime. Nous négocions les meilleurs tarifs avec nos partenaires armateurs.

### Transit times moyens

Les délais de transit varient selon la destination :
• Le Havre : 12-14 jours
• Anvers : 14-16 jours
• Hambourg : 15-17 jours
• Barcelone : 10-12 jours

## Suivi et traçabilité

Chaque conteneur est équipé de notre système de traçabilité IoT, permettant un suivi en temps réel de votre marchandise depuis le port de Dakar jusqu'à destination.
    `,
    content_en: `
## Preparing Your Maritime Shipment

Maritime shipping from **Dakar port** to Europe requires rigorous planning. Our team supports each client through this complex process involving several crucial steps.

### Documentation and Customs Formalities

The success of your shipment relies on complete documentation:
• Detailed commercial invoice
• Packing list
• Certificate of origin
• Export declaration
• Sanitary documents if required

### Container Type Selection

Based on your cargo nature, we recommend:
• **20' dry container**: standard dry goods
• **40' HC container**: large volumes
• **Refrigerated container**: perishable products
• **Open-top container**: heavy cargo

## Transport Cost Optimization

Our expertise in the **Dakar-Europe corridor** allows us to optimize your maritime transport costs. We negotiate the best rates with our shipping line partners.

### Average Transit Times

Transit times vary by destination:
• Le Havre: 12-14 days
• Antwerp: 14-16 days
• Hamburg: 15-17 days
• Barcelona: 10-12 days

## Tracking and Traceability

Each container is equipped with our IoT tracking system, enabling real-time monitoring of your cargo from Dakar port to destination.
    `,
    key_figure_fr: "150 000+ TEUs manipulés par an",
    key_figure_en: "150,000+ TEUs handled per year",
    published_date: "2024-12-10",
    last_updated: "2024-12-10",
    category: "Maritime Transport"
  },
  {
    id: "2", 
    slug: "pme-senegalaises-reduire-couts-consignation",
    title_fr: "Comment les PME sénégalaises peuvent réduire leurs coûts de consignation",
    title_en: "How Senegalese SMEs Can Reduce Their Consignment Costs",
    meta_description_fr: "Stratégies pratiques pour optimiser les coûts de consignation maritime au Sénégal. Guide spécial PME par Ndoukoumane Shipping.",
    meta_description_en: "Practical strategies to optimize maritime consignment costs in Senegal. SME guide by Ndoukoumane Shipping.",
    keywords: ["PME Sénégal", "coûts consignation", "optimisation", "logistique", "port autonome"],
    hero_image: "/hero-consignation.webp",
    infographic: "/livraison.webp",
    content_fr: `
## Défis spécifiques aux PME sénégalaises

Les **petites et moyennes entreprises** du Sénégal font face à des défis particuliers en matière de logistique maritime. Les coûts de consignation représentent souvent une part importante de leur budget opérationnel.

### Analyse des coûts cachés

Beaucoup de PME ne réalisent pas l'impact des frais annexes :
• Surestaries et détentions
• Frais de manutention portuaire
• Coûts de stockage prolongé
• Pénalités documentaires

### Stratégies d'optimisation

Notre approche pour les PME comprend :
• **Groupage de marchandises** : mutualisation des coûts
• **Planification anticipée** : éviter les frais d'urgence
• **Digitalisation** : réduction des erreurs documentaires

## Solutions adaptées aux PME

### Service de groupage Ndoukoumane

Notre service spécialisé pour les PME permet de :
• Partager les coûts de conteneur complet
• Bénéficier de tarifs négociés
• Accéder à notre réseau logistique

### Cas pratique : Export d'arachides

Une coopérative de Kaolack a réduit ses coûts de 25% en utilisant notre service de groupage pour ses exports vers l'Europe, passant d'un coût unitaire de 0,45€/kg à 0,34€/kg.

## Formation et accompagnement

Nous proposons des sessions de formation gratuites aux PME sur :
• Les procédures douanières
• L'optimisation logistique
• La gestion documentaire
    `,
    content_en: `
## Specific Challenges for Senegalese SMEs

**Small and medium enterprises** in Senegal face particular challenges in maritime logistics. Consignment costs often represent a significant portion of their operational budget.

### Hidden Cost Analysis

Many SMEs don't realize the impact of ancillary charges:
• Demurrage and detention
• Port handling fees
• Extended storage costs
• Documentation penalties

### Optimization Strategies

Our approach for SMEs includes:
• **Cargo consolidation**: cost sharing
• **Advance planning**: avoiding rush charges
• **Digitalization**: reducing documentation errors

## SME-Tailored Solutions

### Ndoukoumane Consolidation Service

Our specialized SME service allows to:
• Share full container costs
• Benefit from negotiated rates
• Access our logistics network

### Case Study: Groundnut Export

A Kaolack cooperative reduced costs by 25% using our consolidation service for Europe exports, dropping from €0.45/kg to €0.34/kg unit cost.

## Training and Support

We offer free training sessions to SMEs on:
• Customs procedures
• Logistics optimization
• Document management
    `,
    key_figure_fr: "25% de réduction moyenne des coûts",
    key_figure_en: "25% average cost reduction",
    published_date: "2024-12-03",
    last_updated: "2024-12-03", 
    category: "Cost Optimization"
  }
];

// Helper functions for blog data management
export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPaginatedPosts = (page: number, limit: number = 6): { posts: BlogPost[], totalPages: number } => {
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPages: Math.ceil(allPosts.length / limit)
  };
};


import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const Legal = () => {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: "Mentions Légales",
      legalNotices: {
        title: "Mentions Légales",
        content: `
          <h3>Identification de l'entreprise</h3>
          <p><strong>Raison sociale :</strong> Ndoukoumane Shipping & Services</p>
          <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</p>
          <p><strong>Siège social :</strong> Central Park, face Brigade Nationale des Sapeurs-Pompiers, Dakar, Sénégal</p>
          <p><strong>Téléphone :</strong> +221 33 822 29 80</p>
          <p><strong>Email :</strong> contact@ndoukoumaneshipping.sn</p>
          <p><strong>Directeur de publication :</strong> Ndoukoumane SALL</p>
          
          <h3>Hébergement</h3>
          <p>Ce site web est hébergé par Lovable.dev</p>
          
          <h3>Propriété intellectuelle</h3>
          <p>L'ensemble de ce site relève de la législation sénégalaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques.</p>
        `
      },
      privacy: {
        title: "Politique de Confidentialité",
        content: `
          <h3>Collecte des données personnelles</h3>
          <p>Dans le cadre de l'utilisation de notre site web et de nos services, nous sommes amenés à collecter certaines données personnelles vous concernant.</p>
          
          <h3>Finalités du traitement</h3>
          <p>Les données collectées sont utilisées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact et devis</li>
            <li>Améliorer nos services</li>
            <li>Respecter nos obligations légales et réglementaires</li>
          </ul>
          
          <h3>Conservation des données</h3>
          <p>Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles sont collectées, conformément à la réglementation sénégalaise en vigueur.</p>
          
          <h3>Vos droits</h3>
          <p>Conformément à la loi sénégalaise sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à contact@ndoukoumaneshipping.sn</p>
        `
      },
      terms: {
        title: "Conditions d'Utilisation",
        content: `
          <h3>Objet</h3>
          <p>Les présentes conditions générales d'utilisation ont pour objet de définir les modalités et conditions d'utilisation du site web de Ndoukoumane Shipping & Services.</p>
          
          <h3>Accès au site</h3>
          <p>L'accès au site est gratuit. Tous les coûts afférents à l'accès au site, que ce soit les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur.</p>
          
          <h3>Responsabilité</h3>
          <p>Ndoukoumane Shipping & Services s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.</p>
          
          <h3>Droit applicable</h3>
          <p>Les présentes conditions d'utilisation sont régies par le droit sénégalais. En cas de litige, les tribunaux sénégalais seront seuls compétents.</p>
        `
      }
    },
    en: {
      title: "Legal Information",
      legalNotices: {
        title: "Legal Notices",
        content: `
          <h3>Company Identification</h3>
          <p><strong>Company name:</strong> Ndoukoumane Shipping & Services</p>
          <p><strong>Legal form:</strong> Limited Liability Company (SARL)</p>
          <p><strong>Registered office:</strong> Central Park, opposite National Fire Brigade HQ, Dakar, Senegal</p>
          <p><strong>Phone:</strong> +221 33 822 29 80</p>
          <p><strong>Email:</strong> contact@ndoukoumaneshipping.sn</p>
          <p><strong>Publication director:</strong> Ndoukoumane SALL</p>
          
          <h3>Hosting</h3>
          <p>This website is hosted by Lovable.dev</p>
          
          <h3>Intellectual Property</h3>
          <p>This entire site falls under Senegalese and international legislation on copyright and intellectual property. All reproduction rights are reserved, including for iconographic and photographic documents.</p>
        `
      },
      privacy: {
        title: "Privacy Policy",
        content: `
          <h3>Personal Data Collection</h3>
          <p>In the context of using our website and services, we may collect certain personal data concerning you.</p>
          
          <h3>Processing Purposes</h3>
          <p>The collected data is used to:</p>
          <ul>
            <li>Respond to your contact requests and quotes</li>
            <li>Improve our services</li>
            <li>Comply with our legal and regulatory obligations</li>
          </ul>
          
          <h3>Data Retention</h3>
          <p>Your data is retained for the period necessary for the purposes for which it is collected, in accordance with current Senegalese regulations.</p>
          
          <h3>Your Rights</h3>
          <p>In accordance with Senegalese law on personal data protection, you have the right to access, rectify and delete your personal data. To exercise these rights, contact us at contact@ndoukoumaneshipping.sn</p>
        `
      },
      terms: {
        title: "Terms of Use",
        content: `
          <h3>Purpose</h3>
          <p>These general terms of use aim to define the terms and conditions of use of the Ndoukoumane Shipping & Services website.</p>
          
          <h3>Site Access</h3>
          <p>Access to the site is free. All costs related to accessing the site, whether hardware, software or internet access fees are exclusively borne by the user.</p>
          
          <h3>Responsibility</h3>
          <p>Ndoukoumane Shipping & Services strives to ensure the accuracy and updating of information published on this site. However, it cannot guarantee the accuracy, precision or completeness of the information made available.</p>
          
          <h3>Applicable Law</h3>
          <p>These terms of use are governed by Senegalese law. In case of dispute, Senegalese courts will have sole jurisdiction.</p>
        `
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentContent.title}
          </motion.h1>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Legal Notices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{currentContent.legalNotices.title}</h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.legalNotices.content }}
            />
          </motion.div>

          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{currentContent.privacy.title}</h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.privacy.content }}
            />
          </motion.div>

          {/* Terms of Use */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{currentContent.terms.title}</h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.terms.content }}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Legal;

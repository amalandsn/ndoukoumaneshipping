
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const Legal = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // Scroll to section based on hash in URL
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const content = {
    fr: {
      title: "Mentions Légales",
      legalNotices: {
        title: "Mentions Légales",
        content: `
          <h3>Identification de l'entreprise</h3>
          <p><strong>Raison sociale :</strong> Ndoukoumane Shipping & Services</p>
          <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée (SARL)</p>
          <p><strong>Capital social :</strong> 4 000 000 000 FCFA</p>
          
          <h3>Siège Social & Contact</h3>
          <p><strong>Adresse :</strong> Central Park ex 4 c Avenue Malick Sy Bureau 3008 Dakar, Sénégal</p>
          <p><strong>Téléphone :</strong> +221 33 822 29 80</p>
          <p><strong>Email :</strong> contact@ndoukoumaneshipping.sn</p>
          <p><strong>Site web :</strong> www.ndoukoumaneshipping.sn</p>
          
          <h3>Propriété Intellectuelle</h3>
          <p>L'ensemble du contenu de ce site web (textes, images, vidéos, logos, graphismes, etc.) est protégé par les dispositions du Code de la propriété intellectuelle sénégalais et les conventions internationales.</p>
        `
      },
      privacy: {
        title: "Politique de Confidentialité",
        content: `
          <p>Les informations collectées via les formulaires (contact, candidature, demande de devis) sont destinées exclusivement au traitement de votre requête et à notre relation commerciale.</p>
          
          <p>Conformément à la loi n°2008-12 du 25 janvier 2008 sur la protection des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.</p>
          
          <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.</p>
        `
      },
      terms: {
        title: "Conditions d'Utilisation",
        content: `
          <p>Les présentes conditions générales d'utilisation ont pour objet de définir les modalités et conditions d'utilisation du site web de Ndoukoumane Shipping & Services.</p>
          
          <h3>Accès au site</h3>
          <p>L'accès au site est gratuit. Tous les coûts afférents à l'accès au site, que ce soit les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur.</p>
          
          <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant votre navigation, vous acceptez l'utilisation de ces cookies.</p>
          
          <h3>Limitation de Responsabilité</h3>
          <p>Les informations contenues sur ce site sont aussi précises que possible. Toutefois, nous ne pouvons garantir l'exactitude, la complétude et l'actualité des informations diffusées.</p>
          
          <p>L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.</p>
          
          <h3>Conformité Réglementaire Sénégalaise</h3>
          <p>Ce site respecte la réglementation sénégalaise en vigueur, notamment les dispositions de l'ARTP (Autorité de Régulation des Télécommunications et des Postes) et de la CDP (Commission des Données Personnelles).</p>
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
          <p><strong>Share capital:</strong> 4,000,000,000 FCFA</p>
          
          <h3>Registered Office & Contact</h3>
          <p><strong>Address:</strong> Central Park ex 4 c Avenue Malick Sy Bureau 3008 Dakar, Senegal</p>
          <p><strong>Phone:</strong> +221 33 822 29 80</p>
          <p><strong>Email:</strong> contact@ndoukoumaneshipping.sn</p>
          <p><strong>Website:</strong> www.ndoukoumaneshipping.sn</p>
          
          <h3>Intellectual Property</h3>
          <p>All content on this website (texts, images, videos, logos, graphics, etc.) is protected by the provisions of the Senegalese Intellectual Property Code and international conventions.</p>
        `
      },
      privacy: {
        title: "Privacy Policy",
        content: `
          <p>Information collected via forms (contact, application, quote request) is intended exclusively for processing your request and our business relationship.</p>
          
          <p>In accordance with law n°2008-12 of January 25, 2008 on the protection of personal data, you have the right to access, rectify and delete data concerning you.</p>
          
          <p>Any reproduction, representation, modification, publication, adaptation of all or part of the site elements, whatever the means or process used, is prohibited, except with prior written authorization.</p>
        `
      },
      terms: {
        title: "Terms of Use",
        content: `
          <p>These general terms of use aim to define the terms and conditions of use of the Ndoukoumane Shipping & Services website.</p>
          
          <h3>Site Access</h3>
          <p>Access to the site is free. All costs related to accessing the site, whether hardware, software or internet access fees are exclusively borne by the user.</p>
          
          <p>This site uses cookies to improve user experience and analyze traffic. By continuing your navigation, you accept the use of these cookies.</p>
          
          <h3>Limitation of Liability</h3>
          <p>The information contained on this site is as accurate as possible. However, we cannot guarantee the accuracy, completeness and timeliness of the information disseminated.</p>
          
          <p>The user acknowledges using this information under his exclusive responsibility.</p>
          
          <h3>Senegalese Regulatory Compliance</h3>
          <p>This site complies with current Senegalese regulations, particularly the provisions of ARTP (Telecommunications and Postal Regulation Authority) and CDP (Personal Data Commission).</p>
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
            id="mentions-legales"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{currentContent.legalNotices.title}</h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.legalNotices.content }}
            />
          </motion.div>

          {/* Privacy Policy */}
          <motion.div
            id="politique-confidentialite"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{currentContent.privacy.title}</h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.privacy.content }}
            />
          </motion.div>

          {/* Terms of Use */}
          <motion.div
            id="conditions-utilisation"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900">{currentContent.terms.title}</h2>
            <div 
              className="prose prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.terms.content }}
            />
          </motion.div>
        </div>
      </section>

      <ChatAssistant />

      <Footer />
    </div>
  );
};

export default Legal;

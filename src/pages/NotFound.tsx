import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            {language === 'fr' ? 'Page non trouvée' : 'Page Not Found'}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            {language === 'fr'
              ? "La page que vous recherchez n'existe pas ou a été déplacée."
              : 'The page you are looking for does not exist or has been moved.'}
          </p>
          <Link to="/" className="text-blue-600 hover:underline">
            {language === 'fr' ? 'Retour à la page d\'accueil' : 'Back to Homepage'}
          </Link>
        </div>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default NotFound;


import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import { useLanguage } from '@/hooks/useLanguage';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuoteSuccess = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
            {language === 'fr' ? 'Demande reçue !' : 'Request received!'}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Merci pour votre demande de devis. Notre équipe vous répondra dans les 24 heures.'
              : 'Thank you for your quote request. Our team will respond within 24 hours.'
            }
          </p>
          {ref && (
            <div className="bg-white rounded-lg p-6 inline-block mb-8 shadow-lg">
              <p className="text-sm text-gray-500 mb-2">
                {language === 'fr' ? 'Référence de votre demande :' : 'Your request reference:'}
              </p>
              <p className="text-2xl font-mono font-bold text-blue-900">{ref}</p>
            </div>
          )}
          <Button asChild className="bg-blue-900 hover:bg-blue-800">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default QuoteSuccess;

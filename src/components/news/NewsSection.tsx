
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsGrid from './NewsGrid';

const NewsSection = () => {
  const { language } = useLanguage();

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['news', 'shipping-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('source', 'Actualités Maritimes')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error('Error fetching shipping news:', error);
        throw error;
      }
      
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    console.error('News fetch error:', error);
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="h-8 w-8 text-blue-900 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'fr' ? 'Actualités du secteur maritime' : 'Maritime Industry News'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Mise à jour chaque lundi matin – sélection de 5 articles francophones traduits'
              : 'Updated every Monday – 5 curated French-language articles translated'}
          </p>
        </div>

        <NewsGrid news={news || []} isLoading={isLoading} />

        {news && news.length > 0 && (
          <div className="text-center mt-12">
            <Link to={language === 'fr' ? '/actualites-secteur' : '/industry-news'}>
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
                {language === 'fr' ? 'Voir toutes les actualités' : 'View all news'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;

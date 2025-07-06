
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface NewsItem {
  id: string;
  source: string;
  title_fr: string;
  title_en: string;
  slug: string;
  url: string;
  excerpt_fr: string;
  excerpt_en: string;
  published_at: string;
  fetched_at: string;
}

const IndustryNewsContent = () => {
  const { language } = useLanguage();

  const { data: news, isLoading, error } = useQuery({
    queryKey: ['industry-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .or('source.ilike.%Port Autonome de Dakar%,source.ilike.%Port de Dakar%')
        .order('published_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching industry news:', error);
        throw error;
      }
      
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    console.error('News fetch error:', error);
  }

  // Sort articles by published date (most recent first)
  const sortedNews = news ? [...news].sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  }) : [];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Newspaper className="h-8 w-8 text-blue-900 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            {language === 'fr' ? 'Actualités du Secteur Portuaire' : 'Port Industry News'}
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'fr' 
            ? 'Découvrez les dernières actualités du Port Autonome de Dakar et du secteur maritime sénégalais'
            : 'Discover the latest news from Port Autonome de Dakar and the Senegalese maritime sector'}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !sortedNews || sortedNews.length === 0 ? (
        <div className="text-center py-16">
          <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {language === 'fr' 
              ? 'Aucune actualité disponible' 
              : 'No news available'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {language === 'fr' 
              ? 'Les actualités du Port Autonome de Dakar seront synchronisées automatiquement chaque lundi matin.' 
              : 'Port Autonome de Dakar news will be automatically synchronized every Monday morning.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNews.map((item) => {
            // Display French by default, English only if explicitly requested and available
            const displayTitle = language === 'en' && item.title_en ? item.title_en : (item.title_fr || item.title_en);
            const displayExcerpt = language === 'en' && item.excerpt_en ? item.excerpt_en : (item.excerpt_fr || item.excerpt_en);
            
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-blue-100 text-blue-800"
                    >
                      {item.source}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {format(
                        new Date(item.published_at), 
                        'dd MMM yyyy',
                        { locale: language === 'fr' ? fr : enUS }
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {displayTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  {displayExcerpt && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                      {displayExcerpt}
                    </p>
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mt-auto"
                  >
                    {language === 'fr' ? 'Lire l\'article complet' : 'Read full article'}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {sortedNews && sortedNews.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {language === 'fr' 
              ? 'Les actualités sont mises à jour automatiquement chaque lundi matin' 
              : 'News are automatically updated every Monday morning'}
          </p>
        </div>
      )}
    </div>
  );
};

export default IndustryNewsContent;


import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsGrid from '@/components/news/NewsGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Newspaper } from 'lucide-react';

const IndustryNews = () => {
  const { language } = useLanguage();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const { data: news, isLoading, error, refetch } = useQuery({
    queryKey: ['news', 'all', selectedSource],
    queryFn: async () => {
      let query = supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false });

      if (selectedSource) {
        query = query.eq('source', selectedSource);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: sources } = useQuery({
    queryKey: ['news', 'sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('source')
        .order('source');
      
      if (error) throw error;
      
      // Get unique sources
      const uniqueSources = [...new Set(data.map(item => item.source))];
      return uniqueSources;
    },
  });

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600">
            {language === 'fr' 
              ? 'Erreur lors du chargement des actualités.' 
              : 'Error loading news.'}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Newspaper className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">
              {language === 'fr' ? 'Actualités du Secteur' : 'Industry News'}
            </h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            {language === 'fr' 
              ? 'Découvrez les dernières actualités du transport maritime, des ports et de la logistique en Afrique de l\'Ouest et dans le monde'
              : 'Discover the latest news in maritime transport, ports and logistics in West Africa and worldwide'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {language === 'fr' ? 'Filtrer par source:' : 'Filter by source:'}
            </span>
            <Button
              variant={selectedSource === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSource(null)}
            >
              {language === 'fr' ? 'Toutes' : 'All'}
            </Button>
            {sources?.map((source) => (
              <Badge
                key={source}
                variant={selectedSource === source ? "default" : "secondary"}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedSource(selectedSource === source ? null : source)}
              >
                {source}
              </Badge>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {language === 'fr' ? 'Actualiser' : 'Refresh'}
          </Button>
        </div>

        {/* News Grid */}
        <NewsGrid news={news || []} isLoading={isLoading} />

        {/* Stats */}
        {news && news.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              {language === 'fr' 
                ? `${news.length} article${news.length > 1 ? 's' : ''} trouvé${news.length > 1 ? 's' : ''}${selectedSource ? ` pour ${selectedSource}` : ''}`
                : `${news.length} article${news.length > 1 ? 's' : ''} found${selectedSource ? ` for ${selectedSource}` : ''}`}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default IndustryNews;

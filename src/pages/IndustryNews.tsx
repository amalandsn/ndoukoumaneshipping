
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsGrid from '@/components/news/NewsGrid';
import { Button } from '@/components/ui/button';
import { RefreshCw, Newspaper, Download } from 'lucide-react';
import { toast } from 'sonner';

const IndustryNews = () => {
  const { language } = useLanguage();
  const [isSyncing, setIsSyncing] = useState(false);

  const { data: news, isLoading, error, refetch } = useQuery({
    queryKey: ['news', 'port-autonome'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .ilike('source', '%port autonome%')
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleSyncNews = async () => {
    setIsSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-weekly-news', {
        body: {}
      });
      
      if (error) {
        console.error('Sync error:', error);
        toast.error(language === 'fr' ? 'Erreur lors de la synchronisation' : 'Sync error occurred');
      } else {
        console.log('Sync result:', data);
        toast.success(language === 'fr' ? 'Synchronisation réussie!' : 'Sync completed successfully!');
        // Refresh the news data
        refetch();
      }
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error(language === 'fr' ? 'Échec de la synchronisation' : 'Sync failed');
    } finally {
      setIsSyncing(false);
    }
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
              {language === 'fr' ? 'Actualités du Port Autonome de Dakar' : 'Port Autonome de Dakar News'}
            </h1>
          </div>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            {language === 'fr' 
              ? 'Découvrez les dernières actualités du Port Autonome de Dakar'
              : 'Discover the latest news from Port Autonome de Dakar'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-4 mb-8">
          <div className="flex gap-2">
            {/* Temporary Sync Button - Remove after first successful sync */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncNews}
              disabled={isSyncing}
              className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              <Download className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {language === 'fr' ? 'Sync Initial' : 'Initial Sync'}
            </Button>
            
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
        </div>

        {/* News Grid */}
        <NewsGrid news={news || []} isLoading={isLoading} />

        {/* Stats */}
        {news && news.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              {language === 'fr' 
                ? `${news.length} article${news.length > 1 ? 's' : ''} trouvé${news.length > 1 ? 's' : ''} du Port Autonome de Dakar`
                : `${news.length} article${news.length > 1 ? 's' : ''} found from Port Autonome de Dakar`}
            </p>
          </div>
        )}

        {/* Empty state with sync suggestion */}
        {(!news || news.length === 0) && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {language === 'fr' 
                ? 'Aucune actualité disponible du Port Autonome de Dakar. Cliquez sur "Sync Initial" pour charger les actualités.' 
                : 'No news available from Port Autonome de Dakar. Click "Initial Sync" to load news articles.'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default IndustryNews;

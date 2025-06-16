
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
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
  display_order?: number;
}

interface NewsGridProps {
  news: NewsItem[];
  isLoading?: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ news, isLoading }) => {
  const { language } = useLanguage();

  if (isLoading) {
    return (
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
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          {language === 'fr' 
            ? 'Aucune actualité disponible pour le moment.' 
            : 'No news available at the moment.'}
        </p>
      </div>
    );
  }

  // Sort articles: PAD first (display_order: 1), then PTI (display_order: 2), 
  // and within each group, sort by published date (most recent first)
  const sortedNews = [...news].sort((a, b) => {
    // First sort by display_order (PAD=1, PTI=2)
    const orderA = a.display_order || (a.source.includes('Port Autonome') ? 1 : 2);
    const orderB = b.display_order || (b.source.includes('Port Autonome') ? 1 : 2);
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    
    // Then sort by published date (most recent first)
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedNews.map((item) => {
        // Display French by default, English only if explicitly requested and available
        const displayTitle = language === 'en' && item.title_en ? item.title_en : (item.title_fr || item.title_en);
        const displayExcerpt = language === 'en' && item.excerpt_en ? item.excerpt_en : (item.excerpt_fr || item.excerpt_en);
        
        return (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    item.source.includes('Port Autonome') 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}
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
              <CardTitle className="text-base leading-tight">
                {displayTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {displayExcerpt && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {displayExcerpt}
                </p>
              )}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {language === 'fr' ? 'Lire la suite' : 'Read more'}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NewsGrid;

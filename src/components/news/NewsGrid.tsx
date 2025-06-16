
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
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
              {language === 'fr' ? item.title_fr : item.title_en}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {language === 'fr' ? item.excerpt_fr : item.excerpt_en}
            </p>
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
      ))}
    </div>
  );
};

export default NewsGrid;

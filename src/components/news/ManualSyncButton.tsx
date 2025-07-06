
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const ManualSyncButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const queryClient = useQueryClient();

  const handleSync = async () => {
    setIsLoading(true);
    try {
      console.log('Starting manual news sync...');
      
      const response = await fetch('/functions/v1/sync-shipping-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log('Sync result:', result);

      if (result.success) {
        toast({
          title: language === 'fr' ? 'Synchronisation réussie' : 'Sync successful',
          description: language === 'fr' 
            ? `${result.synced} articles synchronisés avec succès` 
            : `${result.synced} articles synced successfully`,
        });
        
        // Invalidate and refetch the news queries
        queryClient.invalidateQueries({ queryKey: ['news'] });
        queryClient.invalidateQueries({ queryKey: ['industry-news'] });
      } else {
        throw new Error(result.message || 'Sync failed');
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: language === 'fr' ? 'Erreur de synchronisation' : 'Sync error',
        description: language === 'fr' 
          ? 'Impossible de synchroniser les actualités' 
          : 'Failed to sync news',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSync} 
      disabled={isLoading}
      className="mb-8 bg-blue-900 hover:bg-blue-800"
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading 
        ? (language === 'fr' ? 'Synchronisation...' : 'Syncing...') 
        : (language === 'fr' ? 'Synchroniser les actualités' : 'Sync news')
      }
    </Button>
  );
};

export default ManualSyncButton;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManualSyncButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    setIsLoading(true);
    try {
      console.log('Calling sync function...');
      const response = await fetch('https://wlockltbwthtkslluzhh.supabase.co/functions/v1/sync-weekly-news', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indsb2NrbHRid3RodGtzbGx1emhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODcyODgsImV4cCI6MjA2NTY2MzI4OH0.598qkGLuo8BdMIB77y5cZgnkU2-WLjnENv7p6b_BK68',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Sync response:', data);

      if (data.success) {
        toast({
          title: "Synchronisation réussie",
          description: `${data.synced} articles synchronisés depuis le Port Autonome de Dakar`,
        });
        // Reload the page to show new articles
        window.location.reload();
      } else {
        throw new Error(data.message || 'Erreur lors de la synchronisation');
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Erreur de synchronisation",
        description: "Impossible de synchroniser les actualités pour le moment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSync} 
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="mb-6"
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading ? 'Synchronisation...' : 'Synchroniser les actualités'}
    </Button>
  );
};

export default ManualSyncButton;

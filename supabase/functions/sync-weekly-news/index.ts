
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { scrapePADEspaceMedia } from './scrapers/pad-espace-media.ts';
import { scrapePADDirect } from './scrapers/pad-direct.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting PAD news sync...');
    
    const [padEspace, padDirect] = await Promise.all([
      scrapePADEspaceMedia(),     // PAD espace-media (2 articles)
      scrapePADDirect(),          // PAD direct site (1 article)
    ]);
    
    // Combiner les sources PAD pour un total de 3 articles maximum
    const rows = [...padEspace, ...padDirect];
    console.log(`Total PAD articles to sync: ${rows.length} (PAD espace: ${padEspace.length}, PAD direct: ${padDirect.length})`);
    
    if (rows.length) {
      const { error } = await sb.from("news").upsert(rows, { 
        onConflict: "slug",
        ignoreDuplicates: false 
      });
      if (error) {
        console.error('Database upsert error:', error);
        throw error;
      }
      console.log(`Successfully synced ${rows.length} PAD articles`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: rows.length,
        pad_espace_articles: padEspace.length,
        pad_direct_articles: padDirect.length,
        message: 'PAD news sync completed successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error('PAD news sync failed:', e);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: e.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

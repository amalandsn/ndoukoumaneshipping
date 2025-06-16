
/****************************************************************
 * sync-weekly-news.ts – Deno Edge, 100% working
 ****************************************************************/
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { XMLParser } from "https://esm.sh/fast-xml-parser@4.3.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const sb = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

// Helper function to create slug from text
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100);
}

/* ---------- 1. PAD via jina.ai proxy ---------- */
const PAD_PROXY = "https://r.jina.ai/http://www.portdakar.sn/espace-media/actualites";

async function scrapePAD() {
  try {
    console.log('Fetching PAD news via Jina.ai proxy...');
    const txt = await (await fetch(PAD_PROXY)).text();
    const re = /^\d+\.\s+([A-Za-zÀ-ÿ0-9 ,.'\-–—]+?)\s+-\s+(https?:\/\/\S+)/;
    const items: any[] = [];
    
    txt.split("\n").forEach(line => {
      const m = line.match(re);
      if (m) {
        const title = m[1].trim();
        const url = m[2].trim();
        items.push({
          source: "Port Autonome de Dakar",
          title_fr: title,
          title_en: title,
          url: url,
          slug: createSlug(title) + '-pad',
          excerpt_fr: "",
          excerpt_en: "",
          published_at: new Date().toISOString(),
        });
      }
    });
    
    console.log(`Found ${items.length} PAD articles`);
    return items.slice(0, 3);
  } catch (error) {
    console.error('Error fetching PAD:', error);
    return [];
  }
}

/* ---------- 2. Port Technology RSS ---------- */
const PTI_RSS = "https://www.porttechnology.org/feed/";

async function scrapePTI() {
  try {
    console.log('Fetching PTI RSS...');
    const xml = await (await fetch(PTI_RSS)).text();
    const parser = new XMLParser();
    const rss = parser.parse(xml);
    const ch = rss.rss.channel;
    const items: any[] = [];
    
    (Array.isArray(ch.item) ? ch.item : [ch.item]).slice(0, 3).forEach((it: any) => {
      const title = it.title || "";
      const description = it.description || "";
      const cleanDescription = description.replace(/<[^>]+>/g, "").slice(0, 160);
      
      items.push({
        source: "Port Technology International",
        title_fr: title,
        title_en: title,
        url: it.link || "",
        slug: createSlug(title) + '-pti',
        excerpt_fr: cleanDescription,
        excerpt_en: cleanDescription,
        published_at: new Date(it.pubDate || Date.now()).toISOString(),
      });
    });
    
    console.log(`Found ${items.length} PTI articles`);
    return items;
  } catch (error) {
    console.error('Error fetching PTI:', error);
    return [];
  }
}

/* ---------------- MAIN HANDLER ---------------- */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting news sync...');
    
    const data = [...await scrapePAD(), ...await scrapePTI()];
    console.log("Total articles to sync:", data.length);

    if (data.length) {
      const { error } = await sb.from("news").upsert(data, { 
        onConflict: "slug",
        ignoreDuplicates: false 
      });
      if (error) {
        console.error('Error inserting articles:', error);
        throw error;
      }
    }

    console.log('News sync completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: data.length,
        message: 'News sync completed successfully' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error('News sync failed:', err);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

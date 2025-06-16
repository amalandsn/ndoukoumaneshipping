
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { XMLParser } from "https://esm.sh/fast-xml-parser@4.3.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/* ENV ------------------------------------------------------------------ */
const sb = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

/* ---------- 1. PAD : scrape each article page ------------------------- */
const PAD_INDEX = "https://www.portdakar.sn/espace-media/actualites";

async function scrapePAD() {
  try {
    console.log('Fetching PAD articles...');
    const html = await (await fetch(PAD_INDEX)).text();
    const linkRx = /href="(\/actualites\/[^"]+)"/g;
    const links = [...html.matchAll(linkRx)].slice(0, 3).map(m => `https://www.portdakar.sn${m[1]}`);
    console.log(`Found ${links.length} PAD article links`);
    
    const items = [];

    for (const url of links) {
      try {
        console.log(`Scraping PAD article: ${url}`);
        const page = await (await fetch(url)).text();
        const title = (page.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1] || "").replace(/<[^>]+>/g,"").trim();
        const para = (page.match(/<p[^>]*>(.*?)<\/p>/i)?.[1] || "").replace(/<[^>]+>/g,"").trim();
        
        if (title) {
          const titleEn = await translate(title, "en");
          const excerptEn = para ? await translate(para.slice(0,160), "en") : "";
          
          items.push({
            source: "Port Autonome de Dakar",
            title_fr: title,
            title_en: titleEn,
            excerpt_fr: para.slice(0,160),
            excerpt_en: excerptEn,
            url,
            slug: `${url.split("/").pop()}-pad-${Date.now()}`,
            published_at: new Date().toISOString(),
            display_order: 1, // PAD articles come first
          });
          console.log(`Successfully scraped PAD article: ${title}`);
        }
      } catch (error) {
        console.error(`Error scraping PAD article ${url}:`, error);
      }
    }
    
    console.log(`PAD scraping completed: ${items.length} articles`);
    return items;
  } catch (error) {
    console.error('Error in scrapePAD:', error);
    return [];
  }
}

/* ---------- 2. PTI : RSS in English, auto-translate to French --------- */
const PTI_RSS = "https://www.porttechnology.org/feed/";

async function scrapePTI() {
  try {
    console.log('Fetching PTI RSS...');
    const xml = await (await fetch(PTI_RSS)).text();
    const rss = new XMLParser().parse(xml).rss.channel.item;
    const items = Array.isArray(rss) ? rss.slice(0, 3) : [rss].slice(0, 3);
    
    const results = [];
    
    for (const it of items) {
      try {
        const titleFr = await translate(it.title, "fr");
        const descriptionClean = strip(it.description);
        const excerptFr = await translate(descriptionClean.slice(0,160), "fr");
        
        results.push({
          source: "Port Technology International",
          title_fr: titleFr,
          title_en: it.title,
          excerpt_fr: excerptFr,
          excerpt_en: descriptionClean.slice(0,160),
          url: it.link,
          slug: `${it.link.split("/").filter(Boolean).pop()}-pti-${Date.now()}`,
          published_at: new Date(it.pubDate || Date.now()).toISOString(),
          display_order: 2, // PTI articles come second
        });
        console.log(`Successfully processed PTI article: ${it.title}`);
      } catch (error) {
        console.error(`Error processing PTI article:`, error);
      }
    }
    
    console.log(`PTI scraping completed: ${results.length} articles`);
    return results;
  } catch (error) {
    console.error('Error in scrapePTI:', error);
    return [];
  }
}

/* ---------- 3. Helpers ------------------------------------------------ */
function strip(html: string) { 
  return html.replace(/<[^>]+>/g,"").trim(); 
}

async function translate(text: string, target: "en"|"fr") {
  if (!text || text.trim().length === 0) return "";
  
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
    if (!res.ok) return text;
    
    const json = await res.json();
    const translated = json[0].map((seg: any) => seg[0]).join("");
    return translated || text;
  } catch (error) {
    console.error(`Translation error for "${text}":`, error);
    return text;
  }
}

/* ---------------- MAIN HANDLER --------------------------------------- */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting news sync...');
    
    const [pad, pti] = await Promise.all([
      scrapePAD(),
      scrapePTI()
    ]);
    
    // Order: PAD first (display_order: 1), then PTI (display_order: 2)
    const rows = [...pad, ...pti];
    console.log(`Total articles to sync: ${rows.length} (${pad.length} PAD + ${pti.length} PTI)`);
    
    if (rows.length) {
      const { error } = await sb.from("news").upsert(rows, { 
        onConflict: "slug",
        ignoreDuplicates: false 
      });
      if (error) {
        console.error('Database upsert error:', error);
        throw error;
      }
      console.log(`Successfully synced ${rows.length} articles (PAD: ${pad.length}, PTI: ${pti.length})`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: rows.length,
        pad_articles: pad.length,
        pti_articles: pti.length,
        message: 'News sync completed successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error('News sync failed:', e);
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

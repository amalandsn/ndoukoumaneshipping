
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12"
import Parser from "https://esm.sh/rss-parser@3.13.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PAD_URL = "https://www.portdakar.sn/espace-media/actualites"
const PTI_RSS = "https://www.porttechnology.org/rss-feeds/ports-and-terminals"
const BASE_URL = "https://www.portdakar.sn"

// Helper function to create slug from text
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100)
}

// Scrape Port Autonome de Dakar news
async function scrapePADNews() {
  try {
    console.log('Scraping PAD news...')
    const response = await fetch(PAD_URL)
    const html = await response.text()
    const $ = cheerio.load(html)
    
    const articles = $('.views-row').slice(0, 3).map((_, element) => {
      const title = $(element).find('h3 a').text().trim()
      const url = BASE_URL + $(element).find('h3 a').attr('href')
      const excerpt = $(element).find('.field--name-body').text().trim().slice(0, 160)
      const dateAttr = $(element).find('time').attr('datetime')
      
      return {
        source: 'Port Autonome de Dakar',
        title_fr: title,
        title_en: title, // For now, keeping same title
        slug: createSlug(title) + '-pad',
        url: url,
        excerpt_fr: excerpt,
        excerpt_en: excerpt, // For now, keeping same excerpt
        published_at: new Date(dateAttr || Date.now()).toISOString()
      }
    }).get()
    
    console.log(`Found ${articles.length} PAD articles`)
    return articles
  } catch (error) {
    console.error('Error scraping PAD:', error)
    return []
  }
}

// Scrape Port Technology International RSS
async function scrapePTINews() {
  try {
    console.log('Scraping PTI RSS...')
    const parser = new Parser()
    const feed = await parser.parseURL(PTI_RSS)
    
    const articles = feed.items.slice(0, 3).map(item => {
      const title = item.title || ''
      const excerpt = (item.contentSnippet || '').slice(0, 160)
      
      return {
        source: 'Port Technology International',
        title_fr: title,
        title_en: title,
        slug: createSlug(title) + '-pti',
        url: item.link || '',
        excerpt_fr: excerpt,
        excerpt_en: excerpt,
        published_at: new Date(item.isoDate || item.pubDate || Date.now()).toISOString()
      }
    })
    
    console.log(`Found ${articles.length} PTI articles`)
    return articles
  } catch (error) {
    console.error('Error scraping PTI:', error)
    return []
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting news sync...')
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch news from both sources
    const [padArticles, ptiArticles] = await Promise.all([
      scrapePADNews(),
      scrapePTINews()
    ])

    const allArticles = [...padArticles, ...ptiArticles]
    console.log(`Total articles to sync: ${allArticles.length}`)

    // Insert or update articles
    for (const article of allArticles) {
      const { error } = await supabase
        .from('news')
        .upsert(article, { 
          onConflict: 'slug',
          ignoreDuplicates: false 
        })
      
      if (error) {
        console.error('Error inserting article:', error, article)
      }
    }

    console.log('News sync completed successfully')
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        synced: allArticles.length,
        message: 'News sync completed successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('News sync failed:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

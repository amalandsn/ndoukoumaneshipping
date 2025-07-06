
import { translate } from '../utils/translator.ts';

const PAD_INDEX = "https://www.portdakar.sn/espace-media/actualites";

export async function scrapePADEspaceMedia() {
  try {
    console.log('Fetching PAD espace-media articles...');
    const response = await fetch(PAD_INDEX);
    if (!response.ok) {
      console.error(`Failed to fetch PAD espace-media: ${response.status}`);
      return [];
    }
    const html = await response.text();
    console.log('HTML fetched, length:', html.length);
    
    // Patterns plus génériques pour capturer les liens d'articles
    const linkPatterns = [
      /<a[^>]*href=["']([^"']*actualite[^"']*)["'][^>]*>/gi,
      /<a[^>]*href=["']([^"']*\/actualites\/[^"']*)["'][^>]*>/gi,
      /<a[^>]*href=["']([^"']*article[^"']*)["'][^>]*>/gi,
      /<a[^>]*href=["']([^"']*news[^"']*)["'][^>]*>/gi
    ];
    
    let links = new Set();
    
    for (const pattern of linkPatterns) {
      const matches = [...html.matchAll(pattern)];
      console.log(`Pattern found ${matches.length} matches`);
      matches.forEach(match => {
        let url = match[1];
        if (url.startsWith('/')) {
          url = `https://www.portdakar.sn${url}`;
        } else if (!url.startsWith('http')) {
          url = `https://www.portdakar.sn/${url}`;
        }
        if (url.includes('portdakar.sn') && !url.includes('#') && !url.includes('javascript:')) {
          links.add(url);
        }
      });
      if (links.size >= 3) break;
    }
    
    // Si on ne trouve pas de liens spécifiques, chercher tous les liens
    if (links.size === 0) {
      console.log('No specific article links found, trying general links...');
      const generalPattern = /<a[^>]*href=["']([^"']*)["'][^>]*>/gi;
      const allMatches = [...html.matchAll(generalPattern)];
      
      allMatches.forEach(match => {
        let url = match[1];
        if (url.startsWith('/')) {
          url = `https://www.portdakar.sn${url}`;
        }
        // Filtrer pour ne garder que les liens qui pourraient être des articles
        if (url.includes('portdakar.sn') && 
            (url.includes('actualite') || url.includes('news') || url.includes('article') || 
             url.match(/\/\d{4}\//) || url.match(/\/[^\/]+\/$/) && url.split('/').length > 4) &&
            !url.includes('#') && !url.includes('javascript:') && !url.includes('mailto:')) {
          links.add(url);
        }
      });
    }
    
    const linksArray = Array.from(links).slice(0, 3);
    console.log(`Found ${linksArray.length} PAD espace-media article links:`, linksArray);
    
    const items = [];

    for (const url of linksArray) {
      try {
        console.log(`Scraping PAD espace-media article: ${url}`);
        const pageResponse = await fetch(url);
        if (!pageResponse.ok) continue;
        
        const page = await pageResponse.text();
        
        // Extraire le titre avec des sélecteurs plus génériques
        let title = "";
        const titleSelectors = [
          /<title[^>]*>([^<]+)<\/title>/i,
          /<h1[^>]*>([^<]+)<\/h1>/i,
          /<h2[^>]*>([^<]+)<\/h2>/i,
          /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
          /<meta[^>]*name=["']title["'][^>]*content=["']([^"']+)["']/i
        ];
        
        for (const selector of titleSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            title = match[1].replace(/<[^>]+>/g,"").trim();
            // Nettoyer le titre
            title = title.replace(/Port Autonome de Dakar\s*[-|]?\s*/i, '');
            title = title.replace(/PAD\s*[-|]?\s*/i, '');
            title = title.replace(/\s*[-|]\s*$/, '');
            if (title.length > 10 && title.length < 200) break;
          }
        }
        
        // Extraire le contenu
        let content = "";
        const contentSelectors = [
          /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
          /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
          /<p[^>]*class="[^"]*excerpt[^"]*"[^>]*>([^<]+)<\/p>/i,
          /<div[^>]*class="[^"]*content[^"]*"[^>]*>.*?<p[^>]*>([^<]+)<\/p>/i,
          /<article[^>]*>.*?<p[^>]*>([^<]+)<\/p>/i,
          /<p[^>]*>([^<]{50,})<\/p>/i
        ];
        
        for (const selector of contentSelectors) {
          const match = page.match(selector);
          if (match && match[1]) {
            content = match[1].replace(/<[^>]+>/g,"").trim();
            if (content.length > 30 && 
                !content.toLowerCase().includes('cookie') && 
                !content.toLowerCase().includes('javascript') &&
                !content.toLowerCase().includes('error')) {
              break;
            }
          }
        }
        
        if (title && title.length > 10) {
          try {
            const titleEn = await translate(title, "en");
            const excerptEn = content ? await translate(content.slice(0,160), "en") : "";
            
            items.push({
              source: "Port Autonome de Dakar",
              title_fr: title,
              title_en: titleEn,
              excerpt_fr: content.slice(0,160),
              excerpt_en: excerptEn,
              url,
              slug: `pad-espace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              published_at: new Date().toISOString(),
              display_order: 1,
            });
            console.log(`Successfully scraped PAD espace-media article: ${title.substring(0,50)}...`);
          } catch (translateError) {
            console.error('Translation error:', translateError);
            // Ajouter l'article même sans traduction
            items.push({
              source: "Port Autonome de Dakar",
              title_fr: title,
              title_en: title, // Fallback à la version française
              excerpt_fr: content.slice(0,160),
              excerpt_en: content.slice(0,160), // Fallback à la version française
              url,
              slug: `pad-espace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              published_at: new Date().toISOString(),
              display_order: 1,
            });
          }
        } else {
          console.log(`Skipped article with insufficient content: ${url} (title: "${title}")`);
        }
      } catch (error) {
        console.error(`Error scraping PAD espace-media article ${url}:`, error);
      }
    }
    
    console.log(`PAD espace-media scraping completed: ${items.length} articles`);
    return items;
  } catch (error) {
    console.error('Error in scrapePADEspaceMedia:', error);
    return [];
  }
}

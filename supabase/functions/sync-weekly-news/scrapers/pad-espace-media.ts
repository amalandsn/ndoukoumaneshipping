
import { translate } from '../utils/translator.ts';

const PAD_INDEX = "https://www.portdakar.sn/espace-media/actualites";

export async function scrapePADEspaceMedia() {
  try {
    console.log('Fetching PAD espace-media articles...');
    const html = await (await fetch(PAD_INDEX)).text();
    const linkRx = /href="(\/actualites\/[^"]+)"/g;
    const links = [...html.matchAll(linkRx)].slice(0, 2).map(m => `https://www.portdakar.sn${m[1]}`);
    console.log(`Found ${links.length} PAD espace-media article links`);
    
    const items = [];

    for (const url of links) {
      try {
        console.log(`Scraping PAD espace-media article: ${url}`);
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
            slug: `${url.split("/").pop()}-pad-espace-${Date.now()}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
          console.log(`Successfully scraped PAD espace-media article: ${title}`);
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

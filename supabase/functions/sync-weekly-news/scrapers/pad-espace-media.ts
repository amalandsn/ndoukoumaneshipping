
import { translate } from '../utils/translator.ts';

const PAD_INDEX = "https://www.portdakar.sn/espace-media/actualites";

export async function scrapePADEspaceMedia() {
  try {
    console.log('🔍 Starting PAD espace-media scraping...');
    console.log('📍 Target URL:', PAD_INDEX);
    
    const response = await fetch(PAD_INDEX, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });
    
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch PAD espace-media: ${response.status} ${response.statusText}`);
      
      // Essayons de créer des articles de test pour vérifier que la base de données fonctionne
      console.log('🧪 Creating test articles instead...');
      return [
        {
          source: "Port Autonome de Dakar",
          title_fr: "Développement des infrastructures portuaires - Article de test",
          title_en: "Port Infrastructure Development - Test Article",
          excerpt_fr: "Le Port Autonome de Dakar continue ses investissements dans le développement de ses infrastructures pour améliorer les services logistiques. Ceci est un article de test généré automatiquement.",
          excerpt_en: "The Port Autonome de Dakar continues its investments in infrastructure development to improve logistics services. This is an automatically generated test article.",
          url: "https://www.portdakar.sn/espace-media/actualites",
          slug: `pad-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          published_at: new Date().toISOString(),
          display_order: 1,
        },
        {
          source: "Port Autonome de Dakar",
          title_fr: "Nouvelles technologies au service du port - Article de test",
          title_en: "New Technologies Serving the Port - Test Article", 
          excerpt_fr: "Le port de Dakar adopte de nouvelles technologies pour optimiser ses opérations et améliorer l'efficacité. Ceci est un article de test généré automatiquement.",
          excerpt_en: "The port of Dakar adopts new technologies to optimize its operations and improve efficiency. This is an automatically generated test article.",
          url: "https://www.portdakar.sn/espace-media/actualites",
          slug: `pad-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Hier
          display_order: 1,
        }
      ];
    }
    
    const html = await response.text();
    console.log('📄 HTML content length:', html.length);
    console.log('📄 HTML preview (first 500 chars):', html.substring(0, 500));
    
    // Chercher les articles dans le HTML de manière plus spécifique
    const articles = [];
    
    // Pattern pour trouver les articles sur la page d'actualités du PAD
    const articlePattern = /<article[^>]*class="[^"]*article[^"]*"[^>]*>[\s\S]*?<\/article>/gi;
    const linkPattern = /<a[^>]*href="([^"]*)"[^>]*>/gi;
    const titlePattern = /<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi;
    
    console.log('🔍 Searching for articles in HTML...');
    
    let articleMatches = [...html.matchAll(articlePattern)];
    console.log(`📰 Found ${articleMatches.length} article blocks`);
    
    if (articleMatches.length === 0) {
      // Fallback: chercher des divs avec des classes communes
      const divPattern = /<div[^>]*class="[^"]*(?:news|article|post|item)[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
      articleMatches = [...html.matchAll(divPattern)];
      console.log(`📰 Fallback: Found ${articleMatches.length} div blocks`);
    }
    
    for (let i = 0; i < Math.min(3, articleMatches.length); i++) {
      const articleHtml = articleMatches[i][0];
      
      // Extraire le titre
      const titleMatch = articleHtml.match(titlePattern);
      let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      
      // Extraire le lien
      const linkMatch = articleHtml.match(linkPattern);
      let link = linkMatch ? linkMatch[1] : '';
      
      if (link && !link.startsWith('http')) {
        link = `https://www.portdakar.sn${link}`;
      }
      
      // Extraire un extrait du contenu
      const textContent = articleHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const excerpt = textContent.substring(0, 160);
      
      if (title && title.length > 10) {
        try {
          const titleEn = await translate(title, "en");
          const excerptEn = excerpt ? await translate(excerpt, "en") : "";
          
          articles.push({
            source: "Port Autonome de Dakar",
            title_fr: title,
            title_en: titleEn,
            excerpt_fr: excerpt,
            excerpt_en: excerptEn,
            url: link || PAD_INDEX,
            slug: `pad-espace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
          
          console.log(`✅ Article ${i + 1}: "${title.substring(0, 50)}..."`);
        } catch (translateError) {
          console.error('❌ Translation error:', translateError);
          // Ajouter sans traduction
          articles.push({
            source: "Port Autonome de Dakar",
            title_fr: title,
            title_en: title,
            excerpt_fr: excerpt,
            excerpt_en: excerpt,
            url: link || PAD_INDEX,
            slug: `pad-espace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            published_at: new Date().toISOString(),
            display_order: 1,
          });
        }
      }
    }
    
    console.log(`🎯 PAD espace-media scraping completed: ${articles.length} articles extracted`);
    return articles;
    
  } catch (error) {
    console.error('💥 Critical error in scrapePADEspaceMedia:', error);
    console.error('💥 Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // En cas d'erreur, retourner des articles de test
    console.log('🧪 Returning test articles due to error...');
    return [
      {
        source: "Port Autonome de Dakar",
        title_fr: "Modernisation des équipements portuaires - Article de test",
        title_en: "Port Equipment Modernization - Test Article",
        excerpt_fr: "Le Port Autonome de Dakar poursuit la modernisation de ses équipements pour rester compétitif sur le marché régional. Article de test généré suite à une erreur de connexion.",
        excerpt_en: "The Port Autonome de Dakar continues modernizing its equipment to remain competitive in the regional market. Test article generated following connection error.",
        url: "https://www.portdakar.sn/espace-media/actualites",
        slug: `pad-error-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        published_at: new Date().toISOString(),
        display_order: 1,
      }
    ];
  }
}


export async function translate(text: string, target: "en"|"fr"): Promise<string> {
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

export function stripHtml(html: string): string { 
  return html.replace(/<[^>]+>/g,"").trim(); 
}

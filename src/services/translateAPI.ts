/**
 * Service de traduction en temps réel - Comme les navigateurs
 * Utilise l'API Google Translate pour une traduction instantanée
 */

interface TraductionResult {
  texteTraduit: string;
  langueDetectee: string;
  confiance: number;
}

class TranslateAPI {
  private readonly API_URL = 'https://translate.googleapis.com/translate_a/single';
  
  /**
   * Traduit un texte en temps réel - Comme Chrome/Edge
   */
  async traduireTexte(
    texte: string, 
    langueCible: string, 
    langueSource: string = 'auto'
  ): Promise<TraductionResult> {
    try {
      const params = new URLSearchParams({
        client: 'gtx',
        sl: langueSource,
        tl: langueCible,
        dt: 't',
        q: texte
      });

      const response = await fetch(`${this.API_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      
      // Extraction du texte traduit
      const texteTraduit = data[0]?.map((item: any[]) => item[0]).join('') || texte;
      const langueDetectee = data[2] || langueSource;
      
      return {
        texteTraduit,
        langueDetectee,
        confiance: 0.95 // Google Translate est très fiable
      };
    } catch (error) {
      console.error('Erreur de traduction:', error);
      return {
        texteTraduit: texte,
        langueDetectee: langueSource,
        confiance: 0
      };
    }
  }

  /**
   * Traduit plusieurs textes en parallèle
   */
  async traduireTextes(
    textes: string[], 
    langueCible: string, 
    langueSource: string = 'auto'
  ): Promise<TraductionResult[]> {
    const promesses = textes.map(texte => 
      this.traduireTexte(texte, langueCible, langueSource)
    );
    
    return Promise.all(promesses);
  }

  /**
   * Détecte la langue d'un texte
   */
  async detecterLangue(texte: string): Promise<string> {
    try {
      const result = await this.traduireTexte(texte, 'en', 'auto');
      return result.langueDetectee;
    } catch (error) {
      console.error('Erreur détection langue:', error);
      return 'fr';
    }
  }

  /**
   * Traduction avec cache pour performance
   */
  private cache = new Map<string, TraductionResult>();
  
  async traduireAvecCache(
    texte: string, 
    langueCible: string, 
    langueSource: string = 'auto'
  ): Promise<TraductionResult> {
    const cle = `${texte}-${langueSource}-${langueCible}`;
    
    if (this.cache.has(cle)) {
      return this.cache.get(cle)!;
    }
    
    const result = await this.traduireTexte(texte, langueCible, langueSource);
    this.cache.set(cle, result);
    
    return result;
  }
}

export const translateAPI = new TranslateAPI();
export default translateAPI;

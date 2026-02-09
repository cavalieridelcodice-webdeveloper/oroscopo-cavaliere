/**
 * paoloFoxPrompt.js
 * Prompt template for generating horoscopes in Paolo Fox style with autonomous transit calculation
 */

/**
 * Generate a detailed prompt for Gemini AI to create Paolo Fox style horoscope
 * @param {string} signName - Name of the zodiac sign in Italian
 * @param {string} date - The date to calculate transits for (YYYY-MM-DD or descriptive)
 */
export function generatePaoloFoxPrompt(signName, date) {
  return `Agisci come un astrologo esperto con 20 anni di esperienza. 
  Analisi per il segno: ${signName}, data: ${date}.

  COMPITO:
  Scrivi un editoriale astrologico "Premium" seguendo rigorosamente queste regole:

  1. CALCOLO REALE: Simula il calcolo esatto dei transiti planetari per oggi (es. Luna, Mercurio, Venere, Marte, Giove, Saturno). 
     - Devi citare specificamente gli aspetti (es. "Venere in trigono", "Marte in opposizione", "Luna in quadratura") per giustificare le tue previsioni.
     - Personalizza TOTALMENTE la risposta in base al segno ${signName}. Non usare frasi generiche.

  2. STRUTTURA E CONTENUTO:
     - AMORE: Scrivi 3-4 frasi articolate sui sentimenti. Usa termini tecnici. Sii specifico su coppie e single.
     - LAVORO: Scrivi 3-4 frasi su opportunità, rischi finanziari e collaborazioni. Cita i transiti di Mercurio o Giove.
     - FORTUNA: Scrivi 3-4 frasi. Dai un consiglio pratico basato sui transiti.
      - RATING: Valuta il segno su una scala da 1 a 5 in base ai transiti reali. Cerca di essere DINAMICO: se il cielo è ottimo dai 4 o 5, se è difficile dai 1 o 2. Non appiattirti sul 3.
     - LUCKY NUMBER: Genera un numero da 1 a 90 basato sulla "vibrazione numerologica" del giorno per il segno.
     - TIP: Un consiglio breve, diretto e pratico (max 10 parole).

  FORMATO RISPOSTA (JSON PURO):
  {
    "rating": [numero intero 1-5],
    "love": "Testo approfondito...",
    "work": "Testo approfondito...",
    "luck": "Testo approfondito...",
    "luckyNumber": [numero intero 1-90],
    "tip": "Consiglio breve..."
  }

  IMPORTANTE: 
  - Rispondi SOLO con il JSON, senza alcun testo introduttivo o conclusivo.
  - Assicurati che il contenuto sia coerente con i transiti astronomici reali della data indicata.`;
}

/**
 * Alternative shorter prompt for faster generation
 */
export function generateCompactPrompt(signName, date) {
  return `Oroscopo ${signName} del ${date} in stile Paolo Fox. 
  Calcola transiti reali e rispondi SOLO con JSON:
  {
    "rating": [1-5],
    "love": "[2 frasi]",
    "work": "[2 frasi]",
    "luck": "[2 frasi]",
    "luckyNumber": [1-90]
  }
  Usa termini: "recupero energetico", "cielo interessante".`;
}

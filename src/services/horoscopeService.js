// Servizio Client-side per recuperare l'oroscopo dal nostro database attraverso le API Vercel
export const getOroscopoDelGiorno = async (sign) => {
  const now = new Date();
  const todayLocal = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  // Chiave di cache locale per velocizzare la navigazione dell'utente
  const cacheKey = `horoscope_cache_premium_v1_${sign.id}_${todayLocal}`;

  try {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    console.log(`📡 Recupero oroscopo da API per ${sign.name}...`);

    // Chiamata alla nostra API Route (che gestisce la generazione via Gemini sul server)
    const response = await fetch(`/api/horoscopes/today?sign=${sign.id}`);

    if (!response.ok) {
      throw new Error(`Errore API: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Formattiamo la data per la visualizzazione uniforme
      const result = {
        ...data,
        date: now.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      localStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }

    throw new Error('Dati non validi dalla API');

  } catch (error) {
    console.error("Errore fetch oroscopo:", error);

    // Fallback di emergenza
    return {
      date: now.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
      love: "Al momento non è possibile caricare i dettagli astrali. Riprova più tardi.",
      work: "La connessione con le stelle è disturbata. Torna presto per l'aggiornamento.",
      luck: "La fortuna ti sorriderà non appena il cielo si sarà rischiarato.",
      rating: 3,
      luckyNumber: 7,
      tip: "Verifica la tua connessione internet."
    };
  }
};
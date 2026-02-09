import dotenv from 'dotenv';
import { getOroscopoDelGiorno } from '../src/services/horoscopeService.js';

// Carica variabili ambiente
// Carica variabili ambiente
const result = dotenv.config({ path: '.env.local' });
if (result.error) {
    console.error("Errore caricamento .env.local:", result.error);
}

// Debug (mostra solo se la chiave è presente, non il valore)
console.log("Variabili ambiente caricate. GEMINI_API_KEY presente:", !!process.env.GEMINI_API_KEY);


async function testPremiumGeneration() {
    console.log('🔮 Avvio Test Premium Horoscope...\n');

    const signsToTest = ['Scorpione', 'Leone'];

    for (const sign of signsToTest) {
        console.log(`\n--- Analisi per ${sign} ---`);
        try {
            const data = await getOroscopoDelGiorno(sign);

            console.log(`📅 Data: ${data.date}`);
            console.log(`⭐ Rating: ${data.rating}/5`);
            console.log(`🍀 Numero Fortunato: ${data.luckyNumber}`);
            console.log(`💡 Tip: ${data.tip}`);
            console.log('\n💖 AMORE:');
            console.log(data.love);
            console.log('\n💼 LAVORO:');
            console.log(data.work);
            console.log('\n🍀 FORTUNA:');
            console.log(data.luck);

            // Verifica base della lunghezza
            if (data.love.length < 100 || data.work.length < 100) {
                console.warn('⚠️ ATTENZIONE: Il testo sembra un po\' corto per lo standard Premium.');
            } else {
                console.log('✅ Lunghezza testo ok.');
            }

        } catch (error) {
            console.error(`❌ Errore test per ${sign}:`, error);
        }
    }
}

testPremiumGeneration();

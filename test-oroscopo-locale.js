/**
 * Script di test locale per generare un oroscopo
 * Senza Firebase - Solo API astrologica + Gemini
 */

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Carica variabili ambiente
dotenv.config({ path: '.env.local' });

// Inizializza Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Funzione per ottenere transiti planetari
async function getPlanetaryTransits() {
    try {
        const now = new Date();

        const params = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            date: now.getDate(),
            hours: 12, // Mezzogiorno
            minutes: 0,
            seconds: 0,
            latitude: 41.9028, // Roma
            longitude: 12.4964,
            timezone: 1.0
        };

        console.log('🌟 Recuperando transiti planetari...');

        const response = await axios.get('https://json.freeastrologyapi.com/planets/extended', {
            params,
            timeout: 10000
        });

        if (response.data && response.data.output) {
            return response.data.output;
        }

        throw new Error('Risposta API non valida');
    } catch (error) {
        console.error('❌ Errore nel recupero transiti:', error.message);
        throw error;
    }
}

// Funzione per generare l'oroscopo con Gemini
async function generateHoroscope(signName, planets) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Crea un riassunto dei pianeti
        const planetSummary = Object.entries(planets)
            .filter(([key]) => ['sun', 'moon', 'venus', 'mars', 'jupiter'].includes(key.toLowerCase()))
            .map(([name, data]) => `${data.name || name} in ${data.sign || data.zodiac_sign || '?'}`)
            .join(', ');

        const prompt = `Sei Paolo Fox, il celebre astrologo italiano. Scrivi l'oroscopo di oggi per il segno ${signName}.

TRANSITI PLANETARI DI OGGI:
${planetSummary}

STILE: Usa il tono colloquiale di Paolo Fox con espressioni come "recupero energetico", "cielo interessante", "Luna favorevole".

Genera un JSON con questa struttura:
{
  "rating": [numero da 1 a 5],
  "love": "[2-3 frasi su amore e relazioni]",
  "work": "[2-3 frasi su lavoro]",
  "luck": "[2-3 frasi su fortuna]"
}

IMPORTANTE: Rispondi SOLO con il JSON, senza altro testo.`;

        console.log(`🤖 Generando oroscopo per ${signName}...`);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Pulisci la risposta
        text = text.trim();
        if (text.startsWith('```json')) {
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (text.startsWith('```')) {
            text = text.replace(/```\n?/g, '');
        }

        return JSON.parse(text);
    } catch (error) {
        console.error('❌ Errore generazione con Gemini:', error.message);
        throw error;
    }
}

// Funzione principale
async function main() {
    try {
        console.log('\n╔════════════════════════════════════════════════╗');
        console.log('║   TEST GENERAZIONE OROSCOPO LOCALE - ARIETE   ║');
        console.log('╚════════════════════════════════════════════════╝\n');

        // Step 1: Ottieni transiti
        const planets = await getPlanetaryTransits();
        console.log('✅ Transiti planetari recuperati\n');

        // Step 2: Genera oroscopo
        const horoscope = await generateHoroscope('Ariete', planets);
        console.log('✅ Oroscopo generato con successo!\n');

        // Step 3: Mostra risultato
        console.log('═'.repeat(60));
        console.log('🌟  OROSCOPO DEL GIORNO - ARIETE  🌟');
        console.log('═'.repeat(60));
        console.log(`\n⭐ VALUTAZIONE: ${'★'.repeat(horoscope.rating)}${'☆'.repeat(5 - horoscope.rating)} (${horoscope.rating}/5)\n`);

        console.log('💖 AMORE:');
        console.log(horoscope.love);
        console.log('');

        console.log('💼 LAVORO:');
        console.log(horoscope.work);
        console.log('');

        console.log('🍀 FORTUNA:');
        console.log(horoscope.luck);
        console.log('');
        console.log('═'.repeat(60));
        console.log('\n✅ TEST COMPLETATO CON SUCCESSO!\n');

    } catch (error) {
        console.error('\n❌ ERRORE:', error.message);
        console.error(error);
        process.exit(1);
    }
}

// Esegui
main();

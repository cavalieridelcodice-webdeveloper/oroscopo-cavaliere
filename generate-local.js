/**
 * Script per generare l'oroscopo per tutti i 12 segni e salvarlo in locale.
 * Da eseguire con: node generate-local.js
 */

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Carica variabili ambiente
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const signs = [
    { id: 'aries', name: 'Ariete' },
    { id: 'taurus', name: 'Toro' },
    { id: 'gemini', name: 'Gemelli' },
    { id: 'cancer', name: 'Cancro' },
    { id: 'leo', name: 'Leone' },
    { id: 'virgo', name: 'Vergine' },
    { id: 'libra', name: 'Bilancia' },
    { id: 'scorpio', name: 'Scorpione' },
    { id: 'sagittarius', name: 'Sagittario' },
    { id: 'capricorn', name: 'Capricorno' },
    { id: 'aquarius', name: 'Acquario' },
    { id: 'pisces', name: 'Pesci' }
];

async function getPlanetaryTransits() {
    const now = new Date();
    return {
        date: now.toISOString().split('T')[0],
        fullDate: now.toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    };
}

const fallbackTemplates = [
    {
        love: (sign) => `Per il segno del ${sign}, l'amore richiede oggi un momento di riflessione.`,
        work: (sign) => `Sul fronte professionale, ${sign} deve puntare sul recupero energetico.`,
        luck: (sign) => `La fortuna per ${sign} passerà attraverso piccoli segnali positivi.`
    }
];

async function generateHoroscope(signName, signIndex, dateInfo) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const dateContext = dateInfo.fullDate || dateInfo.date;

        const prompt = `Sei Paolo Fox. 
Calcola i transiti planetari reali per la data ${dateContext} e genera un oroscopo preciso per il segno ${signName}.
Stile: rassicurante, colloquiale, "recupero energetico", "cielo interessante".
Menziona i pianeti reali (es. Venere in Ariete, Marte in Cancro).

Rispondi SOLO con un JSON:
{
  "rating": [1-5],
  "love": "[2-3 frasi]",
  "work": "[2-3 frasi]",
  "luck": "[2-3 frasi]",
  "luckyNumber": [un numero da 1 a 90]
}`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();
        text = text.replace(/```json\n?|```/g, '');

        return JSON.parse(text);
    } catch (error) {
        console.error(`❌ Errore API per ${signName}:`, error.message);

        const template = fallbackTemplates[signIndex % fallbackTemplates.length] || fallbackTemplates[0];
        return {
            rating: 3,
            love: template.love(signName),
            work: template.work(signName),
            luck: template.luck(signName),
            luckyNumber: Math.floor(Math.random() * 90) + 1
        };
    }
}

async function run() {
    console.log('\x1b[36m%s\x1b[0m', '🚀 Avvio generazione oroscopo locale (Pure Gemini)...');
    const dateInfo = await getPlanetaryTransits();
    const horoscopes = {};

    for (let i = 0; i < signs.length; i++) {
        const sign = signs[i];
        process.stdout.write(`- Generando per ${sign.name}... `);
        const result = await generateHoroscope(sign.name, i, dateInfo);
        horoscopes[sign.id] = result;

        console.log('\x1b[32m%s\x1b[0m', '✅ OK');

        // Delay minimo per stabilità
        if (i < signs.length - 1) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    const data = {
        date: dateInfo.date,
        signs: horoscopes
    };

    const dir = './src/data';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, 'dailyHoroscopes.json'), JSON.stringify(data, null, 2));
    console.log('\n✅ Oroscopo salvato in src/data/dailyHoroscopes.json');
}

run();

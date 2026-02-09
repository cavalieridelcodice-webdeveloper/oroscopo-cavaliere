/**
 * geminiService.js
 * Service for generating horoscope content using Google Gemini AI
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatePaoloFoxPrompt } from '../prompts/paoloFoxPrompt.js';

export async function generateHoroscopeForSign(signName, signIndex, planetaryData) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Use the new date-based prompt (autonomous transit calculation)
        const dateContext = planetaryData.fullDate || planetaryData.date;
        const prompt = generatePaoloFoxPrompt(signName, dateContext);

        console.log(`🤖 Generating horoscope for ${signName} (${dateContext}) with Gemini AI...`);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const horoscope = parseGeminiResponse(text);

        if (!horoscope.rating || !horoscope.love || !horoscope.work || !horoscope.luck) {
            throw new Error('Invalid horoscope format from Gemini');
        }

        console.log(`✅ Horoscope generated for ${signName} (${horoscope.rating} stars)`);

        return {
            ...horoscope,
            type: 'premium',
            generatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error(`❌ Error generating horoscope for ${signName}:`, error.message);

        // Return fallback horoscope if generation fails
        return getFallbackHoroscope(signName, signIndex);
    }
}

/**
 * Parse Gemini response and extract JSON
 */
function parseGeminiResponse(text) {
    try {
        let cleaned = text.trim();
        if (cleaned.startsWith('```json')) {
            cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/```\n?/g, '');
        }

        const parsed = JSON.parse(cleaned);

        if (parsed.rating) {
            parsed.rating = Math.max(1, Math.min(5, parseInt(parsed.rating)));
        }

        return parsed;
    } catch (error) {
        console.error('❌ Error parsing Gemini response:', error.message);
        throw new Error('Failed to parse Gemini response as JSON');
    }
}

/**
 * Generate fallback horoscope if AI fails
 */
function getFallbackHoroscope(signName, signIndex) {
    const templateIndex = signIndex % fallbackTemplates.length;
    const template = fallbackTemplates[templateIndex];

    return {
        rating: 3,
        love: template.love(signName),
        work: template.work(signName),
        luck: template.luck(signName),
        tip: template.tip(signName),
        luckyNumber: Math.floor(Math.random() * 90) + 1,
        type: 'fallback'
    };
}

/**
 * Generate horoscopes for all 12 zodiac signs
 */
export async function generateAllHoroscopes(planetaryData) {
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

    const horoscopes = {};

    // Generate sequentially (minimal delay for safety)
    for (let i = 0; i < signs.length; i++) {
        const sign = signs[i];
        horoscopes[sign.id] = await generateHoroscopeForSign(
            sign.name,
            i,
            planetaryData
        );

        if (i < signs.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    console.log('✅ All horoscopes generated successfully');
    return horoscopes;
}

const fallbackTemplates = [
    {
        love: (sign) => `Per il segno ${sign}, le stelle suggeriscono pazienza. In amore, è il momento di ascoltare più che di parlare. Venere vi protegge, ma chiede sincerità.`,
        work: (sign) => `Nel lavoro, ${sign} deve affrontare le sfide con calma. Non prendete decisioni affrettate oggi. Saturno osserva i vostri sforzi.`,
        luck: (sign) => `La fortuna sorride a chi sa aspettare. Un piccolo colpo di scena potrebbe arrivare nel pomeriggio.`,
        tip: (sign) => `La calma è la virtù dei forti.`
    },
    {
        love: (sign) => `L'amore per ${sign} oggi è un campo di battaglia dolce. Conquistate con la dolcezza, non con la forza.`,
        work: (sign) => `Grandi opportunità per ${sign} se saprete cogliere l'attimo. Marte vi dà l'energia giusta per iniziare nuovi progetti.`,
        luck: (sign) => `Il numero 7 porta consiglio e fortuna oggi. Seguite l'istinto.`,
        tip: (sign) => `Osate di più, senza paura.`
    },
    {
        love: (sign) => `Un po' di confusione sentimentale per ${sign}. Non temete, la chiarezza arriverà presto.`,
        work: (sign) => `La concentrazione è tutto oggi. ${sign}, evitate distrazioni e puntate all'obiettivo principale.`,
        luck: (sign) => `La dea bendata vi osserva da lontano. Fate il primo passo voi.`,
        tip: (sign) => `Ascoltate il vostro cuore.`
    }
];

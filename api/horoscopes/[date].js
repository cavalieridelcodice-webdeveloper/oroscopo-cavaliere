import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeFirebase } from '../../lib/services/firebaseService.js';
import { generateHoroscopeForSign } from '../../lib/services/geminiService.js';

// Rimosso config runtime per compatibilità con Vercel Dev locale
// export const config = { runtime: 'nodejs18.x' };

export default async function handler(req, res) {
    const { date, sign } = req.query; // date può essere 'today' o YYYY-MM-DD. sign è l'ID del segno.

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log(`📡 API Request: date=${date}, sign=${sign}`);

        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const targetDate = (date === 'today' || !date) ? todayStr : date;

        console.log(`📅 Target Date: ${targetDate}`);

        // 1. Inizializza Firebase
        const db = initializeFirebase();
        const horoscopesCollection = db.collection('horoscopes');

        // 2. Prova a caricare dal database
        let docSnap = await horoscopesCollection.doc(targetDate).get();
        let data = docSnap.exists ? docSnap.data() : null;

        console.log(`💾 Cache Status for ${targetDate}: ${data ? 'HIT' : 'MISS'}`);

        // 3. Se è per oggi e manca il segno specifico o è un fallback (testo corto)
        if (targetDate === todayStr && sign) {
            const existingData = data && data.signs && data.signs[sign];
            // Rigenera se: 
            // 1. Manca il dato
            // 2. È esplicitamente marcato come fallback
            // 3. Il testo è troppo corto (< 500 caratteri totali tra le sezioni o < 200 in 'love')
            const isFallback = existingData && (
                existingData.type !== 'premium' ||
                (existingData.love && existingData.love.length < 350) ||
                !existingData.tip
            );
            const forceRegen = req.query.force === 'true';

            if (!existingData || isFallback || forceRegen) {
                console.log(`✨ On-demand generation needed for ${sign} (Reason: ${!existingData ? 'No Data' : 'Not Premium/Short'}, Force: ${forceRegen})`);

                const signMap = {
                    'aries': 'Ariete', 'taurus': 'Toro', 'gemini': 'Gemelli', 'cancer': 'Cancro',
                    'leo': 'Leone', 'virgo': 'Vergine', 'libra': 'Bilancia', 'scorpio': 'Scorpione',
                    'sagittarius': 'Sagittario', 'capricorn': 'Capricorno', 'aquarius': 'Acquario', 'pisces': 'Pesci'
                };
                const signName = signMap[sign];

                if (signName) {
                    console.log(`🔮 Generating Premium Horoscope for ${signName}...`);

                    const planetaryData = {
                        date: targetDate,
                        fullDate: now.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
                    };

                    // Generate new horoscope
                    const newHoroscope = await generateHoroscopeForSign(signName, 0, planetaryData);

                    console.log(`✅ Generation completed. Rating: ${newHoroscope.rating}`);

                    // Prepare update object
                    const updateData = {
                        date: targetDate,
                        generatedAt: new Date().toISOString()
                    };

                    // Use dot notation to update only this specific sign key
                    if (docSnap.exists) {
                        await horoscopesCollection.doc(targetDate).update({
                            [`signs.${sign}`]: newHoroscope
                        });
                    } else {
                        await horoscopesCollection.doc(targetDate).set({
                            ...updateData,
                            signs: { [sign]: newHoroscope }
                        });
                    }

                    // Ricarica i dati aggiornati
                    docSnap = await horoscopesCollection.doc(targetDate).get();
                    data = docSnap.data();
                    console.log(`💾 Database updated and reloaded.`);
                } else {
                    console.error(`❌ Invalid sign ID: ${sign}`);
                    return res.status(400).json({ error: 'Invalid sign ID' });
                }
            } else {
                console.log(`💎 Premium content already exists for ${sign}`);
            }
        }

        // 3. Fallback all'ultimo disponibile se oggi non c'è proprio nulla
        if (!data) {
            console.log(`⚠️ No data for today, looking for most recent...`);
            const snapshot = await horoscopesCollection.orderBy('date', 'desc').limit(1).get();
            if (!snapshot.empty) {
                data = snapshot.docs[0].data();
                console.log(`📅 Serving outdated data from ${data.date}`);
            }
        }

        if (!data) {
            console.error(`❌ Absolutely no data found in DB.`);
            return res.status(404).json({ error: 'No horoscopes available' });
        }

        const responsePayload = {
            success: true,
            data: data, // Restituisce l'intero oggetto oroscopo data
            requestedSign: sign,
            isPremium: true
        };

        // Se è stato richiesto un segno specifico, restituisci solo quello
        if (sign && data.signs && data.signs[sign]) {
            return res.status(200).json({
                success: true,
                sign: sign,
                ...data.signs[sign]
            });
        }

        return res.status(200).json(responsePayload);

    } catch (error) {
        console.error('❌ API Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}

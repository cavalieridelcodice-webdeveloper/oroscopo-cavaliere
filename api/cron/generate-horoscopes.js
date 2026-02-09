/**
 * Vercel Cron Job API Route
 * Generates daily horoscopes at 07:00 AM
 * Path: /api/cron/generate-horoscopes
 */

import { getPlanetaryTransits, getBasicInterpretation } from '../../lib/services/astrologyService.js';
import { generateAllHoroscopes } from '../../lib/services/geminiService.js';
import { saveHoroscopes } from '../../lib/services/firebaseService.js';

export const config = {
    runtime: 'nodejs',
    maxDuration: 300 // 5 minutes max for cron job
};

export default async function handler(req, res) {
    // Verify this is a cron job request (security check)
    const authHeader = req.headers.authorization;

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        console.error('❌ Unauthorized cron job attempt');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('🚀 Starting daily horoscope generation...');
        const startTime = Date.now();

        // Step 1: Fetch planetary transits
        console.log('📡 Step 1: Fetching planetary transits...');
        const planetaryData = await getPlanetaryTransits();
        const interpretation = getBasicInterpretation(planetaryData);

        // Step 2: Generate horoscopes with Gemini AI
        console.log('🤖 Step 2: Generating horoscopes with AI...');
        const horoscopes = await generateAllHoroscopes(planetaryData, interpretation);

        // Step 3: Save to Firebase
        console.log('💾 Step 3: Saving to Firebase...');
        const date = new Date().toISOString().split('T')[0];
        await saveHoroscopes(date, horoscopes);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Horoscope generation completed in ${duration}s`);

        return res.status(200).json({
            success: true,
            message: 'Horoscopes generated successfully',
            date,
            duration: `${duration}s`,
            signsGenerated: Object.keys(horoscopes).length
        });

    } catch (error) {
        console.error('❌ Error generating horoscopes:', error);

        return res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

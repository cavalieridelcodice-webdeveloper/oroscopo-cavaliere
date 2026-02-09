/**
 * Test script to generate a single horoscope locally
 * Run with: node scripts/test-generation.js
 */

import dotenv from 'dotenv';
import { getPlanetaryTransits, getBasicInterpretation } from '../lib/services/astrologyService.js';
import { generateHoroscopeForSign } from '../lib/services/geminiService.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testGeneration() {
    try {
        console.log('🧪 Testing horoscope generation locally...\n');

        // Step 1: Test astrology API
        console.log('📡 Step 1: Fetching planetary transits...');
        const planetaryData = await getPlanetaryTransits();
        console.log('Planets:', Object.keys(planetaryData.planets).join(', '));
        console.log('');

        // Step 2: Get interpretation
        console.log('🔮 Step 2: Getting astrological interpretation...');
        const interpretation = getBasicInterpretation(planetaryData);
        console.log('Interpretation:', interpretation);
        console.log('');

        // Step 3: Generate one horoscope with Gemini
        console.log('🤖 Step 3: Generating horoscope for Ariete with Gemini AI...');
        const horoscope = await generateHoroscopeForSign('Ariete', planetaryData, interpretation);

        console.log('\n✨ Generated Horoscope for Ariete:');
        console.log('═'.repeat(50));
        console.log(`Rating: ${'⭐'.repeat(horoscope.rating)} (${horoscope.rating}/5)`);
        console.log('');
        console.log('💖 AMORE:');
        console.log(horoscope.love);
        console.log('');
        console.log('💼 LAVORO:');
        console.log(horoscope.work);
        console.log('');
        console.log('🍀 FORTUNA:');
        console.log(horoscope.luck);
        console.log('═'.repeat(50));

        console.log('\n✅ Test completed successfully!');
        console.log('\nNext step: Configure Firebase and test saving.');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

testGeneration();

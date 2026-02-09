import dotenv from 'dotenv';
import { generateHoroscopeForSign } from '../lib/services/geminiService.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testBackendGeneration() {
    console.log('🚀 Testing Backend Horoscope Generation...');

    try {
        // Mock planetary data (as it would come from astrologyService)
        const planetaryData = {
            date: new Date().toISOString().split('T')[0],
            fullDate: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
        };

        const signName = 'Scorpione'; // Test with Scorpio
        console.log(`🔮 Generating for ${signName}...`);

        const result = await generateHoroscopeForSign(signName, 7, planetaryData);

        console.log('\n✅ Result:');
        console.log(JSON.stringify(result, null, 2));

        if (result.love && result.love.length > 50) {
            console.log('\nSuccess! Content looks generated.');
        } else {
            console.warn('\nWarning: Content looks short or empty.');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testBackendGeneration();

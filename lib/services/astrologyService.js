/**
 * astrologyService.js
 * Service for providing date context for Gemini-driven astrological calculations.
 * External API dependencies have been removed to use direct Gemini reasoning.
 */

/**
 * Get current date for planetary transit context
 * @returns {Object} Basic date information
 */
export async function getPlanetaryTransits() {
    const now = new Date();

    console.log('📅 Using internal date context for Gemini transits:', now.toISOString().split('T')[0]);

    return {
        date: now.toISOString().split('T')[0],
        fullDate: now.toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
        timestamp: now.toISOString()
    };
}

/**
 * Get basic astrological interpretation placeholders
 * These are now largely handled directly by Gemini reasoning.
 */
export function getBasicInterpretation(planetaryData) {
    return {
        generalMood: 'variabile',
        loveEnergy: 'in evoluzione',
        workEnergy: 'dinamico',
        luckFactor: 3 // Default value
    };
}

/**
 * firebaseService.js
 * Firebase Admin SDK service for managing horoscopes in Firestore
 */

import admin from 'firebase-admin';

let firestore = null;

/**
 * Initialize Firebase Admin SDK
 */
export function initializeFirebase() {
    if (firestore) {
        return firestore;
    }

    try {
        // Check if app is already initialized
        if (!admin.apps.length) {
            const privateKey = process.env.FIREBASE_PRIVATE_KEY
                ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                : undefined;

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey
                })
            });
        }

        firestore = admin.firestore();
        console.log('✅ Firebase initialized successfully');
        return firestore;
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
        throw error;
    }
}

/**
 * Save daily horoscopes to Firestore
 * @param {string} date - Date in format YYYY-MM-DD
 * @param {Object} horoscopes - Object with horoscopes for all 12 signs
 */
export async function saveHoroscopes(date, horoscopes) {
    const db = initializeFirebase();

    try {
        const docRef = db.collection('horoscopes').doc(date);

        await docRef.set({
            date: date,
            generatedAt: new Date().toISOString(),
            signs: horoscopes
        });

        console.log(`✅ Horoscopes saved successfully for ${date}`);
        return { success: true, date };
    } catch (error) {
        console.error('❌ Error saving horoscopes:', error);
        throw error;
    }
}

/**
 * Get horoscopes for a specific date
 * @param {string} date - Date in format YYYY-MM-DD, or 'today'
 * @returns {Object} Horoscopes object
 */
export async function getHoroscopes(date) {
    const db = initializeFirebase();

    // If 'today', convert to YYYY-MM-DD
    if (date === 'today') {
        const now = new Date();
        date = now.toISOString().split('T')[0];
    }

    try {
        const docRef = db.collection('horoscopes').doc(date);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`⚠️ No horoscopes found for ${date}`);
            return null;
        }

        return doc.data();
    } catch (error) {
        console.error('❌ Error getting horoscopes:', error);
        throw error;
    }
}

/**
 * Get the most recent horoscopes if today's are not available
 */
export async function getMostRecentHoroscopes() {
    const db = initializeFirebase();

    try {
        const snapshot = await db.collection('horoscopes')
            .orderBy('date', 'desc')
            .limit(1)
            .get();

        if (snapshot.empty) {
            console.log('⚠️ No horoscopes found in database');
            return null;
        }

        const doc = snapshot.docs[0];
        return doc.data();
    } catch (error) {
        console.error('❌ Error getting recent horoscopes:', error);
        throw error;
    }
}

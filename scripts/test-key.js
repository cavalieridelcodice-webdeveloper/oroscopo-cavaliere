import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: '.env.local' });

const key = process.env.GEMINI_API_KEY;
console.log(`Key loaded: ${key ? 'YES' : 'NO'}`);
if (key) console.log(`Key starts with: ${key.substring(0, 4)}`);

async function test() {
    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hello");
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("Error:", e);
    }
}

test();

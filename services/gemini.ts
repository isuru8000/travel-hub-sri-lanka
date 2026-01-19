
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types.ts";

export const getLankaGuideResponse = async (prompt: string, language: Language) => {
  try {
    // Fix: Using process.env.API_KEY directly in the initialization object as per requirements
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `
      You are "Lanka Guide AI", a friendly and highly knowledgeable travel assistant for "Travel Hub Sri Lanka". 
      You speak fluently in ${language === 'SI' ? 'Sinhala and English' : 'English and Sinhala'}.
      Your personality is welcoming, respectful of Sri Lankan culture, and informative.
      You provide advice on:
      - Best places to visit (historical, natural, beaches).
      - Cultural etiquette (clothing for temples, greeting styles).
      - Budget travel tips for modern tourists.
      - Sri Lankan history and ancient legends.
      
      Always provide your main response in ${language === 'SI' ? 'Sinhala' : 'English'}.
      If the user asks in a different language, respond in that language but keep the tone consistent.
      Keep responses concise yet descriptive.
    `;

    // Fix: Using correct model and direct text property access
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'SI' 
      ? "කණගාටුයි, මට මේ අවස්ථාවේ පිළිතුරු දිය නොහැක. කරුණාකර නැවත උත්සාහ කරන්න."
      : "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

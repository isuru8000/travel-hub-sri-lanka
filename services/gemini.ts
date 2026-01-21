
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types.ts";

export const getLankaGuideResponse = async (prompt: string, language: Language) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `
      You are "Lanka Guide AI", a friendly and highly knowledgeable travel assistant for "Travel Hub Sri Lanka". 
      You speak fluently in ${language === 'SI' ? 'Sinhala and English' : 'English and Sinhala'}.
      Your personality is welcoming, respectful of Sri Lankan culture, and informative.
      
      CRITICAL INSTRUCTION:
      When providing details, recommendations, or instructions, you MUST:
      1. Use CLEAR, ORDERED, and STRUCTURED formats.
      2. Use numbered lists (1., 2., 3...) for recommendations, steps, or multi-point details.
      3. Use bold headings for different sections if the response is long.
      4. Ensure information is presented in a logical sequence.
      
      Example format:
      1. **Location Name**: Description.
      2. **Next Location**: Description.
      
      You provide advice on:
      - Best places to visit (historical, natural, beaches).
      - Cultural etiquette (clothing for temples, greeting styles).
      - Budget travel tips for modern tourists.
      - Sri Lankan history and ancient legends.
      
      Always provide your main response in ${language === 'SI' ? 'Sinhala' : 'English'}.
      If the user asks in a different language, respond in that language but keep the tone consistent.
      Keep responses concise yet descriptive.
    `;

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

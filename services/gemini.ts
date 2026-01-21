
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types.ts";

export interface GroundingLink {
  title: string;
  uri: string;
}

export interface AIResponse {
  text: string;
  links: GroundingLink[];
}

export const getLankaGuideResponse = async (
  prompt: string, 
  language: Language, 
  location?: { latitude: number; longitude: number }
): Promise<AIResponse | string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are "Lanka Guide AI", a prestige travel intelligence unit for "Travel Hub Sri Lanka". 
      You use real-time Google Maps data to provide accurate, up-to-date information about locations, restaurants, and landmarks in Sri Lanka.
      
      Your tone: 
      - Sophisticated, expert, and welcoming (Ayubowan).
      - Modern and tech-forward.

      Core Responsibilities:
      1. Use Google Maps grounding to verify opening hours, locations, and nearby amenities.
      2. Provide high-fidelity travel recommendations across the island.
      3. Explain historical narratives (e.g., Sigiriya's history).
      4. Support both English and Sinhala seamlessly.

      Output Format:
      - Use Markdown for structure.
      - Use bold headings for clarity.
      - Keep responses detailed but structured for mobile readability.
      
      Always provide your main response in ${language === 'SI' ? 'Sinhala' : 'English'}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Required for Google Maps grounding
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        tools: [{ googleMaps: {} }],
        ...(location && {
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: location.latitude,
                longitude: location.longitude
              }
            }
          }
        })
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    const links: GroundingLink[] = groundingChunks
      ?.map((chunk: any) => chunk.maps)
      .filter((m: any) => m && m.uri)
      .map((m: any) => ({ 
        title: m.title || (language === 'SI' ? "සිතියමෙන් බලන්න" : "View on Maps"), 
        uri: m.uri 
      })) || [];

    return { text, links };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error?.message?.includes("Requested entity was not found.")) {
       return language === 'SI' 
         ? "API සම්බන්ධතාවයේ දෝෂයක් පවතී. කරුණාකර ඔබගේ සැකසුම් පරීක්ෂා කරන්න."
         : "Registry connection error. Please verify your access credentials.";
    }
    return language === 'SI' 
      ? "කණගාටුයි, මට මේ අවස්ථාවේ පිළිතුරු දිය නොහැක. කරුණාකර නැවත උත්සාහ කරන්න."
      : "I'm sorry, my neural link is experiencing interference. Please try again.";
  }
};

/**
 * Fast task: Refine user story content using gemini-3-flash-preview.
 */
export const refineTravelStory = async (story: string, language: Language): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Refine this travel story to be more poetic, engaging, and atmospheric while keeping it personal. Return ONLY the refined story text. Language: ${language === 'SI' ? 'Sinhala' : 'English'}. Story: "${story}"`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    return response.text || story;
  } catch (e) {
    console.error(e);
    return story;
  }
};

/**
 * Complex task: Generate a detailed travel itinerary using gemini-3-pro-preview.
 */
export const generateDetailedItinerary = async (destination: string, language: Language): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `You are an elite travel planner for Travel Hub Sri Lanka. You specialize in creating high-end, culturally immersive 3-day itineraries. Use Markdown. Tone: Prestige and expert. Language: ${language === 'SI' ? 'Sinhala' : 'English'}.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ role: 'user', parts: [{ text: `Create a 3-day immersive itinerary for ${destination}, Sri Lanka.` }] }],
      config: { 
        systemInstruction,
        thinkingConfig: { thinkingBudget: 4000 } 
      }
    });
    return response.text || "";
  } catch (e) {
    console.error(e);
    return "Failed to generate itinerary. Please try again later.";
  }
};

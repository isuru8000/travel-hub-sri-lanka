
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

/**
 * Decodes a base64 string into a Uint8Array.
 */
export function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encodes a Uint8Array into a base64 string.
 */
export function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decodes raw PCM audio data into an AudioBuffer manually.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

/**
 * Creates an audio/pcm Blob from Float32Array input data.
 */
export function createPcmBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

/**
 * Main Guide Response: Optimized with transportation and local expertise.
 */
export const getLankaGuideResponse = async (
  prompt: string, 
  language: Language, 
  location?: { latitude: number; longitude: number },
  isThinkingMode: boolean = false
): Promise<AIResponse | string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are "Lanka Guide AI", a prestige travel intelligence unit for "Travel Hub Sri Lanka". 
      
      CORE LOGISTICS KNOWLEDGE:
      - TRANSPORTATION: 
        * Tuk-Tuks: Always suggest using the "PickMe" or "Uber" apps for fair pricing in cities. For street hails, ensure the "Meter" is on or agree on a price first.
        * Trains: The Colombo-Kandy-Ella route is essential. Advise users that 1st and 2nd class reserved seats sell out 30 days in advance. 3rd class is an adventure but crowded.
        * Buses: Recommend "AC Intercity" buses for long distances over "Red CTB" buses if they want comfort.
        * Drivers: Private car/drivers are the most flexible for 7+ day trips.
      - PLACES:
        * Sigiriya: Climb at 7 AM to avoid heat.
        * Ella: Recommend the Nine Arch Bridge for sunrise.
        * South Coast: Mirissa for whales, Hiriketiya for surf, Galle for history.
      
      ${isThinkingMode ? 'You are currently in DEEP THINKING MODE. Analyze complex itineraries and provide poetic, deeply historical insights.' : 'You use real-time data to provide snappy, accurate travel help.'}
      
      Your tone: Sophisticated, expert, and warm. Use "Ayubowan" to welcome users.
      Always respond in ${language === 'SI' ? 'Sinhala' : 'English'}.
    `;

    const model = isThinkingMode ? 'gemini-3-pro-preview' : 'gemini-2.5-flash';
    const tools = isThinkingMode ? [{ googleSearch: {} }] : [{ googleMaps: {} }];

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        tools,
        ...(isThinkingMode && { thinkingConfig: { thinkingBudget: 32768 } }),
        ...(!isThinkingMode && location && {
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
      ?.map((chunk: any) => isThinkingMode ? chunk.web : chunk.maps)
      .filter((m: any) => m && m.uri)
      .map((m: any) => ({ 
        title: m.title || (language === 'SI' ? "තොරතුරු බලන්න" : "View Details"), 
        uri: m.uri 
      })) || [];

    return { text, links };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return language === 'SI' 
      ? "කණගාටුයි, මගේ සම්බන්ධතාවයේ බාධාවක් පවතී. කරුණාකර නැවත උත්සාහ කරන්න."
      : "I'm sorry, my neural link is experiencing interference. Please try again.";
  }
};

/**
 * Real-time Information Retrieval: Uses gemini-3-pro-preview with max thinking budget.
 */
export const searchGrounding = async (query: string, language: Language, isThinkingMode: boolean = true): Promise<AIResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: isThinkingMode ? "gemini-3-pro-preview" : "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `You are the "Neural Intelligence Hub" for Travel Hub Sri Lanka. 
        Provide up-to-the-minute, accurate travel information using real-time search.
        Include details about current train delays, PickMe availability, and festival dates if asked.
        Format with clean Markdown. Language: ${language === 'SI' ? 'Sinhala' : 'English'}.`,
        tools: [{ googleSearch: {} }],
        ...(isThinkingMode && { thinkingConfig: { thinkingBudget: 32768 } })
      },
    });

    const text = response.text || "";
    const links: GroundingLink[] = [];
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          links.push({
            title: chunk.web.title || "Source",
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, links };
  } catch (e) {
    console.error(e);
    return { text: "Error syncing with the live web registry.", links: [] };
  }
};

/**
 * Poetic refinement: Uses gemini-3-flash-preview.
 */
export const refineTravelStory = async (story: string, language: Language): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Refine this travel story to be more poetic and atmospheric, capturing the spirit of Sri Lanka. Return ONLY the text. Language: ${language === 'SI' ? 'Sinhala' : 'English'}. Story: "${story}"`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    return response.text || story;
  } catch (e) {
    return story;
  }
};

/**
 * Itinerary creation: Uses gemini-3-pro-preview with max thinking.
 */
export const generateDetailedItinerary = async (destination: string, language: Language): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = `You are an elite travel planner. Create high-end 3-day itineraries that include specific transportation modes like the Blue Train or PickMe. Language: ${language === 'SI' ? 'Sinhala' : 'English'}. Use deep reasoning for logistics.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ role: 'user', parts: [{ text: `Create a detailed 3-day immersive itinerary for ${destination}, Sri Lanka.` }] }],
      config: { 
        systemInstruction,
        thinkingConfig: { thinkingBudget: 32768 } 
      }
    });
    return response.text || "";
  } catch (e) {
    return "Failed to generate itinerary.";
  }
};

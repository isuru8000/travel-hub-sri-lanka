
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
 * Note: AudioContext.decodeAudioData is for file formats (WAV/MP3), not raw PCM streams.
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
 * Scales the 32-bit floats to 16-bit signed integers and encodes to base64.
 */
export function createPcmBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    // The supported audio MIME type is 'audio/pcm'.
    mimeType: 'audio/pcm;rate=16000',
  };
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
 * Real-time Information Retrieval: Uses gemini-3-flash-preview with Google Search grounding.
 */
export const searchGrounding = async (query: string, language: Language): Promise<AIResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `You are the "Neural Intelligence Hub" for Travel Hub Sri Lanka. 
        Your goal is to provide up-to-the-minute, accurate travel information (prices, opening times, weather, events) for Sri Lanka using real-time search.
        Use Markdown. Format with clean sections. Language: ${language === 'SI' ? 'Sinhala' : 'English'}.`,
        tools: [{ googleSearch: {} }],
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

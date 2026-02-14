
import { GoogleGenAI, Modality } from "@google/genai";
import { LibraryService } from "./library_service";
import { SettingsService } from "./settings_service";

/**
 * Detects if text is Arabic or English based on character range.
 */
export function detectLanguage(text: string): 'ar' | 'en' {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text) ? 'ar' : 'en';
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
 * Decodes raw PCM data from the Gemini API into an AudioBuffer.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
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

export interface TTSOptions {
  text: string;
  gender: 'male' | 'female';
  language: string;
  type?: string;
}

/**
 * Helper to execute Gemini calls with retry logic for 429 errors.
 */
async function callGeminiWithRetry(fn: () => Promise<any>, retries = 3, delay = 2000): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    const isQuotaExceeded = error?.message?.includes('429') || error?.message?.includes('quota');
    if (isQuotaExceeded && retries > 0) {
      console.warn(`Quota exceeded (429). Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(r => setTimeout(r, delay));
      return callGeminiWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * PRODUCTION-READY: Generates speech using the Gemini 2.5 Flash TTS model and auto-saves to library.
 * Now includes retry logic for robust handling of 429 Resource Exhausted errors.
 */
export async function generateGeminiSpeech(options: TTSOptions): Promise<string | undefined> {
  const settings = SettingsService.getSettings();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const voiceName = options.gender === 'male' ? 'Fenrir' : 'Zephyr';
  const lang = settings.autoLanguageDetect ? options.language : settings.language;

  const response = await callGeminiWithRetry(() => ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ 
      parts: [{ 
        text: `Please read this ${lang} text clearly and naturally with the correct pronunciation: ${options.text}` 
      }] 
    }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  }));

  const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  
  if (audioData) {
    await LibraryService.saveItem({
      id: Date.now().toString(),
      text: options.text,
      audioBase64: audioData,
      date: new Date().toISOString()
    });
  }

  return audioData;
}

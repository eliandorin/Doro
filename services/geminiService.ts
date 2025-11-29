import { GoogleGenAI } from "@google/genai";
import { BrandTheme, GeneratedCopy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBrandCopy = async (theme: BrandTheme): Promise<GeneratedCopy> => {
  const modelId = "gemini-2.5-flash";
  
  let prompt = "";
  
  switch (theme) {
    case BrandTheme.CLINICAL:
      prompt = `Generate a sterile, scientific, and data-driven marketing headline and a short paragraph (max 40 words) for 'Axis Core', a rose-scented shower vaporizer that regulates cortisol levels. Focus on "HPA Axis Regulation", "Bio-availability", and "Neuro-chemistry". Use clinical terminology. Return JSON.`;
      break;
    case BrandTheme.LUXURY:
      prompt = `Generate a mysterious, poetic, and opulent marketing headline and a short paragraph (max 40 words) for 'Axis Core', a rose-scented shower vaporizer. Focus on "Rituals", "Sensory Awakening", "Deep Rest", and "Indulgence". Use evocative, velvety language. Return JSON.`;
      break;
    case BrandTheme.HYPE:
      prompt = `Generate a loud, aggressive, Gen-Z viral marketing headline and a short paragraph (max 40 words) for 'Axis Core', a rose-scented shower vaporizer. Focus on "Fixing Sleep", "Main Character Energy", "Instant Reset", and use internet slang/caps. Make it sound like a viral TikTok hook. Return JSON.`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedCopy;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      headline: "The Reset Anchor",
      body: "Experience the ultimate restoration ritual. Regulate your cortisol and reclaim your sleep with Axis Core."
    };
  }
};

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatWGemini = async (message: string, instruction: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
        responseMimeType: "text/plain",
        systemInstruction: instruction
      },
    });
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw new Error("Failed to get response from Gemini API");
  }
};

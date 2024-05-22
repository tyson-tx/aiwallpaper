import OpenAI from 'openai'

export function getOpenAIClient(): OpenAI {


    const apiKey = process.env.OPENAI_API_KEY;
    const baseURL = process.env.OPENAI_BASE_URL;
    if (!apiKey) {
        throw new Error("API key is not set in the environment variables.");
    }
    const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: process.env.OPENAI_BASE_URL,
    });
    console.log("apiKey:",apiKey)
    console.log("baseURL:",baseURL)

    return openai;
}
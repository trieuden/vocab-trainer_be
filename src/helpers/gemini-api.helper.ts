import { callApiHelper } from "./call-api.helper";

export class GeminiApiHelper {
    private buildApiUrl(baseUrl: string, model: string, apiKey: string) {
        return `${baseUrl}/${model}:generateContent?key=${apiKey}`;
    }

    private isRetriableRateOrUnavailableError(error: unknown): boolean {
        if (!(error instanceof Error)) return false;
        return error.message.includes("Request failed: 429") || error.message.includes("Request failed: 503");
    }

    async createGeminiContent(data: any) {
        const baseUrl = process.env.GEMINI_API_URL;
        const apiKey = process.env.GEMINI_API_KEY;
        const model = process.env.GEMINI_MODEL;
        const fallbackModel = process.env.GEMINI_FALLBACK_MODEL;

        if (!apiKey || !baseUrl || !model) {
            throw new Error("Missing GEMINI_API_KEY, GEMINI_API_URL, or GEMINI_MODEL");
        }

        const primaryUrl = this.buildApiUrl(baseUrl, model, apiKey);

        try {
            return await callApiHelper.callApi({ apiUrl: primaryUrl, body: data });
        } catch (error) {
            if (!fallbackModel || !this.isRetriableRateOrUnavailableError(error)) {
                throw error;
            }

            const fallbackUrl = this.buildApiUrl(baseUrl, fallbackModel, apiKey);
            return callApiHelper.callApi({ apiUrl: fallbackUrl, body: data });
        }
    }
}

export const geminiAPI = new GeminiApiHelper();

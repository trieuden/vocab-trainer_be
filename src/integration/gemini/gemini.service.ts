import { Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import { join } from "path";
import { geminiAPI } from "@/helpers/gemini-api.helper";
import { GenerateImageResult, GenerateTextResult, GeminiImageInput, GenerateWrongAnswersDto } from "./dtos";
import { GenerateFlashcardDto } from "./dtos/flashcard.types";

@Injectable()
export class GeminiService {
    async generateText(prompt: string, images: GeminiImageInput[] = []) {
        const body = {
            contents: [
                {
                    parts: [
                        { text: prompt },
                        ...images.map((image) => ({
                            inline_data: {
                                mime_type: image.mimeType,
                                data: image.data,
                            },
                        })),
                    ],
                },
            ],
        };

        const data = await geminiAPI.createGeminiContent(body);
        const parts = data.candidates?.[0]?.content?.parts ?? [];
        const text = parts
            .map((part) => part.text)
            .filter((value): value is string => Boolean(value))
            .join("\n");

        return { text, raw: data };
    }

    async generateImage(prompt: string) {
        const body = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseModalities: ["IMAGE", "TEXT"],
            },
        };

        const data = await geminiAPI.createGeminiContent(body);
        const parts = data.candidates?.[0]?.content?.parts ?? [];

        const images = parts
            .map((part) => {
                const camel = part.inlineData;
                const snake = part.inline_data;
                const mimeType = camel?.mimeType ?? snake?.mime_type;
                const imageData = camel?.data ?? snake?.data;
                if (!mimeType || !imageData) return null;
                return { mimeType, data: imageData };
            })
            .filter((value): value is { mimeType: string; data: string } => value !== null);

        return { images, raw: data };
    }

    async generateWrongAnswers(dto: GenerateWrongAnswersDto) {
        const { question, correctAnswer } = dto;
        const promptTemplatePath = join(process.cwd(), "src", "integration", "gemini", "docs", "multiple-choice.md");
        const promptTemplate = await readFile(promptTemplatePath, "utf-8");
        const body = {
            contents: [
                {
                    parts: [
                        {
                            text: `${promptTemplate}\n\nQuestion: ${question}\nCorrect Answer: ${correctAnswer}`,
                        },
                    ],
                },
            ],
        };

        const data = await geminiAPI.createGeminiContent(body);
        const parts = data?.candidates?.[0]?.content?.parts ?? [];
        const text = parts
            .map((part: { text?: string }) => part.text)
            .filter((value: string | undefined): value is string => Boolean(value))
            .join("\n")
            .trim();

        try {
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                if (Array.isArray(parsed) && parsed.length === 3) {
                    return { wrongAnswers: parsed.map(String), raw: data };
                }
            }
        } catch {}

        const lines = text.split("\n").map(l => l.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "").trim()).filter(Boolean);
        const wrongAnswers = lines.slice(0, 3);
        while (wrongAnswers.length < 3) {
            wrongAnswers.push("");
        }
        return { wrongAnswers, raw: data };
    }

    async generateFlashcard(dto: GenerateFlashcardDto) {
        const { words, level } = dto;
        const promptTemplatePath = join(process.cwd(), "src", "integration", "gemini", "docs", "flashcard.md");
        const promptTemplate = await readFile(promptTemplatePath, "utf-8");
        const body = {
            contents: [
                {
                    parts: [
                        {
                            text: `${promptTemplate}\n\nWords: ${words.join(", ")}\nLevel: ${level}`,
                        },
                    ],
                },
            ],
        };

        const data = await geminiAPI.createGeminiContent(body);
        const parts = data?.candidates?.[0]?.content?.parts ?? [];
        const text = parts
            .map((part: { text?: string }) => part.text)
            .filter((value: string | undefined): value is string => Boolean(value))
            .join("\n")
            .trim();

        const rows = text
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.startsWith("|") && line.endsWith("|"))
            .filter((line) => !line.includes("---"));

        const itemsFromTable =
            rows.length <= 1
                ? []
                : rows
                      .slice(1)
                      .map((row) => row.split("|").map((cell) => cell.trim()).filter(Boolean))
                      .map((cells) => ({
                          definition: cells[0] ?? "",
                          word: cells[1] ?? "",
                      }))
                      .filter((item) => item.word && item.definition);

        if (itemsFromTable.length > 0) {
            return itemsFromTable;
        }

        return text
            .split("\\")
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item) => {
                const commaIndex = item.indexOf(",");
                if (commaIndex < 0) return null;

                const word = item.slice(0, commaIndex).trim();
                const definition = item.slice(commaIndex + 1).trim();
                if (!word || !definition) return null;

                return { word, definition };
            })
            .filter((value): value is { word: string; definition: string } => value !== null);
    }
}

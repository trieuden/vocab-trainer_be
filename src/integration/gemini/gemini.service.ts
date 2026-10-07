import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { geminiAPI } from '@/helpers/gemini-api.helper';
import { GeminiTokenUsage } from '@/entities/gemini-token-usage.entity';
import { NSGeminiAction } from '@/common/enums/EGemini';
import {
  GenerateImageResult,
  GenerateTextResult,
  GeminiImageInput,
  GenerateWrongAnswersDto,
  GenerateFlashcardDto,
  GetTokenUsageDto,
} from './dtos';
import { SystemConfigService } from '@/domains/system-config/system-config.service';
import { NSSystemConfig } from '@/common/enums';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  constructor(
    @InjectRepository(GeminiTokenUsage)
    private readonly tokenUsageRepository: Repository<GeminiTokenUsage>,
    @Optional()
    private readonly systemConfigService?: SystemConfigService,
  ) {}

  private async getGeminiConfig() {
    if (!this.systemConfigService) return undefined;
    const codes = [NSSystemConfig.GEMINI_MODEL, NSSystemConfig.GEMINI_API_KEY, NSSystemConfig.GEMINI_API_URL, NSSystemConfig.GEMINI_FALLBACK_MODEL];
    const configs = await this.systemConfigService.list({ codes });
    const configMap = new Map<string, string>();
    for (const item of configs) {
      configMap.set(item.code, item.value);
    }

    return {
      model: configMap.get(NSSystemConfig.GEMINI_MODEL) || process.env.GEMINI_MODEL,
      apiKey: configMap.get(NSSystemConfig.GEMINI_API_KEY) || process.env.GEMINI_API_KEY,
      baseUrl: configMap.get(NSSystemConfig.GEMINI_API_URL) || process.env.GEMINI_API_URL,
      fallbackModel: configMap.get(NSSystemConfig.GEMINI_FALLBACK_MODEL) || process.env.GEMINI_FALLBACK_MODEL,
    };
  }

  private async recordTokenUsage(params: {
    action: NSGeminiAction;
    model?: string;
    usage?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
      thoughtsTokenCount?: number;
    };
    userId?: string;
    metadata?: Record<string, unknown>;
  }) {
    try {
      const usage = params.usage;
      const promptTokens = usage?.promptTokenCount ?? 0;
      const candidateTokens = usage?.candidatesTokenCount ?? 0;
      const totalTokens = usage?.totalTokenCount ?? (promptTokens + candidateTokens);
      const thoughtTokens = usage?.thoughtsTokenCount ?? 0;

      const record = this.tokenUsageRepository.create({
        action: params.action,
        model: params.model || process.env.GEMINI_MODEL || "gemini-3.8-flash",
        promptTokens,
        candidateTokens,
        totalTokens,
        thoughtTokens,
        userId: params.userId,
        metadata: params.metadata,
      });

      await this.tokenUsageRepository.save(record);
    } catch (error) {
      this.logger.error("Failed to record Gemini token usage", error);
    }
  }

  private getNextPacificMidnight() {
    const now = new Date();
    const ptString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const ptNow = new Date(ptString);

    const ptMidnight = new Date(ptNow);
    ptMidnight.setHours(24, 0, 0, 0);

    const diffMs = ptMidnight.getTime() - ptNow.getTime();
    const secondsRemaining = Math.max(0, Math.floor(diffMs / 1000));

    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);

    const resetAt = new Date(now.getTime() + diffMs);
    const humanString = `${hours} giờ ${minutes} phút`;

    return { resetAt, secondsRemaining, humanString };
  }

  async generateText(prompt: string, images: GeminiImageInput[] = []) {
    const config = await this.getGeminiConfig();
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

    const data = await geminiAPI.createGeminiContent(body, config);
    void this.recordTokenUsage({
      action: NSGeminiAction.GENERATE_TEXT,
      model: data?.modelVersion || config?.model,
      usage: data?.usageMetadata,
    });

    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part) => part.text)
      .filter((value): value is string => Boolean(value))
      .join('\n');

    return { text, raw: data };
  }

  async generateImage(prompt: string) {
    const config = await this.getGeminiConfig();
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    };

    const data = await geminiAPI.createGeminiContent(body, config);
    void this.recordTokenUsage({
      action: NSGeminiAction.GENERATE_IMAGE,
      model: data?.modelVersion || config?.model,
      usage: data?.usageMetadata,
    });

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
    const config = await this.getGeminiConfig();
    const { question, correctAnswer } = dto;
    const promptTemplatePath = join(process.cwd(), 'src', 'integration', 'gemini', 'docs', 'multiple-choice.md');
    const promptTemplate = await readFile(promptTemplatePath, 'utf-8');
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

    const data = await geminiAPI.createGeminiContent(body, config);
    void this.recordTokenUsage({
      action: NSGeminiAction.GENERATE_WRONG_ANSWERS,
      model: data?.modelVersion || config?.model,
      usage: data?.usageMetadata,
      metadata: { question: dto.question },
    });

    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part: { text?: string }) => part.text)
      .filter((value: string | undefined): value is string => Boolean(value))
      .join('\n')
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

    const lines = text
      .split('\n')
      .map((l) =>
        l
          .replace(/^\d+\.\s*/, '')
          .replace(/^[-*]\s*/, '')
          .trim(),
      )
      .filter(Boolean);
    const wrongAnswers = lines.slice(0, 3);
    while (wrongAnswers.length < 3) {
      wrongAnswers.push('');
    }
    return { wrongAnswers, raw: data };
  }

  async generateFlashcard(dto: GenerateFlashcardDto) {
    const config = await this.getGeminiConfig();
    const { words, level } = dto;
    const validWords = (words || []).map((w) => w?.trim()).filter(Boolean);
    if (validWords.length === 0) return [];

    const prompt = `You are an expert English dictionary and language teacher.
Generate concise flashcard definitions and IPA pronunciations for the following English words: ${validWords.join(", ")}.
${level ? `Target CEFR Language Level: ${level}` : ""}

Strict Requirements:
1. Provide a clear, natural, and concise English definition for each word (maximum 12 words per definition, suitable for flashcard learning).
2. Provide the accurate IPA phonetic transcription with slashes (e.g. "/ˈæp.əl/").
3. Return a valid JSON array of objects strictly matching this structure:
[
  {
    "word": "exact word",
    "phonetic": "/IPA transcription/",
    "phoneticText": "/IPA transcription/",
    "definition": "Clear concise definition under 12 words."
  }
]
Do not include markdown or extra explanations outside the JSON array.`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const data = await geminiAPI.createGeminiContent(body, config);
    void this.recordTokenUsage({
      action: NSGeminiAction.GENERATE_FLASHCARD,
      model: data?.modelVersion || config?.model,
      usage: data?.usageMetadata,
      metadata: { words: validWords },
    });

    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part: { text?: string }) => part.text)
      .filter((value: string | undefined): value is string => Boolean(value))
      .join("\n")
      .trim();

    if (!text) {
      return [];
    }

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => {
          const wordText = item?.word || "";
          const phonetic = item?.phonetic || item?.phoneticText || "";
          return {
            word: wordText,
            definition: item?.definition || "",
            phonetic: phonetic,
            phoneticText: phonetic,
            audio: wordText
              ? `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(
                  wordText.toLowerCase(),
                )}`
              : "",
          };
        });
      }
    } catch {}

    return [];
  }

  async defineWord(word: string) {
    const config = await this.getGeminiConfig();
    const trimmedWord = word.trim();
    if (!trimmedWord) return null;

    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(trimmedWord.toLowerCase())}`;
    const prompt = `You are an expert English dictionary. Define the English word: "${trimmedWord}".
Return a JSON object with this exact structure:
{
  "word": "${trimmedWord.toLowerCase()}",
  "phonetic": "/IPA transcription/",
  "phonetics": [
    {
      "text": "/IPA transcription/",
      "audio": "${audioUrl}"
    }
  ],
  "definition": "Primary concise definition in English",
  "meanings": [
    {
      "partOfSpeech": "noun | verb | adjective | adverb | etc.",
      "definitions": [
        {
          "definition": "Clear concise definition.",
          "example": "Clear example sentence."
        }
      ]
    }
  ]
}
If the word does not exist or is nonsensical, return null.`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    };

    const data = await geminiAPI.createGeminiContent(body, config);
    void this.recordTokenUsage({
      action: NSGeminiAction.DEFINE_WORD,
      model: data?.modelVersion || config?.model,
      usage: data?.usageMetadata,
      metadata: { word: trimmedWord },
    });

    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part: { text?: string }) => part.text)
      .filter((value: string | undefined): value is string => Boolean(value))
      .join('\n')
      .trim();

    if (!text) {
      return null;
    }

    try {
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object' || !parsed.word) {
        return null;
      }

      if (!Array.isArray(parsed.phonetics) || parsed.phonetics.length === 0) {
        parsed.phonetics = [
          {
            text: parsed.phonetic || '',
            audio: audioUrl,
          },
        ];
      } else {
        for (const item of parsed.phonetics) {
          if (!item.audio) {
            item.audio = audioUrl;
          }
        }
      }

      if (!parsed.definition && parsed.meanings?.[0]?.definitions?.[0]?.definition) {
        parsed.definition = parsed.meanings[0].definitions[0].definition;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  async getTokenUsage(dto: GetTokenUsageDto) {
    const days = dto.days ?? 7;
    const now = new Date();

    const { resetAt, secondsRemaining, humanString } = this.getNextPacificMidnight();
    const cycleStart = new Date(resetAt.getTime() - 24 * 60 * 60 * 1000);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);
    sinceDate.setHours(0, 0, 0, 0);

    const earliestDate = sinceDate < monthStart ? sinceDate : monthStart;

    const records = await this.tokenUsageRepository.find({
      select: {
        id: true,
        action: true,
        model: true,
        promptTokens: true,
        candidateTokens: true,
        totalTokens: true,
        thoughtTokens: true,
        userId: true,
        createdAt: true,
      },
      where: {
        isDeleted: false,
        createdAt: MoreThanOrEqual(earliestDate),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    let todayRequests = 0;
    let todayPromptTokens = 0;
    let todayCandidateTokens = 0;
    let todayTotalTokens = 0;

    let monthRequests = 0;
    let monthTotalTokens = 0;

    const actionMap = new Map<NSGeminiAction, { count: number; tokens: number }>();
    const modelMap = new Map<string, { count: number; tokens: number }>();
    const dailyMap = new Map<string, { count: number; tokens: number }>();

    for (const record of records) {
      const createdAt = new Date(record.createdAt);

      if (createdAt >= cycleStart) {
        todayRequests += 1;
        todayPromptTokens += record.promptTokens;
        todayCandidateTokens += record.candidateTokens;
        todayTotalTokens += record.totalTokens;
      }

      if (createdAt >= monthStart) {
        monthRequests += 1;
        monthTotalTokens += record.totalTokens;
      }

      if (createdAt >= sinceDate) {
        const actionEntry = actionMap.get(record.action) || { count: 0, tokens: 0 };
        actionEntry.count += 1;
        actionEntry.tokens += record.totalTokens;
        actionMap.set(record.action, actionEntry);

        const modelEntry = modelMap.get(record.model) || { count: 0, tokens: 0 };
        modelEntry.count += 1;
        modelEntry.tokens += record.totalTokens;
        modelMap.set(record.model, modelEntry);

        const dateKey = createdAt.toISOString().slice(0, 10);
        const dailyEntry = dailyMap.get(dateKey) || { count: 0, tokens: 0 };
        dailyEntry.count += 1;
        dailyEntry.tokens += record.totalTokens;
        dailyMap.set(dateKey, dailyEntry);
      }
    }

    const allTimeCount = await this.tokenUsageRepository.count({
      where: { isDeleted: false },
    });

    const dailyLimit = 1500;
    const remainingRequestsToday = Math.max(0, dailyLimit - todayRequests);
    const usedPercentageToday = Math.min(100, Math.round((todayRequests / dailyLimit) * 100));

    return {
      summary: {
        today: {
          requestCount: todayRequests,
          promptTokens: todayPromptTokens,
          candidateTokens: todayCandidateTokens,
          totalTokens: todayTotalTokens,
        },
        thisMonth: {
          requestCount: monthRequests,
          totalTokens: monthTotalTokens,
        },
        allTime: {
          requestCount: allTimeCount,
        },
      },
      quota: {
        dailyRequestLimit: dailyLimit,
        usedRequestsToday: todayRequests,
        remainingRequestsToday,
        usedPercentageToday,
        isOverLimit: todayRequests >= dailyLimit,
      },
      reset: {
        resetAt: resetAt.toISOString(),
        resetInSeconds: secondsRemaining,
        resetInHuman: humanString,
        timezone: "America/Los_Angeles (Pacific Time)",
        rule: "Google AI Studio resets daily quota at 00:00 Pacific Time (~14:00/15:00 VN)",
      },
      breakdown: {
        byAction: Array.from(actionMap.entries()).map(([action, stat]) => ({
          action,
          requestCount: stat.count,
          totalTokens: stat.tokens,
        })),
        byModel: Array.from(modelMap.entries()).map(([model, stat]) => ({
          model,
          requestCount: stat.count,
          totalTokens: stat.tokens,
        })),
        daily: Array.from(dailyMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, stat]) => ({
            date,
            requestCount: stat.count,
            totalTokens: stat.tokens,
          })),
      },
    };
  }
}

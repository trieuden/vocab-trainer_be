import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { NSGeminiAction } from "@/common/enums/EGemini";

export class GetTokenUsageDto {
  @ApiPropertyOptional({
    description: "Số ngày lịch sử gần đây cần xem thống kê",
    example: 7,
    default: 7,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(90)
  days?: number;
}

export interface GeminiActionStat {
  action: NSGeminiAction;
  requestCount: number;
  totalTokens: number;
}

export interface GeminiModelStat {
  model: string;
  requestCount: number;
  totalTokens: number;
}

export interface GeminiDailyStat {
  date: string;
  requestCount: number;
  totalTokens: number;
}

export interface GeminiResetInfo {
  resetAt: string;
  resetInSeconds: number;
  resetInHuman: string;
  timezone: string;
  rule: string;
}

export interface GeminiQuotaStatus {
  dailyRequestLimit: number;
  usedRequestsToday: number;
  remainingRequestsToday: number;
  usedPercentageToday: number;
  isOverLimit: boolean;
}

export interface TokenUsageReport {
  summary: {
    today: {
      requestCount: number;
      promptTokens: number;
      candidateTokens: number;
      totalTokens: number;
    };
    thisMonth: {
      requestCount: number;
      totalTokens: number;
    };
    allTime: {
      requestCount: number;
      totalTokens: number;
    };
  };
  quota: GeminiQuotaStatus;
  reset: GeminiResetInfo;
  breakdown: {
    byAction: GeminiActionStat[];
    byModel: GeminiModelStat[];
    daily: GeminiDailyStat[];
  };
}

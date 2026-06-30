import { CallApiDto } from "./dtos/callApi.dto";

export class CallApiHelper {
    private readonly maxRetries = 3;

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async callApi(dto: CallApiDto): Promise<any> {
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            const response = await fetch(dto.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    ...(dto.token ? { Authorization: `Bearer ${dto.token}` } : {}),
                },
                body: JSON.stringify(dto.body),
            });

            if (!response.ok) {
                const errorText = await response.text();
                const isRetriable = response.status === 429 || response.status === 503;
                const isLastAttempt = attempt === this.maxRetries;

                if (isRetriable && !isLastAttempt) {
                    const backoffMs = 1000 * 2 ** attempt;
                    await this.sleep(backoffMs);
                    continue;
                }

                throw new Error(`Request failed: ${response.status} ${errorText}`);
            }

            return response.json();
        }

        throw new Error("Request failed after retries");
    }
}

export const callApiHelper = new CallApiHelper();

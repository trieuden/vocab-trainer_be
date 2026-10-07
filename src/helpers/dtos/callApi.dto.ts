export class CallApiDto {
  apiUrl: string;
  body: any;
  token?: string;
  maxRetries?: number;
}
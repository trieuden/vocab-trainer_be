export type GeminiImageInput = {
  mimeType: string;
  data: string;
};

export type GenerateTextDto = {
  prompt: string;
  images?: GeminiImageInput[];
};

export type GenerateImageDto = {
  prompt: string;
};

export type GeneratedImage = {
  mimeType: string;
  data: string;
};

export type GenerateTextResult = {
  text: string;
  raw: unknown;
};

export type GenerateImageResult = {
  images: GeneratedImage[];
  raw: unknown;
};



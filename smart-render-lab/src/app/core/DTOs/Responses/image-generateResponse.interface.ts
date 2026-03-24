interface ITokenDetail {
  modality: 'TEXT' | 'IMAGE';
  tokenCount: number;
}

interface IUsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  thoughtsTokenCount: number;
  promptTokensDetails: ITokenDetail[];
  candidatesTokensDetails: ITokenDetail[];
  modelVersion: string;
  functionType: number;
  functionName: string;
  costUsage: number;
  tokenUsage: number;
}

export interface ImageGenerationResponse {
  based64Image: string;
  mimeType: string;
  generateContentCost: number;
  generateTokenCount: number;
  model: string;
  promptText: string;
  aspectRatio: string;
  creativity: string;
  imageSize: string;
  usageMetadata: IUsageMetadata;
}
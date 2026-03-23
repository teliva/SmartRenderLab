export interface TokenDetail {
  modality: 'TEXT' | 'IMAGE';
  tokenCount: number;
}

export interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  thoughtsTokenCount: number;
  promptTokensDetails: TokenDetail[];
  candidatesTokensDetails: TokenDetail[];
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
  usageMetadata: UsageMetadata;
}
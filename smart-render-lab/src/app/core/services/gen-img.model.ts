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

interface IGenImg {
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

export class GenImage implements IGenImg {
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
  imgHash: string;

  private constructor(data: IGenImg, hash: string) {
    this.based64Image = data.based64Image;
    this.mimeType = data.mimeType;
    this.generateContentCost = data.generateContentCost;
    this.generateTokenCount = data.generateTokenCount;
    this.model = data.model;
    this.promptText = data.promptText;
    this.aspectRatio = data.aspectRatio;
    this.creativity = data.creativity;
    this.imageSize = data.imageSize;
    this.usageMetadata = data.usageMetadata;
    this.imgHash = hash;
  }

  // factory method for constructing the state class that is used in the service for storing rendered image state
  static async create(data: IGenImg): Promise<GenImage> {
    const msTime = Date.now().toString();
    const hash = await this.hashString(data.based64Image + msTime);
    
    // Return a new instance with the pre-calculated hash
    return new GenImage(data, hash);
  }

  // produces the hash used for indexing
  private static async hashString(message: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
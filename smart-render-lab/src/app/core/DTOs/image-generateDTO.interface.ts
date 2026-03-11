export interface AIImageRequestDTO {
  UserId: number;
  Project: Project;
  GenerationConfig: GenerationConfig;
  ResponseConfig: ResponseConfig;
  KeyPhrases: KeyPhrases;
  Based64ProjectXml: string;
}

export interface Project {
  Id: number;
  Uuid: string;
}

export interface GenerationConfig {
  AspectRatio: string;
  ImageSize: string;
  Creativity: number;
}

export interface ResponseConfig {
  IncludeToken: boolean;
  IncludeCost: boolean;
  IncludeModel: boolean;
  IncludePrompt: boolean;
  ImageResponse: string;
}

export interface KeyPhrases {
  EnvironmentKeyPhrase: EnvironmentKeyPhrase;
  BackgroundEffectKeyPhrase: BackgroundEffectKeyPhrase;
}

export interface EnvironmentKeyPhrase {
  KeyPhrase: string[];
}

export interface BackgroundEffectKeyPhrase {
  KeyPhrase: string[];
}
import { AIImageRequestDTO } from "./image-generateDTO.interface";

export class AIImageRequest implements AIImageRequestDTO  {
    UserId = 1697;
    Project = { 
        Id : 7790, 
        Uuid: self.crypto.randomUUID()  
    }
    
    GenerationConfig = {
        AspectRatio: '16:9',
        ImageSize: '4k',
        Creativity: 0
    }
    
    ResponseConfig = {
        IncludeToken: true,
        IncludeCost: true,
        IncludeModel: true,
        IncludePrompt: true,
        ImageResponse: 'based64image',
    }

    KeyPhrases = {
        EnvironmentKeyPhrase : { KeyPhrase : []},
        BackgroundEffectKeyPhrase : { KeyPhrase : []}
    }

    Based64ProjectXml: string;
    
    constructor(encodedProjXml : string) {
        this.Based64ProjectXml = encodedProjXml;
    }
}
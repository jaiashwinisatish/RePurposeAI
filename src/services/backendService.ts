import { extractTranscript } from './mockTranscriptService';
import { fetchVideoMetadata, validateMetadata } from './metadataService';
import { 
  createTranscriptContext, 
  createMetadataContext, 
  ContentType 
} from './contentClassifier';

export type { ContentType };

export interface ContentGenerationInput {
  source: 'transcript' | 'metadata';
  contentType: ContentType;
  languageContext: 'english' | 'hindi' | 'hinglish' | 'unknown';
  transcript?: string;
  title?: string;
  description?: string;
  channel?: string;
}

export interface ContentGenerationError {
  error: string;
  message: string;
}

export async function prepareContentForGeneration(
  videoId: string
): Promise<ContentGenerationInput | ContentGenerationError> {
  console.log('Starting content preparation for video:', videoId);
  
  const transcript = await extractTranscript(videoId);
  
  if (transcript) {
    console.log('Using transcript for content generation');
    const context = createTranscriptContext(transcript);
    
    return {
      source: 'transcript',
      contentType: context.contentType,
      languageContext: context.languageContext,
      transcript
    };
  }
  
  console.log('Transcript unavailable, falling back to metadata');
  
  const metadata = await fetchVideoMetadata(videoId);
  
  if (!metadata) {
    console.log('Metadata fetch failed');
    return {
      error: 'INSUFFICIENT_DATA',
      message: 'Transcript and metadata not sufficient to generate content.'
    };
  }
  
  if (!validateMetadata(metadata)) {
    console.log('Metadata insufficient for content generation');
    return {
      error: 'INSUFFICIENT_DATA',
      message: 'Transcript and metadata not sufficient to generate content.'
    };
  }
  
  console.log('Using metadata for content generation');
  const context = createMetadataContext(
    metadata.title, 
    metadata.description, 
    metadata.channel
  );
  
  return {
    source: 'metadata',
    contentType: context.contentType,
    languageContext: context.languageContext,
    title: metadata.title,
    description: metadata.description,
    channel: metadata.channel
  };
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export function validateYouTubeUrl(url: string): boolean {
  const youtubePatterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=/,
    /^https?:\/\/youtu\.be\//,
    /^https?:\/\/(www\.)?youtube\.com\/embed\//,
    /^https?:\/\/(www\.)?youtube\.com\/v\//
  ];
  
  return youtubePatterns.some(pattern => pattern.test(url));
}

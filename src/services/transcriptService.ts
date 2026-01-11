import { YoutubeTranscript } from 'youtube-transcript';

/**
 * Extracts and cleans YouTube video transcript
 * Returns null if transcript is unavailable or insufficient
 */
export async function extractTranscript(videoId: string): Promise<string | null> {
  try {
    // Fetch transcript using youtube-transcript library
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: 'en'
    });
    
    if (!transcript || transcript.length === 0) {
      console.log('No transcript available for video:', videoId);
      return null;
    }
    
    // Combine transcript segments into readable text
    const fullTranscript = transcript
      .map(segment => segment.text)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Clean transcript artifacts
    const cleanedTranscript = fullTranscript
      .replace(/\[.*?\]/g, '') // Remove [Music], [Applause], etc.
      .replace(/\(.*?\)/g, '') // Remove parenthetical text
      .replace(/^[^a-zA-Z]*/g, '') // Remove leading non-letter characters
      .replace(/\b(\w+)(?:\s+\1){2,}\b/g, '$1') // Remove repeated words
      .trim();
    
    // Validate transcript quality
    if (cleanedTranscript.length < 200) {
      console.log('Transcript too short for content generation:', cleanedTranscript.length, 'characters');
      return null;
    }
    
    console.log('Successfully extracted transcript:', cleanedTranscript.length, 'characters');
    return cleanedTranscript;
    
  } catch (error) {
    console.error('Transcript extraction failed for video:', videoId, error);
    return null;
  }
}

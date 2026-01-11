/**
 * Fetches YouTube video metadata using YouTube Data API
 * Returns null if metadata is unavailable
 */
export async function fetchVideoMetadata(videoId: string): Promise<{
  title: string;
  description: string;
  channel: string;
} | null> {
  try {
    // First try oEmbed API (simpler, no API key needed)
    const oembedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    
    if (oembedResponse.ok) {
      const oembedData = await oembedResponse.json();
      return {
        title: oembedData.title || '',
        description: '', // oEmbed doesn't provide description
        channel: oembedData.author_name || ''
      };
    }
    
    // Fallback to YouTube Data API if API key is available
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) {
      console.log('YouTube API key not available, using limited metadata');
      return null;
    }
    
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.log('No video found for ID:', videoId);
      return null;
    }
    
    const snippet = data.items[0].snippet;
    return {
      title: snippet.title || '',
      description: snippet.description || '',
      channel: snippet.channelTitle || ''
    };
    
  } catch (error) {
    console.error('Metadata fetch failed for video:', videoId, error);
    return null;
  }
}

/**
 * Validates if metadata is sufficient for content generation
 */
export function validateMetadata(metadata: { title: string; description: string; channel: string }): boolean {
  const totalLength = metadata.title.length + metadata.description.length;
  return totalLength >= 50; // Minimum 50 characters total
}

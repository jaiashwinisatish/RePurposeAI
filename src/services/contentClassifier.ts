/**
 * Content type classifier for YouTube videos
 * Determines the nature of content based on title, description, and transcript
 */
export type ContentType = 'entertainment' | 'education' | 'discussion' | 'business' | 'unknown';

export interface ContentContext {
  source: 'transcript' | 'metadata';
  contentType: ContentType;
  languageContext: 'english' | 'hindi' | 'hinglish' | 'unknown';
}

/**
 * Classifies content type based on text analysis
 */
export function classifyContentType(text: string): ContentType {
  const cleanText = text.toLowerCase();
  
  // Entertainment indicators
  const entertainmentKeywords = [
    'episode', 'sitcom', 'comedy', 'show', 'series', 'drama',
    'taarak mehta', 'tmkuc', 'yeh rishta', 'kapil sharma',
    'funny', 'laugh', 'humor', 'entertainment', 'character'
  ];
  
  // Education indicators
  const educationKeywords = [
    'tutorial', 'how to', 'guide', 'learn', 'course', 'lesson',
    'educational', 'training', 'workshop', 'step by step'
  ];
  
  // Discussion indicators
  const discussionKeywords = [
    'podcast', 'interview', 'discussion', 'talk', 'conversation',
    'debate', 'panel', 'q&a', 'ask me anything'
  ];
  
  // Business indicators
  const businessKeywords = [
    'business', 'startup', 'marketing', 'entrepreneur', 'revenue',
    'profit', 'company', 'corporate', 'sales', 'strategy'
  ];
  
  // Count keyword matches
  const entertainmentScore = entertainmentKeywords.filter(keyword => 
    cleanText.includes(keyword)
  ).length;
  
  const educationScore = educationKeywords.filter(keyword => 
    cleanText.includes(keyword)
  ).length;
  
  const discussionScore = discussionKeywords.filter(keyword => 
    cleanText.includes(keyword)
  ).length;
  
  const businessScore = businessKeywords.filter(keyword => 
    cleanText.includes(keyword)
  ).length;
  
  // Determine content type based on highest score
  const scores = {
    entertainment: entertainmentScore,
    education: educationScore,
    discussion: discussionScore,
    business: businessScore,
    unknown: 0
  };
  
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return 'unknown';
  
  const contentType = Object.keys(scores).find(key => 
    scores[key as ContentType] === maxScore
  ) as ContentType;
  
  return contentType;
}

/**
 * Detects language context from text
 */
export function detectLanguageContext(text: string): 'english' | 'hindi' | 'hinglish' | 'unknown' {
  const cleanText = text.toLowerCase();
  
  // Hindi/Hinglish indicators
  const hindiIndicators = [
    'namaste', 'ji', 'bhai', 'didi', 'babuji', 'aap', 'hum', 'tum',
    'mehta', 'taarak', 'daya', 'jethalal', 'chashmah', 'gokuldham',
    'hai', 'hain', 'ki', 'ko', 'se', 'mein', 'par', 'ke liye'
  ];
  
  const hindiScore = hindiIndicators.filter(indicator => 
    cleanText.includes(indicator)
  ).length;
  
  if (hindiScore >= 3) return 'hindi';
  if (hindiScore >= 1) return 'hinglish';
  
  // Basic English detection
  const englishWords = cleanText.match(/\b[a-z]+\b/g) || [];
  if (englishWords.length > 10) return 'english';
  
  return 'unknown';
}

/**
 * Creates content context from transcript
 */
export function createTranscriptContext(transcript: string): ContentContext {
  return {
    source: 'transcript',
    contentType: classifyContentType(transcript),
    languageContext: detectLanguageContext(transcript)
  };
}

/**
 * Creates content context from metadata
 */
export function createMetadataContext(
  title: string, 
  description: string, 
  channel: string
): ContentContext {
  const combinedText = `${title} ${description} ${channel}`;
  
  return {
    source: 'metadata',
    contentType: classifyContentType(combinedText),
    languageContext: detectLanguageContext(combinedText)
  };
}

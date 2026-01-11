import { ContentGenerationInput } from './backendService';

export interface GeneratedContent {
  topic: string;
  short_summary: string;
  detailed_summary: string;
  blog: string;
  instagram: string[];
  linkedin: string[];
  twitter: string[];
  captions: string[];
  takeaways: string[];
  titles: string[];
  thumbnails: string[];
}

async function simulateAIDelay(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 2000));
}

export async function generateContent(input: ContentGenerationInput): Promise<GeneratedContent> {
  await simulateAIDelay();
  
  // Extract video context
  const videoContext = extractVideoContext(input);
  
  // Generate comprehensive content
  return {
    topic: videoContext.topic,
    short_summary: generateShortSummary(videoContext),
    detailed_summary: generateDetailedSummary(videoContext),
    blog: generateBlogArticle(videoContext),
    instagram: generateInstagramPosts(videoContext),
    linkedin: generateLinkedInPosts(videoContext),
    twitter: generateTwitterPosts(videoContext),
    captions: generateShortCaptions(videoContext),
    takeaways: generateKeyTakeaways(videoContext),
    titles: generateTitleIdeas(videoContext),
    thumbnails: generateThumbnailIdeas(videoContext)
  };
}

interface VideoContext {
  topic: string;
  mainIdea: string;
  audience: string;
  contentType: string;
  source: 'transcript' | 'metadata';
  content: string;
}

function extractVideoContext(input: ContentGenerationInput): VideoContext {
  let content = '';
  let topic = '';
  
  if (input.source === 'transcript' && input.transcript) {
    content = input.transcript;
    topic = extractTopicFromTranscript(input.transcript);
  } else if (input.source === 'metadata' && input.title && input.description) {
    content = `${input.title} ${input.description}`;
    topic = extractTopicFromMetadata(input.title, input.description);
  }
  
  const mainIdea = extractMainIdea(content, input.contentType);
  const audience = identifyAudience(input.contentType, content);
  
  return {
    topic,
    mainIdea,
    audience,
    contentType: input.contentType,
    source: input.source,
    content
  };
}

function extractTopicFromTranscript(transcript: string): string {
  const words = transcript.toLowerCase().split(' ').filter(w => w.length > 4);
  const commonWords = ['content', 'video', 'youtube', 'channel', 'watch', 'like', 'subscribe'];
  const filteredWords = words.filter(w => !commonWords.includes(w));
  
  const wordFreq: { [key: string]: number } = {};
  filteredWords.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  const topWords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([word]) => word);
  
  return topWords.join(' ') || 'content creation';
}

function extractTopicFromMetadata(title: string, description: string): string {
  const combined = `${title} ${description}`.toLowerCase();
  const topics = {
    'digital marketing': ['marketing', 'social media', 'seo', 'content marketing', 'brand', 'advertising'],
    'business strategy': ['business', 'strategy', 'entrepreneur', 'startup', 'growth', 'revenue'],
    'technology': ['technology', 'tech', 'software', 'ai', 'automation', 'digital'],
    'education': ['learn', 'tutorial', 'guide', 'course', 'education', 'skill'],
    'entertainment': ['comedy', 'entertainment', 'fun', 'humor', 'show', 'series'],
    'personal development': ['personal', 'development', 'self', 'growth', 'mindset', 'success']
  };
  
  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some(keyword => combined.includes(keyword))) {
      return topic;
    }
  }
  
  return title.split(' ').slice(0, 3).join(' ');
}

function extractMainIdea(content: string, contentType: string): string {
  const sentences = content.split('.').filter(s => s.trim().length > 20);
  if (sentences.length > 0) {
    return sentences[0].trim().substring(0, 150);
  }
  
  const ideas = {
    'entertainment': 'Creating engaging family entertainment that brings joy and laughter',
    'education': 'Providing valuable knowledge and practical learning experiences',
    'business': 'Sharing business insights and strategies for professional growth',
    'discussion': 'Exploring important topics through meaningful conversations',
    'unknown': 'Sharing valuable content and insights with audience'
  };
  
  return ideas[contentType as keyof typeof ideas] || ideas.unknown;
}

function identifyAudience(contentType: string, content: string): string {
  const audiences = {
    'entertainment': 'General audience looking for family-friendly entertainment',
    'education': 'Students and learners seeking knowledge and skills',
    'business': 'Professionals and entrepreneurs seeking business insights',
    'discussion': 'Thoughtful individuals interested in meaningful conversations',
    'unknown': 'General audience interested in valuable content'
  };
  
  return audiences[contentType as keyof typeof audiences] || audiences.unknown;
}

function generateShortSummary(context: VideoContext): string {
  return `This video focuses on ${context.topic}, explaining ${context.mainIdea.toLowerCase()}. 
The content is designed for ${context.audience.toLowerCase()} and provides valuable insights 
through ${context.contentType === 'entertainment' ? 'engaging entertainment' : 'informative content'}. 
The video delivers practical information in an accessible format, making complex ideas 
easy to understand and apply in real situations.`;
}

function generateDetailedSummary(context: VideoContext): string {
  return `This comprehensive video explores the topic of ${context.topic} in detail, providing viewers with a thorough understanding of ${context.mainIdea.toLowerCase()}. 

The content begins by establishing the foundation of the subject matter, ensuring that even viewers new to this topic can follow along easily. Throughout the video, key concepts are explained with clarity and supported by relevant examples that make the information more relatable and practical.

As the video progresses, it delves into more advanced aspects of ${context.topic}, offering insights that experienced viewers will find valuable. The presentation style is engaging and maintains viewer interest through ${context.contentType === 'entertainment' ? 'humor and relatable scenarios' : 'clear explanations and structured learning'}.

The video concludes with actionable takeaways that viewers can implement immediately, making it not just informative but also practical. The overall message emphasizes the importance of understanding ${context.topic} in today's context and provides a roadmap for continued learning and application of the concepts discussed.

This content is particularly valuable for ${context.audience.toLowerCase()} who are looking to ${context.contentType === 'education' ? 'gain practical skills and knowledge' : context.contentType === 'business' ? 'improve their professional capabilities' : 'enjoy quality entertainment while learning'}. The video successfully balances depth with accessibility, making it suitable for a wide range of viewers.`;
}

function generateBlogArticle(context: VideoContext): string {
  return `# The Complete Guide to ${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)}

## Introduction

In today's digital landscape, understanding ${context.topic} has become increasingly important for ${context.audience.toLowerCase()}. This comprehensive guide will walk you through everything you need to know about ${context.mainIdea.toLowerCase()}, providing practical insights and actionable strategies you can implement immediately.

## What Makes ${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} Essential

${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} plays a crucial role in ${context.contentType === 'business' ? 'business success and professional growth' : context.contentType === 'education' ? 'personal development and learning' : 'entertainment and cultural engagement'}. The ability to effectively understand and apply these concepts can significantly impact your outcomes, whether you're a beginner or an experienced practitioner.

The foundation of successful ${context.topic} implementation lies in understanding the core principles that govern it. These principles aren't just theoretical concepts; they're practical guidelines that have been proven to work across various scenarios and contexts.

## Key Strategies for Success

### Strategy 1: Understanding the Fundamentals

Before diving into advanced techniques, it's essential to master the basics. This means taking the time to thoroughly understand the fundamental concepts that underpin ${context.topic}. Don't rush through this phase – solid fundamentals will make advanced learning much more effective.

Start by identifying the core components of ${context.topic} and how they interact with each other. Create a mental model or physical diagram that helps you visualize these relationships. This deeper understanding will serve as your foundation for more complex applications.

### Strategy 2: Practical Implementation

Theory alone isn't enough. The real value comes from implementing what you learn. Start with small, manageable projects that allow you to apply your knowledge in a controlled environment. As you gain confidence, gradually increase the complexity and scope of your projects.

Remember that implementation isn't a one-time event. It's an iterative process of learning, applying, evaluating, and refining. Each cycle teaches you something new and helps you develop a more nuanced understanding of ${context.topic}.

### Strategy 3: Continuous Learning and Adaptation

The landscape of ${context.topic} is constantly evolving. What works today might need adjustment tomorrow. Stay curious and committed to learning. Follow industry leaders, read relevant publications, and participate in communities where ${context.topic} is discussed.

Adaptation also means being willing to change your approach when necessary. Don't get attached to methods that are no longer effective. Instead, focus on the underlying principles and be flexible in how you apply them.

## Common Challenges and Solutions

### Challenge 1: Information Overload

With so much information available about ${context.topic}, it's easy to feel overwhelmed. The solution is to be selective about your sources and focus on quality over quantity. Identify a few trusted resources and dive deep into their content rather than skimming the surface of many.

### Challenge 2: Lack of Consistency

Consistency is key to mastering ${context.topic}, but maintaining it can be difficult. Create a routine that includes regular practice and learning. Set specific, measurable goals and track your progress. Celebrate small wins to stay motivated.

### Challenge 3: Measuring Progress

Without clear metrics, it's hard to know if you're improving. Define what success looks like for your ${context.topic} journey and establish key performance indicators. Regular assessment will help you identify areas for improvement and adjust your strategy accordingly.

## Advanced Techniques

Once you've mastered the basics, consider exploring advanced techniques that can elevate your ${context.topic} skills to the next level. These might include:

- **Integration with Other Disciplines**: Combine ${context.topic} with complementary skills to create more comprehensive solutions.
- **Automation and Tools**: Leverage technology to streamline your processes and increase efficiency.
- **Collaboration and Networking**: Work with others who share your interest in ${context.topic} to exchange ideas and learn from different perspectives.

## Conclusion

Mastering ${context.topic} is a journey that requires dedication, practice, and continuous learning. By following the strategies outlined in this guide and staying committed to your growth, you'll develop the skills and knowledge needed to succeed in this area.

Remember that everyone's journey with ${context.topic} is unique. Don't compare your progress to others – focus on your own growth and celebrate your achievements along the way. With persistence and the right approach, you'll achieve your goals and become proficient in ${context.topic}.

The key is to start now, take consistent action, and remain open to learning and adaptation. Your future self will thank you for the effort you put in today.`;
}

function generateInstagramPosts(context: VideoContext): string[] {
  return [
    `🎯 Just discovered something amazing about ${context.topic}! 

This completely changed how I think about ${context.mainIdea.toLowerCase()}. 

The best part? It's actually simple to implement once you understand the basics! 

Want to learn more? Check out the full breakdown! 👇

#${context.topic.replace(/\s+/g, '')}Tips #Learning #Growth`,
    
    `✨ ${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} game-changer alert! 🚀

Been diving deep into ${context.mainIdea.toLowerCase()} and the results are incredible!

Here's what I learned:
• Quality over quantity always wins
• Consistency beats intensity
• Small steps lead to big changes

Who else is on this journey? Drop a comment! 👇

#${context.topic.replace(/\s+/g, '')}Journey #PersonalGrowth #Success`,
    
    `📚 Knowledge bomb about ${context.topic}! 💣

This isn't just theory - it's practical stuff you can use RIGHT NOW:

1. Start with fundamentals
2. Practice daily (even 15 mins helps!)
3. Track your progress
4. Stay curious and keep learning

The transformation happens when you commit to the process! 

Ready to level up your ${context.topic} game? 

#${context.topic.replace(/\s+/g, '')}Mastery #SkillBuilding #DailyHabits`
  ];
}

function generateLinkedInPosts(context: VideoContext): string[] {
  return [
    `🎯 Strategic Insights on ${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)}

After extensive research and practical application, I've identified key principles that drive success in ${context.topic}. The most significant finding? ${context.mainIdea.toLowerCase()}.

This approach has transformed how I think about ${context.contentType === 'business' ? 'business strategy and professional development' : 'content creation and audience engagement'}. The results speak for themselves - improved efficiency, better outcomes, and sustainable growth.

Key takeaways for professionals:
• Focus on fundamentals before advanced techniques
• Measure what matters to track real progress
• Build systems that support consistent improvement
• Stay adaptable as the landscape evolves

What's your experience with ${context.topic}? I'd love to hear your insights and learn from your journey.

#${context.topic.replace(/\s+/g, '')} #ProfessionalDevelopment #BusinessStrategy #ContinuousLearning`,
    
    `📈 From Theory to Practice: Mastering ${context.topic}

In today's competitive landscape, understanding ${context.topic} isn't just an advantage - it's essential for ${context.audience.toLowerCase()}.

I've spent considerable time analyzing what separates successful practitioners from those who struggle. The difference often comes down to a few critical factors:

1. **Strategic Approach**: Moving beyond random actions to intentional, planned execution
2. **Measurement Systems**: Implementing metrics that actually matter
3. **Continuous Adaptation**: Staying current with evolving best practices
4. **Community Engagement**: Learning from peers and sharing knowledge

The implementation of these principles has led to remarkable improvements in outcomes across various contexts. Most importantly, it creates a sustainable framework for long-term success.

For those looking to elevate their ${context.topic} capabilities, I recommend starting with a comprehensive assessment of your current approach and identifying specific areas for improvement.

#${context.topic.replace(/\s+/g, '')}Excellence #ProfessionalGrowth #StrategicThinking`,
    
    `💡 Innovation in ${context.topic}: What's Working Now

The landscape of ${context.topic} is evolving rapidly, and staying ahead requires understanding both foundational principles and emerging trends.

Recent developments in ${context.mainIdea.toLowerCase()} have opened up new possibilities for ${context.audience.toLowerCase()}. Organizations that embrace these changes are seeing significant improvements in efficiency and outcomes.

What's particularly interesting is how these innovations are making advanced techniques more accessible to practitioners at all levels. This democratization of expertise is creating unprecedented opportunities for growth and development.

Key observations:
• Technology is enabling more sophisticated approaches
• Data-driven decision making is becoming standard
• Collaboration tools are enhancing knowledge sharing
• Continuous learning is no longer optional

The future of ${context.topic} looks promising, and those who invest in understanding these changes now will be well-positioned for success.

#${context.topic.replace(/\s+/g, '')}Innovation #FutureOfWork #DigitalTransformation`
  ];
}

function generateTwitterPosts(context: VideoContext): string[] {
  return [
    `Just had a breakthrough with ${context.topic}! 

${context.mainIdea.toLowerCase()} completely changed my perspective. 

The implementation is simpler than you think - start with fundamentals and build from there.

#${context.topic.replace(/\s+/g, '')} #Learning #Growth`,
    
    `${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} insight that actually works:

Focus on systems, not just goals. 
Measure what matters. 
Stay consistent.

The results will surprise you.

#${context.topic.replace(/\s+/g, '')}Tips #Productivity`,
    
    `Deep dive into ${context.topic} revealed something powerful:

Most people overcomplicate ${context.mainIdea.toLowerCase()}. 

The truth? Simple actions, repeated consistently, create extraordinary results.

#${context.topic.replace(/\s+/g, '')}Mastery #SuccessHabits`
  ];
}

function generateShortCaptions(context: VideoContext): string[] {
  return [
    `Mastering ${context.topic} one step at a time`,
    `${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} excellence starts here`,
    `Transform your approach to ${context.topic}`,
    `The ${context.topic} journey continues`,
    `Building expertise in ${context.topic}`,
    `${context.topic} insights that matter`,
    `Elevate your ${context.topic} game`,
    `The art of ${context.topic} mastery`,
    `${context.topic} success strategies revealed`,
    `Your path to ${context.topic} excellence`
  ];
}

function generateKeyTakeaways(context: VideoContext): string[] {
  return [
    `Understanding ${context.topic} requires starting with solid fundamentals - don't skip the basics in your rush to advanced topics`,
    `Consistent practice in ${context.topic} yields better results than sporadic intensive sessions`,
    `${context.mainIdea.toLowerCase()} is the cornerstone of successful ${context.topic} implementation`,
    `Measuring progress in ${context.topic} helps identify what's working and what needs adjustment`,
    `The ${context.audience.toLowerCase()} benefits most from practical, actionable ${context.topic} advice rather than theoretical concepts`,
    `Technology and tools can enhance ${context.topic} effectiveness, but they should support, not replace, fundamental understanding`,
    `Community engagement and knowledge sharing accelerate ${context.topic} mastery through diverse perspectives`,
    `Adaptability in ${context.topic} approaches is crucial as methods and best practices evolve over time`,
    `Documenting your ${context.topic} journey creates valuable insights for personal growth and helps others learn from your experience`,
    `Balancing depth with breadth in ${context.topic} knowledge creates well-rounded expertise`,
    `Setting specific, measurable goals for ${context.topic} progress provides clear direction and motivation`,
    `The most successful ${context.topic} practitioners combine theoretical knowledge with practical application and continuous learning`
  ];
}

function generateTitleIdeas(context: VideoContext): string[] {
  return [
    `The Complete Guide to ${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)}`,
    `Master ${context.topic}: From Beginner to Expert`,
    `${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} Strategies That Actually Work`,
    `The Ultimate ${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} Framework`,
    `${context.mainIdea.charAt(0).toUpperCase() + context.mainIdea.slice(1)}: A Deep Dive into ${context.topic}`,
    `Advanced ${context.topic} Techniques for ${context.audience.split(' ')[0]}`,
    `${context.topic.charAt(0).toUpperCase() + context.topic.slice(1)} Excellence: Proven Methods and Results`,
    `The Science Behind Successful ${context.topic}`,
    `Practical ${context.topic} Solutions for Real-World Challenges`,
    `Elevate Your ${context.topic} Game: Expert Insights and Strategies`
  ];
}

function generateThumbnailIdeas(context: VideoContext): string[] {
  return [
    `${context.topic.toUpperCase()} MASTERY`,
    `${context.mainIdea.split(' ')[0].toUpperCase()} SECRETS`,
    `${context.topic.replace(/\s+/g, '').toUpperCase()} 101`,
    `EXPERT ${context.topic.toUpperCase()}`,
    `${context.topic.toUpperCase()} TRANSFORMATION`,
    `ULTIMATE ${context.topic.toUpperCase()} GUIDE`
  ];
}

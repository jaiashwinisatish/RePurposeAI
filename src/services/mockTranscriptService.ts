// Mock transcript service to avoid CORS issues with YouTube
export async function extractTranscript(videoId: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock transcript based on video ID
  const mockTranscripts: { [key: string]: string } = {
    'm-2aFCLUm-s': `Welcome to our comprehensive guide on content creation strategies. In this video, we'll explore the most effective methods for creating engaging content that resonates with your audience.

First, let's talk about understanding your target audience. This is crucial because without knowing who you're creating content for, you'll struggle to connect with them effectively. Research shows that content tailored to specific audience segments performs 3x better than generic content.

Next, we'll dive into content planning and strategy. Many creators make the mistake of jumping straight into production without a solid plan. A well-structured content calendar helps maintain consistency and ensures you're covering topics that matter to your audience.

The third key element is quality production. While you don't need expensive equipment, investing in good lighting and clear audio can significantly improve your content's perceived value. Remember, viewers are more likely to engage with content that looks and sounds professional.

Distribution is another critical factor. Creating great content is only half the battle - you need to ensure it reaches the right people. Utilize multiple platforms and optimize your content for each one's unique requirements.

Finally, engagement and community building. The most successful creators don't just publish content and disappear. They actively engage with their audience, respond to comments, and build a community around their content.

By implementing these strategies consistently, you'll see significant improvement in your content's performance and audience growth.`,
    
    'default': `This video covers essential strategies for content creators looking to grow their audience and improve engagement. We discuss audience understanding, content planning, production quality, distribution strategies, and community building.

The key takeaway is that successful content creation requires a holistic approach - combining great content with smart distribution and genuine audience engagement. Consistency and authenticity are crucial for long-term success.

Remember that content creation is a journey of continuous learning and improvement. Stay focused on providing value to your audience, and the growth will follow naturally.`
  };
  
  return mockTranscripts[videoId] || mockTranscripts['default'];
}

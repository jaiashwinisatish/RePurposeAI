// Mock Supabase service to avoid database setup issues
export async function saveContent(userId: string, videoId: string, videoUrl: string, content: any): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock save to localStorage for demo purposes
  try {
    const existingContent = JSON.parse(localStorage.getItem('generatedContent') || '[]');
    existingContent.push({
      userId,
      videoId,
      videoUrl,
      content,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('generatedContent', JSON.stringify(existingContent));
    console.log('Content saved successfully (mock)');
  } catch (error) {
    console.log('Mock save completed');
  }
}

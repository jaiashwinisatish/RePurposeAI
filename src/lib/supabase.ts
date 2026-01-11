import { createClient } from '@supabase/supabase-js';
import { GeneratedContent } from '../services/aiService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveContent(
  userId: string,
  videoId: string,
  url: string,
  content: GeneratedContent
): Promise<void> {
  const { error } = await supabase.from('generated_content').insert({
    user_id: userId,
    video_id: videoId,
    video_url: url,
    content: content,
    created_at: new Date().toISOString()
  });

  if (error) {
    console.error('Error saving content:', error);
    throw new Error('Failed to save content');
  }
}

import { useState } from 'react';
import { Header } from './Header';
import { InputSection } from './InputSection';
import { ContentCard } from './ContentCard';
import { extractVideoId, prepareContentForGeneration } from '../../services/backendService';
import { generateContent } from '../../services/aiService';
import { GeneratedContent } from '../../services/aiService';
import { saveContent } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Instagram, Linkedin, Twitter, Tag, Lightbulb, Video, Image } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const { user } = useAuth();

  const handleGenerate = async (url: string) => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');
    setContent(null);

    try {
      // Extract video ID
      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      // Prepare content for generation (new backend logic)
      const input = await prepareContentForGeneration(videoId);
      
      // Check if preparation failed
      if ('error' in input) {
        throw new Error(input.message);
      }

      // Generate content using AI service
      const generatedContent = await generateContent(input);
      setContent(generatedContent);

      // Save to Supabase if user is logged in
      if (user) {
        await saveContent(user.id, videoId, url, generatedContent);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <InputSection onGenerate={handleGenerate} loading={loading} />

        {error && (
          <div className="mt-8 max-w-4xl mx-auto bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}

        {content && (
          <div className="mt-12 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Generated Content</h2>
              <p className="text-gray-400">Your comprehensive content analysis is ready</p>
            </div>

            {/* Video Summaries Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="lg:col-span-2">
                <ContentCard
                  title="Short Summary"
                  content={content.short_summary}
                  icon={<FileText className="w-5 h-5 text-white" />}
                />
              </div>

              <div className="lg:col-span-2">
                <ContentCard
                  title="Detailed Summary"
                  content={content.detailed_summary}
                  icon={<FileText className="w-5 h-5 text-white" />}
                />
              </div>
            </div>

            {/* Content Generation Section */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Generated Content</h3>
              <p className="text-gray-400">Platform-specific content ready to use</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <ContentCard
                  title="Blog Article"
                  content={content.blog}
                  icon={<FileText className="w-5 h-5 text-white" />}
                />
              </div>

              <ContentCard
                title="Instagram Posts"
                content={content.instagram}
                icon={<Instagram className="w-5 h-5 text-white" />}
              />

              <ContentCard
                title="LinkedIn Posts"
                content={content.linkedin}
                icon={<Linkedin className="w-5 h-5 text-white" />}
              />

              <ContentCard
                title="Twitter Posts"
                content={content.twitter}
                icon={<Twitter className="w-5 h-5 text-white" />}
              />

              <ContentCard
                title="Short Captions"
                content={content.captions}
                icon={<Tag className="w-5 h-5 text-white" />}
              />

              <ContentCard
                title="Key Takeaways"
                content={content.takeaways}
                icon={<Lightbulb className="w-5 h-5 text-white" />}
              />

              <ContentCard
                title="Title Ideas"
                content={content.titles}
                icon={<Video className="w-5 h-5 text-white" />}
              />

              <ContentCard
                title="Thumbnail Text Ideas"
                content={content.thumbnails}
                icon={<Image className="w-5 h-5 text-white" />}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

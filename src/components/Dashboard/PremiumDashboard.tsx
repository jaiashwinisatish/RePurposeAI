import { useState, useEffect } from 'react';
import { ContentGenerationOptions, GeneratedContent, ContentProject, UserSubscription } from '../../types';
import { PremiumAIService } from '../../services/premiumAiService';
import { extractVideoId, prepareContentForGeneration } from '../../services/backendService';
import { saveContent } from '../../lib/mockSupabase';
import { useAuth } from '../../contexts/AuthContext';
import ContentOptions from '../Premium/ContentOptions';
import ShortVideoScripts from '../Premium/ShortVideoScripts';
import ContentAnalytics from '../Premium/ContentAnalytics';
import ViralHooks from '../Premium/ViralHooks';
import ContentCard from './ContentCard';
import Header from './Header';
import InputSection from './InputSection';
import { 
  Crown, 
  Zap, 
  Download, 
  Search, 
  FolderOpen, 
  Calendar,
  BarChart3,
  Settings,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function PremiumDashboard() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Analyzing content...');
  const [error, setError] = useState('');
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [projects, setProjects] = useState<ContentProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ContentProject | null>(null);
  const [viralHooks, setViralHooks] = useState<any[]>([]);
  const [showViralHooks, setShowViralHooks] = useState(false);
  const [options, setOptions] = useState<ContentGenerationOptions>({
    tone: 'professional',
    persona: 'content-creator',
    language: 'english',
    platforms: ['instagram', 'linkedin', 'twitter', 'blog', 'captions', 'takeaways', 'titles', 'thumbnails'],
    includeShorts: false,
    includeAnalytics: false
  });
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    plan: 'free',
    features: ['all content generation', 'tone & persona controls', 'short video scripts', 'content analytics', 'viral hooks', 'multi-language support', 'content library', 'quality scoring', 'all export formats'],
    limits: {
      maxProjects: 10,
      maxBlogLength: 1000,
      exportsAvailable: ['txt', 'md', 'pdf', 'json']
    }
  });
  const { user } = useAuth();

  const premiumAIService = PremiumAIService.getInstance();

  useEffect(() => {
    // Load user's projects
    if (user) {
      loadUserProjects();
    }
  }, [user]);

  const loadUserProjects = async () => {
    // Mock loading projects - in real app, this would fetch from backend
    const mockProjects: ContentProject[] = [
      {
        id: '1',
        name: 'Marketing Strategy Video',
        videoUrl: 'https://youtube.com/watch?v=example1',
        videoId: 'example1',
        content: {} as GeneratedContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['marketing', 'strategy', 'business']
      }
    ];
    setProjects(mockProjects);
  };

  const handleGenerate = async (videoUrl: string) => {
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');
    setContent(null);
    setLoadingMessage('Extracting video content...');

    try {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      setLoadingMessage('Analyzing video context...');
      const input = await prepareContentForGeneration(videoId);
      
      if ('error' in input) {
        throw new Error(input.message);
      }

      setLoadingMessage('Generating premium content...');
      const generatedContent = await premiumAIService.generatePremiumContent(input, options);
      
      setLoadingMessage('Generating viral hooks...');
      const hooks = await premiumAIService.generateViralHooks({ topic: generatedContent.topic });
      setViralHooks(hooks);
      
      setContent(generatedContent);

      // Save to projects
      if (user) {
        const newProject: ContentProject = {
          id: Date.now().toString(),
          name: `${generatedContent.topic} Project`,
          videoUrl,
          videoId,
          content: generatedContent,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: [generatedContent.topic]
        };
        
        const updatedProjects = [...projects, newProject];
        if (updatedProjects.length <= userSubscription.limits.maxProjects) {
          setProjects(updatedProjects);
          await saveContent(user.id, videoId, videoUrl, generatedContent);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setLoading(false);
      setLoadingMessage('Analyzing content...');
    }
  };

  const handleProjectSelect = (project: ContentProject) => {
    setSelectedProject(project);
    setContent(project.content);
    setUrl(project.videoUrl);
  };

  const handleExport = async (format: string) => {
    if (!content) return;
    
    // All export formats available for free users
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `content.${format}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Content Options */}
            <ContentOptions 
              options={options} 
              onOptionsChange={setOptions} 
              isPro={userSubscription.plan === 'pro'}
            />

            {/* Projects Library */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-cyan-400" />
                Content Library
              </h3>
              
              <div className="space-y-2 mb-4">
                {projects.slice(0, userSubscription.limits.maxProjects).map(project => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectSelect(project)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedProject?.id === project.id 
                        ? 'bg-cyan-500/20 border-cyan-500/50' 
                        : 'bg-gray-800/30 border-gray-700/50 hover:border-cyan-500/30'
                    }`}
                  >
                    <h4 className="text-white font-medium text-sm mb-1">{project.name}</h4>
                    <p className="text-gray-400 text-xs">{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>

              {projects.length >= userSubscription.limits.maxProjects && (
                <div className="text-yellow-300 text-xs bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2">
                  <strong>Project limit reached!</strong> Upgrade to Pro for unlimited projects.
                </div>
              )}
            </div>

            {/* Export Options */}
            {content && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  Export Options
                </h3>
                
                <div className="space-y-2">
                  {['txt', 'md', 'pdf', 'json'].map(format => (
                    <button
                      key={format}
                      onClick={() => handleExport(format)}
                      className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-all bg-gray-800 hover:bg-gray-700 text-white hover:text-cyan-400"
                    >
                      Export as {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Input Section */}
            <InputSection 
              onGenerate={handleGenerate} 
              loading={loading}
              url={url}
              onUrlChange={setUrl}
            />

            {/* Loading State */}
            {loading && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                  <p className="text-cyan-300 text-lg font-medium">{loadingMessage}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Sparkles className="w-4 h-4" />
                    AI is working its magic...
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
                {error}
              </div>
            )}

            {/* Generated Content */}
            {content && !loading && (
              <>
                {/* Viral Hooks Section */}
                {showViralHooks && (
                  <ViralHooks 
                    hooks={viralHooks} 
                    onUseHook={(hook) => {
                      // Handle hook usage
                      console.log('Using hook:', hook);
                    }}
                  />
                )}

                {/* Content Sections */}
                <div className="space-y-6">
                  {/* Summaries */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ContentCard
                      title="Short Summary"
                      content={content.short_summary}
                      icon={<BarChart3 className="w-5 h-5 text-white" />}
                    />
                    <ContentCard
                      title="Detailed Summary"
                      content={content.detailed_summary}
                      icon={<BarChart3 className="w-5 h-5 text-white" />}
                    />
                  </div>

                  {/* Analytics */}
                  {content.analytics && (
                    <ContentAnalytics analytics={content.analytics} />
                  )}

                  {/* Short Scripts */}
                  {content.shorts && (
                    <ShortVideoScripts scripts={content.shorts} />
                  )}

                  {/* Regular Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2">
                      <ContentCard
                        title="Blog Article"
                        content={content.blog}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    </div>

                    {options.platforms.includes('instagram') && (
                      <ContentCard
                        title="Instagram Posts"
                        content={content.instagram}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}

                    {options.platforms.includes('linkedin') && (
                      <ContentCard
                        title="LinkedIn Posts"
                        content={content.linkedin}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}

                    {options.platforms.includes('twitter') && (
                      <ContentCard
                        title="Twitter Posts"
                        content={content.twitter}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}

                    {options.platforms.includes('captions') && (
                      <ContentCard
                        title="Short Captions"
                        content={content.captions}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}

                    {options.platforms.includes('takeaways') && (
                      <ContentCard
                        title="Key Takeaways"
                        content={content.takeaways}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}

                    {options.platforms.includes('titles') && (
                      <ContentCard
                        title="Title Ideas"
                        content={content.titles}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}

                    {options.platforms.includes('thumbnails') && (
                      <ContentCard
                        title="Thumbnail Ideas"
                        content={content.thumbnails}
                        icon={<Settings className="w-5 h-5 text-white" />}
                      />
                    )}
                  </div>
                </div>

                {/* Quality Score */}
                {content.qualityScore && (
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-cyan-400" />
                      Content Quality Score
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-300">{content.qualityScore.seoScore}/100</div>
                        <div className="text-sm text-gray-400">SEO Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-300">{content.qualityScore.viralityScore}/100</div>
                        <div className="text-sm text-gray-400">Virality Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-300">{content.qualityScore.readabilityLevel}</div>
                        <div className="text-sm text-gray-400">Readability</div>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-300 font-medium mb-2">Improvement Suggestions:</h4>
                      <ul className="space-y-1">
                        {content.qualityScore.improvements.map((improvement, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowViralHooks(!showViralHooks)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    {showViralHooks ? 'Hide' : 'Generate'} Viral Hooks
                  </button>
                  
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all">
                    Enhance Content
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { ContentGenerationOptions } from '../../types';
import { Settings, User, Globe, Zap, MessageCircle } from 'lucide-react';

interface ContentOptionsProps {
  options: ContentGenerationOptions;
  onOptionsChange: (options: ContentGenerationOptions) => void;
  isPro: boolean;
}

export default function ContentOptions({ options, onOptionsChange, isPro }: ContentOptionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOptionChange = (key: keyof ContentGenerationOptions, value: any) => {
    if (!isPro && (key === 'tone' || key === 'persona')) {
      return; // Pro feature
    }
    onOptionsChange({ ...options, [key]: value });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Content Options
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-none' : 'opacity-50 max-h-20 overflow-hidden'}`}>
        
        {/* Tone Selection */}
        <div className={`${!isPro ? 'opacity-50' : ''}`}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tone {!isPro && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded ml-2">PRO</span>}
          </label>
          <select
            value={options.tone}
            onChange={(e) => handleOptionChange('tone', e.target.value)}
            disabled={!isPro}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="viral">Viral</option>
            <option value="educational">Educational</option>
            <option value="storytelling">Storytelling</option>
          </select>
        </div>

        {/* Persona Selection */}
        <div className={`${!isPro ? 'opacity-50' : ''}`}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Persona {!isPro && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded ml-2">PRO</span>}
          </label>
          <select
            value={options.persona}
            onChange={(e) => handleOptionChange('persona', e.target.value)}
            disabled={!isPro}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
          >
            <option value="founder">Founder</option>
            <option value="content-creator">Content Creator</option>
            <option value="marketer">Marketer</option>
            <option value="teacher">Teacher</option>
            <option value="influencer">Influencer</option>
          </select>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Language
          </label>
          <select
            value={options.language}
            onChange={(e) => handleOptionChange('language', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="hinglish">Hinglish</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>

        {/* Platform Selection */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
          <div className="flex flex-wrap gap-3">
            {['instagram', 'linkedin', 'twitter', 'blog', 'captions', 'takeaways', 'titles', 'thumbnails'].map(platform => (
              <label key={platform} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={options.platforms.includes(platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleOptionChange('platforms', [...options.platforms, platform]);
                    } else {
                      handleOptionChange('platforms', options.platforms.filter(p => p !== platform));
                    }
                  }}
                  className="rounded border-gray-600 bg-gray-800 text-cyan-400 focus:ring-cyan-400 focus:ring-2"
                />
                <span className="capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Include Shorts */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Include Shorts/Reels
          </label>
          <input
            type="checkbox"
            checked={options.includeShorts}
            onChange={(e) => handleOptionChange('includeShorts', e.target.checked)}
            className="rounded border-gray-600 bg-gray-800 text-cyan-400 focus:ring-cyan-400 focus:ring-2"
          />
        </div>

        {/* Include Analytics */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Include Analytics
          </label>
          <input
            type="checkbox"
            checked={options.includeAnalytics}
            onChange={(e) => handleOptionChange('includeAnalytics', e.target.checked)}
            className="rounded border-gray-600 bg-gray-800 text-cyan-400 focus:ring-cyan-400 focus:ring-2"
          />
        </div>
      </div>
    </div>
  );
}

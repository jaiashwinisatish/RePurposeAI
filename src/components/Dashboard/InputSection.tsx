import { useState } from 'react';
import { Youtube, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (url: string) => void;
  loading: boolean;
}

export default function InputSection({ onGenerate, loading }: InputSectionProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onGenerate(url.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Transform Your YouTube Content
        </h2>
        <p className="text-gray-400 text-lg">
          Convert any YouTube video into blog articles, social posts, and more
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Youtube className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video URL here..."
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-lg"
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>{loading ? 'Generating Content...' : 'Generate Content'}</span>
        </button>
      </form>

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-cyan-400">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
            <span className="text-sm">Processing your video...</span>
          </div>
        </div>
      )}
    </div>
  );
}

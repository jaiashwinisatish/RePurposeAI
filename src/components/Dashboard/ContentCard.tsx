import { useState } from 'react';
import { Copy, Download, Check, RefreshCw } from 'lucide-react';

interface ContentCardProps {
  title: string;
  content: string | string[];
  icon: React.ReactNode;
  onRegenerate?: () => void;
}

export default function ContentCard({ title, content, icon, onRegenerate }: ContentCardProps) {
  const [copied, setCopied] = useState(false);

  const contentString = Array.isArray(content) ? content.join('\n\n---\n\n') : content;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contentString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([contentString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 max-h-96 overflow-y-auto custom-scrollbar">
        {Array.isArray(content) ? (
          <div className="space-y-4">
            {content.map((item, index) => (
              <div key={index} className="text-gray-300 text-sm whitespace-pre-wrap">
                <div className="text-cyan-400 font-semibold mb-2">#{index + 1}</div>
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-300 text-sm whitespace-pre-wrap">{content}</div>
        )}
      </div>
    </div>
  );
}

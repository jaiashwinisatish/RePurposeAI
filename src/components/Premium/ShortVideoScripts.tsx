import { ShortVideoScript } from '../../types';
import { Video, Clock, MessageSquare, Type, ArrowRight } from 'lucide-react';

interface ShortVideoScriptsProps {
  scripts: ShortVideoScript[];
}

export default function ShortVideoScripts({ scripts }: ShortVideoScriptsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Video className="w-5 h-5 text-cyan-400" />
        Short Video Scripts
      </h3>

      <div className="space-y-6">
        {scripts.map((script, index) => (
          <div key={script.id} className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{script.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {script.duration}s
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {script.hook}
                  </span>
                </div>
              </div>
              <div className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                Script {index + 1}
              </div>
            </div>

            {/* Hook Section */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Scroll-Stopping Hook
              </h5>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 font-medium">"{script.hook}"</p>
              </div>
            </div>

            {/* Script Content */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Voiceover Script
              </h5>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <p className="text-gray-200 text-sm leading-relaxed">{script.script}</p>
              </div>
            </div>

            {/* On-Screen Text */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-cyan-400 mb-2">On-Screen Text</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {script.onScreenText.map((text, textIndex) => (
                  <div key={textIndex} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2">
                    <p className="text-blue-300 text-xs text-center">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-3 py-2">
                <p className="text-green-300 text-sm font-medium">CTA: {script.cta}</p>
              </div>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Export Script
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

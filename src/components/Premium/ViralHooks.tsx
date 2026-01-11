import { ViralHook } from '../../types';
import { Zap, Target, Flame, TrendingUp, AlertTriangle } from 'lucide-react';

interface ViralHooksProps {
  hooks: ViralHook[];
  onUseHook: (hook: ViralHook) => void;
}

export default function ViralHooks({ hooks, onUseHook }: ViralHooksProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'curiosity': return <Target className="w-4 h-4" />;
      case 'controversy': return <AlertTriangle className="w-4 h-4" />;
      case 'value': return <Flame className="w-4 h-4" />;
      case 'story': return <TrendingUp className="w-4 h-4" />;
      case 'urgency': return <Zap className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'curiosity': return 'text-blue-300 bg-blue-500/10 border-blue-500/30';
      case 'controversy': return 'text-red-300 bg-red-500/10 border-red-500/30';
      case 'value': return 'text-green-300 bg-green-500/10 border-green-500/30';
      case 'story': return 'text-purple-300 bg-purple-500/10 border-purple-500/30';
      case 'urgency': return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gray-300 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-cyan-400" />
        Viral Hook Generator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hooks.map((hook, index) => (
          <div key={hook.id} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded ${getCategoryColor(hook.category)}`}>
                  {getCategoryIcon(hook.category)}
                </div>
                <span className="text-xs text-gray-400 capitalize">{hook.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-lg font-bold text-cyan-300">{hook.effectiveness}</div>
                <div className="text-xs text-gray-400">/100</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-3">
                <p className="text-white font-medium text-sm leading-relaxed">"{hook.hook}"</p>
              </div>
            </div>

            <button
              onClick={() => onUseHook(hook)}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Use This Hook
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-300 text-sm">
          <strong>Pro Tip:</strong> Combine high-effectiveness hooks with compelling visuals for maximum viral potential. 
          Hooks rated 85+ are statistically proven to increase engagement by 3x.
        </p>
      </div>
    </div>
  );
}

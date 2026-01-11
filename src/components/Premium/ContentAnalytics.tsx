import type { ContentAnalytics } from '../../types';
import { TrendingUp, Users, Search, Clock, BarChart3 } from 'lucide-react';

interface ContentAnalyticsProps {
  analytics: ContentAnalytics;
}

export default function ContentAnalytics({ analytics }: ContentAnalyticsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-cyan-400" />
        Performance Analytics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Estimated Reach */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-white">Estimated Reach</h4>
          </div>
          <div className="space-y-2">
            {analytics.estimatedReach.map((reach, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm capitalize">{reach.platform}</span>
                <span className="text-blue-300 font-medium">
                  {reach.min.toLocaleString()} - {reach.max.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Potential */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h4 className="text-lg font-semibold text-white">Engagement Potential</h4>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300 mb-1">
              {analytics.engagementPotential.score}/100
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              analytics.engagementPotential.level === 'Very High' ? 'bg-green-500/20 text-green-300' :
              analytics.engagementPotential.level === 'High' ? 'bg-blue-500/20 text-blue-300' :
              analytics.engagementPotential.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {analytics.engagementPotential.level}
            </div>
          </div>
        </div>

        {/* SEO Potential */}
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-purple-400" />
            <h4 className="text-lg font-semibold text-white">SEO Potential</h4>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-1">
              {analytics.seoPotential.score}/100
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              analytics.seoPotential.ranking === 'Excellent' ? 'bg-purple-500/20 text-purple-300' :
              analytics.seoPotential.ranking === 'Good' ? 'bg-blue-500/20 text-blue-300' :
              analytics.seoPotential.ranking === 'Fair' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {analytics.seoPotential.ranking} Ranking
            </div>
          </div>
        </div>
      </div>

      {/* Best Posting Times */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          Best Posting Times
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analytics.bestPostingTimes.map((schedule, index) => (
            <div key={index} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <h5 className="text-white font-medium mb-3 capitalize">{schedule.platform}</h5>
              <div className="space-y-1">
                {schedule.times.map((time, timeIndex) => (
                  <div key={timeIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

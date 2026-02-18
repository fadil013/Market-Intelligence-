import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Zap, AlertTriangle, Target, Award, Sparkles, Activity } from 'lucide-react';

const TrendForecastScore = ({ forecastData }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  // Sort games by forecast score
  const sortedByScore = [...forecastData].sort((a, b) => b.forecastScore.score - a.forecastScore.score);

  const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30', text: 'text-green-400', icon: 'text-green-400' };
    if (score >= 70) return { bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'text-blue-400' };
    if (score >= 50) return { bg: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'text-purple-400' };
    if (score >= 30) return { bg: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: 'text-yellow-400' };
    return { bg: 'from-red-500/20 to-red-600/20', border: 'border-red-500/30', text: 'text-red-400', icon: 'text-red-400' };
  };

  const getScoreCategory = (score) => {
    if (score >= 85) return { emoji: '🚀', label: 'Explosive Growth', description: 'Expected to enter Top 10 within 30 days' };
    if (score >= 70) return { emoji: '📈', label: 'Strong Uptrend', description: 'Likely to gain +100 ranks in 60 days' };
    if (score >= 50) return { emoji: '➡️', label: 'Steady Rise', description: 'Gradual growth expected, monitor quarterly' };
    if (score >= 30) return { emoji: '⚠️', label: 'Plateauing', description: 'Growth slowing, saturation risk' };
    return { emoji: '📉', label: 'Declining', description: 'Downward trend, high churn signals' };
  };

  const getConfidenceBadge = (confidence) => {
    const styles = {
      high: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return styles[confidence] || styles.low;
  };

  // Factor breakdown for radar chart
  const getFactorData = (breakdown) => {
    return [
      { factor: 'Velocity', value: breakdown.velocity * 4, fullMark: 100 },
      { factor: 'Regional', value: breakdown.regional * 5, fullMark: 100 },
      { factor: 'Genre', value: breakdown.genre * 5, fullMark: 100 },
      { factor: 'Revenue', value: breakdown.revenue * 5, fullMark: 100 },
      { factor: 'Sentiment', value: breakdown.sentiment * 6.67, fullMark: 100 }
    ];
  };

  // 30-day projection chart
  const getProjectionData = (game) => {
    const currentRank = game.currentRank;
    const score = game.forecastScore.score;
    const trend = game.forecastScore.trend;
    
    // Simple projection logic
    let projection = [];
    if (trend === 'up') {
      const improvement = Math.round((score / 100) * 150); // Max 150 rank improvement
      for (let i = 0; i <= 30; i += 5) {
        const rankChange = Math.round((improvement / 30) * i);
        projection.push({
          day: i,
          rank: Math.max(1, currentRank - rankChange)
        });
      }
    } else if (trend === 'down') {
      const decline = Math.round(((100 - score) / 100) * 100);
      for (let i = 0; i <= 30; i += 5) {
        const rankChange = Math.round((decline / 30) * i);
        projection.push({
          day: i,
          rank: currentRank + rankChange
        });
      }
    } else {
      for (let i = 0; i <= 30; i += 5) {
        projection.push({ day: i, rank: currentRank });
      }
    }
    return projection;
  };

  // Summary stats
  const explosiveGrowthCount = forecastData.filter(g => g.forecastScore.score >= 85).length;
  const strongUptrendCount = forecastData.filter(g => g.forecastScore.score >= 70 && g.forecastScore.score < 85).length;
  const avgScore = Math.round(forecastData.reduce((sum, g) => sum + g.forecastScore.score, 0) / forecastData.length);
  const highConfidenceCount = forecastData.filter(g => g.forecastScore.confidence === 'high').length;

  return (
    <div className="space-y-6">
      {/* Master Header */}
      <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-xl p-8 border border-purple-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Trend Forecast Score
            <span className="text-2xl font-normal text-purple-300">MASTER FEATURE</span>
          </h2>
          <p className="text-gray-200 text-lg mb-4">30-60 day predictive intelligence using multi-factor analysis</p>
          <p className="text-gray-300 text-sm max-w-3xl">
            Combines Velocity Score (25%), Regional Breakout (20%), Genre Growth (20%), Revenue Efficiency (20%), 
            and Review Sentiment (15%) into a comprehensive trend prediction system.
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-400" />
            <p className="text-sm text-gray-400">Explosive Growth</p>
          </div>
          <p className="text-3xl font-bold text-white">{explosiveGrowthCount}</p>
          <p className="text-sm text-green-300">Score ≥85</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-gray-400">Strong Uptrend</p>
          </div>
          <p className="text-3xl font-bold text-white">{strongUptrendCount}</p>
          <p className="text-sm text-blue-300">Score 70-84</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">Avg Forecast Score</p>
          </div>
          <p className="text-3xl font-bold text-white">{avgScore}</p>
          <p className="text-sm text-purple-300">across {forecastData.length} games</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-gray-400">High Confidence</p>
          </div>
          <p className="text-3xl font-bold text-white">{highConfidenceCount}</p>
          <p className="text-sm text-yellow-300">reliable forecasts</p>
        </div>
      </div>

      {/* Games List */}
      <div className="space-y-4">
        {sortedByScore.map((game, index) => {
          const score = game.forecastScore.score;
          const colors = getScoreColor(score);
          const category = getScoreCategory(score);
          const isSelected = selectedGame === game.gameName;

          return (
            <div 
              key={game.gameName}
              className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border ${colors.border} cursor-pointer transition-all hover:scale-[1.01]`}
              onClick={() => setSelectedGame(isSelected ? null : game.gameName)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${colors.text}`}>{score}</div>
                    <div className="text-sm text-gray-400">Score</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {index === 0 && <Award className="w-5 h-5 text-yellow-400" />}
                      <h3 className="text-2xl font-bold text-white">{game.gameName}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="text-xl">{category.emoji}</span>
                      <span className="font-semibold">{category.label}</span>
                      <span>•</span>
                      <span>Current Rank: #{game.currentRank}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{category.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getConfidenceBadge(game.forecastScore.confidence)}`}>
                    {game.forecastScore.confidence.toUpperCase()}
                  </span>
                  <div className={`flex items-center gap-1 ${colors.text}`}>
                    {game.forecastScore.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : game.forecastScore.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    <span className="text-sm font-semibold">{game.forecastScore.horizon}</span>
                  </div>
                </div>
              </div>

              {/* Factor Breakdown */}
              <div className="grid grid-cols-5 gap-3 mb-4">
                <div className="bg-white/10 rounded p-3">
                  <p className="text-xs text-gray-400 mb-1">Velocity</p>
                  <p className="text-lg font-bold text-white">{Math.round(game.forecastScore.breakdown.velocity)}</p>
                  <p className="text-xs text-gray-500">25% weight</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-xs text-gray-400 mb-1">Regional</p>
                  <p className="text-lg font-bold text-white">{Math.round(game.forecastScore.breakdown.regional)}</p>
                  <p className="text-xs text-gray-500">20% weight</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-xs text-gray-400 mb-1">Genre</p>
                  <p className="text-lg font-bold text-white">{Math.round(game.forecastScore.breakdown.genre)}</p>
                  <p className="text-xs text-gray-500">20% weight</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-xs text-gray-400 mb-1">Revenue</p>
                  <p className="text-lg font-bold text-white">{Math.round(game.forecastScore.breakdown.revenue)}</p>
                  <p className="text-xs text-gray-500">20% weight</p>
                </div>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-xs text-gray-400 mb-1">Sentiment</p>
                  <p className="text-lg font-bold text-white">{Math.round(game.forecastScore.breakdown.sentiment)}</p>
                  <p className="text-xs text-gray-500">15% weight</p>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="pt-4 border-t border-white/20 space-y-4">
                  {/* Radar Chart */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Factor Breakdown</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={getFactorData(game.forecastScore.breakdown)}>
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="factor" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                          <PolarRadiusAxis stroke="#9ca3af" style={{ fontSize: '10px' }} />
                          <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px'
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* 30-Day Projection */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">30-Day Rank Projection</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={getProjectionData(game)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '11px' }} label={{ value: 'Days', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af' } }} />
                          <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} reversed label={{ value: 'Rank', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px'
                            }}
                            labelFormatter={(value) => `Day ${value}`}
                          />
                          <Line type="monotone" dataKey="rank" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  {game.riskFactors && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        What Could Change This Forecast
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {game.riskFactors.map((risk, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5" />
                            <p>{risk}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendForecastScore;

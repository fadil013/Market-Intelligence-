import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Zap, AlertTriangle, Target, Award, Sparkles, Activity } from 'lucide-react';
import GameIcon from './GameIcon';

const TrendForecastScore = ({ forecastData }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  // Sort games by forecast score
  const sortedByScore = [...forecastData].sort((a, b) => b.forecastScore.score - a.forecastScore.score);

  const getScoreColor = (score) => {
    if (score >= 85) return { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30', text: 'text-green-400', icon: 'text-green-400', hex: '#10b981' };
    if (score >= 70) return { bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'text-blue-400', hex: '#3b82f6' };
    if (score >= 50) return { bg: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'text-purple-400', hex: '#8b5cf6' };
    if (score >= 30) return { bg: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: 'text-yellow-400', hex: '#f59e0b' };
    return { bg: 'from-red-500/20 to-red-600/20', border: 'border-red-500/30', text: 'text-red-400', icon: 'text-red-400', hex: '#ef4444' };
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
      <div style={{
        background: 'linear-gradient(135deg, #0d1117 0%, #161b27 40%, #0d1117 100%)',
        border: '1px solid rgba(139,92,246,0.4)',
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(139,92,246,0.12)',
      }}>
        {/* Subtle accent glows — no pink */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(6,182,212,0.08)', filter: 'blur(50px)' }} />
        <div className="relative z-10">
          <h2 style={{ color: '#f1f5f9', fontSize: '28px', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles style={{ width: '28px', height: '28px', color: '#fbbf24' }} />
            Trend Forecast Score
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#818cf8', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '6px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>MASTER FEATURE</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '8px' }}>30-60 day predictive intelligence using multi-factor analysis</p>
          <p style={{ color: '#64748b', fontSize: '13px', maxWidth: '700px', lineHeight: 1.6 }}>
            Combines Velocity Score (25%), Regional Breakout (20%), Genre Growth (20%), Revenue Efficiency (20%),
            and Review Sentiment (15%) into a comprehensive trend prediction system.
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Explosive Growth', value: explosiveGrowthCount, sub: 'Score ≥85', Icon: Zap, color: '#10b981' },
          { label: 'Strong Uptrend',   value: strongUptrendCount,   sub: 'Score 70-84', Icon: TrendingUp, color: '#3b82f6' },
          { label: 'Avg Forecast Score', value: avgScore,           sub: `across ${forecastData.length} games`, Icon: Activity, color: '#8b5cf6' },
          { label: 'High Confidence', value: highConfidenceCount,  sub: 'reliable forecasts', Icon: Target, color: '#f59e0b' },
        ].map(({ label, value, sub, Icon, color }) => (
          <div key={label} style={{
            background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
            border: `1px solid ${color}35`,
            borderRadius: '12px',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Icon style={{ width: '18px', height: '18px', color }} />
              <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, margin: 0 }}>{label}</p>
            </div>
            <p style={{ color: '#f1f5f9', fontSize: '32px', fontWeight: 800, margin: '0 0 4px', lineHeight: 1 }}>{value}</p>
            <p style={{ color, fontSize: '12px', fontWeight: 600, margin: 0 }}>{sub}</p>
          </div>
        ))}
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
                  {/* Real game icon via iTunes API */}
                  <GameIcon name={game.gameName} fallback="🎮" color={colors.hex} size={52} borderRadius={12} />
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

              {/* Factor Breakdown — compact single row with pipes */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '8px' }}>Key Metrics</p>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  {[
                    ['Velocity', Math.round(game.forecastScore.breakdown.velocity), '25%'],
                    ['Regional', Math.round(game.forecastScore.breakdown.regional), '20%'],
                    ['Genre',    Math.round(game.forecastScore.breakdown.genre),    '20%'],
                    ['Revenue',  Math.round(game.forecastScore.breakdown.revenue),  '20%'],
                    ['Sentiment',Math.round(game.forecastScore.breakdown.sentiment),'15%'],
                  ].map(([label, val, weight], i, arr) => (
                    <div key={label} style={{ flex: 1, padding: '10px 6px', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '4px', whiteSpace: 'nowrap' }}>{label}</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1 }}>{val}</div>
                      <div style={{ fontSize: '9px', color: '#475569', marginTop: '3px' }}>{weight}</div>
                    </div>
                  ))}
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

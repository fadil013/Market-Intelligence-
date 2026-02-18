import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Rocket, TrendingUp, Users, Clock, DollarSign, Globe, Target, AlertCircle, CheckCircle, Award } from 'lucide-react';

const BetaLaunchMonitoring = ({ betaGamesData }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [viewMode, setViewMode] = useState('watchlist'); // watchlist, retention, readiness

  // Calculate summary stats
  const highProbabilityCount = betaGamesData.filter(g => g.predictionScores.globalSuccessProbability >= 0.7).length;
  const avgSuccessProbability = Math.round(
    (betaGamesData.reduce((sum, g) => sum + g.predictionScores.globalSuccessProbability, 0) / betaGamesData.length) * 100
  );
  const launchReadyCount = betaGamesData.filter(g => g.predictionScores.confidence === 'high').length;
  const totalTestMarkets = [...new Set(betaGamesData.flatMap(g => g.softLaunchMetrics.testMarkets))].length;

  // Get games sorted by success probability
  const sortedByProbability = [...betaGamesData].sort((a, b) => 
    b.predictionScores.globalSuccessProbability - a.predictionScores.globalSuccessProbability
  );

  // Retention curve data for selected game
  const getRetentionCurveData = (game) => {
    const retention = game.softLaunchMetrics.retention;
    return [
      { day: 'Day 1', retention: parseInt(retention.day1) },
      { day: 'Day 7', retention: parseInt(retention.day7) },
      { day: 'Day 30', retention: parseInt(retention.day30) }
    ];
  };

  // All games retention comparison
  const getRetentionComparisonData = () => {
    return betaGamesData.map(game => ({
      game: game.gameName.length > 15 ? game.gameName.substring(0, 15) + '...' : game.gameName,
      fullName: game.gameName,
      day1: parseInt(game.softLaunchMetrics.retention.day1),
      day7: parseInt(game.softLaunchMetrics.retention.day7),
      day30: parseInt(game.softLaunchMetrics.retention.day30)
    }));
  };

  const getSuccessColor = (probability) => {
    if (probability >= 0.7) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (probability >= 0.5) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
  };

  const getConfidenceBadge = (confidence) => {
    const styles = {
      high: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return styles[confidence] || styles.low;
  };

  const getReadinessScore = (game) => {
    const retention1 = parseInt(game.softLaunchMetrics.retention.day1);
    const retention7 = parseInt(game.softLaunchMetrics.retention.day7);
    const retention30 = parseInt(game.softLaunchMetrics.retention.day30);
    const arpu = parseFloat(game.softLaunchMetrics.arpu.replace('$', ''));
    const probability = game.predictionScores.globalSuccessProbability;

    let score = 0;
    // Retention scores (40 points)
    if (retention1 >= 40) score += 15;
    else if (retention1 >= 30) score += 10;
    else score += 5;

    if (retention7 >= 15) score += 15;
    else if (retention7 >= 10) score += 10;
    else score += 5;

    if (retention30 >= 5) score += 10;
    else if (retention30 >= 3) score += 5;

    // ARPU score (30 points)
    if (arpu >= 1.5) score += 30;
    else if (arpu >= 1.0) score += 20;
    else if (arpu >= 0.5) score += 10;
    else score += 5;

    // Success probability (30 points)
    score += Math.round(probability * 30);

    return Math.min(score, 100);
  };

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Rocket className="w-5 h-5 text-green-400" />
            <p className="text-sm text-gray-400">High Potential</p>
          </div>
          <p className="text-3xl font-bold text-white">{highProbabilityCount}</p>
          <p className="text-sm text-green-300">≥70% success rate</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">Avg Success Rate</p>
          </div>
          <p className="text-3xl font-bold text-white">{avgSuccessProbability}%</p>
          <p className="text-sm text-purple-300">across {betaGamesData.length} games</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-gray-400">Launch Ready</p>
          </div>
          <p className="text-3xl font-bold text-white">{launchReadyCount}</p>
          <p className="text-sm text-blue-300">high confidence</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg p-4 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-orange-400" />
            <p className="text-sm text-gray-400">Test Markets</p>
          </div>
          <p className="text-3xl font-bold text-white">{totalTestMarkets}</p>
          <p className="text-sm text-orange-300">regions tracked</p>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setViewMode('watchlist')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'watchlist'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Rocket className="w-4 h-4 inline mr-2" />
          Watch List
        </button>
        <button
          onClick={() => setViewMode('retention')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'retention'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Retention Analysis
        </button>
        <button
          onClick={() => setViewMode('readiness')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'readiness'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Launch Readiness
        </button>
      </div>

      {/* Watch List View */}
      {viewMode === 'watchlist' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-5 border border-green-500/30">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              Top Beta Games to Watch
            </h4>
            <p className="text-gray-300 text-sm">Pre-global launch intelligence from {totalTestMarkets} test markets</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedByProbability.map((game) => {
              const successProbability = Math.round(game.predictionScores.globalSuccessProbability * 100);
              const daysInBeta = game.softLaunchMetrics.daysInBeta;
              
              return (
                <div 
                  key={game.gameName} 
                  className={`rounded-lg p-5 border cursor-pointer transition-all hover:scale-[1.01] ${getSuccessColor(game.predictionScores.globalSuccessProbability)}`}
                  onClick={() => setSelectedGame(selectedGame === game.gameName ? null : game.gameName)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-1">{game.gameName}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-300">
                          <Globe className="w-3 h-3 inline mr-1" />
                          {game.softLaunchMetrics.testMarkets.join(', ')}
                        </span>
                        <span className="text-gray-300">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {daysInBeta} days in beta
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold">{successProbability}%</p>
                      <p className="text-sm opacity-80">Success Rate</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-white/10 rounded p-3">
                      <p className="text-xs opacity-80 mb-1">Day 1 Retention</p>
                      <p className="text-lg font-bold">{game.softLaunchMetrics.retention.day1}</p>
                    </div>
                    <div className="bg-white/10 rounded p-3">
                      <p className="text-xs opacity-80 mb-1">Day 7 Retention</p>
                      <p className="text-lg font-bold">{game.softLaunchMetrics.retention.day7}</p>
                    </div>
                    <div className="bg-white/10 rounded p-3">
                      <p className="text-xs opacity-80 mb-1">ARPU</p>
                      <p className="text-lg font-bold">{game.softLaunchMetrics.arpu}</p>
                    </div>
                    <div className="bg-white/10 rounded p-3">
                      <p className="text-xs opacity-80 mb-1">Session Length</p>
                      <p className="text-lg font-bold">{game.softLaunchMetrics.sessionLength}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <div>
                      <p className="text-sm opacity-80 mb-1">Est. Global Revenue</p>
                      <p className="text-white font-bold">{game.predictionScores.estimatedGlobalRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80 mb-1">Recommended Launch</p>
                      <p className="text-white font-bold">{game.predictionScores.recommendedLaunchTiming}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getConfidenceBadge(game.predictionScores.confidence)}`}>
                        {game.predictionScores.confidence.toUpperCase()} Confidence
                      </span>
                    </div>
                  </div>

                  {selectedGame === game.gameName && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <h5 className="text-white font-semibold mb-3">Retention Curve</h5>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={getRetentionCurveData(game)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                          <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px'
                            }}
                          />
                          <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Retention Analysis View */}
      {viewMode === 'retention' && (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <h4 className="text-white font-semibold mb-4">Retention Comparison: All Beta Games</h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={getRetentionComparisonData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="game" stroke="#9ca3af" style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} label={{ value: 'Retention %', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="day1" fill="#10b981" name="Day 1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="day7" fill="#8b5cf6" name="Day 7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="day30" fill="#3b82f6" name="Day 30" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Retention Insights */}
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-5 border border-purple-500/30">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Retention Benchmarks
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-300 mb-1">Day 1 Target</p>
                <p className="text-2xl font-bold text-green-400">≥40%</p>
                <p className="text-xs text-gray-400">Indicates strong onboarding</p>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-1">Day 7 Target</p>
                <p className="text-2xl font-bold text-purple-400">≥15%</p>
                <p className="text-xs text-gray-400">Core loop working well</p>
              </div>
              <div>
                <p className="text-sm text-gray-300 mb-1">Day 30 Target</p>
                <p className="text-2xl font-bold text-blue-400">≥5%</p>
                <p className="text-xs text-gray-400">Long-term engagement</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Launch Readiness View */}
      {viewMode === 'readiness' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {betaGamesData.map((game) => {
              const readinessScore = getReadinessScore(game);
              const scoreColor = readinessScore >= 80 ? 'text-green-400' : readinessScore >= 60 ? 'text-yellow-400' : 'text-orange-400';
              const bgColor = readinessScore >= 80 ? 'from-green-500/20 to-green-600/20 border-green-500/30' : 
                            readinessScore >= 60 ? 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30' : 
                            'from-orange-500/20 to-orange-600/20 border-orange-500/30';

              return (
                <div key={game.gameName} className={`bg-gradient-to-br ${bgColor} rounded-lg p-5 border`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{game.gameName}</h4>
                      <p className="text-sm text-gray-300">
                        Launched {new Date(game.softLaunchMetrics.launchDate).toLocaleDateString()} · {game.softLaunchMetrics.daysInBeta} days
                      </p>
                    </div>
                    <div className="text-center">
                      <p className={`text-5xl font-bold ${scoreColor}`}>{readinessScore}</p>
                      <p className="text-sm text-gray-300">Readiness Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/10 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-green-400" />
                        <p className="text-xs text-gray-300">Retention</p>
                      </div>
                      <p className="text-lg font-bold text-white">
                        {game.softLaunchMetrics.retention.day1} / {game.softLaunchMetrics.retention.day7} / {game.softLaunchMetrics.retention.day30}
                      </p>
                      <p className="text-xs text-gray-400">D1 / D7 / D30</p>
                    </div>

                    <div className="bg-white/10 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-yellow-400" />
                        <p className="text-xs text-gray-300">ARPU</p>
                      </div>
                      <p className="text-lg font-bold text-white">{game.softLaunchMetrics.arpu}</p>
                      <p className="text-xs text-gray-400">per user</p>
                    </div>

                    <div className="bg-white/10 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        <p className="text-xs text-gray-300">Success Rate</p>
                      </div>
                      <p className="text-lg font-bold text-white">
                        {Math.round(game.predictionScores.globalSuccessProbability * 100)}%
                      </p>
                      <p className="text-xs text-gray-400">predicted</p>
                    </div>

                    <div className="bg-white/10 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <p className="text-xs text-gray-300">Session</p>
                      </div>
                      <p className="text-lg font-bold text-white">{game.softLaunchMetrics.sessionLength}</p>
                      <p className="text-xs text-gray-400">avg length</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                    <div>
                      {readinessScore >= 80 ? (
                        <div className="flex items-center gap-2 text-green-300">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Ready for Global Launch</span>
                        </div>
                      ) : readinessScore >= 60 ? (
                        <div className="flex items-center gap-2 text-yellow-300">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-semibold">Monitor & Iterate</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-orange-300">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-semibold">Needs Improvement</span>
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getConfidenceBadge(game.predictionScores.confidence)}`}>
                      {game.predictionScores.confidence.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BetaLaunchMonitoring;

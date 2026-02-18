import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Search, Image, FileText, Video, Award, Calendar, ArrowRight, Target, Zap } from 'lucide-react';

const StoreOptimization = ({ asoData }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, keywords, insights
  const [changeFilter, setChangeFilter] = useState('all'); // all, icon, title, screenshots, video

  // Summary KPIs
  const totalChanges = asoData.reduce((sum, game) => sum + game.asoChanges.length, 0);
  const avgRankImpact = Math.round(
    asoData.reduce((sum, game) => 
      sum + game.asoChanges.reduce((s, c) => s + parseInt(c.rankImpact), 0) / game.asoChanges.length, 0
    ) / asoData.length
  );
  const avgDownloadImpact = Math.round(
    asoData.reduce((sum, game) => 
      sum + game.asoChanges.reduce((s, c) => s + parseInt(c.downloadImpact.replace('%', '')), 0) / game.asoChanges.length, 0
    ) / asoData.length
  );
  const topPerformer = asoData.reduce((best, game) => {
    const gameAvg = game.asoChanges.reduce((s, c) => s + parseInt(c.rankImpact), 0) / game.asoChanges.length;
    const bestAvg = best.asoChanges.reduce((s, c) => s + parseInt(c.rankImpact), 0) / best.asoChanges.length;
    return gameAvg > bestAvg ? game : best;
  });

  const getChangeIcon = (changeType) => {
    const icons = {
      'Icon update': Image,
      'Title tweak': FileText,
      'Title optimization': FileText,
      'Screenshots reorder': Image,
      'Video preview': Video,
      'Description update': FileText
    };
    const IconComponent = icons[changeType] || Target;
    return <IconComponent className="w-4 h-4" />;
  };

  const getChangeColor = (changeType) => {
    const colors = {
      'Icon update': 'purple',
      'Title tweak': 'blue',
      'Title optimization': 'blue',
      'Screenshots reorder': 'green',
      'Video preview': 'pink',
      'Description update': 'yellow'
    };
    return colors[changeType] || 'gray';
  };

  // Filter changes
  const filterChanges = (changes) => {
    if (changeFilter === 'all') return changes;
    
    const filterMap = {
      'icon': ['Icon update'],
      'title': ['Title tweak', 'Title optimization'],
      'screenshots': ['Screenshots reorder'],
      'video': ['Video preview']
    };
    
    return changes.filter(c => filterMap[changeFilter]?.includes(c.change));
  };

  // Timeline data for chart
  const getTimelineData = () => {
    const allChanges = asoData.flatMap(game => 
      game.asoChanges.map(change => ({
        ...change,
        gameName: game.gameName,
        date: new Date(change.date)
      }))
    );
    
    return allChanges
      .sort((a, b) => b.date - a.date)
      .slice(0, 20)
      .map(c => ({
        date: c.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rankImpact: parseInt(c.rankImpact),
        downloadImpact: parseInt(c.downloadImpact.replace('%', '')),
        change: c.change,
        gameName: c.gameName
      }));
  };

  // What's Working insights
  const getInsights = () => {
    const changeTypeStats = {};
    
    asoData.forEach(game => {
      game.asoChanges.forEach(change => {
        const type = change.change;
        if (!changeTypeStats[type]) {
          changeTypeStats[type] = { count: 0, totalRank: 0, totalDownload: 0 };
        }
        changeTypeStats[type].count++;
        changeTypeStats[type].totalRank += parseInt(change.rankImpact);
        changeTypeStats[type].totalDownload += parseInt(change.downloadImpact.replace('%', ''));
      });
    });

    return Object.entries(changeTypeStats)
      .map(([type, stats]) => ({
        type,
        avgRank: Math.round(stats.totalRank / stats.count),
        avgDownload: Math.round(stats.totalDownload / stats.count),
        count: stats.count
      }))
      .sort((a, b) => b.avgDownload - a.avgDownload);
  };

  // Keyword performance data
  const getKeywordChartData = (game) => {
    return Object.entries(game.keywordRankings).map(([keyword, data]) => ({
      keyword,
      rank: data.rank,
      change: data.change,
      changePercent: Math.round((data.change / data.rank) * 100)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">Total ASO Changes</p>
          </div>
          <p className="text-3xl font-bold text-white">{totalChanges}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <p className="text-sm text-gray-400">Avg Rank Impact</p>
          </div>
          <p className="text-3xl font-bold text-white">+{avgRankImpact}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-gray-400">Avg Download Boost</p>
          </div>
          <p className="text-3xl font-bold text-white">+{avgDownloadImpact}%</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-gray-400">Top Optimizer</p>
          </div>
          <p className="text-lg font-bold text-white line-clamp-1">{topPerformer.gameName}</p>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setViewMode('timeline')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'timeline'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Timeline
        </button>
        <button
          onClick={() => setViewMode('keywords')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'keywords'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Search className="w-4 h-4 inline mr-2" />
          Keyword Rankings
        </button>
        <button
          onClick={() => setViewMode('insights')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'insights'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Zap className="w-4 h-4 inline mr-2" />
          What's Working
        </button>
      </div>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {/* Change Type Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setChangeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                changeFilter === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All Changes
            </button>
            <button
              onClick={() => setChangeFilter('icon')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                changeFilter === 'icon'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Image className="w-3 h-3 inline mr-1" />
              Icons
            </button>
            <button
              onClick={() => setChangeFilter('title')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                changeFilter === 'title'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <FileText className="w-3 h-3 inline mr-1" />
              Titles
            </button>
            <button
              onClick={() => setChangeFilter('screenshots')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                changeFilter === 'screenshots'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Image className="w-3 h-3 inline mr-1" />
              Screenshots
            </button>
            <button
              onClick={() => setChangeFilter('video')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                changeFilter === 'video'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Video className="w-3 h-3 inline mr-1" />
              Videos
            </button>
          </div>

          {/* Impact Chart */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-semibold mb-4">Recent ASO Changes Impact</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={getTimelineData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rankImpact" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Rank Impact (+)"
                />
                <Line 
                  type="monotone" 
                  dataKey="downloadImpact" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Download Boost (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline List */}
          <div className="grid grid-cols-1 gap-3">
            {asoData.map((game) => {
              const filteredChanges = filterChanges(game.asoChanges);
              if (filteredChanges.length === 0) return null;
              
              return (
                <div key={game.gameName} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{game.gameName}</h4>
                    <span className="text-sm text-gray-400">{filteredChanges.length} changes</span>
                  </div>
                  
                  <div className="space-y-2">
                    {filteredChanges.map((change, idx) => {
                      const color = getChangeColor(change.change);
                      const colorClasses = {
                        purple: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
                        blue: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
                        green: 'bg-green-500/20 border-green-500/30 text-green-300',
                        pink: 'bg-pink-500/20 border-pink-500/30 text-pink-300',
                        yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
                      };

                      return (
                        <div key={idx} className={`${colorClasses[color]} rounded-lg p-3 border`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getChangeIcon(change.change)}
                                <span className="font-medium">{change.change}</span>
                                <span className="text-xs opacity-70">{new Date(change.date).toLocaleDateString()}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="opacity-80">{change.before}</span>
                                <ArrowRight className="w-3 h-3" />
                                <span className="font-semibold">{change.after}</span>
                              </div>

                              <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  <span>Rank: <span className="font-bold">{change.rankImpact}</span></span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Zap className="w-3 h-3" />
                                  <span>Downloads: <span className="font-bold">{change.downloadImpact}</span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Keywords View */}
      {viewMode === 'keywords' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {asoData.map((game) => (
              <div key={game.gameName} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-4">{game.gameName}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Keyword List */}
                  <div className="space-y-2">
                    {Object.entries(game.keywordRankings).map(([keyword, data]) => (
                      <div key={keyword} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="text-white font-medium">{keyword}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-purple-400">#{data.rank}</span>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                            data.change > 0 
                              ? 'bg-green-500/20 text-green-400' 
                              : data.change < 0 
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {data.change > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : data.change < 0 ? (
                              <TrendingDown className="w-3 h-3" />
                            ) : null}
                            <span className="text-sm font-bold">{data.change > 0 ? '+' : ''}{data.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Keyword Rank Chart */}
                  <div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={getKeywordChartData(game)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="keyword" stroke="#9ca3af" style={{ fontSize: '11px' }} angle={-45} textAnchor="end" height={80} />
                        <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} reversed />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px'
                          }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="rank" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights View */}
      {viewMode === 'insights' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              What's Working in ASO
            </h3>
            <p className="text-gray-300">Data-driven insights from {totalChanges} store optimizations</p>
          </div>

          {/* Best Performing Changes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getInsights().map((insight, idx) => {
              const color = getChangeColor(insight.type);
              const bgColors = {
                purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
                blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
                green: 'from-green-500/20 to-green-600/20 border-green-500/30',
                pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
                yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
              };

              return (
                <div key={idx} className={`bg-gradient-to-br ${bgColors[color]} rounded-lg p-5 border`}>
                  <div className="flex items-center gap-2 mb-4">
                    {getChangeIcon(insight.type)}
                    <h4 className="text-white font-bold text-lg">{insight.type}</h4>
                    <span className="ml-auto text-sm text-gray-300 bg-white/10 px-2 py-1 rounded">
                      {insight.count}x tested
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 text-sm mb-1">Avg Rank Impact</p>
                      <p className="text-3xl font-bold text-white">+{insight.avgRank}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm mb-1">Avg Download Boost</p>
                      <p className="text-3xl font-bold text-white">+{insight.avgDownload}%</p>
                    </div>
                  </div>

                  {idx === 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-yellow-300">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-semibold">Top Performing Strategy</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Key Takeaways */}
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Key Takeaways
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">Icon updates</span> show consistent +20-30 rank improvements across all genres
                </p>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">Title optimization</span> with keywords drives +40-60% download spikes within 72h
                </p>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">Video previews</span> increase conversion by +15% when added early in lifecycle
                </p>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">A/B testing</span> screenshots order can yield +10-20% CTR improvements
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreOptimization;

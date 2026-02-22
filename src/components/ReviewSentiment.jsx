import React, { useState } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle, TrendingUp, Sparkles, Users } from 'lucide-react';

const ReviewSentiment = ({ reviewData }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [viewMode, setViewMode] = useState('features'); // features | complaints | requests | timeline

    const getSentimentColor = (sentiment) => {
        if (sentiment >= 0.7) return 'text-green-400';
        if (sentiment >= 0.4) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getSentimentBg = (sentiment) => {
        if (sentiment >= 0.7) return 'bg-green-500/20 border-green-500/30';
        if (sentiment >= 0.4) return 'bg-yellow-500/20 border-yellow-500/30';
        return 'bg-red-500/20 border-red-500/30';
    };

    const getVolatilityIcon = (volatility) => {
        if (volatility === 'crashing') return <AlertTriangle className="w-5 h-5 text-red-400" />;
        if (volatility === 'volatile') return <TrendingUp className="w-5 h-5 text-yellow-400" />;
        return <Sparkles className="w-5 h-5 text-green-400" />;
    };

    const getChurnRiskColor = (risk) => {
        if (risk === 'high') return 'text-red-400';
        if (risk === 'medium') return 'text-yellow-400';
        return 'text-green-400';
    };

    // Calculate summary stats
    const avgSentiment = (reviewData.reduce((acc, game) => acc + game.sentimentScore, 0) / reviewData.length).toFixed(2);
    const topLovedGame = reviewData.reduce((max, game) => game.sentimentScore > max.sentimentScore ? game : max, reviewData[0]);
    const mostComplainedGame = reviewData.reduce((max, game) => {
        const maxComplaints = game.complaints.reduce((sum, c) => sum + c.mentions, 0);
        const currentMaxComplaints = max.complaints.reduce((sum, c) => sum + c.mentions, 0);
        return maxComplaints > currentMaxComplaints ? game : max;
    }, reviewData[0]);
    const highChurnCount = reviewData.filter(game => game.churnSignals.includes('high')).length;

    return (
        <div className="space-y-6">
            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Avg Sentiment</p>
                            <p className={`text-2xl font-bold ${getSentimentColor(avgSentiment)}`}>{(avgSentiment * 100).toFixed(0)}%</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <ThumbsUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Top Loved</p>
                            <p className="text-lg font-bold text-white">{topLovedGame.gameName}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <ThumbsDown className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Most Complaints</p>
                            <p className="text-lg font-bold text-white">{mostComplainedGame.gameName}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">High Churn Risk</p>
                            <p className="text-2xl font-bold text-white">{highChurnCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Mode Switcher - Improved Readability */}
            <div className="flex gap-3 mb-2 flex-wrap">
                <button
                    onClick={() => setViewMode('features')}
                    className={`px-5 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                        viewMode === 'features'
                            ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-purple-500/50'
                            : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700'
                    }`}
                >
                    <ThumbsUp className="w-4 h-4 inline mr-2" />
                    Loved Features
                </button>
                <button
                    onClick={() => setViewMode('complaints')}
                    className={`px-5 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                        viewMode === 'complaints'
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/50'
                            : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700'
                    }`}
                >
                    <ThumbsDown className="w-4 h-4 inline mr-2" />
                    Complaints
                </button>
                <button
                    onClick={() => setViewMode('requests')}
                    className={`px-5 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                        viewMode === 'requests'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/50'
                            : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700'
                    }`}
                >
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    Feature Requests
                </button>
                <button
                    onClick={() => setViewMode('timeline')}
                    className={`px-5 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                        viewMode === 'timeline'
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-emerald-500/50'
                            : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700 hover:text-white border border-gray-700'
                    }`}
                >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Sentiment Timeline
                </button>
            </div>

            {/* Loved Features View */}
            {viewMode === 'features' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reviewData.slice(0, 8).map((game, index) => (
                            <div key={index} className="glass-panel p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{game.icon}</span>
                                        <div>
                                            <h4 className="text-white font-bold">{game.gameName}</h4>
                                            <div className="flex items-center gap-2">
                                                <p className={`text-sm font-medium ${getSentimentColor(game.sentimentScore)}`}>
                                                    {(game.sentimentScore * 100).toFixed(0)}% sentiment
                                                </p>
                                                {getVolatilityIcon(game.volatility)}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedGame(game)}
                                        className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white text-sm transition-colors"
                                    >
                                        Details
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                                        <ThumbsUp className="w-4 h-4 text-green-400" />
                                        Most Loved Features
                                    </p>
                                    {game.lovedFeatures.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-white font-medium">{feature.feature}</p>
                                                <p className="text-green-400 font-bold">{(feature.sentiment * 100).toFixed(0)}%</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-400 text-sm">{feature.mentions} mentions</p>
                                                <div className="w-32 bg-gray-700 rounded-full h-1.5">
                                                    <div
                                                        className="bg-green-500 h-1.5 rounded-full"
                                                        style={{ width: `${feature.sentiment * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Complaints View */}
            {viewMode === 'complaints' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reviewData.slice(0, 8).map((game, index) => (
                            <div key={index} className="glass-panel p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{game.icon}</span>
                                        <div>
                                            <h4 className="text-white font-bold">{game.gameName}</h4>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-gray-400">
                                                    {game.complaints.reduce((sum, c) => sum + c.mentions, 0)} complaints
                                                </p>
                                                {game.churnSignals.includes('high') && (
                                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                                        <ThumbsDown className="w-4 h-4 text-red-400" />
                                        Top Complaints
                                    </p>
                                    {game.complaints.slice(0, 3).map((complaint, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-white font-medium">{complaint.issue}</p>
                                                <p className="text-red-400 font-bold">{Math.abs(complaint.sentiment * 100).toFixed(0)}%</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-400 text-sm">{complaint.mentions} mentions</p>
                                                <div className="w-32 bg-gray-700 rounded-full h-1.5">
                                                    <div
                                                        className="bg-red-500 h-1.5 rounded-full"
                                                        style={{ width: `${Math.abs(complaint.sentiment * 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {game.churnSignals.length > 0 && (
                                    <div className="mt-4 p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                                            <p className="text-orange-400 font-medium text-sm">Churn Warning</p>
                                        </div>
                                        <p className="text-gray-400 text-xs capitalize">{game.churnSignals.join(', ')} churn risk detected</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Feature Requests View */}
            {viewMode === 'requests' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Top Feature Requests Across All Games</h3>
                        <div className="space-y-3">
                            {reviewData
                                .flatMap(game => game.featureRequests.map(req => ({ ...req, game: game.gameName, icon: game.icon })))
                                .sort((a, b) => b.votes - a.votes)
                                .slice(0, 12)
                                .map((request, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{request.icon}</span>
                                                <div>
                                                    <h4 className="text-white font-medium">{request.request}</h4>
                                                    <p className="text-gray-400 text-sm">{request.game}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-purple-400" />
                                                    <p className="text-white font-bold">{request.votes}</p>
                                                </div>
                                                <p className="text-gray-400 text-sm">{request.mentions} mentions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                                    style={{ width: `${Math.min((request.votes / 2000) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-purple-400 text-xs font-medium">
                                                {Math.min((request.votes / 2000) * 100, 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Sentiment Timeline View */}
            {viewMode === 'timeline' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Sentiment Score Comparison</h3>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={reviewData.sort((a, b) => b.sentimentScore - a.sentimentScore)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="gameName" stroke="#94a3b8" fontSize={12} angle={-45} textAnchor="end" height={100} />
                                    <YAxis stroke="#94a3b8" fontSize={12} domain={[-1, 1]} />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(30,41,59,0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => [(value * 100).toFixed(0) + '%', 'Sentiment']}
                                    />
                                    <Bar dataKey="sentimentScore" name="Sentiment Score" radius={[4, 4, 0, 0]}>
                                        {reviewData.map((entry, index) => (
                                            <rect
                                                key={`bar-${index}`}
                                                fill={entry.sentimentScore >= 0.7 ? '#10b981' : entry.sentimentScore >= 0.4 ? '#f59e0b' : '#ef4444'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Volatility & Churn Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-green-400" />
                                Stable Sentiment
                            </h3>
                            <div className="space-y-2">
                                {reviewData
                                    .filter(game => game.volatility === 'stable')
                                    .slice(0, 5)
                                    .map((game, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{game.icon}</span>
                                                <div>
                                                    <p className="text-white font-medium text-sm">{game.gameName}</p>
                                                    <p className="text-green-400 text-xs">{(game.sentimentScore * 100).toFixed(0)}% sentiment</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-yellow-400" />
                                Volatile Sentiment
                            </h3>
                            <div className="space-y-2">
                                {reviewData
                                    .filter(game => game.volatility === 'volatile')
                                    .slice(0, 5)
                                    .map((game, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{game.icon}</span>
                                                <div>
                                                    <p className="text-white font-medium text-sm">{game.gameName}</p>
                                                    <p className="text-yellow-400 text-xs">{(game.sentimentScore * 100).toFixed(0)}% sentiment</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                Crashing Sentiment
                            </h3>
                            <div className="space-y-2">
                                {reviewData
                                    .filter(game => game.volatility === 'crashing' || game.churnSignals.includes('high'))
                                    .slice(0, 5)
                                    .map((game, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{game.icon}</span>
                                                <div>
                                                    <p className="text-white font-medium text-sm">{game.gameName}</p>
                                                    <p className="text-red-400 text-xs">{(game.sentimentScore * 100).toFixed(0)}% sentiment</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Game Modal */}
            {selectedGame && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedGame(null)}>
                    <div className="glass-panel p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">{selectedGame.icon}</span>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{selectedGame.gameName}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className={`text-lg font-medium ${getSentimentColor(selectedGame.sentimentScore)}`}>
                                        {(selectedGame.sentimentScore * 100).toFixed(0)}% sentiment
                                    </p>
                                    <span className="text-gray-400">•</span>
                                    <p className="text-gray-400 capitalize">{selectedGame.volatility}</p>
                                    {getVolatilityIcon(selectedGame.volatility)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Loved Features */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <ThumbsUp className="w-5 h-5 text-green-400" />
                                    Most Loved Features
                                </h4>
                                <div className="space-y-2">
                                    {selectedGame.lovedFeatures.map((feature, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <div className="flex justify-between items-center">
                                                <p className="text-white font-medium">{feature.feature}</p>
                                                <p className="text-green-400 font-bold">{(feature.sentiment * 100).toFixed(0)}%</p>
                                            </div>
                                            <p className="text-gray-400 text-sm">{feature.mentions} mentions</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Complaints */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <ThumbsDown className="w-5 h-5 text-red-400" />
                                    Top Complaints
                                </h4>
                                <div className="space-y-2">
                                    {selectedGame.complaints.map((complaint, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <div className="flex justify-between items-center">
                                                <p className="text-white font-medium">{complaint.issue}</p>
                                                <p className="text-red-400 font-bold">{Math.abs(complaint.sentiment * 100).toFixed(0)}%</p>
                                            </div>
                                            <p className="text-gray-400 text-sm">{complaint.mentions} mentions</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Feature Requests */}
                            <div className="md:col-span-2">
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    Feature Requests
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {selectedGame.featureRequests.map((request, index) => (
                                        <div key={index} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                            <p className="text-white font-medium">{request.request}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-gray-400 text-sm">{request.mentions} mentions</p>
                                                <p className="text-purple-400 font-bold">{request.votes} votes</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {selectedGame.churnSignals.length > 0 && (
                            <div className="mt-4 p-4 rounded-lg bg-orange-500/20 border border-orange-500/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                                    <h4 className="text-orange-400 font-bold">Churn Risk Alert</h4>
                                </div>
                                <p className="text-gray-300 capitalize">
                                    {selectedGame.churnSignals.join(', ')} churn risk detected. Immediate action recommended.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setSelectedGame(null)}
                            className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewSentiment;

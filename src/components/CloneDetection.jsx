import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Copy, AlertTriangle, CheckCircle, XCircle, Shield, TrendingUp, Calendar, Percent } from 'lucide-react';

const CloneDetection = ({ cloneData }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [viewMode, setViewMode] = useState('overview'); // overview | saturation | timeline | publishers

    const SATURATION_COLORS = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#f97316',
        critical: '#ef4444'
    };

    const getSaturationIcon = (level) => {
        if (level === 'critical') return <XCircle className="w-5 h-5 text-red-400" />;
        if (level === 'high') return <AlertTriangle className="w-5 h-5 text-orange-400" />;
        if (level === 'medium') return <Shield className="w-5 h-5 text-yellow-400" />;
        return <CheckCircle className="w-5 h-5 text-green-400" />;
    };

    const getSaturationColor = (level) => {
        if (level === 'critical') return 'text-red-400';
        if (level === 'high') return 'text-orange-400';
        if (level === 'medium') return 'text-yellow-400';
        return 'text-green-400';
    };

    const getSaturationBg = (level) => {
        if (level === 'critical') return 'bg-red-500/20 border-red-500/30';
        if (level === 'high') return 'bg-orange-500/20 border-orange-500/30';
        if (level === 'medium') return 'bg-yellow-500/20 border-yellow-500/30';
        return 'bg-green-500/20 border-green-500/30';
    };

    const getRecommendationIcon = (saturation) => {
        if (saturation === 'critical' || saturation === 'high') return '🚫';
        if (saturation === 'medium') return '⚠️';
        return '✅';
    };

    // Calculate summary stats
    const totalOriginals = cloneData.length;
    const totalClones = cloneData.reduce((acc, game) => acc + game.cloneAnalysis.similarGamesCount, 0);
    const avgSimilarity = (cloneData.reduce((acc, game) => {
        const avgCloneSim = game.cloneAnalysis.topClones.reduce((sum, clone) => sum + clone.similarity, 0) / game.cloneAnalysis.topClones.length;
        return acc + avgCloneSim;
    }, 0) / cloneData.length).toFixed(2);
    const criticalGames = cloneData.filter(game => game.cloneAnalysis.saturationLevel === 'critical').length;

    // Get publisher success rates
    const getPublisherData = () => {
        const publishers = {};
        cloneData.forEach(game => {
            game.cloneAnalysis.topClones.forEach(clone => {
                if (!publishers[clone.publisher]) {
                    publishers[clone.publisher] = {
                        publisher: clone.publisher,
                        totalClones: 0,
                        successful: 0,
                        moderate: 0,
                        poor: 0
                    };
                }
                publishers[clone.publisher].totalClones += 1;
                if (clone.performance === 'successful') publishers[clone.publisher].successful += 1;
                if (clone.performance === 'moderate') publishers[clone.publisher].moderate += 1;
                if (clone.performance === 'poor') publishers[clone.publisher].poor += 1;
            });
        });
        return Object.values(publishers)
            .sort((a, b) => b.totalClones - a.totalClones)
            .slice(0, 8);
    };

    const publisherData = getPublisherData();

    // Get saturation distribution
    const saturationDistribution = [
        { name: 'Low', count: cloneData.filter(g => g.cloneAnalysis.saturationLevel === 'low').length, color: SATURATION_COLORS.low },
        { name: 'Medium', count: cloneData.filter(g => g.cloneAnalysis.saturationLevel === 'medium').length, color: SATURATION_COLORS.medium },
        { name: 'High', count: cloneData.filter(g => g.cloneAnalysis.saturationLevel === 'high').length, color: SATURATION_COLORS.high },
        { name: 'Critical', count: cloneData.filter(g => g.cloneAnalysis.saturationLevel === 'critical').length, color: SATURATION_COLORS.critical }
    ];

    return (
        <div className="space-y-6">
            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Original Games</p>
                            <p className="text-2xl font-bold text-white">{totalOriginals}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Copy className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Clones</p>
                            <p className="text-2xl font-bold text-white">{totalClones}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <Percent className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Avg Similarity</p>
                            <p className="text-2xl font-bold text-white">{(avgSimilarity * 100).toFixed(0)}%</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Critical Saturation</p>
                            <p className="text-2xl font-bold text-white">{criticalGames}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Mode Switcher */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                    { mode: 'overview', label: 'Overview', Icon: Shield, activeColor: '#7c3aed' },
                    { mode: 'saturation', label: 'Saturation Analysis', Icon: AlertTriangle, activeColor: '#dc2626' },
                    { mode: 'timeline', label: 'Clone Timeline', Icon: Calendar, activeColor: '#2563eb' },
                    { mode: 'publishers', label: 'Fast Followers', Icon: TrendingUp, activeColor: '#059669' },
                ].map(({ mode, label, Icon, activeColor }) => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: viewMode === mode ? 'none' : '1px solid #475569',
                            background: viewMode === mode ? activeColor : '#1e293b',
                            color: '#ffffff',
                            boxShadow: viewMode === mode ? `0 4px 14px ${activeColor}60` : 'none',
                        }}
                    >
                        <Icon size={16} />
                        {label}
                    </button>
                ))}
            </div>

            {/* Overview View */}
            {viewMode === 'overview' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {cloneData.slice(0, 8).map((game, index) => (
                            <div key={index} className={`glass-panel p-6 border ${getSaturationBg(game.cloneAnalysis.saturationLevel)}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{game.icon}</span>
                                        <div>
                                            <h4 className="text-white font-bold">{game.trendGame}</h4>
                                            <div className="flex items-center gap-2">
                                                {getSaturationIcon(game.cloneAnalysis.saturationLevel)}
                                                <p className={`text-sm font-medium capitalize ${getSaturationColor(game.cloneAnalysis.saturationLevel)}`}>
                                                    {game.cloneAnalysis.saturationLevel} saturation
                                                </p>
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

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="p-3 rounded-lg bg-gray-800/50">
                                        <p className="text-gray-400 text-xs mb-1">Clones</p>
                                        <p className="text-white font-bold text-lg">{game.cloneAnalysis.similarGamesCount}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gray-800/50">
                                        <p className="text-gray-400 text-xs mb-1">Market Share</p>
                                        <p className="text-white font-bold text-lg">{game.cloneAnalysis.marketShareDistribution.original}%</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gray-800/50">
                                        <p className="text-gray-400 text-xs mb-1">Risk</p>
                                        <p className="text-white font-bold text-lg">{getRecommendationIcon(game.cloneAnalysis.saturationLevel)}</p>
                                    </div>
                                </div>

                                <div className="p-3 rounded-lg bg-gray-800/30">
                                    <p className="text-gray-400 text-xs mb-1">Recommendation</p>
                                    <p className="text-gray-300 text-sm font-medium">{game.cloneAnalysis.recommendation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Saturation Analysis View */}
            {viewMode === 'saturation' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Saturation Distribution Chart */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Saturation Distribution</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={saturationDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => `${entry.name}: ${entry.count}`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="count"
                                        >
                                            {saturationDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(30,41,59,0.95)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Clone Count Comparison */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Clone Count by Game</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={cloneData.sort((a, b) => b.cloneAnalysis.similarGamesCount - a.cloneAnalysis.similarGamesCount)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="trendGame" stroke="#94a3b8" fontSize={12} angle={-45} textAnchor="end" height={100} />
                                        <YAxis stroke="#94a3b8" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(30,41,59,0.95)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Bar dataKey="cloneAnalysis.similarGamesCount" name="Clone Count" radius={[4, 4, 0, 0]}>
                                            {cloneData.map((entry, index) => (
                                                <rect key={`bar-${index}`} fill={SATURATION_COLORS[entry.cloneAnalysis.saturationLevel]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Market Share Analysis */}
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Market Share Distribution Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cloneData.map((game, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-2xl">{game.icon}</span>
                                        <h4 className="text-white font-medium">{game.trendGame}</h4>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-sm">Original</span>
                                            <span className="text-white font-bold">{game.cloneAnalysis.marketShareDistribution.original}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${game.cloneAnalysis.marketShareDistribution.original}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-sm">Top Clones</span>
                                            <span className="text-orange-400 font-bold">{game.cloneAnalysis.marketShareDistribution.topClones}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-orange-500 h-2 rounded-full"
                                                style={{ width: `${game.cloneAnalysis.marketShareDistribution.topClones}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-sm">Others</span>
                                            <span className="text-gray-400 font-bold">{game.cloneAnalysis.marketShareDistribution.others}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gray-500 h-2 rounded-full"
                                                style={{ width: `${game.cloneAnalysis.marketShareDistribution.others}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
                <div className="space-y-6">
                    {cloneData.map((game, gameIndex) => (
                        <div key={gameIndex} className="glass-panel p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">{game.icon}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{game.trendGame}</h3>
                                    <p className="text-gray-400 text-sm">{game.cloneAnalysis.similarGamesCount} clones detected</p>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
                                
                                {/* Original game launch */}
                                <div className="relative pl-12 pb-6">
                                    <div className="absolute left-2 w-4 h-4 rounded-full bg-green-500 border-4 border-gray-900" />
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-white font-bold">Original Launch</h4>
                                            <span className="text-green-400 font-medium">Day 0</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{game.trendGame} enters market</p>
                                    </div>
                                </div>

                                {/* Clone launches */}
                                {game.cloneAnalysis.topClones.map((clone, cloneIndex) => (
                                    <div key={cloneIndex} className="relative pl-12 pb-6">
                                        <div className={`absolute left-2 w-4 h-4 rounded-full border-4 border-gray-900 ${
                                            clone.performance === 'successful' ? 'bg-blue-500' :
                                            clone.performance === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`} />
                                        <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-white font-medium">{clone.name}</h4>
                                                <span className="text-purple-400 font-medium">{clone.launchDate}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-gray-400">
                                                    Similarity: <span className="text-orange-400 font-bold">{(clone.similarity * 100).toFixed(0)}%</span>
                                                </span>
                                                <span className="text-gray-400">
                                                    Performance: <span className={`font-bold ${
                                                        clone.performance === 'successful' ? 'text-green-400' :
                                                        clone.performance === 'moderate' ? 'text-yellow-400' : 'text-red-400'
                                                    }`}>{clone.performance}</span>
                                                </span>
                                                <span className="text-gray-400">
                                                    Publisher: <span className="text-blue-400 font-medium">{clone.publisher}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Publishers View */}
            {viewMode === 'publishers' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Fast Follower Publishers</h3>
                        <p className="text-gray-400 text-sm mb-6">Publishers frequently cloning successful trends</p>
                        <div className="space-y-3">
                            {publisherData.map((publisher, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="text-white font-medium">{publisher.publisher}</h4>
                                            <p className="text-gray-400 text-sm">{publisher.totalClones} clones published</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold text-2xl">{((publisher.successful / publisher.totalClones) * 100).toFixed(0)}%</p>
                                            <p className="text-gray-400 text-xs">Success Rate</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="p-2 rounded bg-green-500/20 border border-green-500/30">
                                            <p className="text-green-400 font-bold">{publisher.successful}</p>
                                            <p className="text-gray-400 text-xs">Successful</p>
                                        </div>
                                        <div className="p-2 rounded bg-yellow-500/20 border border-yellow-500/30">
                                            <p className="text-yellow-400 font-bold">{publisher.moderate}</p>
                                            <p className="text-gray-400 text-xs">Moderate</p>
                                        </div>
                                        <div className="p-2 rounded bg-red-500/20 border border-red-500/30">
                                            <p className="text-red-400 font-bold">{publisher.poor}</p>
                                            <p className="text-gray-400 text-xs">Poor</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Game Modal */}
            {selectedGame && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedGame(null)}>
                    <div className="glass-panel p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">{selectedGame.icon}</span>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{selectedGame.trendGame}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {getSaturationIcon(selectedGame.cloneAnalysis.saturationLevel)}
                                    <p className={`text-lg font-medium capitalize ${getSaturationColor(selectedGame.cloneAnalysis.saturationLevel)}`}>
                                        {selectedGame.cloneAnalysis.saturationLevel} saturation
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 rounded-lg bg-purple-500/20">
                                <p className="text-gray-400 text-sm">Total Clones</p>
                                <p className="text-white text-2xl font-bold">{selectedGame.cloneAnalysis.similarGamesCount}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-green-500/20">
                                <p className="text-gray-400 text-sm">Market Share</p>
                                <p className="text-white text-2xl font-bold">{selectedGame.cloneAnalysis.marketShareDistribution.original}%</p>
                            </div>
                            <div className="p-4 rounded-lg bg-blue-500/20">
                                <p className="text-gray-400 text-sm">Avg Similarity</p>
                                <p className="text-white text-2xl font-bold">
                                    {((selectedGame.cloneAnalysis.topClones.reduce((sum, c) => sum + c.similarity, 0) / selectedGame.cloneAnalysis.topClones.length) * 100).toFixed(0)}%
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Top Clones</h4>
                            <div className="space-y-2">
                                {selectedGame.cloneAnalysis.topClones.map((clone, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <h5 className="text-white font-medium">{clone.name}</h5>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                clone.performance === 'successful' ? 'bg-green-500/20 text-green-400' :
                                                clone.performance === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                                {clone.performance}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-400">Publisher</p>
                                                <p className="text-white font-medium">{clone.publisher}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Similarity</p>
                                                <p className="text-orange-400 font-bold">{(clone.similarity * 100).toFixed(0)}%</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Launch Date</p>
                                                <p className="text-purple-400 font-medium">{clone.launchDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border ${getSaturationBg(selectedGame.cloneAnalysis.saturationLevel)}`}>
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                {getRecommendationIcon(selectedGame.cloneAnalysis.saturationLevel)} Recommendation
                            </h4>
                            <p className="text-gray-300">{selectedGame.cloneAnalysis.recommendation}</p>
                        </div>

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

export default CloneDetection;

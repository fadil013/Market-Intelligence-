import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Tags, TrendingUp, TrendingDown, Zap, Flame, Target, Box, Users } from 'lucide-react';

const MechanicTagging = ({ mechanicData }) => {
    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [viewMode, setViewMode] = useState('tagcloud'); // tagcloud | trends | combinations | hot

    const MECHANIC_COLORS = {
        'merge mechanic': '#10b981',
        'gacha system': '#8b5cf6',
        'idle progression': '#3b82f6',
        'extraction loop': '#f59e0b',
        'deckbuilding': '#ec4899',
        'roguelike': '#ef4444',
        'auto-battler': '#06b6d4',
        'prestige system': '#8b5cf6',
        'skill tree': '#10b981',
        'character collection': '#ec4899',
        'base building': '#f59e0b',
        'city builder': '#3b82f6',
        'guild system': '#8b5cf6',
        'pvp arena': '#ef4444',
        'co-op raids': '#06b6d4',
        'leaderboards': '#f59e0b',
        'battle pass': '#10b981',
        'loot boxes': '#8b5cf6',
        'season pass': '#3b82f6',
        'energy system': '#ec4899'
    };

    // Calculate trend data
    const getTrendingMechanics = () => {
        return mechanicData.mechanics
            .sort((a, b) => Math.abs(b.trend) - Math.abs(a.trend))
            .slice(0, 10);
    };

    // Get hot mechanics (trending up the most)
    const getHotMechanics = () => {
        return mechanicData.mechanics
            .filter(m => m.trend > 0)
            .sort((a, b) => b.trend - a.trend)
            .slice(0, 8);
    };

    // Get declining mechanics
    const getDecliningMechanics = () => {
        return mechanicData.mechanics
            .filter(m => m.trend < 0)
            .sort((a, b) => a.trend - b.trend)
            .slice(0, 6);
    };

    // Get mechanic combinations
    const getMechanicCombinations = () => {
        return mechanicData.combinations
            .sort((a, b) => b.gameCount - a.gameCount)
            .slice(0, 12);
    };

    // Calculate summary stats
    const avgPopularity = (mechanicData.mechanics.reduce((acc, m) => acc + m.popularity, 0) / mechanicData.mechanics.length).toFixed(1);
    const trendingUpCount = mechanicData.mechanics.filter(m => m.trend > 0).length;
    const trendingDownCount = mechanicData.mechanics.filter(m => m.trend < 0).length;
    const topMechanic = mechanicData.mechanics.reduce((max, m) => m.popularity > max.popularity ? m : max, mechanicData.mechanics[0]);

    const getTrendIcon = (trend) => {
        if (trend > 15) return <Flame className="w-4 h-4 text-red-400" />;
        if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
        if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
        return <Target className="w-4 h-4 text-gray-400" />;
    };

    const getTrendColor = (trend) => {
        if (trend > 15) return 'text-red-400';
        if (trend > 0) return 'text-green-400';
        if (trend < 0) return 'text-orange-400';
        return 'text-gray-400';
    };

    const trendingMechanics = getTrendingMechanics();
    const hotMechanics = getHotMechanics();
    const decliningMechanics = getDecliningMechanics();
    const mechanicCombinations = getMechanicCombinations();

    return (
        <div className="space-y-6">
            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Tags className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Mechanics</p>
                            <p className="text-2xl font-bold text-white">{mechanicData.mechanics.length}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Trending Up</p>
                            <p className="text-2xl font-bold text-white">{trendingUpCount}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Declining</p>
                            <p className="text-2xl font-bold text-white">{trendingDownCount}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Top Mechanic</p>
                            <p className="text-lg font-bold text-white">{topMechanic.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setViewMode('tagcloud')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'tagcloud'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <Tags className="w-4 h-4 inline mr-2" />
                    Tag Cloud
                </button>
                <button
                    onClick={() => setViewMode('trends')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'trends'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Trends
                </button>
                <button
                    onClick={() => setViewMode('combinations')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'combinations'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <Box className="w-4 h-4 inline mr-2" />
                    Combinations
                </button>
                <button
                    onClick={() => setViewMode('hot')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'hot'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <Flame className="w-4 h-4 inline mr-2" />
                    Hot This Week
                </button>
            </div>

            {/* Tag Cloud View */}
            {viewMode === 'tagcloud' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Mechanic Tag Cloud</h3>
                        <p className="text-gray-400 text-sm mb-6">Size represents popularity across games</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {mechanicData.mechanics
                                .sort((a, b) => b.popularity - a.popularity)
                                .map((mechanic, index) => {
                                    const size = Math.max(12, Math.min(32, mechanic.popularity / 3));
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedMechanic(mechanic)}
                                            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-110 cursor-pointer"
                                            style={{
                                                fontSize: `${size}px`,
                                                background: `linear-gradient(135deg, ${MECHANIC_COLORS[mechanic.name] || '#8b5cf6'}40, ${MECHANIC_COLORS[mechanic.name] || '#8b5cf6'}20)`,
                                                border: `1px solid ${MECHANIC_COLORS[mechanic.name] || '#8b5cf6'}60`,
                                                color: MECHANIC_COLORS[mechanic.name] || '#8b5cf6'
                                            }}
                                        >
                                            {mechanic.name}
                                        </button>
                                    );
                                })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Mechanics */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Most Popular Mechanics</h3>
                            <div className="space-y-3">
                                {mechanicData.mechanics
                                    .sort((a, b) => b.popularity - a.popularity)
                                    .slice(0, 8)
                                    .map((mechanic, index) => (
                                        <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    {getTrendIcon(mechanic.trend)}
                                                    <div>
                                                        <h4 className="text-white font-medium">{mechanic.name}</h4>
                                                        <p className="text-gray-400 text-sm">{mechanic.gameCount} games</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white font-bold">{mechanic.popularity}%</p>
                                                    <p className={`text-sm font-medium ${getTrendColor(mechanic.trend)}`}>
                                                        {mechanic.trend > 0 ? '+' : ''}{mechanic.trend}% WoW
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                                <div
                                                    className="h-2 rounded-full"
                                                    style={{
                                                        width: `${mechanic.popularity}%`,
                                                        background: `linear-gradient(to right, ${MECHANIC_COLORS[mechanic.name] || '#8b5cf6'}, ${MECHANIC_COLORS[mechanic.name] || '#8b5cf6'}80)`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Detection Sources */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Auto-Detection Sources</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/30">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Target className="w-5 h-5 text-purple-400" />
                                        <h4 className="text-white font-medium">Store Description NLP</h4>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-3">Extract keywords from app store descriptions</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 rounded bg-gray-800/50">
                                            <p className="text-white font-bold text-lg">87%</p>
                                            <p className="text-gray-400 text-xs">Accuracy</p>
                                        </div>
                                        <div className="p-2 rounded bg-gray-800/50">
                                            <p className="text-white font-bold text-lg">2.3M</p>
                                            <p className="text-gray-400 text-xs">Analyzed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Box className="w-5 h-5 text-blue-400" />
                                        <h4 className="text-white font-medium">Screenshot Recognition</h4>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-3">Computer vision to detect UI patterns</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 rounded bg-gray-800/50">
                                            <p className="text-white font-bold text-lg">92%</p>
                                            <p className="text-gray-400 text-xs">Accuracy</p>
                                        </div>
                                        <div className="p-2 rounded bg-gray-800/50">
                                            <p className="text-white font-bold text-lg">1.8M</p>
                                            <p className="text-gray-400 text-xs">Analyzed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Zap className="w-5 h-5 text-green-400" />
                                        <h4 className="text-white font-medium">Video Gameplay Analysis</h4>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-3">Frame-by-frame mechanic detection</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="p-2 rounded bg-gray-800/50">
                                            <p className="text-white font-bold text-lg">95%</p>
                                            <p className="text-gray-400 text-xs">Accuracy</p>
                                        </div>
                                        <div className="p-2 rounded bg-gray-800/50">
                                            <p className="text-white font-bold text-lg">450K</p>
                                            <p className="text-gray-400 text-xs">Analyzed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Trends View */}
            {viewMode === 'trends' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Mechanic Trends (Week over Week)</h3>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendingMechanics} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={150} />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(30,41,59,0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => [`${value > 0 ? '+' : ''}${value}%`, 'Trend']}
                                    />
                                    <Bar dataKey="trend" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Trend Alerts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Flame className="w-5 h-5 text-red-400" />
                                Hot Mechanics 🔥
                            </h3>
                            <div className="space-y-3">
                                {hotMechanics.map((mechanic, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-white font-medium">{mechanic.name}</h4>
                                                <p className="text-gray-400 text-sm">{mechanic.gameCount} games</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold text-xl">+{mechanic.trend}%</p>
                                                <p className="text-gray-400 text-sm">WoW</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-orange-400" />
                                Declining Mechanics 📉
                            </h3>
                            <div className="space-y-3">
                                {decliningMechanics.map((mechanic, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-white font-medium">{mechanic.name}</h4>
                                                <p className="text-gray-400 text-sm">{mechanic.gameCount} games</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold text-xl">{mechanic.trend}%</p>
                                                <p className="text-gray-400 text-sm">WoW</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Combinations View */}
            {viewMode === 'combinations' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Mechanic Combination Matrix</h3>
                        <p className="text-gray-400 text-sm mb-6">Popular mechanic pairings in successful games</p>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis 
                                        type="number" 
                                        dataKey="gameCount" 
                                        name="Game Count" 
                                        stroke="#94a3b8" 
                                        fontSize={12}
                                        label={{ value: 'Number of Games', position: 'bottom', fill: '#94a3b8' }}
                                    />
                                    <YAxis 
                                        type="number" 
                                        dataKey="avgRevenue" 
                                        name="Avg Revenue" 
                                        stroke="#94a3b8" 
                                        fontSize={12}
                                        tickFormatter={(value) => `$${value}M`}
                                        label={{ value: 'Avg Revenue (M)', angle: -90, position: 'left', fill: '#94a3b8' }}
                                    />
                                    <ZAxis type="number" dataKey="trend" name="Trend" range={[50, 400]} />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(30,41,59,0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px'
                                        }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="glass-panel p-3">
                                                        <p className="text-white font-bold mb-1">{data.combination}</p>
                                                        <p className="text-gray-400 text-sm">{data.gameCount} games</p>
                                                        <p className="text-gray-400 text-sm">Avg Revenue: ${data.avgRevenue}M</p>
                                                        <p className="text-gray-400 text-sm">Trend: {data.trend > 0 ? '+' : ''}{data.trend}%</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Scatter data={mechanicCombinations} fill="#8b5cf6" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Top Mechanic Combinations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mechanicCombinations.map((combo, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Box className="w-4 h-4 text-purple-400" />
                                        <h4 className="text-white font-medium text-sm">{combo.combination}</h4>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-3">
                                        <div>
                                            <p className="text-gray-400 text-xs">Games</p>
                                            <p className="text-white font-bold">{combo.gameCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Revenue</p>
                                            <p className="text-white font-bold">${combo.avgRevenue}M</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Trend</p>
                                            <p className={`font-bold ${combo.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {combo.trend > 0 ? '+' : ''}{combo.trend}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Hot This Week View */}
            {viewMode === 'hot' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Flame className="w-6 h-6 text-red-400" />
                            Hot Mechanics This Week
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hotMechanics.map((mechanic, index) => (
                                <div 
                                    key={index} 
                                    className="p-6 rounded-lg bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 border-2 border-red-500/40"
                                    onClick={() => setSelectedMechanic(mechanic)}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Flame className="w-8 h-8 text-red-400" />
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{mechanic.name}</h4>
                                                <p className="text-gray-400 text-sm">{mechanic.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold text-2xl">+{mechanic.trend}%</p>
                                            <p className="text-gray-400 text-sm">WoW</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="p-3 rounded-lg bg-gray-800/50">
                                            <p className="text-gray-400 text-xs mb-1">Popularity</p>
                                            <p className="text-white font-bold text-lg">{mechanic.popularity}%</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-gray-800/50">
                                            <p className="text-gray-400 text-xs mb-1">Games</p>
                                            <p className="text-white font-bold text-lg">{mechanic.gameCount}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {mechanic.exampleGames && mechanic.exampleGames.map((game, i) => (
                                            <span key={i} className="px-2 py-1 rounded bg-gray-800/70 text-gray-300 text-xs">
                                                {game}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trend Alerts */}
                    <div className="glass-panel p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-yellow-400" />
                            Trend Alerts
                        </h3>
                        <div className="space-y-3">
                            {mechanicData.trendAlerts && mechanicData.trendAlerts.map((alert, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-purple-500/30">
                                    <p className="text-white text-lg">{alert.message}</p>
                                    <p className="text-gray-400 text-sm mt-1">{alert.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Mechanic Modal */}
            {selectedMechanic && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMechanic(null)}>
                    <div className="glass-panel p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-white">{selectedMechanic.name}</h3>
                            {getTrendIcon(selectedMechanic.trend)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-lg bg-purple-500/20">
                                <p className="text-gray-400 text-sm">Popularity</p>
                                <p className="text-white text-2xl font-bold">{selectedMechanic.popularity}%</p>
                            </div>
                            <div className="p-4 rounded-lg bg-green-500/20">
                                <p className="text-gray-400 text-sm">Trend (WoW)</p>
                                <p className={`text-2xl font-bold ${getTrendColor(selectedMechanic.trend)}`}>
                                    {selectedMechanic.trend > 0 ? '+' : ''}{selectedMechanic.trend}%
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-blue-500/20">
                                <p className="text-gray-400 text-sm">Game Count</p>
                                <p className="text-white text-2xl font-bold">{selectedMechanic.gameCount}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-yellow-500/20">
                                <p className="text-gray-400 text-sm">Category</p>
                                <p className="text-white text-xl  font-bold">{selectedMechanic.category}</p>
                            </div>
                        </div>

                        {selectedMechanic.exampleGames && (
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-white mb-3">Example Games</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMechanic.exampleGames.map((game, index) => (
                                        <span key={index} className="px-3 py-2 rounded-lg bg-gray-800/50 text-gray-300">
                                            {game}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setSelectedMechanic(null)}
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MechanicTagging;

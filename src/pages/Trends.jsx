import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { TrendingUp, Flame, ArrowUpRight } from 'lucide-react';
import { allGames, genreIntelligence, mechanicData, cloneData, seasonalData } from '../data/mockData';
import GenreIntelligence from '../components/GenreIntelligence';
import MechanicTagging from '../components/MechanicTagging';
import CloneDetection from '../components/CloneDetection';
import SeasonalityOverlay from '../components/SeasonalityOverlay';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 !bg-slate-800/95 border border-white/10">
                <p className="text-white font-semibold text-sm">{payload[0].payload.fullName}</p>
                <p className="text-gray-400 text-xs">{payload[0].payload.genre}</p>
                <p className={`text-lg font-bold ${payload[0].value > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {payload[0].value > 0 ? '+' : ''}{payload[0].value}% boost
                </p>
            </div>
        );
    }
    return null;
};

const BoostTracker = () => {
    // Get top boosting games
    const boostingGames = [...allGames]
        .sort((a, b) => b.boostScore - a.boostScore)
        .slice(0, 10)
        .map((game) => ({
            name: game.name.length > 15 ? game.name.substring(0, 15) + '...' : game.name,
            fullName: game.name,
            boost: game.boostScore,
            genre: game.genre,
        }));

    const getBarColor = (boost) => {
        if (boost >= 15) return '#10b981'; // emerald
        if (boost >= 5) return '#8b5cf6'; // purple
        if (boost >= 0) return '#06b6d4'; // cyan
        return '#ef4444'; // red
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Flame className="text-orange-500" />
                        Boost Tracker
                    </h1>
                    <p className="text-gray-400 mt-1">Apps gaining rapid traction (day-over-day growth)</p>
                </div>
            </div>

            {/* Top Boosters Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {boostingGames.slice(0, 3).map((game, index) => (
                    <div
                        key={index}
                        className="glass-panel p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-30 bg-emerald-500" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xl font-bold text-amber-400">#{index + 1}</span>
                                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                                    <ArrowUpRight size={18} />
                                    +{game.boost}%
                                </div>
                            </div>
                            <h3 className="text-white font-semibold text-lg">{game.fullName}</h3>
                            <p className="text-gray-400 text-sm">{game.genre}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Boost Chart */}
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-6">Top 10 Boosting Games</h3>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={boostingGames}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                            <XAxis
                                type="number"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                width={120}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                            <Bar dataKey="boost" radius={[0, 4, 4, 0]}>
                                {boostingGames.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.boost)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Insights */}
            <div className="glass-panel p-6 border-l-4 border-purple-500">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp size={18} className="text-purple-400" />
                    Market Insight
                </h4>
                <p className="text-gray-400">
                    RPG and Shooting genres are showing the strongest growth this week, with gacha mechanics
                    and seasonal battle passes driving engagement. Consider prioritizing these categories
                    for new releases or feature updates.
                </p>
            </div>

            {/* Genre Intelligence - Phase 4 */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        🎮 Genre & Sub-Genre Intelligence
                    </h3>
                    <p className="text-gray-400">Hybrid detection, mechanics tagging, and genre trend analysis</p>
                </div>
                <GenreIntelligence genreData={genreIntelligence} />
            </div>

            {/* Mechanic Tagging - Phase 7 */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        🔧 Gameplay Mechanic Tagging
                    </h3>
                    <p className="text-gray-400">AI-powered mechanic detection, trend analysis, and combination insights</p>
                </div>
                <MechanicTagging mechanicData={mechanicData} />
            </div>

            {/* Clone & Copycat Detection - Phase 9 */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        🐑 Clone & Copycat Detection
                    </h3>
                    <p className="text-gray-400">Market saturation analysis, fast follower tracking, and competitive intelligence</p>
                </div>
                <CloneDetection cloneData={cloneData} />
            </div>

            {/* Seasonality & Event Overlay - Phase 11 */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        📅 Seasonality & Event Overlay
                    </h3>
                    <p className="text-gray-400">External events context, performance correlation, and upcoming opportunities</p>
                </div>
                <SeasonalityOverlay seasonalData={seasonalData} />
            </div>
        </div>
    );
};

export default BoostTracker;

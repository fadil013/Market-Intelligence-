import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { X, TrendingUp, Download, DollarSign, Star, Globe, Smartphone, Activity, Flame, Target, Trophy, Zap } from 'lucide-react';

const AppDetailView = ({ appName, data, onClose, gameData }) => {
    // Generate unique analytics based on the specific game
    const generateCategoryData = () => {
        const baseData = [
            { name: 'Puzzle', games: 2847, revenue: 892000000, trend: '+42%', color: '#f59e0b', icon: '🧩' },
            { name: 'Shooting', games: 1523, revenue: 1200000000, trend: '+38%', color: '#ef4444', icon: '🎯' },
            { name: 'Racing', games: 892, revenue: 645000000, trend: '+35%', color: '#06b6d4', icon: '🏎️' },
            { name: 'RPG', games: 1245, revenue: 1800000000, trend: '+28%', color: '#8b5cf6', icon: '⚔️' },
            { name: 'Strategy', games: 756, revenue: 534000000, trend: '+22%', color: '#10b981', icon: '🎲' },
            { name: 'Casual', games: 3421, revenue: 723000000, trend: '+18%', color: '#ec4899', icon: '🎮' }
        ];

        // If we have game data, prioritize its genre
        if (gameData?.genre) {
            const genreMap = {
                'Puzzle': 0,
                'Shooter': 1,
                'Racing': 2,
                'RPG': 3,
                'Strategy': 4,
                'Casual': 5,
                'MOBA': 3, // Treat MOBA as RPG category
                'Sandbox': 5 // Treat Sandbox as Casual
            };
            
            const priorityIndex = genreMap[gameData.genre] ?? 0;
            
            // Reorder to show the game's genre first with boosted stats
            const reordered = [...baseData];
            const priorityItem = reordered[priorityIndex];
            
            // Boost the stats for the specific game's genre
            priorityItem.games = Math.floor(priorityItem.games * 1.2);
            priorityItem.revenue = Math.floor(priorityItem.revenue * 1.15);
            const trendNum = parseInt(priorityItem.trend);
            priorityItem.trend = `+${trendNum + 5}%`;
            
            reordered.splice(priorityIndex, 1);
            reordered.unshift(priorityItem);
            
            return reordered;
        }
        
        return baseData;
    };
    
    const categoryData = generateCategoryData();

    if (!data) return (
        <div className="detail-panel glass-panel flex flex-col h-full" style={{ background: 'rgba(15,23,42,0.95)' }}>
            <div className="sticky top-0 z-20 p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)' }}>
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer', border: 'none' }}
                >
                    <X size={14} />
                    Back to Listings
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-4 mb-8">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-slate-800 ring-4 ring-white/5 shadow-2xl">
                        🎮
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white mb-2">{appName}</h2>
                        <p className="text-sm text-gray-400">Category Performance Analytics</p>
                    </div>
                </div>

                {/* Trending Categories Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Flame className="text-orange-400" size={24} />
                    <h3 className="text-xl font-bold text-white">Top Trending Categories</h3>
                </div>

                {/* Category Cards */}
                <div className="space-y-4">
                    {categoryData.map((category, idx) => (
                        <div 
                            key={idx}
                            className="glass-panel p-5 hover:bg-white/5 transition-all cursor-pointer"
                            style={{ borderLeft: `3px solid ${category.color}` }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                        style={{ background: `${category.color}20`, border: `1px solid ${category.color}40` }}
                                    >
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{category.name}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-gray-400 text-xs">{category.games.toLocaleString()} games</span>
                                            <span className="text-gray-600">•</span>
                                            <span className="text-gray-400 text-xs">${(category.revenue / 1000000).toFixed(0)}M revenue</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                                        <TrendingUp size={18} />
                                        {category.trend}
                                    </div>
                                    <span className="text-xs text-gray-500">30d growth</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Market Insights */}
                <div className="mt-8">
                    <div className="flex items-start gap-3 mb-6">
                        <div className="mt-1">
                            <Target className="text-blue-400" size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white leading-tight">Market Insights</h3>
                            {gameData?.genre && (
                                <p className="text-sm text-gray-400 mt-1">{gameData.genre} Category</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-4">
                            <Trophy className="text-amber-400 mb-3" size={20} />
                            <p className="text-xs text-gray-400 uppercase mb-1">Market Position</p>
                            <p className="text-white font-bold">{gameData?.genre || 'Gaming'} Leader</p>
                            <p className="text-emerald-400 text-sm font-bold mt-1">
                                {gameData?.rating ? `${gameData.rating}⭐ Rating` : 'Top Rated'}
                            </p>
                        </div>
                        <div className="glass-panel p-4">
                            <Zap className="text-purple-400 mb-3" size={20} />
                            <p className="text-xs text-gray-400 uppercase mb-1">Growth Momentum</p>
                            <p className="text-white font-bold">{categoryData[0]?.name || 'Top Category'}</p>
                            <p className="text-emerald-400 text-sm font-bold mt-1">
                                {gameData?.boostScore ? `+${gameData.boostScore}% Boost` : categoryData[0]?.trend || '+42% Growth'}
                            </p>
                        </div>
                    </div>
                    
                    {gameData && (
                        <div className="mt-6 glass-panel p-5" style={{ 
                            background: 'linear-gradient(135deg, rgba(107,114,128,0.12), rgba(75,85,99,0.08))',
                            borderLeft: `3px solid ${gameData.color || '#6b7280'}`
                        }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div 
                                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                                    style={{ background: `${gameData.color || '#6b7280'}20`, border: `2px solid ${gameData.color || '#6b7280'}40` }}
                                >
                                    {gameData.icon || '🎮'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-base">{appName} Performance</h4>
                                    <p className="text-gray-400 text-xs mt-1">{gameData.studioRegion || 'Global'} • {gameData.platform || 'Multi-platform'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Downloads</p>
                                    <p className="text-white font-bold text-sm">{(gameData.monthlyDownloads / 1000000).toFixed(1)}M</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Revenue</p>
                                    <p className="text-emerald-400 font-bold text-sm">${(gameData.monthlyRevenue / 1000000).toFixed(0)}M</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Boost Score</p>
                                    <p className="text-purple-400 font-bold text-sm">+{gameData.boostScore}%</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="detail-panel glass-panel flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 z-20 p-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer', border: 'none' }}
                >
                    <X size={14} />
                    Back to Listings
                </button>
                <div className="live-badge scale-90">
                    <div className="dot"></div>
                    <span>Analytics Live</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-slate-800 ring-4 ring-white/5 shadow-2xl">
                        {appName === 'TikTok' ? '🎵' : (appName === 'ChatGPT' ? '🤖' : '📱')}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-black text-white mb-2">{appName}</h2>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', boxShadow: '0 0 0 1px rgba(59,130,246,0.3)' }}>{data.category || 'App'}</span>
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-bold">{data.rating || '4.5'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="flex-1 p-3 glass-panel text-center">
                            <p className="text-gray-400 text-[9px] uppercase font-bold mb-1">Store Rank</p>
                            <p className="text-white font-black text-lg">#1</p>
                        </div>
                        <div className="flex-1 p-3 glass-panel text-center">
                            <p className="text-gray-400 text-[9px] uppercase font-bold mb-1">Growth Score</p>
                            <p className="text-emerald-400 font-black text-lg">98/100</p>
                        </div>
                    </div>
                </div>

                {/* Stats Stack */}
                <div className="space-y-6 mb-8">
                    <div className="glass-panel p-5" style={{ background: 'linear-gradient(to bottom right, rgba(59,130,246,0.08), transparent)' }}>
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-gray-400 text-xs font-medium mb-1">Estimated Revenue</p>
                                <h3 className="text-2xl font-black text-white">{data.revenue}</h3>
                            </div>
                            <div className="p-2 rounded-lg" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>
                                <DollarSign size={18} />
                            </div>
                        </div>
                        <div className="h-28">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.performanceHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" hide />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                                        itemStyle={{ color: '#3b82f6' }}
                                    />
                                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={1000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel p-5" style={{ background: 'linear-gradient(to bottom right, rgba(16,185,129,0.08), transparent)' }}>
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-gray-400 text-xs font-medium mb-1">Total Downloads</p>
                                <h3 className="text-2xl font-black text-white">{data.downloads}</h3>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                <Download size={18} />
                            </div>
                        </div>
                        <div className="h-28">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.performanceHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" hide />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                                        itemStyle={{ color: '#10b981' }}
                                    />
                                    <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={3} dot={false} animationDuration={1000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Geography Section */}
                <div className="glass-panel p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe size={16} className="text-blue-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Regions</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.geoDist}
                                        innerRadius={45}
                                        outerRadius={65}
                                        paddingAngle={5}
                                        dataKey="percentage"
                                    >
                                        {data.geoDist.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {data.geoDist.map((region, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-gray-400">{region.region}</span>
                                        <span className="text-white font-bold">{region.percentage}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-1000 ease-out"
                                            style={{ width: `${region.percentage}%`, backgroundColor: region.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDetailView;

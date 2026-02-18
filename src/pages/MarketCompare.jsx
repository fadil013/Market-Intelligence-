import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { Store, Smartphone, ShoppingBag } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { platformComparisonData, allGames, monetizationData, marketingData, publisherData, techStackData } from '../data/mockData';
import MonetizationAnalysis from '../components/MonetizationAnalysis';
import CreativeIntelligence from '../components/CreativeIntelligence';
import PublisherTracking from '../components/PublisherTracking';
import TechStackDetection from '../components/TechStackDetection';

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 !bg-slate-800/95 border border-white/10">
                <p className="text-white font-semibold">{payload[0].name}</p>
                <p className="text-lg font-bold" style={{ color: payload[0].payload.color }}>
                    {payload[0].value}% market share
                </p>
            </div>
        );
    }
    return null;
};

const MarketCompare = () => {
    // Platform market share data
    const platformShareData = [
        { name: 'Google Play', value: 52, color: '#8b5cf6', icon: Smartphone },
        { name: 'App Store', value: 38, color: '#ec4899', icon: Store },
        { name: 'Amazon', value: 10, color: '#06b6d4', icon: ShoppingBag },
    ];

    // Genre distribution by platform
    const genreDistribution = [
        { genre: 'Shooting', googlePlay: 22, appStore: 18, amazon: 8 },
        { genre: 'Racing', googlePlay: 15, appStore: 20, amazon: 12 },
        { genre: 'Puzzle', googlePlay: 25, appStore: 22, amazon: 30 },
        { genre: 'RPG', googlePlay: 18, appStore: 25, amazon: 15 },
        { genre: 'Casual', googlePlay: 20, appStore: 15, amazon: 35 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Multi-Store Comparison</h1>
                <p className="text-gray-400 mt-1">Analyze performance across Google Play, App Store, and Amazon</p>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {platformShareData.map((platform, index) => (
                    <div key={index} className="glass-panel p-6 relative overflow-hidden">
                        <div
                            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                            style={{ background: platform.color }}
                        />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ background: `${platform.color}20` }}
                                >
                                    <platform.icon size={24} style={{ color: platform.color }} />
                                </div>
                                <h3 className="text-white font-semibold text-lg">{platform.name}</h3>
                            </div>
                            <p className="text-4xl font-bold text-white mb-1">{platform.value}%</p>
                            <p className="text-gray-400 text-sm">Market Share</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={platformShareData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {platformShareData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {platformShareData.map((platform, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: platform.color }} />
                                <span className="text-gray-400 text-sm">{platform.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Genre Distribution */}
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Genre Distribution by Platform</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={genreDistribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="genre"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(30,41,59,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="googlePlay" name="Google Play" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="appStore" name="App Store" fill="#ec4899" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="amazon" name="Amazon" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Platform Stats */}
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-4">Platform Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h4 className="text-purple-300 font-medium mb-2">Google Play</h4>
                        <p className="text-2xl font-bold text-white mb-1">2.8M+</p>
                        <p className="text-gray-400 text-sm">Total Apps</p>
                    </div>
                    <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <h4 className="text-pink-300 font-medium mb-2">App Store</h4>
                        <p className="text-2xl font-bold text-white mb-1">1.8M+</p>
                        <p className="text-gray-400 text-sm">Total Apps</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <h4 className="text-cyan-300 font-medium mb-2">Amazon</h4>
                        <p className="text-2xl font-bold text-white mb-1">480K+</p>
                        <p className="text-gray-400 text-sm">Total Apps</p>
                    </div>
                </div>
            </div>

            {/* Monetization Analysis */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Monetization Analysis</h3>
                    <p className="text-gray-400 text-sm">ARPU rankings, IAP/Ads revenue breakdown, and paywall strategies</p>
                </div>
                <MonetizationAnalysis monetizationData={monetizationData} />
            </div>

            {/* Creative & Marketing Intelligence */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Creative & Marketing Intelligence</h3>
                    <p className="text-gray-400 text-sm">Ad creative performance, network spend, CPI analysis, and viral vs paid growth</p>
                </div>
                <CreativeIntelligence marketingData={marketingData} />
            </div>

            {/* Publisher & Studio Tracking */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Publisher & Studio Tracking</h3>
                    <p className="text-gray-400 text-sm">Track publisher performance, predict next moves, and identify M&A targets</p>
                </div>
                <PublisherTracking publisherData={publisherData} />
            </div>

            {/* Tech Stack & Engine Detection */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Tech Stack & Engine Detection</h3>
                    <p className="text-gray-400 text-sm">Game engine analysis, SDK integration patterns, and backend infrastructure insights</p>
                </div>
                <TechStackDetection techStackData={techStackData} />
            </div>
        </div>
    );
};

export default MarketCompare;

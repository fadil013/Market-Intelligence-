import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Video, Users, Film, Image, DollarSign, TrendingUp, Zap, Globe } from 'lucide-react';

const CreativeIntelligence = ({ marketingData }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [viewMode, setViewMode] = useState('creative'); // creative | networks | cpi | growth

    const COLORS = {
        playable: '#10b981',
        ugc: '#3b82f6',
        video: '#8b5cf6',
        static: '#f59e0b',
        fake: '#ec4899',
        meta: '#1877f2',
        google: '#ea4335',
        unity: '#000000',
        ironSource: '#ff6b35',
        appLovin: '#0066ff',
        tiktok: '#fe2c55',
        viral: '#10b981',
        paid: '#f59e0b'
    };

    // Calculate average metrics
    const avgCPI = (marketingData.reduce((acc, game) => acc + parseFloat(game.cpiData.global.replace('$', '')), 0) / marketingData.length).toFixed(2);
    const avgViralPercent = (marketingData.reduce((acc, game) => acc + game.growthType.viral, 0) / marketingData.length).toFixed(1);
    const avgKFactor = (marketingData.reduce((acc, game) => acc + game.growthType.kFactor, 0) / marketingData.length).toFixed(2);
    const totalAdSpend = marketingData.reduce((acc, game) => {
        const spend = game.topAdNetworks.reduce((sum, network) => sum + parseFloat(network.spend.replace('$', '').replace('M', '').replace('K', '')), 0);
        return acc + spend;
    }, 0).toFixed(1);

    // Get creative type effectiveness data
    const getCreativeTypesData = () => {
        const types = ['playable', 'ugc', 'video', 'static', 'fake'];
        return types.map(type => {
            const games = marketingData.filter(game => game.adCreativeBreakdown[type]);
            const avgUsage = games.length > 0 
                ? games.reduce((acc, game) => acc + parseFloat(game.adCreativeBreakdown[type].usage.replace('%', '')), 0) / games.length 
                : 0;
            const effectiveness = games.length > 0
                ? games.filter(game => game.adCreativeBreakdown[type].effectiveness === 'high').length / games.length * 100
                : 0;
            
            return {
                type: type.charAt(0).toUpperCase() + type.slice(1),
                usage: avgUsage.toFixed(1),
                effectiveness: effectiveness.toFixed(0),
                games: games.length
            };
        });
    };

    // Get top ad networks data
    const getTopNetworksData = () => {
        const networks = {};
        marketingData.forEach(game => {
            game.topAdNetworks.forEach(network => {
                if (!networks[network.network]) {
                    networks[network.network] = {
                        network: network.network,
                        totalSpend: 0,
                        totalInstalls: 0,
                        games: 0
                    };
                }
                networks[network.network].totalSpend += parseFloat(network.spend.replace('$', '').replace('M', '').replace('K', ''));
                networks[network.network].totalInstalls += parseFloat(network.installs.replace('K', '').replace('M', ''));
                networks[network.network].games += 1;
            });
        });

        return Object.values(networks)
            .sort((a, b) => b.totalSpend - a.totalSpend)
            .slice(0, 6)
            .map(network => ({
                ...network,
                avgCPI: (network.totalSpend * 1000000 / network.totalInstalls / 1000).toFixed(2)
            }));
    };

    // Get CPI by country data
    const getCPIByCountryData = () => {
        const countries = ['USA', 'UK', 'Japan', 'China', 'India', 'Brazil', 'Germany', 'South Korea'];
        return countries.map(country => {
            const cpis = marketingData
                .map(game => game.cpiData.byCountry[country])
                .filter(Boolean)
                .map(cpi => parseFloat(cpi.replace('$', '')));
            
            const avgCPI = cpis.length > 0 
                ? cpis.reduce((acc, cpi) => acc + cpi, 0) / cpis.length 
                : 0;
            
            return {
                country,
                cpi: parseFloat(avgCPI.toFixed(2))
            };
        }).sort((a, b) => b.cpi - a.cpi);
    };

    // Get viral vs paid growth data
    const getViralVsPaidData = () => {
        return marketingData.map(game => ({
            name: game.gameName,
            viral: game.growthType.viral,
            paid: game.growthType.paid,
            kFactor: game.growthType.kFactor
        })).sort((a, b) => b.viral - a.viral);
    };

    const creativeTypesData = getCreativeTypesData();
    const topNetworksData = getTopNetworksData();
    const cpiByCountryData = getCPIByCountryData();
    const viralVsPaidData = getViralVsPaidData();

    const getEffectivenessColor = (effectiveness) => {
        if (effectiveness >= 70) return 'text-green-400';
        if (effectiveness >= 40) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getKFactorColor = (kFactor) => {
        if (kFactor >= 1.5) return 'text-green-400';
        if (kFactor >= 1.0) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getCPITier = (cpi) => {
        if (cpi >= 5) return { label: 'Premium', color: 'text-purple-400' };
        if (cpi >= 2) return { label: 'High', color: 'text-blue-400' };
        if (cpi >= 1) return { label: 'Medium', color: 'text-yellow-400' };
        return { label: 'Low', color: 'text-green-400' };
    };

    return (
        <div className="space-y-6">
            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Avg CPI</p>
                            <p className="text-2xl font-bold text-white">${avgCPI}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Viral Growth</p>
                            <p className="text-2xl font-bold text-white">{avgViralPercent}%</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Avg K-Factor</p>
                            <p className="text-2xl font-bold text-white">{avgKFactor}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Globe className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Total Ad Spend</p>
                            <p className="text-2xl font-bold text-white">${totalAdSpend}M</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Mode Switcher */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                    { mode: 'creative', label: 'Ad Creatives', Icon: Film, activeColor: '#7c3aed' },
                    { mode: 'networks', label: 'Ad Networks', Icon: Users, activeColor: '#2563eb' },
                    { mode: 'cpi', label: 'CPI Analysis', Icon: DollarSign, activeColor: '#059669' },
                    { mode: 'growth', label: 'Growth Type', Icon: TrendingUp, activeColor: '#ea580c' },
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

            {/* Ad Creatives View */}
            {viewMode === 'creative' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Creative Types Chart */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Ad Creative Performance</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={creativeTypesData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="type" stroke="#94a3b8" fontSize={12} />
                                        <YAxis stroke="#94a3b8" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(30,41,59,0.95)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="usage" name="Usage %" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="effectiveness" name="Effectiveness %" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Creative Type Cards */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Creative Type Breakdown</h3>
                            <div className="space-y-3">
                                {creativeTypesData.map((creative, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                                    {creative.type === 'Playable' && <Video className="w-5 h-5 text-purple-400" />}
                                                    {creative.type === 'Ugc' && <Users className="w-5 h-5 text-blue-400" />}
                                                    {creative.type === 'Video' && <Film className="w-5 h-5 text-green-400" />}
                                                    {creative.type === 'Static' && <Image className="w-5 h-5 text-yellow-400" />}
                                                    {creative.type === 'Fake' && <Zap className="w-5 h-5 text-pink-400" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">{creative.type}</h4>
                                                    <p className="text-gray-400 text-sm">{creative.games} games</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold">{creative.usage}%</p>
                                                <p className={`text-sm font-medium ${getEffectivenessColor(creative.effectiveness)}`}>
                                                    {creative.effectiveness}% effective
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ad Networks View */}
            {viewMode === 'networks' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Network Spend Chart */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Ad Network Spend Distribution</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={topNetworksData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => `${entry.network}: $${entry.totalSpend.toFixed(1)}M`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="totalSpend"
                                        >
                                            {topNetworksData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index + 5]} />
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

                        {/* Network Cards */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Top Ad Networks</h3>
                            <div className="space-y-3">
                                {topNetworksData.map((network, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="text-white font-medium">{network.network}</h4>
                                                <p className="text-gray-400 text-sm">{network.games} games</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold">${network.totalSpend.toFixed(1)}M</p>
                                                <p className="text-gray-400 text-sm">Avg CPI: ${network.avgCPI}</p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                                style={{ width: `${(network.totalSpend / topNetworksData[0].totalSpend) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CPI Analysis View */}
            {viewMode === 'cpi' && (
                <div className="space-y-6">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4">CPI by Country</h3>
                        <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cpiByCountryData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                                    <YAxis dataKey="country" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(30,41,59,0.95)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value) => [`$${value}`, 'CPI']}
                                    />
                                    <Bar dataKey="cpi" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* CPI Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-panel p-4">
                            <h4 className="text-gray-400 text-sm mb-2">Most Expensive</h4>
                            <p className="text-2xl font-bold text-white">{cpiByCountryData[0]?.country}</p>
                            <p className="text-purple-400 font-medium">${cpiByCountryData[0]?.cpi} CPI</p>
                        </div>
                        <div className="glass-panel p-4">
                            <h4 className="text-gray-400 text-sm mb-2">Most Affordable</h4>
                            <p className="text-2xl font-bold text-white">{cpiByCountryData[cpiByCountryData.length - 1]?.country}</p>
                            <p className="text-green-400 font-medium">${cpiByCountryData[cpiByCountryData.length - 1]?.cpi} CPI</p>
                        </div>
                        <div className="glass-panel p-4">
                            <h4 className="text-gray-400 text-sm mb-2">CPI Range</h4>
                            <p className="text-2xl font-bold text-white">
                                ${cpiByCountryData[cpiByCountryData.length - 1]?.cpi} - ${cpiByCountryData[0]?.cpi}
                            </p>
                            <p className="text-blue-400 font-medium">
                                {((cpiByCountryData[0]?.cpi / cpiByCountryData[cpiByCountryData.length - 1]?.cpi) * 100).toFixed(0)}% variance
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Growth Type View */}
            {viewMode === 'growth' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Growth Type Chart */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Viral vs Paid Growth</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={viralVsPaidData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} angle={-45} textAnchor="end" height={100} />
                                        <YAxis stroke="#94a3b8" fontSize={12} />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(30,41,59,0.95)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="viral" name="Viral %" fill={COLORS.viral} radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="paid" name="Paid %" fill={COLORS.paid} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* K-Factor Rankings */}
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">K-Factor Rankings</h3>
                            <p className="text-gray-400 text-sm mb-4">Virality coefficient (K&gt;1 = exponential growth)</p>
                            <div className="space-y-3">
                                {viralVsPaidData
                                    .sort((a, b) => b.kFactor - a.kFactor)
                                    .slice(0, 8)
                                    .map((game, index) => (
                                        <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <h4 className="text-white font-medium">{game.name}</h4>
                                                    <p className="text-gray-400 text-sm">
                                                        {game.viral}% viral • {game.paid}% paid
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-2xl font-bold ${getKFactorColor(game.kFactor)}`}>
                                                        {game.kFactor}
                                                    </p>
                                                    <p className="text-gray-400 text-sm">K-Factor</p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full"
                                                    style={{ width: `${(game.kFactor / 2.5) * 100}%` }}
                                                />
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
                    <div className="glass-panel p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-white mb-4">{selectedGame.gameName}</h3>
                        
                        {/* Creative Breakdown */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Ad Creative Breakdown</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(selectedGame.adCreativeBreakdown).map(([type, data]) => (
                                    <div key={type} className="p-3 rounded-lg bg-gray-800/50">
                                        <p className="text-gray-400 text-sm capitalize">{type}</p>
                                        <p className="text-white font-bold">{data.usage}</p>
                                        <p className={`text-sm ${data.effectiveness === 'high' ? 'text-green-400' : data.effectiveness === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {data.effectiveness} effectiveness
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ad Networks */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Top Ad Networks</h4>
                            <div className="space-y-2">
                                {selectedGame.topAdNetworks.map((network, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-gray-800/50 flex justify-between items-center">
                                        <div>
                                            <p className="text-white font-medium">{network.network}</p>
                                            <p className="text-gray-400 text-sm">{network.installs} installs</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold">{network.spend}</p>
                                            <p className="text-gray-400 text-sm">{network.cpi} CPI</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Growth Type */}
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Growth Analysis</h4>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg bg-green-500/20">
                                    <p className="text-gray-400 text-sm">Viral</p>
                                    <p className="text-white text-xl font-bold">{selectedGame.growthType.viral}%</p>
                                </div>
                                <div className="p-3 rounded-lg bg-yellow-500/20">
                                    <p className="text-gray-400 text-sm">Paid</p>
                                    <p className="text-white text-xl font-bold">{selectedGame.growthType.paid}%</p>
                                </div>
                                <div className="p-3 rounded-lg bg-purple-500/20">
                                    <p className="text-gray-400 text-sm">K-Factor</p>
                                    <p className="text-white text-xl font-bold">{selectedGame.growthType.kFactor}</p>
                                </div>
                            </div>
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

export default CreativeIntelligence;

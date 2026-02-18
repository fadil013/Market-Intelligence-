import React, { useState } from 'react';
import { 
    Building2,
    TrendingUp,
    DollarSign,
    Target,
    AlertTriangle,
    ChevronRight,
    Rocket,
    Award,
    PieChart as PieChartIcon,
    Activity,
    Star,
    Clock,
    Users
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const PublisherTracking = ({ publisherData }) => {
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [viewMode, setViewMode] = useState('overview'); // overview, marketshare, acquisitions, timeline
    const [sortBy, setSortBy] = useState('revenue'); // revenue, marketShare, hitRate, gameCount

    const getAcquisitionColor = (risk) => {
        switch(risk) {
            case 'high': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
            case 'medium': return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' };
            case 'low': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
            default: return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30' };
        }
    };

    const getAcquisitionIcon = (risk) => {
        switch(risk) {
            case 'high': return <AlertTriangle className="w-4 h-4" />;
            case 'medium': return <Activity className="w-4 h-4" />;
            case 'low': return <Target className="w-4 h-4" />;
            default: return <Award className="w-4 h-4" />;
        }
    };

    // Sort publishers
    const sortedPublishers = [...publisherData].sort((a, b) => {
        if (sortBy === 'revenue') {
            const aRevenue = parseFloat(a.metrics.totalRevenue.replace(/[^0-9.]/g, ''));
            const bRevenue = parseFloat(b.metrics.totalRevenue.replace(/[^0-9.]/g, ''));
            return bRevenue - aRevenue;
        }
        if (sortBy === 'marketShare') {
            const aShare = parseFloat(a.metrics.marketShare.replace('%', ''));
            const bShare = parseFloat(b.metrics.marketShare.replace('%', ''));
            return bShare - aShare;
        }
        if (sortBy === 'hitRate') {
            const aRate = parseFloat(a.metrics.hitRate.replace('%', ''));
            const bRate = parseFloat(b.metrics.hitRate.replace('%', ''));
            return bRate - aRate;
        }
        if (sortBy === 'gameCount') return b.metrics.gameCount - a.metrics.gameCount;
        return 0;
    });

    // Calculate summary stats
    const totalPublishers = publisherData.length;
    const highAcquisitionRisk = publisherData.filter(p => p.metrics.acquisitionRisk === 'high').length;
    const avgMarketShare = (publisherData.reduce((acc, p) => acc + parseFloat(p.metrics.marketShare.replace('%', '')), 0) / totalPublishers).toFixed(1);
    const avgHitRate = (publisherData.reduce((acc, p) => acc + parseFloat(p.metrics.hitRate.replace('%', '')), 0) / totalPublishers).toFixed(1);

    // Prepare market share pie chart data
    const marketShareData = sortedPublishers.slice(0, 8).map(pub => ({
        name: pub.publisher,
        value: parseFloat(pub.metrics.marketShare.replace('%', '')),
        revenue: pub.metrics.totalRevenue
    }));
    marketShareData.push({
        name: 'Others',
        value: 100 - marketShareData.reduce((acc, d) => acc + d.value, 0),
        revenue: 'Various'
    });

    const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#8b5cf6', '#64748b'];

    // Prepare hit rate comparison data
    const hitRateData = sortedPublishers.slice(0, 10).map(pub => ({
        name: pub.publisher.length > 15 ? pub.publisher.substring(0, 15) + '...' : pub.publisher,
        fullName: pub.publisher,
        hitRate: parseFloat(pub.metrics.hitRate.replace('%', ''))
    }));

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Tracked Publishers</p>
                            <p className="text-3xl font-bold text-purple-400 mt-1">{totalPublishers}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <Building2 className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Active in market</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Acquisition Targets</p>
                            <p className="text-3xl font-bold text-red-400 mt-1">{highAcquisitionRisk}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">High M&A likelihood</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Market Share</p>
                            <p className="text-3xl font-bold text-blue-400 mt-1">{avgMarketShare}%</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10">
                            <PieChartIcon className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Per publisher</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Hit Rate</p>
                            <p className="text-3xl font-bold text-green-400 mt-1">{avgHitRate}%</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10">
                            <Star className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Games in Top 100</p>
                </div>
            </div>

            {/* View Mode Switcher */}
            <div className="glass-panel p-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex gap-2 flex-1">
                        {['overview', 'marketshare', 'acquisitions', 'timeline'].map(mode => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    viewMode === mode
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : 'bg-slate-700/50 text-gray-400 border border-slate-600/30 hover:bg-slate-600/50'
                                }`}
                            >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                    </div>
                    {viewMode === 'overview' && (
                        <div className="md:w-48">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                            >
                                <option value="revenue">Sort by Revenue</option>
                                <option value="marketShare">Sort by Market Share</option>
                                <option value="hitRate">Sort by Hit Rate</option>
                                <option value="gameCount">Sort by Game Count</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* Overview Mode - Publisher Leaderboard */}
            {viewMode === 'overview' && (
                <div className="space-y-3">
                    {sortedPublishers.map((pub, index) => {
                        const acquisitionColors = getAcquisitionColor(pub.metrics.acquisitionRisk);
                        const AcquisitionIcon = getAcquisitionIcon(pub.metrics.acquisitionRisk);
                        
                        return (
                            <div
                                key={index}
                                className="glass-panel p-5 hover:scale-[1.01] transition-transform cursor-pointer border-l-4 border-purple-500/30"
                                onClick={() => setSelectedPublisher(pub)}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    {/* Rank & Publisher Info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="text-2xl font-bold text-purple-400 w-10">
                                            #{index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-white font-bold text-lg">{pub.publisher}</h3>
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${acquisitionColors.bg} ${acquisitionColors.text} border ${acquisitionColors.border} flex items-center gap-1`}>
                                                    {AcquisitionIcon}
                                                    {pub.metrics.acquisitionRisk.toUpperCase()} M&A Risk
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-gray-400">
                                                    <span className="text-gray-500">Specialization:</span> {pub.specialization.genres.join(', ')}
                                                </span>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-gray-400">
                                                    <span className="text-gray-500">Style:</span> {pub.specialization.style}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="grid grid-cols-4 gap-6">
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-1">Revenue</p>
                                            <p className="text-lg font-bold text-green-400">{pub.metrics.totalRevenue}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-1">Market Share</p>
                                            <p className="text-lg font-bold text-blue-400">{pub.metrics.marketShare}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-1">Hit Rate</p>
                                            <p className="text-lg font-bold text-purple-400">{pub.metrics.hitRate}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-500 mb-1">Games</p>
                                            <p className="text-lg font-bold text-orange-400">{pub.metrics.gameCount}</p>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                </div>

                                {/* Next Launch Prediction */}
                                {pub.nextLaunchPrediction && (
                                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Rocket className="w-4 h-4 text-yellow-400" />
                                                <span className="text-sm font-semibold text-yellow-400">Next Launch Prediction:</span>
                                                <span className="text-sm text-white">{pub.nextLaunchPrediction.genre}</span>
                                                <span className="text-xs text-gray-500">• {pub.nextLaunchPrediction.timing}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                pub.nextLaunchPrediction.confidence === 'high' 
                                                    ? 'bg-green-500/20 text-green-400' 
                                                    : pub.nextLaunchPrediction.confidence === 'medium'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                                {pub.nextLaunchPrediction.confidence.toUpperCase()} Confidence
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Market Share Mode */}
            {viewMode === 'marketshare' && (
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-purple-400" />
                        Revenue Market Share Distribution
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Pie Chart */}
                        <div>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data={marketShareData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({name, value}) => `${name}: ${value.toFixed(1)}%`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {marketShareData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value, name, props) => [
                                            `${value.toFixed(1)}% (${props.payload.revenue})`,
                                            props.payload.name
                                        ]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend with Details */}
                        <div className="space-y-2">
                            <h4 className="text-white font-semibold mb-3">Top Publishers Breakdown</h4>
                            {marketShareData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div 
                                            className="w-4 h-4 rounded"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-white font-medium">{item.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-purple-400 font-bold">{item.value.toFixed(1)}%</p>
                                        <p className="text-xs text-gray-500">{item.revenue}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <p className="text-xs text-gray-400">
                                    <strong className="text-blue-400">Market Concentration:</strong> Top 5 publishers control {
                                        marketShareData.slice(0, 5).reduce((acc, d) => acc + d.value, 0).toFixed(1)
                                    }% of the market. High concentration indicates mature market with established leaders.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hit Rate Comparison Chart */}
                    <div className="mt-8">
                        <h4 className="text-white font-semibold mb-4">Publisher Success Rate (Hit Rate %)</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={hitRateData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#94a3b8" 
                                    fontSize={12}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px'
                                    }}
                                    formatter={(value, name, props) => [`${value}%`, props.payload.fullName]}
                                />
                                <Bar dataKey="hitRate" name="Hit Rate">
                                    {hitRateData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.hitRate > 60 ? '#10b981' : entry.hitRate > 40 ? '#8b5cf6' : '#3b82f6'}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Acquisitions Watch List Mode */}
            {viewMode === 'acquisitions' && (
                <div className="space-y-4">
                    <div className="glass-panel p-6 border-l-4 border-red-500">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            High M&A Likelihood Studios
                        </h3>
                        <div className="space-y-3">
                            {sortedPublishers.filter(p => p.metrics.acquisitionRisk === 'high').map((pub, index) => {
                                const hitRate = parseFloat(pub.metrics.hitRate.replace('%', ''));
                                const avgRevenue = pub.metrics.avgGameRevenue;
                                
                                return (
                                    <div key={index} className="bg-red-500/5 p-4 rounded-lg border border-red-500/20">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{pub.publisher}</h4>
                                                <p className="text-gray-400 text-sm">
                                                    {pub.specialization.genres.join(' + ')} • {pub.specialization.style}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30">
                                                ACQUISITION TARGET
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-4 gap-4 mb-3">
                                            <div className="bg-slate-800/50 p-3 rounded">
                                                <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                                                <p className="text-green-400 font-bold">{pub.metrics.totalRevenue}</p>
                                            </div>
                                            <div className="bg-slate-800/50 p-3 rounded">
                                                <p className="text-xs text-gray-500 mb-1">Hit Rate</p>
                                                <p className="text-purple-400 font-bold">{pub.metrics.hitRate}</p>
                                            </div>
                                            <div className="bg-slate-800/50 p-3 rounded">
                                                <p className="text-xs text-gray-500 mb-1">Avg/Game</p>
                                                <p className="text-blue-400 font-bold">{avgRevenue}</p>
                                            </div>
                                            <div className="bg-slate-800/50 p-3 rounded">
                                                <p className="text-xs text-gray-500 mb-1">Portfolio</p>
                                                <p className="text-orange-400 font-bold">{pub.metrics.gameCount} games</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 text-xs text-gray-400">
                                            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 min-w-[16px]" />
                                            <p>
                                                <strong className="text-red-400">Why High Risk:</strong> {
                                                    hitRate > 50 
                                                        ? `Consistent hit portfolio (${pub.metrics.hitRate} success rate) makes them attractive`
                                                        : `Growing revenue (${pub.metrics.totalRevenue}) with established presence`
                                                }. {pub.metrics.gameCount < 15 ? 'Small team size increases acquisition appeal.' : 'Mid-size studio with proven track record.'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Medium Risk Watchlist */}
                    <div className="glass-panel p-6 border-l-4 border-yellow-500">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-yellow-400" />
                            Medium Risk Watchlist
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sortedPublishers.filter(p => p.metrics.acquisitionRisk === 'medium').map((pub, index) => (
                                <div key={index} className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/20">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-white font-bold">{pub.publisher}</h4>
                                        <span className="text-yellow-400 font-bold text-sm">{pub.metrics.totalRevenue}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span>Hit Rate: <span className="text-purple-400">{pub.metrics.hitRate}</span></span>
                                        <span>•</span>
                                        <span>Games: <span className="text-orange-400">{pub.metrics.gameCount}</span></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Timeline Mode */}
            {viewMode === 'timeline' && (
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        Predicted Launch Timeline (Next 6 Months)
                    </h3>
                    <div className="space-y-4">
                        {sortedPublishers
                            .filter(p => p.nextLaunchPrediction)
                            .sort((a, b) => {
                                const quarterOrder = { 'Q1 2026': 1, 'Q2 2026': 2, 'Q3 2026': 3, 'Q4 2026': 4 };
                                return quarterOrder[a.nextLaunchPrediction.timing] - quarterOrder[b.nextLaunchPrediction.timing];
                            })
                            .map((pub, index) => {
                                const pred = pub.nextLaunchPrediction;
                                const confidenceColor = pred.confidence === 'high' 
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                    : pred.confidence === 'medium'
                                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                    : 'bg-gray-500/10 text-gray-400 border-gray-500/20';
                                
                                return (
                                    <div key={index} className="relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-700/50" />
                                        <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full bg-purple-500" />
                                        
                                        <div className="ml-8 glass-panel p-4 border-l-4 border-purple-500/30 hover:scale-[1.01] transition-transform">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <h4 className="text-white font-bold text-lg">{pub.publisher}</h4>
                                                    <p className="text-sm text-gray-500">{pred.timing}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded text-xs font-semibold border ${confidenceColor}`}>
                                                    {pred.confidence.toUpperCase()} Confidence
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Rocket className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-white font-semibold">{pred.genre}</span>
                                                </div>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-gray-400 text-sm">{pub.specialization.monetization} model</span>
                                                <span className="text-gray-600">•</span>
                                                <span className="text-gray-400 text-sm">{pub.specialization.style}</span>
                                            </div>
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

export default PublisherTracking;

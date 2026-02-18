import React, { useState } from 'react';
import { 
    Sparkles, 
    TrendingUp,
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle,
    Filter,
    Star,
    Target,
    Zap,
    ChevronRight,
    Activity
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AIOpportunityEngine = ({ opportunityData }) => {
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [sortBy, setSortBy] = useState('demandScore'); // demandScore, revenue, saturation

    const priorityLevels = ['all', 'HIGH PRIORITY', 'MEDIUM PRIORITY', 'LOW PRIORITY', 'WATCH'];

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'HIGH PRIORITY': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle };
            case 'MEDIUM PRIORITY': return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: AlertCircle };
            case 'LOW PRIORITY': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: Activity };
            case 'WATCH': return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', icon: Clock };
            default: return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', icon: Star };
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        if (score >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'bg-green-500/20';
        if (score >= 60) return 'bg-yellow-500/20';
        if (score >= 40) return 'bg-orange-500/20';
        return 'bg-red-500/20';
    };

    // Filter and sort opportunities
    const filteredOpportunities = opportunityData
        .filter(opp => selectedPriority === 'all' || opp.recommendation === selectedPriority)
        .sort((a, b) => {
            if (sortBy === 'demandScore') return b.demandScore - a.demandScore;
            if (sortBy === 'revenue') {
                const aRevenue = parseInt(a.revenuePotential.replace(/[^0-9]/g, ''));
                const bRevenue = parseInt(b.revenuePotential.replace(/[^0-9]/g, ''));
                return bRevenue - aRevenue;
            }
            if (sortBy === 'saturation') {
                const aSaturation = parseInt(a.timeToSaturation.split('-')[0]);
                const bSaturation = parseInt(b.timeToSaturation.split('-')[0]);
                return bSaturation - aSaturation;
            }
            return 0;
        });

    // Calculate summary stats
    const highPriorityCount = opportunityData.filter(o => o.recommendation === 'HIGH PRIORITY').length;
    const mediumPriorityCount = opportunityData.filter(o => o.recommendation === 'MEDIUM PRIORITY').length;
    const avgDemandScore = Math.round(opportunityData.reduce((acc, o) => acc + o.demandScore, 0) / opportunityData.length);
    const avgCompetitionScore = Math.round(opportunityData.reduce((acc, o) => acc + o.competitionScore, 0) / opportunityData.length);

    // Prepare matrix data for scatter chart
    const matrixData = opportunityData.map(opp => ({
        name: opp.niche,
        demand: opp.demandScore,
        competition: opp.competitionScore,
        revenue: opp.revenuePotential,
        priority: opp.recommendation,
        size: opp.demandScore // Bubble size based on demand
    }));

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">High Priority</p>
                            <p className="text-3xl font-bold text-green-400 mt-1">{highPriorityCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Immediate opportunities</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Medium Priority</p>
                            <p className="text-3xl font-bold text-yellow-400 mt-1">{mediumPriorityCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10">
                            <AlertCircle className="w-6 h-6 text-yellow-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Consider timing</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Demand Score</p>
                            <p className="text-3xl font-bold text-purple-400 mt-1">{avgDemandScore}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Market interest level</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Competition</p>
                            <p className="text-3xl font-bold text-blue-400 mt-1">{avgCompetitionScore}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Lower is better</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-panel p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Priority Level
                        </label>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            {priorityLevels.map(level => (
                                <option key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            <option value="demandScore">Demand Score (High to Low)</option>
                            <option value="revenue">Revenue Potential</option>
                            <option value="saturation">Time to Saturation</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Demand vs Competition Matrix */}
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Demand vs Competition Matrix
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis 
                            type="number" 
                            dataKey="competition" 
                            name="Competition" 
                            stroke="#94a3b8"
                            label={{ value: 'Competition Score (Lower = Better)', position: 'bottom', fill: '#94a3b8' }}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="demand" 
                            name="Demand" 
                            stroke="#94a3b8"
                            label={{ value: 'Demand Score', angle: -90, position: 'left', fill: '#94a3b8' }}
                        />
                        <ZAxis type="number" dataKey="size" range={[100, 400]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px'
                            }}
                            formatter={(value, name) => [value, name === 'demand' ? 'Demand' : name === 'competition' ? 'Competition' : name]}
                            labelFormatter={(label, payload) => {
                                if (payload && payload[0]) {
                                    return `${payload[0].payload.name}`;
                                }
                                return label;
                            }}
                        />
                        <Scatter name="Opportunities" data={matrixData}>
                            {matrixData.map((entry, index) => {
                                let color = '#3b82f6'; // default blue
                                if (entry.priority === 'HIGH PRIORITY') color = '#10b981'; // green
                                else if (entry.priority === 'MEDIUM PRIORITY') color = '#f59e0b'; // yellow
                                else if (entry.priority === 'LOW PRIORITY') color = '#6366f1'; // indigo
                                else if (entry.priority === 'WATCH') color = '#64748b'; // gray
                                return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Matrix Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500" />
                        <span className="text-xs text-gray-400">High Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                        <span className="text-xs text-gray-400">Medium Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-500" />
                        <span className="text-xs text-gray-400">Low Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500" />
                        <span className="text-xs text-gray-400">Watch</span>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-gray-400">
                        <strong className="text-blue-400">Sweet Spot:</strong> Top-left quadrant (High Demand + Low Competition). 
                        Bubble size indicates demand strength. Avoid bottom-right (low demand + high competition).
                    </p>
                </div>
            </div>

            {/* Opportunity Cards */}
            <div className="grid grid-cols-1 gap-4">
                {filteredOpportunities.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">No Opportunities Found</h3>
                        <p className="text-gray-400 text-sm">
                            No opportunities match your selected filters. Try adjusting the priority level.
                        </p>
                    </div>
                ) : (
                    filteredOpportunities.map((opp, index) => {
                        const priorityColors = getPriorityColor(opp.recommendation);
                        const PriorityIcon = priorityColors.icon;
                        
                        return (
                            <div 
                                key={index}
                                className={`glass-panel p-6 border-l-4 ${priorityColors.border} hover:scale-[1.01] transition-transform`}
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Left: Niche Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${priorityColors.bg} ${priorityColors.text} border ${priorityColors.border}`}>
                                                        {opp.recommendation}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-1">{opp.niche}</h3>
                                                <p className="text-gray-500 text-sm">Market Opportunity Analysis</p>
                                            </div>
                                        </div>

                                        {/* Reasoning */}
                                        <div className="space-y-2 mb-4">
                                            <p className="text-gray-400 text-sm font-semibold">Why This Opportunity:</p>
                                            {opp.reasoning.map((reason, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 min-w-[16px]" />
                                                    <p className="text-gray-300 text-sm">{reason}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Comparable Games */}
                                        {opp.comparableGames && opp.comparableGames.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-gray-400 text-sm font-semibold mb-2">Comparable Success Stories:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {opp.comparableGames.map((game, idx) => (
                                                        <span key={idx} className="px-3 py-1 rounded bg-slate-800/50 text-gray-300 text-xs">
                                                            {game}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Suggested Mechanics */}
                                        {opp.suggestedMechanics && opp.suggestedMechanics.length > 0 && (
                                            <div>
                                                <p className="text-gray-400 text-sm font-semibold mb-2">Recommended Mechanics:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {opp.suggestedMechanics.map((mechanic, idx) => (
                                                        <span key={idx} className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">
                                                            {mechanic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Metrics */}
                                    <div className="lg:w-80 space-y-4">
                                        {/* Demand Score */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 text-sm">Demand Score</span>
                                                <span className={`text-xl font-bold ${getScoreColor(opp.demandScore)}`}>
                                                    {opp.demandScore}/100
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${getScoreBg(opp.demandScore)}`}
                                                    style={{ width: `${opp.demandScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Competition Score */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 text-sm">Competition (Lower = Better)</span>
                                                <span className={`text-xl font-bold ${getScoreColor(100 - opp.competitionScore)}`}>
                                                    {opp.competitionScore}/100
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${getScoreBg(100 - opp.competitionScore)}`}
                                                    style={{ width: `${opp.competitionScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Revenue Potential */}
                                        <div className="glass-panel p-3 bg-green-500/5 border border-green-500/20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4 text-green-400" />
                                                    <span className="text-gray-400 text-sm">Revenue Potential</span>
                                                </div>
                                                <span className="text-green-400 font-bold">{opp.revenuePotential}</span>
                                            </div>
                                        </div>

                                        {/* Time to Saturation */}
                                        <div className="glass-panel p-3 bg-blue-500/5 border border-blue-500/20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                    <span className="text-gray-400 text-sm">Window Closes In</span>
                                                </div>
                                                <span className="text-blue-400 font-bold">{opp.timeToSaturation}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="w-full px-4 py-3 rounded-lg bg-purple-500/20 text-purple-400 font-semibold hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            Generate Full Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AIOpportunityEngine;

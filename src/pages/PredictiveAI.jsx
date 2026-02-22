import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Area,
    ComposedChart,
} from 'recharts';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import { predictiveData, betaGamesData, forecastData } from '../data/mockData';
import BetaLaunchMonitoring from '../components/BetaLaunchMonitoring';
import TrendForecastScore from '../components/TrendForecastScore';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-4 !bg-slate-800/95 border border-white/10">
                <p className="text-white font-semibold mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value ? `$${entry.value}M` : 'N/A'}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const PredictiveAI = () => {
    const predictions = [
        {
            metric: 'Total Downloads',
            current: '458M',
            predicted: '512M',
            change: '+11.8%',
            confidence: 89,
        },
        {
            metric: 'Market Revenue',
            current: '$2.8B',
            predicted: '$3.2B',
            change: '+14.3%',
            confidence: 85,
        },
        {
            metric: 'Active Users',
            current: '125M',
            predicted: '142M',
            change: '+13.6%',
            confidence: 91,
        },
    ];


    return (
        <div className="space-y-8">
            {/* Trend Forecast Score - Phase 17 MASTER FEATURE */}
            <div className="glass-panel p-6">
                <TrendForecastScore forecastData={forecastData} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Brain className="text-purple-500" />
                        Predictive Analytics
                    </h1>
                    <p className="text-gray-400 mt-1">3-Month Forecast based on historical performance</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Calendar size={16} className="text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">Feb 2026 → May 2026</span>
                </div>
            </div>

            {/* Prediction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {predictions.map((pred, index) => (
                    <div key={index} className="glass-panel p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 bg-purple-500" />
                        <div className="relative z-10">
                            <h4 className="text-gray-400 text-sm font-medium mb-3">{pred.metric}</h4>
                            <div className="flex items-end gap-3 mb-3">
                                <span className="text-gray-500 text-lg">{pred.current}</span>
                                <TrendingUp className="text-emerald-400" size={20} />
                                <span className="text-3xl font-bold text-white">{pred.predicted}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-emerald-400 font-semibold">{pred.change}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                            style={{ width: `${pred.confidence}%` }}
                                        />
                                    </div>
                                    <span className="text-gray-400 text-xs">{pred.confidence}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Forecast Chart */}
            <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Revenue Forecast</h3>
                        <p className="text-gray-400 text-sm">Actual vs Predicted (in millions USD)</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500" />
                            <span className="text-sm text-gray-400">Forecast</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <span className="text-sm text-gray-400">Actual</span>
                        </div>
                    </div>
                </div>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={predictiveData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="month"
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
                                tickFormatter={(value) => `$${value}M`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine x="Feb" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                            <Area
                                type="monotone"
                                dataKey="forecast"
                                fill="url(#forecastGradient)"
                                stroke="none"
                            />
                            <Line
                                type="monotone"
                                dataKey="actual"
                                name="Actual"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', strokeWidth: 2 }}
                                connectNulls={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="forecast"
                                name="Forecast"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Future Winners requested by TL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="text-emerald-400" />
                        Predicted Category Boost (Next 5 Months)
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Hypercasual 2.0', boost: 45, color: '#ec4899', icon: '⚡' },
                            { name: 'Cross-Platform RPG', boost: 32, color: '#8b5cf6', icon: '⚔️' },
                            { name: 'AI-Integrated Sandbox', boost: 28, color: '#06b6d4', icon: '✨' },
                            { name: 'Social Party Games', boost: 15, color: '#f59e0b', icon: '🥳' },
                        ].map((cat, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{cat.icon}</span>
                                    <span className="text-white font-semibold">{cat.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-emerald-400 font-black">+{cat.boost}%</span>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Growth Signal</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="text-emerald-400" />
                        High-Confidence Game Forecast
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Honkai: Star Rail', signal: 'Strong Buy', gain: '+42%', color: '#6366f1' },
                            { name: 'Monopoly GO!', signal: 'Accumulate', gain: '+25%', color: '#10b981' },
                            { name: 'Royal Match', signal: 'Hold/Peak', gain: '+10%', color: '#f59e0b' },
                            { name: 'Whiteout Survival', signal: 'Breakout', gain: '+38%', color: '#3b82f6' },
                        ].map((game, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all cursor-crosshair">
                                <div>
                                    <span className="text-white font-bold">{game.name}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400 font-bold uppercase">{game.signal}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-emerald-400 font-black text-lg">{game.gain}</span>
                                    <div className="w-16 h-1 bg-white/10 rounded-full mt-1">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Beta / Soft Launch Monitoring - Phase 16 */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        🚀 Beta / Soft Launch Monitoring
                    </h3>
                    <p className="text-gray-400">Pre-global launch intelligence, retention analysis, and success predictions</p>
                </div>
                <BetaLaunchMonitoring betaGamesData={betaGamesData} />
            </div>

            {/* Simplified Prediction View - TL Request */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">đź"Š Quick Forecast Summary</h3>
                    <p className="text-gray-400 text-sm">One glance = full understanding</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {forecastData.slice(0, 6).map((game, index) => {
                        const getStatusIcon = (trend) => {
                            if (trend === 'up') return '📈';
                            if (trend === 'stable') return '☑️';
                            return '⚠️';
                        };

                        const getOutlook = (confidence, score) => {
                            if (confidence === 'high' && score >= 70) return 'High';
                            if (confidence === 'medium' || (score >= 50 && score < 70)) return 'Medium';
                            return 'Low';
                        };

                        return (
                            <div key={index} className="bg-slate-900/60 border border-gray-700 rounded-lg p-4 font-mono text-sm">
                                <div className="border-b border-gray-700 pb-2 mb-3">
                                    <div className="flex items-center justify-between text-white font-semibold">
                                        <span className="truncate">{game.name}</span>
                                        <span className="text-purple-400">Score: {game.score}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1 text-gray-400 text-xs">
                                        <span>Rank: #{game.currentRank}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mb-3 text-xs">
                                    <span className="text-emerald-400">
                                        {getStatusIcon(game.trend)} {game.trend === 'up' ? 'Rising' : game.trend === 'stable' ? 'Steady' : 'Declining'}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded ${
                                        getOutlook(game.confidence, game.score) === 'High' 
                                            ? 'bg-emerald-500/20 text-emerald-300' 
                                            : getOutlook(game.confidence, game.score) === 'Medium'
                                            ? 'bg-yellow-500/20 text-yellow-300'
                                            : 'bg-red-500/20 text-red-300'
                                    }`}>
                                        Outlook: {getOutlook(game.confidence, game.score)}
                                    </span>
                                </div>

                                <div className="border-t border-b border-gray-700 py-2 mb-2">
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">🔥 Key Metrics</div>
                                    <div className="grid grid-cols-5 gap-2 text-center">
                                        <div>
                                            <div className="text-xs text-gray-400">Velocity</div>
                                            <div className="text-white font-bold">{game.breakdown.velocity}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400">Regional</div>
                                            <div className="text-white font-bold">{game.breakdown.regional}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400">Genre</div>
                                            <div className="text-white font-bold">{game.breakdown.genre}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400">Revenue</div>
                                            <div className="text-white font-bold">{game.breakdown.revenue}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400">Sentiment</div>
                                            <div className="text-white font-bold">{game.breakdown.sentiment}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Model Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 border-l-4 border-emerald-500">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <h4 className="text-white font-semibold">Model Confidence</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Based on 2 months of historical data, our ARIMA-XGBoost ensemble model
                        achieves 87% accuracy on backtesting. Predictions are updated daily.
                    </p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-amber-500">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="text-amber-400" size={20} />
                        <h4 className="text-white font-semibold">Disclaimer</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Predictions are estimates based on historical trends. Actual results may vary
                        due to market conditions, seasonal changes, and unforeseen events.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PredictiveAI;

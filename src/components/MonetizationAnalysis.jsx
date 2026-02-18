import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target, Zap, Wallet, CreditCard, Film } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

/**
 * Monetization Analysis Component
 * IAP/Ads ratio, ARPU, paywall depth, and revenue model comparison
 * 
 * @param {array} monetizationData - Array of games with monetization metrics
 */
const MonetizationAnalysis = ({ monetizationData = [] }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [metricView, setMetricView] = useState('arpu'); // 'arpu' | 'ratio' | 'paywall'

    const COLORS = {
        iap: '#10b981',
        ads: '#3b82f6',
        hybrid: '#8b5cf6',
        subscription: '#f59e0b'
    };

    // Calculate averages
    const avgARPU = monetizationData.reduce((sum, g) => sum + (g.arpu || 0), 0) / monetizationData.length;
    const avgIAPRatio = monetizationData.reduce((sum, g) => sum + (g.iapRatio || 0), 0) / monetizationData.length;
    const avgAdsRatio = monetizationData.reduce((sum, g) => sum + (g.adsRatio || 0), 0) / monetizationData.length;

    // Format currency
    const formatCurrency = (value) => {
        if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
        return `$${value.toFixed(2)}`;
    };

    // Get ARPU tier color
    const getARPUTierColor = (arpu) => {
        if (arpu >= 50) return { color: '#10b981', label: 'Premium' };
        if (arpu >= 20) return { color: '#3b82f6', label: 'High' };
        if (arpu >= 10) return { color: '#8b5cf6', label: 'Medium' };
        if (arpu >= 5) return { color: '#f59e0b', label: 'Low' };
        return { color: '#6b7280', label: 'Minimal' };
    };

    // Get paywall depth indicator
    const getPaywallDepth = (depth) => {
        if (depth === 'aggressive') return { color: '#ef4444', icon: '🔴', label: 'Aggressive' };
        if (depth === 'moderate') return { color: '#f59e0b', icon: '🟡', label: 'Moderate' };
        if (depth === 'soft') return { color: '#10b981', icon: '🟢', label: 'Soft' };
        return { color: '#6b7280', icon: '⚪', label: 'None' };
    };

    // Sort by ARPU
    const sortedByARPU = [...monetizationData].sort((a, b) => (b.arpu || 0) - (a.arpu || 0));

    return (
        <div className="monetization-analysis">
            {/* Summary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-panel p-5" style={{ borderTop: '3px solid #10b981' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={20} className="text-emerald-400" />
                        <span className="text-gray-400 text-xs font-semibold uppercase">Avg ARPU</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatCurrency(avgARPU)}</p>
                    <p className="text-gray-400 text-xs mt-1">Per user / month</p>
                </div>

                <div className="glass-panel p-5" style={{ borderTop: '3px solid #3b82f6' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={20} className="text-blue-400" />
                        <span className="text-gray-400 text-xs font-semibold uppercase">Avg IAP Ratio</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{avgIAPRatio.toFixed(0)}%</p>
                    <p className="text-gray-400 text-xs mt-1">Of total revenue</p>
                </div>

                <div className="glass-panel p-5" style={{ borderTop: '3px solid #8b5cf6' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Film size={20} className="text-purple-400" />
                        <span className="text-gray-400 text-xs font-semibold uppercase">Avg Ads Ratio</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{avgAdsRatio.toFixed(0)}%</p>
                    <p className="text-gray-400 text-xs mt-1">Of total revenue</p>
                </div>

                <div className="glass-panel p-5" style={{ borderTop: '3px solid #f59e0b' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={20} className="text-amber-400" />
                        <span className="text-gray-400 text-xs font-semibold uppercase">Paying Users</span>
                    </div>
                    <p className="text-3xl font-bold text-white">
                        {(monetizationData.reduce((sum, g) => sum + (g.payingUserPercentage || 0), 0) / monetizationData.length).toFixed(1)}%
                    </p>
                    <p className="text-gray-400 text-xs mt-1">Conversion rate</p>
                </div>
            </div>

            {/* Metric View Switcher */}
            <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '16px'
            }}>
                <button
                    onClick={() => setMetricView('arpu')}
                    style={{
                        padding: '8px 16px',
                        background: metricView === 'arpu' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        border: metricView === 'arpu' ? '1px solid #10b981' : '1px solid transparent',
                        borderRadius: '8px',
                        color: metricView === 'arpu' ? '#10b981' : '#9ca3af',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <DollarSign size={14} />
                    ARPU Rankings
                </button>
                <button
                    onClick={() => setMetricView('ratio')}
                    style={{
                        padding: '8px 16px',
                        background: metricView === 'ratio' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        border: metricView === 'ratio' ? '1px solid #10b981' : '1px solid transparent',
                        borderRadius: '8px',
                        color: metricView === 'ratio' ? '#10b981' : '#9ca3af',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <Target size={14} />
                    IAP/Ads Breakdown
                </button>
                <button
                    onClick={() => setMetricView('paywall')}
                    style={{
                        padding: '8px 16px',
                        background: metricView === 'paywall' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        border: metricView === 'paywall' ? '1px solid #10b981' : '1px solid transparent',
                        borderRadius: '8px',
                        color: metricView === 'paywall' ? '#10b981' : '#9ca3af',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <Wallet size={14} />
                    Paywall Strategy
                </button>
            </div>

            {/* ARPU Rankings View */}
            {metricView === 'arpu' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedByARPU.map((game, idx) => {
                        const arpuTier = getARPUTierColor(game.arpu);
                        
                        return (
                            <div
                                key={game.name}
                                className="glass-panel p-5 cursor-pointer transition-all"
                                style={{
                                    borderLeft: `4px solid ${arpuTier.color}`
                                }}
                                onClick={() => setSelectedGame(game)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = `0 8px 20px ${arpuTier.color}40`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{game.icon}</span>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{game.name}</h4>
                                            <p className="text-gray-400 text-xs">{game.genre}</p>
                                        </div>
                                    </div>
                                    <span 
                                        className="text-xs font-bold px-2 py-1 rounded"
                                        style={{ 
                                            background: `${arpuTier.color}20`,
                                            color: arpuTier.color,
                                            border: `1px solid ${arpuTier.color}40`
                                        }}
                                    >
                                        #{idx + 1}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-gray-400 text-xs font-semibold">ARPU</span>
                                        <span 
                                            className="text-lg font-bold"
                                            style={{ color: arpuTier.color }}
                                        >
                                            {formatCurrency(game.arpu)}
                                        </span>
                                    </div>
                                    <span 
                                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                                        style={{ 
                                            background: `${arpuTier.color}15`,
                                            color: arpuTier.color
                                        }}
                                    >
                                        {arpuTier.label} Tier
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                                    <div>
                                        <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">IAP</p>
                                        <p className="text-emerald-400 font-bold text-sm">{game.iapRatio}%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Ads</p>
                                        <p className="text-blue-400 font-bold text-sm">{game.adsRatio}%</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* IAP/Ads Ratio View */}
            {metricView === 'ratio' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sortedByARPU.map((game) => {
                        const pieData = [
                            { name: 'IAP', value: game.iapRatio, color: COLORS.iap },
                            { name: 'Ads', value: game.adsRatio, color: COLORS.ads }
                        ];

                        return (
                            <div key={game.name} className="glass-panel p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">{game.icon}</span>
                                    <div>
                                        <h4 className="text-white font-bold text-base">{game.name}</h4>
                                        <p className="text-gray-400 text-xs">{game.businessModel} Model</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div style={{ height: '150px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={30}
                                                    outerRadius={50}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS.iap }}></div>
                                                <span className="text-gray-400 text-xs font-semibold">IAP Revenue</span>
                                            </div>
                                            <p className="text-emerald-400 font-bold text-lg">{game.iapRatio}%</p>
                                            <p className="text-gray-400 text-[10px]">{formatCurrency(game.arpu * (game.iapRatio / 100))}/user</p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS.ads }}></div>
                                                <span className="text-gray-400 text-xs font-semibold">Ads Revenue</span>
                                            </div>
                                            <p className="text-blue-400 font-bold text-lg">{game.adsRatio}%</p>
                                            <p className="text-gray-400 text-[10px]">{formatCurrency(game.arpu * (game.adsRatio / 100))}/user</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Paying Users</span>
                                        <span className="text-white font-bold">{game.payingUserPercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Paywall Strategy View */}
            {metricView === 'paywall' && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedByARPU.map((game) => {
                            const paywallInfo = getPaywallDepth(game.paywallDepth);

                            return (
                                <div
                                    key={game.name}
                                    className="glass-panel p-5"
                                    style={{
                                        borderTop: `3px solid ${paywallInfo.color}`
                                    }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{game.icon}</span>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{game.name}</h4>
                                            <p className="text-gray-400 text-xs">{game.businessModel}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">{paywallInfo.icon}</span>
                                            <span 
                                                className="text-sm font-bold"
                                                style={{ color: paywallInfo.color }}
                                            >
                                                {paywallInfo.label} Paywall
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-xs">{game.paywallDescription}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400">First Paywall</span>
                                            <span className="text-white font-bold">{game.firstPaywallTime}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400">Avg Purchase</span>
                                            <span className="text-emerald-400 font-bold">{formatCurrency(game.avgPurchaseSize)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400">LTV</span>
                                            <span className="text-blue-400 font-bold">{formatCurrency(game.ltv)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Paywall Strategy Insights */}
                    <div className="glass-panel p-6 mt-6" style={{ borderLeft: '4px solid #10b981' }}>
                        <h4 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                            <Zap className="text-emerald-400" size={18} />
                            Monetization Insights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-2">🟢 Soft Paywall Strategy</p>
                                <p className="text-gray-300 text-xs">
                                    Best for long-term retention. Games like Genshin Impact use generous free content with optional purchases.
                                    Avg LTV: $180+
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-2">🟡 Moderate Paywall Strategy</p>
                                <p className="text-gray-300 text-xs">
                                    Balanced approach. Royal Match shows paywalls at strategic friction points.
                                    Avg LTV: $120-150
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-semibold mb-2">🔴 Aggressive Paywall Strategy</p>
                                <p className="text-gray-300 text-xs">
                                    High ARPU but lower retention. Coin Master monetizes early and frequently.
                                    Avg LTV: $80-100
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Game Detail Modal */}
            {selectedGame && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}
                    onClick={() => setSelectedGame(null)}
                >
                    <div 
                        className="glass-panel"
                        style={{
                            maxWidth: '600px',
                            width: '100%',
                            padding: '32px',
                            background: 'rgba(15, 20, 25, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">{selectedGame.icon}</span>
                            <div>
                                <h3 className="text-white font-bold text-xl">{selectedGame.name}</h3>
                                <p className="text-gray-400 text-sm">{selectedGame.businessModel} Model</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-gray-400 text-xs mb-1">ARPU</p>
                                <p className="text-emerald-400 font-bold text-2xl">{formatCurrency(selectedGame.arpu)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">LTV</p>
                                <p className="text-blue-400 font-bold text-2xl">{formatCurrency(selectedGame.ltv)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Paying Users</p>
                                <p className="text-purple-400 font-bold text-2xl">{selectedGame.payingUserPercentage}%</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Avg Purchase</p>
                                <p className="text-amber-400 font-bold text-2xl">{formatCurrency(selectedGame.avgPurchaseSize)}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-white font-semibold text-sm mb-2">Revenue Split</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                                    <p className="text-emerald-400 text-xs font-semibold mb-1">IAP Revenue</p>
                                    <p className="text-white font-bold text-lg">{selectedGame.iapRatio}%</p>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                    <p className="text-blue-400 text-xs font-semibold mb-1">Ads Revenue</p>
                                    <p className="text-white font-bold text-lg">{selectedGame.adsRatio}%</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold text-sm mb-2">Paywall Strategy</h4>
                            <p className="text-gray-300 text-sm">{selectedGame.paywallDescription}</p>
                            <p className="text-gray-400 text-xs mt-2">First paywall: {selectedGame.firstPaywallTime}</p>
                        </div>

                        <button
                            onClick={() => setSelectedGame(null)}
                            style={{
                                marginTop: '24px',
                                padding: '10px 20px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '8px',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonetizationAnalysis;

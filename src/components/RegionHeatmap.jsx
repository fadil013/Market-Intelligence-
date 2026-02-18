import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Globe } from 'lucide-react';

/**
 * Region Heatmap Component
 * Visualizes geographic growth and market penetration
 * 
 * @param {array} regionalData - Array of regions with growth metrics
 * @param {string} metric - 'growth' | 'downloads' | 'revenue'
 */
const RegionHeatmap = ({ regionalData = [], metric = 'growth' }) => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    // Get intensity color based on metric value
    const getIntensityColor = (value, maxValue) => {
        const intensity = value / maxValue;
        if (intensity >= 0.8) return { bg: 'rgba(16, 185, 129, 0.25)', border: '#10b981', text: '#10b981' };
        if (intensity >= 0.6) return { bg: 'rgba(59, 130, 246, 0.25)', border: '#3b82f6', text: '#3b82f6' };
        if (intensity >= 0.4) return { bg: 'rgba(245, 158, 11, 0.25)', border: '#f59e0b', text: '#f59e0b' };
        if (intensity >= 0.2) return { bg: 'rgba(107, 114, 128, 0.25)', border: '#6b7280', text: '#6b7280' };
        return { bg: 'rgba(239, 68, 68, 0.25)', border: '#ef4444', text: '#ef4444' };
    };

    // Get max value for normalization
    const maxValue = Math.max(...regionalData.map(r => {
        if (metric === 'growth') return r.growthRate || 0;
        if (metric === 'downloads') return r.downloads || 0;
        if (metric === 'revenue') return r.revenue || 0;
        return 0;
    }));

    // Format numbers
    const formatNumber = (num) => {
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
        return num.toString();
    };

    // Get metric value
    const getMetricValue = (region) => {
        if (metric === 'growth') return `${region.growthRate}%`;
        if (metric === 'downloads') return formatNumber(region.downloads);
        if (metric === 'revenue') return `$${formatNumber(region.revenue)}`;
        return 'N/A';
    };

    // Sort by metric
    const sortedData = [...regionalData].sort((a, b) => {
        const aVal = metric === 'growth' ? a.growthRate : metric === 'downloads' ? a.downloads : a.revenue;
        const bVal = metric === 'growth' ? b.growthRate : metric === 'downloads' ? b.downloads : b.revenue;
        return (bVal || 0) - (aVal || 0);
    });

    return (
        <div className="region-heatmap">
            {/* World Regions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                {sortedData.map((region) => {
                    const value = metric === 'growth' ? region.growthRate : 
                                  metric === 'downloads' ? region.downloads : 
                                  region.revenue;
                    const colors = getIntensityColor(value || 0, maxValue);
                    const isSelected = selectedRegion?.name === region.name;

                    return (
                        <div
                            key={region.name}
                            className={`region-card ${isSelected ? 'ring-2' : ''}`}
                            style={{
                                background: colors.bg,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '12px',
                                padding: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative',
                                ...(isSelected && { ringColor: colors.border })
                            }}
                            onClick={() => setSelectedRegion(region)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 8px 16px ${colors.border}40`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Region Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Globe size={16} style={{ color: colors.text }} />
                                    <h4 className="text-white font-bold text-sm">{region.name}</h4>
                                </div>
                                {region.isEmerging && (
                                    <span 
                                        className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                        style={{ 
                                            background: 'rgba(245, 158, 11, 0.2)',
                                            color: '#f59e0b',
                                            border: '1px solid rgba(245, 158, 11, 0.4)'
                                        }}
                                    >
                                        EMERGING
                                    </span>
                                )}
                            </div>

                            {/* Main Metric */}
                            <div className="mb-2">
                                <p className="text-2xl font-bold" style={{ color: colors.text }}>
                                    {getMetricValue(region)}
                                </p>
                                <p className="text-xs text-gray-400 uppercase font-semibold">
                                    {metric === 'growth' ? 'Growth Rate' : 
                                     metric === 'downloads' ? 'Downloads' : 'Revenue'}
                                </p>
                            </div>

                            {/* Growth Indicator */}
                            <div className="flex items-center gap-1 text-xs">
                                {region.trend === 'up' ? (
                                    <TrendingUp size={12} className="text-emerald-400" />
                                ) : region.trend === 'down' ? (
                                    <TrendingDown size={12} className="text-red-400" />
                                ) : (
                                    <MapPin size={12} className="text-gray-400" />
                                )}
                                <span className="text-gray-400 font-semibold">
                                    {region.countries?.length || 0} countries
                                </span>
                            </div>

                            {/* Market Share */}
                            {region.marketShare && (
                                <div className="mt-3 pt-3 border-t border-white/10">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-400">Market Share</span>
                                        <span className="text-white font-bold">{region.marketShare}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-1">
                                        <div 
                                            className="h-1.5 rounded-full transition-all"
                                            style={{ 
                                                width: `${region.marketShare}%`,
                                                background: colors.text
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Selected Region Details */}
            {selectedRegion && (
                <div 
                    className="glass-panel p-5"
                    style={{
                        background: 'rgba(15, 20, 25, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px'
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <Globe size={20} className="text-blue-400" />
                            {selectedRegion.name} - Deep Dive
                        </h3>
                        <button 
                            onClick={() => setSelectedRegion(null)}
                            className="text-gray-400 hover:text-white text-xs font-semibold"
                        >
                            Close
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Growth Rate</p>
                            <p className="text-emerald-400 font-bold text-lg">{selectedRegion.growthRate}%</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Downloads</p>
                            <p className="text-white font-bold text-lg">{formatNumber(selectedRegion.downloads)}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Revenue</p>
                            <p className="text-blue-400 font-bold text-lg">${formatNumber(selectedRegion.revenue)}</p>
                        </div>
                    </div>

                    {selectedRegion.topGames && (
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-2">Top Games in Region</h4>
                            <div className="space-y-2">
                                {selectedRegion.topGames.map((game, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{game.icon}</span>
                                            <span className="text-white text-sm font-semibold">{game.name}</span>
                                        </div>
                                        <span className="text-gray-400 text-xs">{formatNumber(game.downloads)} DL</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RegionHeatmap;

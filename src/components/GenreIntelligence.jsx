import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Zap, Target, Sparkles, Tag } from 'lucide-react';

/**
 * Genre Intelligence Component
 * Advanced genre classification with hybrid detection, sub-genres, and mechanics
 * 
 * @param {array} genreData - Array of genres with intelligence metrics
 */
const GenreIntelligence = ({ genreData = [] }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [view, setView] = useState('overview'); // 'overview' | 'mechanics' | 'hybrids'

    // Get genre color
    const getGenreColor = (genre) => {
        const colors = {
            'RPG': '#8b5cf6',
            'Puzzle': '#f59e0b',
            'Casual': '#10b981',
            'MOBA': '#3b82f6',
            'Shooter': '#ef4444',
            'Strategy': '#14b8a6',
            'Action': '#ec4899',
            'Simulation': '#6366f1',
            'Sports': '#22c55e',
            'Racing': '#f97316'
        };
        return colors[genre] || '#6b7280';
    };

    // Format numbers
    const formatNumber = (num) => {
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
        return num.toString();
    };

    // Sort genres by growth
    const sortedGenres = [...genreData].sort((a, b) => (b.growthRate || 0) - (a.growthRate || 0));

    return (
        <div className="genre-intelligence">
            {/* View Switcher */}
            <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '16px'
            }}>
                <button
                    onClick={() => setView('overview')}
                    style={{
                        padding: '8px 16px',
                        background: view === 'overview' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        border: view === 'overview' ? '1px solid #3b82f6' : '1px solid transparent',
                        borderRadius: '8px',
                        color: view === 'overview' ? '#60a5fa' : '#9ca3af',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                    }}
                >
                    <Target size={14} />
                    Genre Overview
                </button>
                <button
                    onClick={() => setView('mechanics')}
                    style={{
                        padding: '8px 16px',
                        background: view === 'mechanics' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        border: view === 'mechanics' ? '1px solid #3b82f6' : '1px solid transparent',
                        borderRadius: '8px',
                        color: view === 'mechanics' ? '#60a5fa' : '#9ca3af',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                    }}
                >
                    <Tag size={14} />
                    Mechanics
                </button>
                <button
                    onClick={() => setView('hybrids')}
                    style={{
                        padding: '8px 16px',
                        background: view === 'hybrids' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        border: view === 'hybrids' ? '1px solid #3b82f6' : '1px solid transparent',
                        borderRadius: '8px',
                        color: view === 'hybrids' ? '#60a5fa' : '#9ca3af',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                    }}
                >
                    <Sparkles size={14} />
                    Hybrid Genres
                </button>
            </div>

            {/* Overview View */}
            {view === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedGenres.map((genre) => {
                        const color = getGenreColor(genre.name);
                        const isSelected = selectedGenre?.name === genre.name;

                        return (
                            <div
                                key={genre.name}
                                className={`genre-card ${isSelected ? 'ring-2' : ''}`}
                                style={{
                                    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                                    border: `1px solid ${color}40`,
                                    borderRadius: '12px',
                                    padding: '20px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    ...(isSelected && { borderColor: color, boxShadow: `0 0 20px ${color}40` })
                                }}
                                onClick={() => setSelectedGenre(genre)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = `0 8px 20px ${color}40`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = isSelected ? `0 0 20px ${color}40` : 'none';
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div 
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '10px',
                                                background: `${color}30`,
                                                border: `2px solid ${color}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '20px'
                                            }}
                                        >
                                            {genre.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-base">{genre.name}</h4>
                                            {genre.subGenre && (
                                                <p className="text-gray-400 text-xs">{genre.subGenre}</p>
                                            )}
                                        </div>
                                    </div>
                                    {genre.isHybrid && (
                                        <Sparkles size={16} style={{ color }} />
                                    )}
                                </div>

                                {/* Growth Rate */}
                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-gray-400 text-xs font-semibold">Growth Rate</span>
                                        <div className="flex items-center gap-1">
                                            {genre.growthRate > 0 ? (
                                                <TrendingUp size={12} className="text-emerald-400" />
                                            ) : (
                                                <TrendingDown size={12} className="text-red-400" />
                                            )}
                                            <span 
                                                className="text-xs font-bold"
                                                style={{ color: genre.growthRate > 0 ? '#10b981' : '#ef4444' }}
                                            >
                                                {genre.growthRate > 0 ? '+' : ''}{genre.growthRate}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div 
                                            className="h-2 rounded-full transition-all"
                                            style={{ 
                                                width: `${Math.min(Math.abs(genre.growthRate), 100)}%`,
                                                background: genre.growthRate > 0 ? '#10b981' : '#ef4444'
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Market Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Games</p>
                                        <p className="text-white font-bold text-sm">{genre.gameCount || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Downloads</p>
                                        <p className="text-white font-bold text-sm">{formatNumber(genre.totalDownloads)}</p>
                                    </div>
                                </div>

                                {/* Revenue */}
                                <div className="pt-3 border-t border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-xs font-semibold">Est. Revenue</span>
                                        <span className="text-white font-bold text-sm" style={{ color }}>
                                            ${formatNumber(genre.totalRevenue)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Mechanics View */}
            {view === 'mechanics' && (
                <div>
                    <div className="mb-6">
                        <h3 className="text-white font-bold text-lg mb-2">Gameplay Mechanics Breakdown</h3>
                        <p className="text-gray-400 text-sm">Most popular mechanics driving engagement across genres</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {genreData.flatMap(g => g.mechanics || [])
                            .filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)
                            .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
                            .slice(0, 12)
                            .map((mechanic, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '10px',
                                        padding: '14px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                                        e.currentTarget.style.borderColor = '#3b82f6';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag size={14} className="text-blue-400" />
                                        <span className="text-white font-bold text-sm">{mechanic.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-xs">Popularity</span>
                                        <span className="text-blue-400 font-bold text-xs">{mechanic.popularity}%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                                        <div 
                                            className="h-1.5 rounded-full bg-blue-400 transition-all"
                                            style={{ width: `${mechanic.popularity}%` }}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}

            {/* Hybrids View */}
            {view === 'hybrids' && (
                <div>
                    <div className="mb-6">
                        <h3 className="text-white font-bold text-lg mb-2">Hybrid Genre Detection</h3>
                        <p className="text-gray-400 text-sm">Games blending multiple genres for unique experiences</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sortedGenres
                            .filter(g => g.isHybrid)
                            .map((genre) => {
                                const color = getGenreColor(genre.name);
                                
                                return (
                                    <div
                                        key={genre.name}
                                        style={{
                                            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                                            border: `1px solid ${color}60`,
                                            borderRadius: '12px',
                                            padding: '20px'
                                        }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Sparkles size={20} style={{ color }} />
                                            <div>
                                                <h4 className="text-white font-bold text-base">{genre.name}</h4>
                                                <p className="text-gray-400 text-xs">{genre.hybridComponents?.join(' + ')}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Growth</p>
                                                <p className="text-emerald-400 font-bold text-sm">+{genre.growthRate}%</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Games</p>
                                                <p className="text-white font-bold text-sm">{genre.gameCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-[10px] font-semibold uppercase mb-1">Revenue</p>
                                                <p style={{ color }} className="font-bold text-sm">${formatNumber(genre.totalRevenue)}</p>
                                            </div>
                                        </div>

                                        {genre.topGames && (
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <p className="text-gray-400 text-xs font-semibold mb-2">Top Hybrid Games</p>
                                                <div className="space-y-1">
                                                    {genre.topGames.slice(0, 2).map((game, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <span className="text-base">{game.icon}</span>
                                                            <span className="text-white text-xs font-semibold">{game.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            {/* Selected Genre Detail */}
            {selectedGenre && view === 'overview' && (
                <div 
                    className="glass-panel mt-6"
                    style={{
                        padding: '24px',
                        background: 'rgba(15, 20, 25, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px'
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <span style={{ fontSize: '24px' }}>{selectedGenre.icon}</span>
                            {selectedGenre.name} - Deep Insights
                        </h3>
                        <button 
                            onClick={() => setSelectedGenre(null)}
                            className="text-gray-400 hover:text-white text-xs font-semibold"
                        >
                            Close
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Growth Rate</p>
                            <p className="text-emerald-400 font-bold text-lg">+{selectedGenre.growthRate}%</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Total Games</p>
                            <p className="text-white font-bold text-lg">{selectedGenre.gameCount}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Downloads</p>
                            <p className="text-blue-400 font-bold text-lg">{formatNumber(selectedGenre.totalDownloads)}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs mb-1">Revenue</p>
                            <p className="text-emerald-400 font-bold text-lg">${formatNumber(selectedGenre.totalRevenue)}</p>
                        </div>
                    </div>

                    {selectedGenre.mechanics && (
                        <div>
                            <h4 className="text-white font-semibold text-sm mb-2">Core Mechanics</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedGenre.mechanics.map((mechanic, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.3)',
                                            borderRadius: '6px',
                                            color: '#60a5fa',
                                            fontSize: '11px',
                                            fontWeight: 700
                                        }}
                                    >
                                        {mechanic.name} ({mechanic.popularity}%)
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GenreIntelligence;

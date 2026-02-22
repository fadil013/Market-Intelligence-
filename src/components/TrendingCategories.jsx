import React from 'react';
import { Flame, TrendingUp, Trophy, Star, Zap, Target } from 'lucide-react';

const TrendingCategories = () => {
    const categories = [
        { 
            name: 'Puzzle', 
            trend: '+42%', 
            games: 2847, 
            revenue: '$892M',
            icon: '🧩',
            color: '#f59e0b',
            isHot: true
        },
        { 
            name: 'Shooting', 
            trend: '+38%', 
            games: 1523, 
            revenue: '$1.2B',
            icon: '🎯',
            color: '#ef4444',
            isHot: true
        },
        { 
            name: 'Racing', 
            trend: '+35%', 
            games: 892, 
            revenue: '$645M',
            icon: '🏎️',
            color: '#06b6d4',
            isHot: true
        },
        { 
            name: 'RPG', 
            trend: '+28%', 
            games: 1245, 
            revenue: '$1.8B',
            icon: '⚔️',
            color: '#8b5cf6',
            isHot: false
        },
        { 
            name: 'Strategy', 
            trend: '+22%', 
            games: 756, 
            revenue: '$534M',
            icon: '🎲',
            color: '#10b981',
            isHot: false
        },
        { 
            name: 'Casual', 
            trend: '+18%', 
            games: 3421, 
            revenue: '$723M',
            icon: '🎮',
            color: '#ec4899',
            isHot: false
        }
    ];

    return (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Flame size={22} style={{ color: '#f59e0b' }} />
                    <h3 className="text-xl font-bold text-white">Trending Categories</h3>
                </div>
                <div className="text-xs text-gray-400 font-semibold">Last 30 days</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, idx) => (
                    <div 
                        key={idx}
                        className="category-card"
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '12px',
                            padding: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {category.isHot && (
                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '6px',
                                padding: '4px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <Flame size={12} style={{ color: '#ef4444' }} />
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#ef4444' }}>HOT</span>
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div 
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '14px',
                                    background: `linear-gradient(135deg, ${category.color}50, ${category.color}20)`,
                                    border: `2px solid ${category.color}60`,
                                    boxShadow: `0 4px 12px ${category.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '28px',
                                    flexShrink: 0,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ position: 'relative', zIndex: 10 }}>
                                    {category.icon}
                                </div>
                                <div 
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.15), transparent)',
                                        mixBlendMode: 'overlay'
                                    }}
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold text-lg mb-1">{category.name}</h4>
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp size={14} style={{ color: '#10b981' }} />
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>{category.trend}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase' }}>Games</div>
                                        <div style={{ fontSize: '14px', color: '#d1d5db', fontWeight: 700 }}>{category.games.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase' }}>Revenue</div>
                                        <div style={{ fontSize: '14px', color: '#d1d5db', fontWeight: 700 }}>{category.revenue}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingCategories;

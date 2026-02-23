import React from 'react';
import { Lightbulb, TrendingUp, Target, Sparkles, ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import { aiSuggestions, opportunityData, lowCompetitionData } from '../data/mockData';
import AIOpportunityEngine from '../components/AIOpportunityEngine';

const Suggestions = () => {
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Monetization': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Engagement': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'Retention': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
            default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Monetization': return TrendingUp;
            case 'Engagement': return Target;
            case 'Retention': return CheckCircle;
            default: return Sparkles;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Lightbulb className="text-amber-500" />
                        AI Suggestions
                    </h1>
                    <p className="text-gray-400 mt-1">Strategic recommendations based on market analysis</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Sparkles size={16} className="text-amber-400" />
                    <span className="text-amber-300 text-sm font-medium">Powered by AI</span>
                </div>
            </div>

            {/* Top Suggestion */}
            <div className="glass-panel p-8 relative overflow-hidden border-l-4 border-amber-500">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 bg-amber-500" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            🔥 TOP RECOMMENDATION
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                            92% Confidence
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{aiSuggestions[0].title}</h2>
                    <p className="text-gray-400 text-lg mb-4">{aiSuggestions[0].description}</p>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">Recommended for:</span>
                        <div className="flex gap-2">
                            {aiSuggestions[0].relevantGenres.map((genre, i) => (
                                <span key={i} className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiSuggestions.slice(1).map((suggestion) => {
                    const CategoryIcon = getCategoryIcon(suggestion.category);
                    return (
                        <div
                            key={suggestion.id}
                            className="glass-panel p-6 hover:scale-[1.02] transition-transform cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(suggestion.category)}`}>
                                        <CategoryIcon size={20} />
                                    </div>
                                    <div>
                                        <span className={`px-2 py-0.5 rounded text-xs border ${getCategoryColor(suggestion.category)}`}>
                                            {suggestion.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                            style={{ width: `${suggestion.confidence}%` }}
                                        />
                                    </div>
                                    <span className="text-gray-400 text-xs">{suggestion.confidence}%</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {suggestion.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">{suggestion.description}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {suggestion.relevantGenres.slice(0, 2).map((genre, i) => (
                                        <span key={i} className="px-2 py-1 rounded text-xs bg-white/5 text-gray-400">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                                <ArrowRight size={18} className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Insights */}
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-4">Quick Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h4 className="text-purple-300 font-medium mb-2">🎮 Hot Genre</h4>
                        <p className="text-white font-semibold">RPG + Gacha</p>
                        <p className="text-gray-400 text-sm">Highest growth rate this quarter</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <h4 className="text-emerald-300 font-medium mb-2">💰 Revenue Driver</h4>
                        <p className="text-white font-semibold">Battle Pass</p>
                        <p className="text-gray-400 text-sm">35% of top games use this model</p>
                    </div>
                    <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <h4 className="text-pink-300 font-medium mb-2">📈 Trending Feature</h4>
                        <p className="text-white font-semibold">Cross-Platform Sync</p>
                        <p className="text-gray-400 text-sm">45% better retention rates</p>
                    </div>
                </div>
            </div>

            {/* Low Competition Categories - NEW Feature */}
            <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.4)' }}>
                                <Shield size={20} style={{ color: '#fff' }} />
                            </div>
                            Low Competition Categories
                        </h3>
                        <p className="text-gray-400 mt-1 text-sm">Market segments with high opportunity &amp; less crowded competition — ideal for new entries</p>
                    </div>
                    <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', fontSize: '12px', fontWeight: 700 }}>
                        🎯 {lowCompetitionData.length} Opportunities
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lowCompetitionData.map((cat, i) => (
                        <div key={i} style={{
                            background: `linear-gradient(135deg, ${cat.color}12, ${cat.color}06)`,
                            border: `1px solid ${cat.color}30`,
                            borderRadius: '14px',
                            padding: '20px',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${cat.color}70`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${cat.color}30`; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {/* Glow accent */}
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: `${cat.color}18`, filter: 'blur(20px)' }} />

                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '28px' }}>{cat.icon}</span>
                                    <div>
                                        <h4 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '14px', margin: 0, lineHeight: 1.3 }}>{cat.category}</h4>
                                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>{cat.cagr} CAGR</span>
                                    </div>
                                </div>
                                {/* Opportunity score badge */}
                                <div style={{
                                    background: cat.opportunityScore >= 85 ? 'rgba(16,185,129,0.2)' : cat.opportunityScore >= 75 ? 'rgba(251,191,36,0.2)' : 'rgba(59,130,246,0.2)',
                                    color: cat.opportunityScore >= 85 ? '#34d399' : cat.opportunityScore >= 75 ? '#fbbf24' : '#60a5fa',
                                    padding: '4px 8px', borderRadius: '6px', fontSize: '13px', fontWeight: 800,
                                    lineHeight: 1,
                                }}>
                                    {cat.opportunityScore}
                                    <div style={{ fontSize: '8px', fontWeight: 600, opacity: 0.8, textAlign: 'center' }}>OPP</div>
                                </div>
                            </div>

                            {/* Stats row */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>Games</div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9' }}>{cat.gamesInMarket.toLocaleString()}</div>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>Avg Rev</div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9' }}>{cat.avgRevenue}</div>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>Competition</div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: cat.competitionScore <= 15 ? '#10b981' : cat.competitionScore <= 25 ? '#fbbf24' : '#f87171' }}>
                                        {cat.competitionScore < 20 ? 'Low' : cat.competitionScore < 28 ? 'Medium' : 'Moderate'}
                                    </div>
                                </div>
                            </div>

                            {/* Rationale */}
                            <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 12px', lineHeight: 1.5 }}>{cat.rationale}</p>

                            {/* Gaps */}
                            <div>
                                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Key Gaps</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {cat.topGaps.map((gap, gi) => (
                                        <span key={gi} style={{
                                            padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                                            background: `${cat.color}15`,
                                            color: cat.color,
                                            border: `1px solid ${cat.color}30`,
                                        }}>{gap}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Opportunity Engine - Phase 12 */}
            <div className="glass-panel p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        🤖 AI Opportunity Engine
                    </h3>
                    <p className="text-gray-400">Market gap analysis with actionable game concept recommendations</p>
                </div>
                <AIOpportunityEngine opportunityData={opportunityData} />
            </div>
        </div>
    );
};

export default Suggestions;

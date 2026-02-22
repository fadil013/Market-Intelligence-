import React from 'react';
import { TrendingUp, TrendingDown, Minus, Crown, ExternalLink, Zap, Target, Award, Trophy } from 'lucide-react';
import VelocityBadge from './VelocityBadge';
import RankSparkline from './RankSparkline';
// Professional blue color scheme

const RankingItem = ({ item, type, rank, onClick, compact }) => {
    const handleLinkClick = (e) => {
        e.stopPropagation(); // Prevent triggering the main onClick
        if (item.storeUrl) {
            window.open(item.storeUrl, '_blank');
        }
    };

    return (
        <div
            className={`flex items-center justify-between ${compact ? 'p-2' : 'p-3'} rounded-xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10 group relative`}
            onClick={() => onClick(item)}
        >
            <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold w-4 text-center text-xs">{rank}</span>
                <div
                    className={`${compact ? 'w-9 h-9 text-xl' : 'w-12 h-12 text-2xl'} rounded-xl flex items-center justify-center shadow-2xl ring-2 ring-white/20 relative overflow-hidden`}
                    style={{ 
                        background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`, 
                        border: `2px solid ${item.color}60`,
                        boxShadow: `0 4px 12px ${item.color}30`
                    }}
                >
                    <div className="relative z-10">{item.icon}</div>
                    <div 
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                        style={{ mixBlendMode: 'overlay' }}
                    />
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className={`text-white font-semibold ${compact ? 'text-xs' : 'text-sm'} transition-colors truncate max-w-[100px]`} style={{ ':hover': { color: '#60a5fa' } }}>{item.name}</h4>
                        {item.storeUrl && !compact && (
                            <span 
                                onClick={handleLinkClick}
                                className="link-badge-blue opacity-0 group-hover:opacity-100 flex items-center gap-0.5"
                                title="Open in store"
                            >
                                LINK<ExternalLink size={8} />
                            </span>
                        )}
                    </div>
                    {!compact && <p className="text-gray-500 text-xs truncate max-w-[120px]">{item.publisher || `Featured Score: ${item.score}`}</p>}
                    {/* Velocity Sparkline */}
                    {!compact && item.rankHistory && (
                        <div className="mt-1">
                            <RankSparkline rankHistory={item.rankHistory} width={80} height={20} />
                        </div>
                    )}
                </div>
            </div>

            <div className="text-right">
                {/* Velocity Badge */}
                {!compact && item.velocityScore !== undefined && (
                    <div className="mb-1">
                        <VelocityBadge score={item.velocityScore} size="sm" />
                    </div>
                )}
                <p className={`text-white font-bold ${compact ? 'text-[10px]' : 'text-sm'}`}>
                    {type === 'grossing' ? item.revenue : item.downloads || ''}
                </p>
                {!compact && item.change && (
                    <div className={`flex items-center justify-end gap-1 text-[10px] font-bold ${item.change.startsWith('+') ? 'text-emerald-400' :
                        item.change === '0%' ? 'text-gray-500' : 'text-red-400'
                        }`}>
                        {item.change.startsWith('+') ? <TrendingUp size={10} /> :
                            item.change === '0%' ? <Minus size={10} /> : <TrendingDown size={10} />}
                        {item.change}
                    </div>
                )}
            </div>
        </div>
    );
};

const RankingsGrid = ({ rankings, onAppSelect, collapsed }) => {
    return (
        <div className={`grid grid-cols-1 ${collapsed ? 'md:grid-cols-1 lg:grid-cols-2 lg:max-w-4xl' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6 mb-8 rankings-grid-root`}>
            {/* Top Free */}
            <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Top Free
                    </h3>
                    {!collapsed && <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Downloads</span>}
                </div>
                <div className="space-y-1">
                    {rankings.topFree.map((item, index) => (
                        <RankingItem key={item.id} item={item} rank={index + 1} type="free" onClick={onAppSelect} compact={collapsed} />
                    ))}
                </div>
            </div>

            {/* Top Grossing */}
            <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }}></span>
                        Top Grossing
                    </h3>
                    {!collapsed && <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Revenue</span>}
                </div>
                <div className="space-y-1">
                    {rankings.topGrossing.map((item, index) => (
                        <RankingItem key={item.id} item={item} rank={index + 1} type="grossing" onClick={onAppSelect} compact={collapsed} />
                    ))}
                </div>
            </div>

            {/* Top Featured */}
            <div className={`glass-panel p-5 ${collapsed ? 'hidden xl:block' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Crown className="text-amber-400" size={18} />
                        Top Featured
                    </h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Score</span>
                </div>
                <div className="space-y-1">
                    {rankings.topFeatured.map((item, index) => (
                        <RankingItem key={item.id} item={item} rank={index + 1} type="featured" onClick={onAppSelect} compact={collapsed} />
                    ))}
                </div>
            </div>

            {/* Market Pulse - NEW 4th Panel */}
            <div className={`glass-panel p-5 ${collapsed ? 'hidden xl:block' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Zap className="text-purple-400" size={18} />
                        Market Pulse
                    </h3>
                </div>
                <div className="space-y-4">
                    {/* Top Mover */}
                    <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="text-emerald-400" size={16} />
                            <h4 className="text-xs font-bold text-emerald-400 uppercase">Top Mover</h4>
                        </div>
                        <p className="text-white font-bold text-sm">Royal Match</p>
                        <p className="text-emerald-400 font-bold text-lg">+45%</p>
                        <p className="text-gray-400 text-xs mt-1">24h growth</p>
                    </div>

                    {/* Most Downloaded */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="text-blue-400" size={16} />
                            <h4 className="text-xs font-bold text-blue-400 uppercase">Most Downloaded</h4>
                        </div>
                        <p className="text-white font-bold text-sm">Roblox</p>
                        <p className="text-blue-400 font-bold text-lg">22M</p>
                        <p className="text-gray-400 text-xs mt-1">This week</p>
                    </div>

                    {/* Revenue Leader */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="text-amber-400" size={16} />
                            <h4 className="text-xs font-bold text-amber-400 uppercase">Revenue Leader</h4>
                        </div>
                        <p className="text-white font-bold text-sm">Honor of Kings</p>
                        <p className="text-amber-400 font-bold text-lg">$220M</p>
                        <p className="text-gray-400 text-xs mt-1">Monthly revenue</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankingsGrid;

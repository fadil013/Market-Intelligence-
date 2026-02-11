import React from 'react';
import { TrendingUp, TrendingDown, Minus, Crown } from 'lucide-react';

const RankingItem = ({ item, type, rank, onClick }) => {
    return (
        <div
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10 group"
            onClick={() => onClick(item)}
        >
            <div className="flex items-center gap-4">
                <span className="text-gray-500 font-bold w-4 text-center">{rank}</span>
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-lg ring-1 ring-white/10"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                    {item.icon}
                </div>
                <div>
                    <h4 className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors">{item.name}</h4>
                    <p className="text-gray-500 text-xs">{item.publisher || `Featured Score: ${item.score}`}</p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-white font-bold text-sm">
                    {type === 'grossing' ? item.revenue : item.downloads || ''}
                </p>
                {item.change && (
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

const RankingsGrid = ({ rankings, onAppSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Top Free */}
            <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Top Free
                    </h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Downloads</span>
                </div>
                <div className="space-y-1">
                    {rankings.topFree.map((item, index) => (
                        <RankingItem key={item.id} item={item} rank={index + 1} type="free" onClick={onAppSelect} />
                    ))}
                </div>
            </div>

            {/* Top Grossing */}
            <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Top Grossing
                    </h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Revenue</span>
                </div>
                <div className="space-y-1">
                    {rankings.topGrossing.map((item, index) => (
                        <RankingItem key={item.id} item={item} rank={index + 1} type="grossing" onClick={onAppSelect} />
                    ))}
                </div>
            </div>

            {/* Top Featured */}
            <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Crown className="text-amber-400" size={18} />
                        Top Featured
                    </h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Score</span>
                </div>
                <div className="space-y-1">
                    {rankings.topFeatured.map((item, index) => (
                        <RankingItem key={item.id} item={item} rank={index + 1} type="featured" onClick={onAppSelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RankingsGrid;

import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import VelocityBadge from './VelocityBadge';
import PlatformIndicators from './PlatformIndicators';

const GamesTable = React.memo(({ games, genres, businessModels, onGameSelect }) => {
    const [genreFilter, setGenreFilter] = useState('All');
    const [modelFilter, setModelFilter] = useState('All');
    const [sortBy, setSortBy] = useState('boostScore');

    const filteredGames = useMemo(() => {
        return games
            .filter((game) => genreFilter === 'All' || game.genre === genreFilter)
            .filter((game) => modelFilter === 'All' || game.businessModel === modelFilter)
            .sort((a, b) => {
                if (sortBy === 'boostScore') return b.boostScore - a.boostScore;
                if (sortBy === 'downloads') return b.monthlyDownloads - a.monthlyDownloads;
                if (sortBy === 'revenue') return b.monthlyRevenue - a.monthlyRevenue;
                if (sortBy === 'rating') return b.rating - a.rating;
                if (sortBy === 'velocity') return (b.velocityScore || 0) - (a.velocityScore || 0);
                return 0;
            })
            .slice(0, 15);
    }, [games, genreFilter, modelFilter, sortBy]);

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
        return num.toString();
    };

    return (
        <div className="glass-panel table-container">
            <div className="table-header">
                <div className="filters">
                    <select className="filter-select" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                        <option value="All">All Genres</option>
                        {genres.map((genre) => (<option key={genre} value={genre}>{genre}</option>))}
                    </select>
                    <select className="filter-select" value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
                        <option value="All">All Models</option>
                        {businessModels.map((model) => (<option key={model} value={model}>{model}</option>))}
                    </select>
                    <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="boostScore">Boost Score</option>
                        <option value="velocity">Velocity Score</option>
                        <option value="downloads">Downloads</option>
                        <option value="revenue">Revenue</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Game</th>
                        <th>Genre</th>
                        <th>Platform</th>
                        <th className="right">Downloads</th>
                        <th className="right">Revenue</th>
                        <th className="center">Rating</th>
                        <th className="center">Velocity</th>
                        <th className="center">Cross-Platform</th>
                        <th className="right">Boost</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map((game, index) => (
                        <tr key={game.id} onClick={() => onGameSelect && onGameSelect(game)} style={{ cursor: onGameSelect ? 'pointer' : 'default' }}>
                            <td className="text-muted">{index + 1}</td>
                            <td>
                                <div className="game-cell">
                                    <div
                                        className="game-avatar text-xl flex items-center justify-center p-0 overflow-hidden"
                                        style={{ backgroundColor: `${game.color}20`, border: `1px solid ${game.color}40` }}
                                    >
                                        {game.icon || game.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="game-name">{game.name}</div>
                                        <div className="game-region">{game.studioRegion}</div>
                                    </div>
                                </div>
                            </td>
                            <td><span className="genre-badge">{game.genre}</span></td>
                            <td>
                                <div 
                                    className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); game.storeUrl && window.open(game.storeUrl, '_blank'); }}
                                    title={`Open ${game.name} in store`}
                                >
                                    <span className="link-badge-blue">LINK</span>
                                    <span className="text-muted text-sm">{game.platform}</span>
                                </div>
                            </td>
                            <td className="text-right">{formatNumber(game.monthlyDownloads)}</td>
                            <td className="text-right text-success">${formatNumber(game.monthlyRevenue)}</td>
                            <td>
                                <div className="rating">
                                    <Star size={14} fill="currentColor" />
                                    <span>{game.rating}</span>
                                </div>
                            </td>
                            <td className="center">
                                {game.velocityScore !== undefined && (
                                    <VelocityBadge score={game.velocityScore} size="sm" />
                                )}
                            </td>
                            <td className="center">
                                {game.platformPresence && (
                                    <PlatformIndicators platformPresence={game.platformPresence} compact={true} />
                                )}
                            </td>
                            <td>
                                <div className={`boost ${game.boostScore > 0 ? 'positive' : 'negative'}`}>
                                    {game.boostScore > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    <span>{game.boostScore > 0 ? '+' : ''}{game.boostScore}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});


export default GamesTable;

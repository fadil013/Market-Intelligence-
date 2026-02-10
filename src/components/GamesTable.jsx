import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

const GamesTable = React.memo(({ games, genres, businessModels }) => {
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
                <div>
                    <h3 className="chart-title">Top Games Leaderboard</h3>
                    <p className="chart-subtitle">Ranked by boost score (day-over-day growth)</p>
                </div>
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
                        <th className="right">Boost</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map((game, index) => (
                        <tr key={game.id}>
                            <td className="text-muted">{index + 1}</td>
                            <td>
                                <div className="game-cell">
                                    <div className="game-avatar">{game.name.charAt(0)}</div>
                                    <div>
                                        <div className="game-name">{game.name}</div>
                                        <div className="game-region">{game.studioRegion}</div>
                                    </div>
                                </div>
                            </td>
                            <td><span className="genre-badge">{game.genre}</span></td>
                            <td className="text-muted">{game.platform}</td>
                            <td className="text-right">{formatNumber(game.monthlyDownloads)}</td>
                            <td className="text-right text-success">${formatNumber(game.monthlyRevenue)}</td>
                            <td>
                                <div className="rating">
                                    <Star size={14} fill="currentColor" />
                                    <span>{game.rating}</span>
                                </div>
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

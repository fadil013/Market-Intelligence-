import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import StatsGrid from '../components/StatsGrid';
import PlatformComparisonChart from '../components/PlatformComparisonChart';
import GamesTable from '../components/GamesTable';
import RankingsGrid from '../components/RankingsGrid';
import AdvancedFilter from '../components/AdvancedFilter';
import AppDetailView from '../components/AppDetailView';
import TrendingCategories from '../components/TrendingCategories';
import {
    kpiSummary,
    platformComparisonData,
    allGames,
    genres,
    businessModels,
    gameRankings,
    appRankings,
    appDetailsData
} from '../data/mockData';

const Overview = () => {
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedGameData, setSelectedGameData] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState('Games');
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        domain: 'Games',
        category: 'All',
        geography: 'Worldwide',
        timePeriod: 'Feb 2026'
    });

    const handleAppSelect = (app) => {
        setSelectedApp(null);
        setSelectedGameData(null);
        setTimeout(() => {
            setSelectedApp(app.name);
            // Find the full game data from allGames
            const fullGameData = allGames.find(g => g.name === app.name);
            setSelectedGameData(fullGameData || app);
        }, 50);
    };

    const handleDomainChange = (domain) => {
        setSelectedDomain(domain);
        setActiveFilters({ ...activeFilters, domain });
    };

    const handleApplyFilters = () => {
        console.log('Filters applied:', activeFilters);
        setFiltersApplied(true);
        // Filters will be applied via useMemo below
    };

    const handleResetFilters = () => {
        setActiveFilters({
            domain: 'Games',
            category: 'All',
            geography: 'Worldwide',
            timePeriod: 'Feb 2026'
        });
        setSelectedDomain('Games');
        setFiltersApplied(false);
    };

    // Filter rankings based on active filters
    const currentRankings = useMemo(() => {
        const baseRankings = selectedDomain === 'Games' ? gameRankings : appRankings;
        
        if (!filtersApplied || activeFilters.category === 'All') {
            return baseRankings;
        }

        // Filter based on category - map category to genres
        const categoryToGenres = {
            'Casual': ['Casual', 'Sandbox'],
            'Hypercasual': ['Puzzle', 'Casual'],
            'Midcore': ['RPG', 'MOBA', 'Strategy', 'Shooter']
        };

        const targetGenres = categoryToGenres[activeFilters.category] || [];
        
        // Filter each ranking list
        const filterByGenre = (items) => {
            return items.filter(item => {
                const game = allGames.find(g => g.name === item.name);
                if (!game) return true; // Keep items not in allGames (like apps)
                return targetGenres.includes(game.genre);
            });
        };

        return {
            topFree: filterByGenre(baseRankings.topFree),
            topGrossing: filterByGenre(baseRankings.topGrossing),
            topFeatured: filterByGenre(baseRankings.topFeatured)
        };
    }, [selectedDomain, activeFilters, filtersApplied]);

    // Filter games for the table
    const filteredGames = useMemo(() => {
        if (!filtersApplied || activeFilters.category === 'All') {
            return allGames;
        }

        const categoryToGenres = {
            'Casual': ['Casual', 'Sandbox'],
            'Hypercasual': ['Puzzle', 'Casual'],
            'Midcore': ['RPG', 'MOBA', 'Strategy', 'Shooter']
        };

        const targetGenres = categoryToGenres[activeFilters.category] || [];
        return allGames.filter(game => targetGenres.includes(game.genre));
    }, [activeFilters, filtersApplied]);

    return (
        <div className="overview-container-new">
            {/* Mobile Filter Toggle Button */}
            <button 
                className="mobile-filter-toggle"
                onClick={() => setFiltersPanelOpen(true)}
                aria-label="Open filters"
            >
                <SlidersHorizontal size={20} />
                <span>Filters</span>
                {filtersApplied && activeFilters.category !== 'All' && (
                    <div className="filter-badge">1</div>
                )}
            </button>
            
            {/* Main Content - Left Side */}
            <div className="main-content-area">
                {!selectedApp ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
                        <div className="page-header-new">
                            <h1 className="page-title-new">Market Overview</h1>
                            <div className="live-badge-new">
                                <div className="dot"></div>
                                <span>Live Data</span>
                            </div>
                        </div>
                        
                        {filtersApplied && activeFilters.category !== 'All' && (
                            <div style={{ 
                                background: 'linear-gradient(135deg, rgba(107,114,128,0.15), rgba(75,85,99,0.1))', 
                                border: '1px solid rgba(107,114,128,0.3)',
                                borderRadius: '12px',
                                padding: '16px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{ 
                                    width: '8px', 
                                    height: '8px', 
                                    borderRadius: '50%', 
                                    background: '#6b7280',
                                    boxShadow: '0 0 8px rgba(107,114,128,0.5)'
                                }}></div>
                                <div>
                                    <div style={{ color: '#f9fafb', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                                        Filters Active: {activeFilters.category} Games
                                    </div>
                                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                                        Showing {currentRankings.topFree.length} rankings and {filteredGames.length} games
                                    </div>
                                </div>
                                <button 
                                    onClick={handleResetFilters}
                                    style={{ 
                                        marginLeft: 'auto',
                                        padding: '8px 16px',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '8px',
                                        color: '#d1d5db',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.12)'}
                                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                        
                        <TrendingCategories />
                        
                        {currentRankings.topFree.length > 0 ? (
                            <RankingsGrid rankings={currentRankings} onAppSelect={handleAppSelect} collapsed={false} />
                        ) : (
                            <div style={{ 
                                background: 'rgba(239,68,68,0.08)', 
                                border: '1px solid rgba(239,68,68,0.2)',
                                borderRadius: '12px',
                                padding: '32px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                                <h3 style={{ color: '#f9fafb', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No Results Found</h3>
                                <p style={{ color: '#9ca3af', fontSize: '14px' }}>Try adjusting your filters to see more results</p>
                            </div>
                        )}
                        
                        <div style={{ marginTop: '16px' }}>
                            <div className="section-header" style={{ marginBottom: '20px' }}>
                                <h2 className="section-title">Key Performance Indicators</h2>
                                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>Real-time metrics</div>
                            </div>
                            <StatsGrid kpiData={kpiSummary} />
                        </div>
                        
                        <div style={{ marginTop: '16px' }}>
                            <div className="section-header" style={{ marginBottom: '20px' }}>
                                <h2 className="section-title">Platform Revenue Comparison</h2>
                                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>Cross-platform analysis</div>
                            </div>
                            <PlatformComparisonChart data={platformComparisonData} />
                        </div>
                        
                        <div style={{ marginTop: '16px' }}>
                            <div className="section-header" style={{ marginBottom: '20px' }}>
                                <h2 className="section-title">Top Games Leaderboard</h2>
                                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>
                                    {filtersApplied && activeFilters.category !== 'All' 
                                        ? `${filteredGames.length} ${activeFilters.category} games` 
                                        : 'Top 15 performers'}
                                </div>
                            </div>
                            {filteredGames.length > 0 ? (
                                <GamesTable games={filteredGames} genres={genres} businessModels={businessModels} onGameSelect={handleAppSelect} />
                            ) : (
                                <div style={{ 
                                    background: 'rgba(239,68,68,0.08)', 
                                    border: '1px solid rgba(239,68,68,0.2)',
                                    borderRadius: '12px',
                                    padding: '32px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
                                    <h3 style={{ color: '#f9fafb', fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No Games in This Category</h3>
                                    <p style={{ color: '#9ca3af', fontSize: '14px' }}>Try selecting a different category filter</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <AppDetailView
                        key={selectedApp}
                        appName={selectedApp}
                        data={appDetailsData[selectedApp]}
                        gameData={selectedGameData}
                        onClose={() => setSelectedApp(null)}
                    />
                )}
            </div>

            {/* Filter Panel - Right Side */}
            <div className={`filter-panel-wrapper ${filtersPanelOpen ? 'mobile-open' : ''}`}>
                {/* Mobile overlay */}
                {filtersPanelOpen && (
                    <div 
                        className="filter-panel-overlay" 
                        onClick={() => setFiltersPanelOpen(false)}
                    />
                )}
                <AdvancedFilter 
                    selectedDomain={selectedDomain}
                    onDomainChange={handleDomainChange}
                    activeFilters={activeFilters}
                    onFilterChange={setActiveFilters}
                    onApply={() => {
                        handleApplyFilters();
                        setFiltersPanelOpen(false);
                    }}
                    onReset={handleResetFilters}
                    onClose={() => setFiltersPanelOpen(false)}
                />
            </div>
        </div>
    );
};

export default Overview;


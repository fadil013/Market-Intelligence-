import React, { useState, useMemo, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import StatsGrid from '../components/StatsGrid';
import PlatformComparisonChart from '../components/PlatformComparisonChart';
import GamesTable from '../components/GamesTable';
import RankingsGrid from '../components/RankingsGrid';
import AdvancedFilter from '../components/AdvancedFilter';
import AppDetailView from '../components/AppDetailView';
import TrendingCategories from '../components/TrendingCategories';
import RegionHeatmap from '../components/RegionHeatmap';
import ReviewSentiment from '../components/ReviewSentiment';
import {
    kpiSummary,
    platformComparisonData,
    allGames,
    genres,
    businessModels,
    gameRankings,
    appRankings,
    appDetailsData,
    regionalGrowth,
    reviewData
} from '../data/mockData';

const Overview = () => {
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedGameData, setSelectedGameData] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState('Games');
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
    const [regionalMetric, setRegionalMetric] = useState('growth');
    const prevFiltersRef = useRef(null);
    const [activeFilters, setActiveFilters] = useState({
        domain: 'Games',
        category: 'All',
        geography: 'Worldwide',
        timePeriod: 'Feb 2026'
    });

    // Genre → Category mapping (mirrors the filter logic)
    const genreToCategoryMap = {
        'Casual': 'Casual', 'Sandbox': 'Casual',
        'Puzzle': 'Hypercasual', 'Hypercasual': 'Hypercasual',
        'RPG': 'Midcore', 'MOBA': 'Midcore', 'Strategy': 'Midcore',
        'Shooter': 'Midcore', 'Battle Royale': 'Midcore',
    };

    const handleAppSelect = (app) => {
        setSelectedApp(null);
        setSelectedGameData(null);
        // Save current filters so we can restore them when user goes back
        prevFiltersRef.current = { ...activeFilters };
        setTimeout(() => {
            setSelectedApp(app.name);
            const fullGameData = allGames.find(g => g.name === app.name);
            const data = fullGameData || app;
            setSelectedGameData(data);
            // Auto-update the category filter based on the selected app's genre
            if (data.genre) {
                const mappedCategory = genreToCategoryMap[data.genre];
                if (mappedCategory) {
                    setActiveFilters(prev => ({ ...prev, category: mappedCategory }));
                }
            }
        }, 50);
    };

    const handleCloseDetail = () => {
        setSelectedApp(null);
        setSelectedGameData(null);
        // Restore filters that were active before opening the detail view
        if (prevFiltersRef.current) {
            setActiveFilters(prevFiltersRef.current);
            prevFiltersRef.current = null;
        }
    };

    const handleDomainChange = (domain) => {
        setSelectedDomain(domain);
        // Reset category to All when switching domains so stale game/app categories don't collide
        setActiveFilters({ ...activeFilters, domain, category: 'All' });
    };

    const handleApplyFilters = () => {
        setFiltersApplied(true);
        setFiltersPanelOpen(false); // close panel, filters already reactive
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

    // Filter rankings based on active filters — reactive, no Apply button needed
    const currentRankings = useMemo(() => {
        const baseRankings = selectedDomain === 'Games' ? gameRankings : appRankings;

        const categoryToGenres = {
            'Casual': ['Casual', 'Sandbox'],
            'Hypercasual': ['Puzzle', 'Hypercasual', 'Casual'],
            'Midcore': ['RPG', 'MOBA', 'Strategy', 'Shooter', 'Battle Royale'],
        };

        // App subcategory → app name mapping
        const appCategoryToNames = {
            'Social Media':      ['TikTok', 'Instagram', 'Facebook', 'Snapchat', 'WhatsApp'],
            'AI & Productivity': ['ChatGPT', 'Google Gemini', 'Microsoft Copilot'],
            'Entertainment':     ['YouTube', 'Spotify', 'Netflix', 'Disney+', 'Toca Boca World', 'YouTube Kids'],
            'Camera & Effects':  ['CapCut', 'Instagram', 'Snapchat'],
            'Finance':           ['Google One', 'PayPal', 'Cash App'],
            'Beauty & Style':    ['VSCO', 'Facetune'],
            'Education':         ['Duolingo', 'Khan Academy'],
            'Health & Fitness':  ['Strava', 'Calm', 'MyFitnessPal'],
            'Utility':           ['Google One', 'Files by Google', '1Password'],
            'Fashion & Design':  ['Pinterest', 'Etsy', 'SHEIN'],
        };

        const filterItems = (items) => {
            return items.filter(item => {
                const game = allGames.find(g => g.name === item.name);
                // Category filter
                if (activeFilters.category && activeFilters.category !== 'All' && activeFilters.category !== 'All Categories') {
                    if (selectedDomain === 'Apps') {
                        const allowedNames = appCategoryToNames[activeFilters.category] || [];
                        if (!allowedNames.includes(item.name)) return false;
                    } else {
                        if (!game) return true;
                        const targetGenres = categoryToGenres[activeFilters.category] || [];
                        if (!targetGenres.includes(game.genre)) return false;
                    }
                }
                // Geography filter
                if (activeFilters.geography && activeFilters.geography !== 'Worldwide') {
                    if (!game) return true;
                    const markets = game.markets || [];
                    if (!markets.includes(activeFilters.geography) && !markets.includes('Worldwide')) return false;
                }
                return true;
            });
        };

        return {
            topFree: filterItems(baseRankings.topFree),
            topGrossing: filterItems(baseRankings.topGrossing),
            topFeatured: filterItems(baseRankings.topFeatured),
        };
    }, [selectedDomain, activeFilters]);

    // Filter games for the table — reactive
    const filteredGames = useMemo(() => {
        const categoryToGenres = {
            'Casual': ['Casual', 'Sandbox'],
            'Hypercasual': ['Puzzle', 'Hypercasual', 'Casual'],
            'Midcore': ['RPG', 'MOBA', 'Strategy', 'Shooter', 'Battle Royale'],
        };

        return allGames.filter(game => {
            // Category filter — skip for Apps domain (app categories don't map to game genres)
            if (selectedDomain !== 'Apps' && activeFilters.category && activeFilters.category !== 'All' && activeFilters.category !== 'All Categories') {
                const targetGenres = categoryToGenres[activeFilters.category] || [];
                if (!targetGenres.includes(game.genre)) return false;
            }
            // Geography filter
            if (activeFilters.geography && activeFilters.geography !== 'Worldwide') {
                const markets = game.markets || [];
                if (!markets.includes(activeFilters.geography) && !markets.includes('Worldwide')) return false;
            }
            return true;
        });
    }, [selectedDomain, activeFilters]);

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
                {(activeFilters.category !== 'All' || activeFilters.geography !== 'Worldwide') && (
                    <div className="filter-badge">!</div>
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
                        
                        {(activeFilters.category !== 'All' || activeFilters.geography !== 'Worldwide') && (
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
                                        Filters Active: {activeFilters.category !== 'All' ? activeFilters.category : ''}{activeFilters.geography !== 'Worldwide' ? ` · ${activeFilters.geography}` : ''}
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
                        
                        {/* Top Trending Games List First */}
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
                        
                        {/* Trending Categories After Top Games */}
                        <TrendingCategories />
                        
                        {/* Regional Growth Heatmap - Phase 3 */}
                        <div style={{ marginTop: '16px' }}>
                            <div className="section-header" style={{ marginBottom: '20px' }}>
                                <h2 className="section-title">Regional Growth Heatmap</h2>
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '8px',
                                    alignItems: 'center'
                                }}>
                                    <button
                                        onClick={() => setRegionalMetric('growth')}
                                        style={{
                                            padding: '6px 12px',
                                            background: regionalMetric === 'growth' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                            border: regionalMetric === 'growth' ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '6px',
                                            color: regionalMetric === 'growth' ? '#60a5fa' : '#9ca3af',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        GROWTH
                                    </button>
                                    <button
                                        onClick={() => setRegionalMetric('downloads')}
                                        style={{
                                            padding: '6px 12px',
                                            background: regionalMetric === 'downloads' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                            border: regionalMetric === 'downloads' ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '6px',
                                            color: regionalMetric === 'downloads' ? '#60a5fa' : '#9ca3af',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        DOWNLOADS
                                    </button>
                                    <button
                                        onClick={() => setRegionalMetric('revenue')}
                                        style={{
                                            padding: '6px 12px',
                                            background: regionalMetric === 'revenue' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                            border: regionalMetric === 'revenue' ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: '6px',
                                            color: regionalMetric === 'revenue' ? '#60a5fa' : '#9ca3af',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        REVENUE
                                    </button>
                                </div>
                            </div>
                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <p style={{ color: '#9ca3af', fontSize: '13px' }}>Track regional download growth, revenue trends, and emerging markets across the globe</p>
                                </div>
                                <RegionHeatmap regionalData={regionalGrowth} metric={regionalMetric} />
                            </div>
                        </div>

                        {/* Review Sentiment & Feature Mining - Phase 8 */}
                        <div style={{ marginTop: '16px' }}>
                            <div className="section-header" style={{ marginBottom: '20px' }}>
                                <h2 className="section-title">💬 Review Sentiment & Feature Mining</h2>
                                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>NLP-powered user feedback analysis</div>
                            </div>
                            <div className="glass-panel" style={{ padding: '24px' }}>
                                <ReviewSentiment reviewData={reviewData} />
                            </div>
                        </div>
                        
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
                                    {(activeFilters.category !== 'All' && activeFilters.category !== 'All Categories')
                                        ? `${filteredGames.length} ${activeFilters.category} games`
                                        : activeFilters.geography !== 'Worldwide'
                                        ? `${filteredGames.length} games in ${activeFilters.geography}`
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
                        onClose={handleCloseDetail}
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
                    selectedAppData={selectedGameData}
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


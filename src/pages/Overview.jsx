import React, { useState, useMemo } from 'react';
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
    const [selectedDomain, setSelectedDomain] = useState('Games');
    const [activeFilters, setActiveFilters] = useState({
        domain: 'Games',
        category: 'All',
        geography: 'Worldwide',
        timePeriod: 'Feb 2026'
    });

    const handleAppSelect = (app) => {
        setSelectedApp(null);
        setTimeout(() => {
            setSelectedApp(app.name);
        }, 50);
    };

    const handleDomainChange = (domain) => {
        setSelectedDomain(domain);
        setActiveFilters({ ...activeFilters, domain });
    };

    const handleApplyFilters = () => {
        console.log('Filters applied:', activeFilters);
        // Filters applied - in production this would trigger API call or data refetch
        // No alert needed - filters are already visible in the UI
    };

    const handleResetFilters = () => {
        setActiveFilters({
            domain: 'Games',
            category: 'All',
            geography: 'Worldwide',
            timePeriod: 'Feb 2026'
        });
        setSelectedDomain('Games');
    };

    const currentRankings = useMemo(() => {
        return selectedDomain === 'Games' ? gameRankings : appRankings;
    }, [selectedDomain]);

    return (
        <div className="overview-container-new">
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
                        
                        <TrendingCategories />
                        
                        <RankingsGrid rankings={currentRankings} onAppSelect={handleAppSelect} collapsed={false} />
                        
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
                                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 600 }}>Top 15 performers</div>
                            </div>
                            <GamesTable games={allGames} genres={genres} businessModels={businessModels} onGameSelect={handleAppSelect} />
                        </div>
                    </div>
                ) : (
                    <AppDetailView
                        key={selectedApp}
                        appName={selectedApp}
                        data={appDetailsData[selectedApp]}
                        onClose={() => setSelectedApp(null)}
                    />
                )}
            </div>

            {/* Filter Panel - Right Side */}
            <AdvancedFilter 
                selectedDomain={selectedDomain}
                onDomainChange={handleDomainChange}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />
        </div>
    );
};

export default Overview;


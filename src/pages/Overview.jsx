import React, { useState, useMemo } from 'react';
import StatsGrid from '../components/StatsGrid';
import PlatformComparisonChart from '../components/PlatformComparisonChart';
import GamesTable from '../components/GamesTable';
import RankingsGrid from '../components/RankingsGrid';
import AdvancedFilter from '../components/AdvancedFilter';
import AppDetailView from '../components/AppDetailView';
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
        console.log('Applying filters:', activeFilters);
        // In real app, this would trigger API call or data refetch
        alert(`Filters applied:\nDomain: ${activeFilters.domain}\nCategory: ${activeFilters.category}\nRegion: ${activeFilters.geography}\nPeriod: ${activeFilters.timePeriod}`);
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
                    <div className="space-y-8">
                        <div className="page-header-new">
                            <h1 className="page-title-new">Market Overview</h1>
                            <div className="live-badge-new">
                                <div className="dot"></div>
                                <span>Live Data</span>
                            </div>
                        </div>
                        
                        <RankingsGrid rankings={currentRankings} onAppSelect={handleAppSelect} collapsed={false} />
                        <StatsGrid kpiData={kpiSummary} />
                        
                        <div className="section-header">
                            <h2 className="section-title">Platform Revenue Comparison</h2>
                        </div>
                        <PlatformComparisonChart data={platformComparisonData} />
                        
                        <div className="section-header">
                            <h2 className="section-title">Top Games Leaderboard</h2>
                        </div>
                        <GamesTable games={allGames} genres={genres} businessModels={businessModels} onGameSelect={handleAppSelect} />
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


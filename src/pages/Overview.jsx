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

    const handleAppSelect = (app) => {
        // Safe Approach: Explicitly clear selection first to ensure a 'Clean Slate' transition
        setSelectedApp(null);
        setTimeout(() => {
            setSelectedApp(app.name);
        }, 50);
    };

    const handleDomainChange = (domain) => {
        setSelectedDomain(domain);
    };

    // Dynamically select rankings based on domain filter
    const currentRankings = useMemo(() => {
        return selectedDomain === 'Games' ? gameRankings : appRankings;
    }, [selectedDomain]);

    return (
        <div className="overview-grid-container relative">
            {/* Column 1: Filters (Sticky) */}
            <div className="hidden lg:block">
                <AdvancedFilter 
                    selectedDomain={selectedDomain}
                    onDomainChange={handleDomainChange}
                />
            </div>

            {/* Column 2: Main Context (Fluid) */}
            <div className={`main-dashboard-area ${selectedApp ? 'selected-view' : ''}`}>
                <div className="page-header">
                    <div>
                        <h1 className="page-title text-4xl font-black tracking-tighter mb-2">Market Overview</h1>
                        <p className="page-subtitle text-gray-400 text-sm">Cross-platform intelligence & store rankings</p>
                    </div>
                    {!selectedApp && (
                        <div className="live-badge scale-125">
                            <div className="dot"></div>
                            <span>Live Data</span>
                        </div>
                    )}
                </div>

                <div className="space-y-8 pb-10">
                    {/* Rankings focus */}
                    <RankingsGrid rankings={currentRankings} onAppSelect={handleAppSelect} collapsed={!!selectedApp} />

                    {/* Stats focus: Only show mini version if an app is selected to save space */}
                    {!selectedApp && (
                        <div className="grid grid-cols-1 gap-8 animate-in fade-in duration-500">
                            <StatsGrid kpiData={kpiSummary} />
                            <PlatformComparisonChart data={platformComparisonData} />
                            <GamesTable games={allGames} genres={genres} businessModels={businessModels} />
                        </div>
                    )}
                </div>
            </div>

            {/* Column 3: Detail Panel (Sticky / Parallel) */}
            {selectedApp && (
                <div className="detail-panel-wrapper animate-in slide-in-from-right duration-300">
                    <AppDetailView
                        key={selectedApp}
                        appName={selectedApp}
                        data={appDetailsData[selectedApp]}
                        onClose={() => setSelectedApp(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Overview;


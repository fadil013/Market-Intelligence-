import React, { useState } from 'react';
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
    storeRankings,
    appDetailsData
} from '../data/mockData';

const Overview = () => {
    const [selectedApp, setSelectedApp] = useState(null);

    const handleAppSelect = (app) => {
        setSelectedApp(app.name);
    };

    return (
        <div className="flex gap-8 relative">
            <AdvancedFilter />

            <div className="flex-1 min-w-0">
                <div className="page-header">
                    <div>
                        <h1 className="page-title text-5xl font-black tracking-tighter mb-2">Market Overview</h1>
                        <p className="page-subtitle text-gray-400 text-lg">Cross-platform intelligence & store rankings</p>
                    </div>
                    <div className="live-badge scale-125">
                        <div className="dot"></div>
                        <span>Live Data</span>
                    </div>
                </div>

                {/* New Rankings Section requested by TL */}
                <RankingsGrid rankings={storeRankings} onAppSelect={handleAppSelect} />

                <div className="grid grid-cols-1 gap-8">
                    <StatsGrid kpiData={kpiSummary} />
                    <PlatformComparisonChart data={platformComparisonData} />
                    <GamesTable games={allGames} genres={genres} businessModels={businessModels} />
                </div>
            </div>

            {selectedApp && (
                <AppDetailView
                    appName={selectedApp}
                    data={appDetailsData[selectedApp] || appDetailsData['TikTok']} // Defaulting for demo
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </div>
    );
};

export default Overview;


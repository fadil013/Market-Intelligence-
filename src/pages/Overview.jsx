import React from 'react';
import StatsGrid from '../components/StatsGrid';
import PlatformComparisonChart from '../components/PlatformComparisonChart';
import GamesTable from '../components/GamesTable';
import { kpiSummary, platformComparisonData, allGames, genres, businessModels } from '../data/mockData';

const Overview = () => {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Market Overview</h1>
                    <p className="page-subtitle">Real-time mobile gaming market intelligence</p>
                </div>
                <div className="live-badge">
                    <div className="dot"></div>
                    <span>Live Data</span>
                </div>
            </div>

            <StatsGrid kpiData={kpiSummary} />
            <PlatformComparisonChart data={platformComparisonData} />
            <GamesTable games={allGames} genres={genres} businessModels={businessModels} />
        </div>
    );
};

export default Overview;

import React from 'react';
import { TrendingUp, TrendingDown, Download, Users, DollarSign, Star, Zap } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, colorClass }) => { // eslint-disable-line no-unused-vars
    const isPositive = changeType === 'positive';

    return (
        <div className={`glass-panel stat-card ${colorClass}`}>
            <div className="stat-header">
                <div className={`stat-icon ${colorClass}`}>
                    <Icon size={24} />
                </div>
                {change && (
                    <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {change}
                    </div>
                )}
            </div>
            <div className="stat-label">{title}</div>
            <div className="stat-value">{value}</div>
        </div>
    );
};

const StatsGrid = ({ kpiData }) => {
    const stats = [
        { title: 'Total Downloads', value: kpiData.totalDownloads, change: '+12.5%', changeType: 'positive', icon: Download, colorClass: 'purple' },
        { title: 'Monthly Active Users', value: kpiData.monthlyActiveUsers, change: '+8.2%', changeType: 'positive', icon: Users, colorClass: 'pink' },
        { title: 'Total Revenue', value: kpiData.totalRevenue, change: '+15.3%', changeType: 'positive', icon: DollarSign, colorClass: 'green' },
        { title: 'Average Rating', value: kpiData.avgRating, change: '+0.2', changeType: 'positive', icon: Star, colorClass: 'amber' },
        { title: 'Top Booster', value: kpiData.topBooster, change: kpiData.topBoosterGain, changeType: 'positive', icon: Zap, colorClass: 'cyan' },
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatsGrid;

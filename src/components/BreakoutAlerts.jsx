import React, { useState } from 'react';
import { 
    Bell, 
    TrendingUp, 
    Users, 
    DollarSign, 
    Globe, 
    Gamepad2, 
    Filter,
    Clock,
    AlertCircle,
    ExternalLink,
    ChevronRight,
    Zap
} from 'lucide-react';

const BreakoutAlerts = ({ alertsData }) => {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const alertTypes = [
        { id: 'all', label: 'All Alerts', icon: Bell, color: 'gray' },
        { id: 'rank', label: 'Rank Velocity', icon: TrendingUp, color: 'blue' },
        { id: 'publisher', label: 'New Publisher', icon: Users, color: 'purple' },
        { id: 'revenue', label: 'Revenue Milestone', icon: DollarSign, color: 'green' },
        { id: 'regional', label: 'Regional Breakout', icon: Globe, color: 'orange' },
        { id: 'mechanic', label: 'Mechanic Trend', icon: Gamepad2, color: 'pink' }
    ];

    const periodOptions = [
        { id: 'today', label: 'Today', hours: 24 },
        { id: 'week', label: 'This Week', hours: 168 },
        { id: 'month', label: 'This Month', hours: 720 }
    ];

    const getAlertIcon = (type) => {
        switch(type) {
            case 'rank': return <TrendingUp className="w-5 h-5" />;
            case 'publisher': return <Users className="w-5 h-5" />;
            case 'revenue': return <DollarSign className="w-5 h-5" />;
            case 'regional': return <Globe className="w-5 h-5" />;
            case 'mechanic': return <Gamepad2 className="w-5 h-5" />;
            default: return <Bell className="w-5 h-5" />;
        }
    };

    const getAlertColor = (type) => {
        switch(type) {
            case 'rank': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
            case 'publisher': return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' };
            case 'revenue': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' };
            case 'regional': return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' };
            case 'mechanic': return { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' };
            default: return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' };
        }
    };

    const getSeverityBadge = (severity) => {
        const severityConfig = {
            critical: { label: 'Critical', color: 'bg-red-500/20 text-red-400 border border-red-500/30' },
            high: { label: 'High', color: 'bg-orange-500/20 text-orange-400 border border-orange-500/30' },
            medium: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
            low: { label: 'Low', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' }
        };
        const config = severityConfig[severity] || severityConfig.low;
        return (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const getTimeAgo = (hoursAgo) => {
        if (hoursAgo < 1) return 'Just now';
        if (hoursAgo < 24) return `${Math.floor(hoursAgo)}h ago`;
        const days = Math.floor(hoursAgo / 24);
        return `${days}d ago`;
    };

    // Filter alerts
    const filteredAlerts = alertsData.filter(alert => {
        const periodHours = periodOptions.find(p => p.id === selectedPeriod)?.hours || 168;
        const typeMatch = selectedType === 'all' || alert.type === selectedType;
        const periodMatch = alert.hoursAgo <= periodHours;
        return typeMatch && periodMatch;
    }).sort((a, b) => a.hoursAgo - b.hoursAgo);

    // Group alerts by time
    const groupedAlerts = {
        today: filteredAlerts.filter(a => a.hoursAgo <= 24),
        week: filteredAlerts.filter(a => a.hoursAgo > 24 && a.hoursAgo <= 168),
        older: filteredAlerts.filter(a => a.hoursAgo > 168)
    };

    // Calculate summary stats
    const criticalCount = filteredAlerts.filter(a => a.severity === 'critical').length;
    const highCount = filteredAlerts.filter(a => a.severity === 'high').length;
    const totalAlerts = filteredAlerts.length;

    // Get alert type distribution
    const alertTypeDistribution = alertTypes.slice(1).map(type => {
        const count = filteredAlerts.filter(a => a.type === type.id).length;
        return { type: type.label, count, icon: type.icon, color: type.color };
    }).filter(item => item.count > 0);

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Critical Alerts</p>
                            <p className="text-3xl font-bold text-red-400 mt-1">{criticalCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Require immediate attention</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">High Priority</p>
                            <p className="text-3xl font-bold text-orange-400 mt-1">{highCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/10">
                            <Zap className="w-6 h-6 text-orange-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Action recommended</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Alerts</p>
                            <p className="text-3xl font-bold text-blue-400 mt-1">{totalAlerts}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10">
                            <Bell className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">In selected period</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Alert Types</p>
                            <p className="text-3xl font-bold text-purple-400 mt-1">{alertTypeDistribution.length}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <Filter className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Active categories</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-panel p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Period Filter */}
                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Time Period
                        </label>
                        <div className="flex gap-2">
                            {periodOptions.map(period => (
                                <button
                                    key={period.id}
                                    onClick={() => setSelectedPeriod(period.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        selectedPeriod === period.id
                                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                            : 'bg-slate-700/50 text-gray-400 border border-slate-600/30 hover:bg-slate-600/50'
                                    }`}
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Alert Type
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            {alertTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Alert Type Distribution */}
            {alertTypeDistribution.length > 0 && (
                <div className="glass-panel p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Alert Distribution
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {alertTypeDistribution.map((item, index) => {
                            const Icon = item.icon;
                            const colorClass = `text-${item.color}-400`;
                            const bgClass = `bg-${item.color}-500/10`;
                            return (
                                <div key={index} className={`${bgClass} p-3 rounded-lg border border-${item.color}-500/20`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon className={`w-4 h-4 ${colorClass}`} />
                                        <span className="text-xs text-gray-400">{item.type}</span>
                                    </div>
                                    <p className={`text-2xl font-bold ${colorClass}`}>{item.count}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Alerts Feed */}
            <div className="space-y-6">
                {/* Today Alerts */}
                {groupedAlerts.today.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <h3 className="text-lg font-semibold text-white">Today</h3>
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold">
                                {groupedAlerts.today.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {groupedAlerts.today.map((alert, index) => {
                                const colors = getAlertColor(alert.type);
                                return (
                                    <div
                                        key={index}
                                        className={`glass-panel p-4 border-l-4 ${colors.border} hover:scale-[1.01] transition-transform cursor-pointer`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={`p-2 rounded-lg ${colors.bg}`}>
                                                    <span className={colors.text}>
                                                        {getAlertIcon(alert.type)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {getSeverityBadge(alert.severity)}
                                                        <span className="text-xs text-gray-500">{getTimeAgo(alert.hoursAgo)}</span>
                                                    </div>
                                                    <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                                                    <p className="text-gray-400 text-sm mb-2">{alert.message}</p>
                                                    {alert.metrics && (
                                                        <div className="flex flex-wrap gap-3 mt-2">
                                                            {alert.metrics.map((metric, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <span className="text-xs text-gray-500">{metric.label}:</span>
                                                                    <span className={`text-xs font-semibold ${metric.positive ? 'text-green-400' : 'text-blue-400'}`}>
                                                                        {metric.value}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-colors flex items-center gap-1">
                                                View
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* This Week Alerts */}
                {groupedAlerts.week.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <h3 className="text-lg font-semibold text-white">This Week</h3>
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                                {groupedAlerts.week.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {groupedAlerts.week.map((alert, index) => {
                                const colors = getAlertColor(alert.type);
                                return (
                                    <div
                                        key={index}
                                        className={`glass-panel p-4 border-l-4 ${colors.border} hover:scale-[1.01] transition-transform cursor-pointer opacity-90`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={`p-2 rounded-lg ${colors.bg}`}>
                                                    <span className={colors.text}>
                                                        {getAlertIcon(alert.type)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {getSeverityBadge(alert.severity)}
                                                        <span className="text-xs text-gray-500">{getTimeAgo(alert.hoursAgo)}</span>
                                                    </div>
                                                    <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                                                    <p className="text-gray-400 text-sm mb-2">{alert.message}</p>
                                                    {alert.metrics && (
                                                        <div className="flex flex-wrap gap-3 mt-2">
                                                            {alert.metrics.map((metric, idx) => (
                                                                <div key={idx} className="flex items-center gap-1">
                                                                    <span className="text-xs text-gray-500">{metric.label}:</span>
                                                                    <span className={`text-xs font-semibold ${metric.positive ? 'text-green-400' : 'text-blue-400'}`}>
                                                                        {metric.value}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-colors flex items-center gap-1">
                                                View
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Older Alerts */}
                {groupedAlerts.older.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <h3 className="text-lg font-semibold text-white">Earlier</h3>
                            <span className="px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs font-semibold">
                                {groupedAlerts.older.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {groupedAlerts.older.map((alert, index) => {
                                const colors = getAlertColor(alert.type);
                                return (
                                    <div
                                        key={index}
                                        className={`glass-panel p-4 border-l-4 ${colors.border} hover:scale-[1.01] transition-transform cursor-pointer opacity-75`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={`p-2 rounded-lg ${colors.bg}`}>
                                                    <span className={colors.text}>
                                                        {getAlertIcon(alert.type)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {getSeverityBadge(alert.severity)}
                                                        <span className="text-xs text-gray-500">{getTimeAgo(alert.hoursAgo)}</span>
                                                    </div>
                                                    <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                                                    <p className="text-gray-400 text-sm">{alert.message}</p>
                                                </div>
                                            </div>
                                            <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-colors flex items-center gap-1">
                                                View
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* No Alerts Message */}
                {filteredAlerts.length === 0 && (
                    <div className="glass-panel p-12 text-center">
                        <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">No Alerts Found</h3>
                        <p className="text-gray-400 text-sm">
                            No breakout alerts match your selected filters. Try adjusting the time period or alert type.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BreakoutAlerts;

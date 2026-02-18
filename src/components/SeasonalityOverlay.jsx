import React, { useState } from 'react';
import { 
    Calendar, 
    TrendingUp, 
    Star, 
    Gift, 
    Trophy, 
    Sparkles,
    Clock,
    Filter,
    ChevronRight,
    CircleDot,
    Gamepad2,
    Store,
    Globe
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SeasonalityOverlay = ({ seasonalData }) => {
    const [selectedEventType, setSelectedEventType] = useState('all');
    const [selectedImpact, setSelectedImpact] = useState('all');
    const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, insights

    const eventTypes = [
        { id: 'all', label: 'All Events', icon: Calendar, color: 'gray' },
        { id: 'holiday', label: 'Holidays', icon: Gift, color: 'red' },
        { id: 'gaming', label: 'Gaming Events', icon: Gamepad2, color: 'purple' },
        { id: 'platform', label: 'Platform Promos', icon: Store, color: 'blue' },
        { id: 'cultural', label: 'Cultural', icon: Globe, color: 'green' }
    ];

    const impactLevels = ['all', 'high', 'medium', 'low'];

    const getEventIcon = (type) => {
        switch(type) {
            case 'holiday': return <Gift className="w-5 h-5" />;
            case 'gaming': return <Gamepad2 className="w-5 h-5" />;
            case 'platform': return <Store className="w-5 h-5" />;
            case 'cultural': return <Globe className="w-5 h-5" />;
            default: return <Calendar className="w-5 h-5" />;
        }
    };

    const getEventColor = (type) => {
        switch(type) {
            case 'holiday': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-500' };
            case 'gaming': return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', dot: 'bg-purple-500' };
            case 'platform': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-500' };
            case 'cultural': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', dot: 'bg-green-500' };
            default: return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', dot: 'bg-gray-500' };
        }
    };

    const getImpactBadge = (impact) => {
        const configs = {
            high: { label: 'High Impact', color: 'bg-red-500/20 text-red-400 border border-red-500/30' },
            medium: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
            low: { label: 'Low', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' }
        };
        const config = configs[impact] || configs.low;
        return <span className={`px-2 py-1 rounded text-xs font-semibold ${config.color}`}>{config.label}</span>;
    };

    const getDaysUntil = (dateStr) => {
        const eventDate = new Date(dateStr);
        const today = new Date();
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        return `In ${diffDays} days`;
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Filter events
    const filteredEvents = seasonalData.filter(event => {
        const typeMatch = selectedEventType === 'all' || event.type === selectedEventType;
        const impactMatch = selectedImpact === 'all' || event.impact === selectedImpact;
        return typeMatch && impactMatch;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get upcoming events (next 90 days)
    const today = new Date();
    const ninetyDaysFromNow = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000));
    const upcomingEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= ninetyDaysFromNow;
    });

    // Calculate summary stats
    const highImpactCount = upcomingEvents.filter(e => e.impact === 'high').length;
    const mediumImpactCount = upcomingEvents.filter(e => e.impact === 'medium').length;
    const totalOpportunities = upcomingEvents.length;

    // Get event type distribution
    const eventTypeDistribution = eventTypes.slice(1).map(type => {
        const count = upcomingEvents.filter(e => e.type === type.id).length;
        return { type: type.label, count, icon: type.icon, color: type.color };
    }).filter(item => item.count > 0);

    // Prepare performance correlation data
    const getPerformanceData = () => {
        const data = [];
        upcomingEvents.slice(0, 10).forEach(event => {
            if (event.gamePerformance) {
                Object.entries(event.gamePerformance).forEach(([game, perf]) => {
                    const spikeValue = parseInt(perf.spike.replace(/[+%]/g, ''));
                    data.push({
                        event: event.name.substring(0, 15),
                        game: game.substring(0, 20),
                        spike: spikeValue,
                        fullEvent: event.name,
                        fullGame: game,
                        reason: perf.reason
                    });
                });
            }
        });
        return data.slice(0, 12).sort((a, b) => b.spike - a.spike);
    };

    const performanceData = getPerformanceData();

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">High Impact Events</p>
                            <p className="text-3xl font-bold text-red-400 mt-1">{highImpactCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10">
                            <Star className="w-6 h-6 text-red-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Next 90 days</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Medium Impact</p>
                            <p className="text-3xl font-bold text-yellow-400 mt-1">{mediumImpactCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10">
                            <Trophy className="w-6 h-6 text-yellow-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Moderate opportunities</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Opportunities</p>
                            <p className="text-3xl font-bold text-purple-400 mt-1">{totalOpportunities}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <Calendar className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Events tracked</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Event Categories</p>
                            <p className="text-3xl font-bold text-blue-400 mt-1">{eventTypeDistribution.length}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10">
                            <Sparkles className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Active types</p>
                </div>
            </div>

            {/* Filters & View Switcher */}
            <div className="glass-panel p-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {/* Event Type Filter */}
                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Event Type
                        </label>
                        <select
                            value={selectedEventType}
                            onChange={(e) => setSelectedEventType(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            {eventTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Impact Filter */}
                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Impact Level
                        </label>
                        <select
                            value={selectedImpact}
                            onChange={(e) => setSelectedImpact(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            {impactLevels.map(level => (
                                <option key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)} Impact
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* View Mode Switcher */}
                <div className="flex gap-2">
                    {['timeline', 'performance', 'insights'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                viewMode === mode
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'bg-slate-700/50 text-gray-400 border border-slate-600/30 hover:bg-slate-600/50'
                            }`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline View */}
            {viewMode === 'timeline' && (
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        Upcoming Events Timeline
                    </h3>
                    <div className="space-y-4">
                        {upcomingEvents.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No upcoming events match your filters</p>
                            </div>
                        ) : (
                            upcomingEvents.map((event, index) => {
                                const colors = getEventColor(event.type);
                                const isUpcoming = new Date(event.date) > today;
                                return (
                                    <div key={index} className="relative">
                                        {/* Timeline dot and line */}
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-700/50" />
                                        <div className={`absolute left-[-5px] top-6 w-3 h-3 rounded-full ${colors.dot}`} />
                                        
                                        {/* Event card */}
                                        <div className={`ml-8 glass-panel p-4 border-l-4 ${colors.border} hover:scale-[1.01] transition-transform`}>
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                                                        <span className={colors.text}>
                                                            {getEventIcon(event.type)}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {getImpactBadge(event.impact)}
                                                            <span className="text-xs text-gray-500">{getDaysUntil(event.date)}</span>
                                                            <span className="text-xs text-gray-600">•</span>
                                                            <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                                                        </div>
                                                        <h4 className="text-white font-semibold mb-1">{event.name}</h4>
                                                        <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                                                        
                                                        {/* Game Performance Preview */}
                                                        {event.gamePerformance && (
                                                            <div className="mt-3 pt-3 border-t border-slate-700/50">
                                                                <p className="text-xs text-gray-500 mb-2">Expected Performance Impact:</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    {Object.entries(event.gamePerformance).slice(0, 2).map(([game, perf], idx) => (
                                                                        <div key={idx} className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                                                                            <div>
                                                                                <p className="text-xs font-semibold text-white">{game}</p>
                                                                                <p className="text-xs text-gray-500">{perf.reason}</p>
                                                                            </div>
                                                                            <span className="text-green-400 font-bold text-sm">{perf.spike}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* Performance Correlation View */}
            {viewMode === 'performance' && (
                <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        Event-Performance Correlation
                    </h3>
                    {performanceData.length === 0 ? (
                        <div className="text-center py-12">
                            <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No performance data available for selected events</p>
                        </div>
                    ) : (
                        <>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis 
                                        dataKey="game" 
                                        stroke="#94a3b8" 
                                        fontSize={12}
                                        angle={-45}
                                        textAnchor="end"
                                        height={100}
                                    />
                                    <YAxis stroke="#94a3b8" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid #334155',
                                            borderRadius: '8px'
                                        }}
                                        formatter={(value, name, props) => [
                                            `${value}% spike`,
                                            props.payload.fullGame
                                        ]}
                                        labelFormatter={(label, payload) => {
                                            if (payload && payload[0]) {
                                                return `Event: ${payload[0].payload.fullEvent}`;
                                            }
                                            return label;
                                        }}
                                    />
                                    <Bar dataKey="spike" name="Performance Spike">
                                        {performanceData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.spike > 200 ? '#10b981' : entry.spike > 100 ? '#8b5cf6' : '#3b82f6'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Legend */}
                            <div className="flex items-center justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-emerald-500" />
                                    <span className="text-xs text-gray-400">High Impact (&gt;200%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-purple-500" />
                                    <span className="text-xs text-gray-400">Medium Impact (100-200%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-blue-500" />
                                    <span className="text-xs text-gray-400">Low Impact (&lt;100%)</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Insights View */}
            {viewMode === 'insights' && (
                <div className="space-y-4">
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            Key Seasonality Insights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Store className="w-5 h-5 text-blue-400" />
                                    <h4 className="text-white font-semibold">Platform Features</h4>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">
                                    Games featured by <strong>Apple editorial</strong> see average spike within <strong>48 hours</strong>
                                </p>
                                <p className="text-blue-400 text-xs">Impact: +150-300% downloads</p>
                            </div>

                            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Gift className="w-5 h-5 text-red-400" />
                                    <h4 className="text-white font-semibold">Holiday Patterns</h4>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">
                                    Holiday puzzle games see <strong>+120% average</strong> engagement during December
                                </p>
                                <p className="text-red-400 text-xs">Peak: Dec 20-26</p>
                            </div>

                            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Globe className="w-5 h-5 text-green-400" />
                                    <h4 className="text-white font-semibold">Cultural Events</h4>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">
                                    Sports games spike <strong>+200%</strong> during major events like Olympics and World Cup
                                </p>
                                <p className="text-green-400 text-xs">Duration: 2-4 weeks</p>
                            </div>

                            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Gamepad2 className="w-5 h-5 text-purple-400" />
                                    <h4 className="text-white font-semibold">Gaming Events</h4>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">
                                    Steam Sales and major gaming events drive <strong>+180%</strong> wishlists and downloads
                                </p>
                                <p className="text-purple-400 text-xs">Best ROI: Week before event</p>
                            </div>
                        </div>
                    </div>

                    {/* Top Upcoming Opportunities */}
                    <div className="glass-panel p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            Top Upcoming Opportunities
                        </h3>
                        <div className="space-y-3">
                            {upcomingEvents.filter(e => e.impact === 'high').slice(0, 5).map((event, index) => {
                                const colors = getEventColor(event.type);
                                return (
                                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-slate-800/50`}>
                                                <span className={colors.text}>
                                                    {getEventIcon(event.type)}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold text-sm">{event.name}</h4>
                                                <p className="text-gray-500 text-xs">{formatDate(event.date)} • {getDaysUntil(event.date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getImpactBadge(event.impact)}
                                            <ChevronRight className="w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeasonalityOverlay;

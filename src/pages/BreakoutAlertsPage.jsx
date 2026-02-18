import React from 'react';
import { Bell, TrendingUp } from 'lucide-react';
import { alertsData } from '../data/mockData';
import BreakoutAlerts from '../components/BreakoutAlerts';

const BreakoutAlertsPage = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Bell className="text-purple-500" />
                        Early Breakout Alerts
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Real-time automated notifications for emerging trends and market opportunities
                    </p>
                </div>
                <div className="flex items-center gap-2 glass-panel px-4 py-2 border-l-4 border-purple-500">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <div>
                        <p className="text-xs text-gray-400">Active Monitoring</p>
                        <p className="text-sm font-semibold text-white">{alertsData.length} Alerts</p>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="glass-panel p-4 border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                        <h4 className="text-white font-semibold mb-1">How Breakout Alerts Work</h4>
                        <p className="text-gray-400 text-sm">
                            Our system monitors 5 critical signals in real-time: Rank Velocity (sudden rank jumps), 
                            New Publishers (emerging studios), Revenue Milestones (financial breakouts), 
                            Regional Breakouts (geographic spikes), and Mechanic Trends (gameplay innovations). 
                            Alerts are automatically prioritized by severity to help you catch trends before they become obvious.
                        </p>
                    </div>
                </div>
            </div>

            {/* Alerts Component */}
            <BreakoutAlerts alertsData={alertsData} />
        </div>
    );
};

export default BreakoutAlertsPage;

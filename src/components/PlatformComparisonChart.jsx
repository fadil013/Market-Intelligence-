import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel" style={{ padding: '12px', background: 'rgba(30,41,59,0.95)' }}>
                <p style={{ color: '#fff', fontWeight: 600, marginBottom: '8px' }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color, fontSize: '14px' }}>
                        {entry.name}: ${(entry.value / 1000).toFixed(1)}K
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const PlatformComparisonChart = React.memo(({ data }) => {
    return (
        <div className="glass-panel chart-container">
            <div className="chart-header">
                <div>
                    <h3 className="chart-title">Platform Revenue Comparison</h3>
                    <p className="chart-subtitle">Monthly revenue across stores (in USD)</p>
                </div>
                <div className="chart-legend">
                    <div className="legend-item">
                        <div className="legend-dot purple"></div>
                        <span>Google Play</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot pink"></div>
                        <span>App Store</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-dot cyan"></div>
                        <span>Amazon</span>
                    </div>
                </div>
            </div>

            <div className="chart-area">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorApple" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorAmazon" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}K`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="googlePlay" name="Google Play" stroke="#3b82f6" strokeWidth={2} fill="url(#colorGoogle)" />
                        <Area type="monotone" dataKey="appStore" name="App Store" stroke="#ec4899" strokeWidth={2} fill="url(#colorApple)" />
                        <Area type="monotone" dataKey="amazon" name="Amazon" stroke="#06b6d4" strokeWidth={2} fill="url(#colorAmazon)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

export default PlatformComparisonChart;

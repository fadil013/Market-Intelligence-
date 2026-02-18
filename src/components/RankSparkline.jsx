import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

/**
 * Rank Sparkline Component
 * Mini trend chart showing rank changes over time
 * 
 * @param {object} rankHistory - { "24h": -15, "7d": -67, "30d": -145 }
 * @param {number} width - Chart width in pixels
 * @param {number} height - Chart height in pixels
 * @param {string} color - Line color (auto-determined from trend if not provided)
 */
const RankSparkline = ({ 
    rankHistory = {}, 
    width = 60, 
    height = 24,
    color = null 
}) => {
    // Convert rank history to chart data
    // Note: Rank changes are NEGATIVE for improvements (rank 100 -> 50 = -50)
    const chartData = [];
    
    if (rankHistory['30d'] !== undefined) {
        chartData.push({ time: '30d', value: Math.abs(rankHistory['30d']) });
    }
    if (rankHistory['7d'] !== undefined) {
        chartData.push({ time: '7d', value: Math.abs(rankHistory['7d']) });
    }
    if (rankHistory['24h'] !== undefined) {
        chartData.push({ time: '24h', value: Math.abs(rankHistory['24h']) });
    }

    // If no data, return empty
    if (chartData.length === 0) {
        return null;
    }

    // Determine trend direction (are ranks improving or declining?)
    const latestChange = rankHistory['24h'] || rankHistory['7d'] || 0;
    const isImproving = latestChange < 0; // Negative rank change = improvement
    const isStable = Math.abs(latestChange) < 5;

    // Auto-determine color based on trend
    let lineColor = color;
    if (!lineColor) {
        if (isStable) {
            lineColor = '#6b7280'; // gray
        } else if (isImproving) {
            lineColor = '#10b981'; // green
        } else {
            lineColor = '#ef4444'; // red
        }
    }

    return (
        <div 
            className="rank-sparkline"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                display: 'inline-block'
            }}
            title={`Rank changes: 24h: ${rankHistory['24h'] || 'N/A'}, 7d: ${rankHistory['7d'] || 'N/A'}, 30d: ${rankHistory['30d'] || 'N/A'}`}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={lineColor}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RankSparkline;

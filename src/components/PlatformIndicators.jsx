import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Platform Presence Indicators
 * Shows game rankings across multiple platforms
 * 
 * @param {object} platformPresence - { googlePlay: {rank, change}, appStore: {rank, change}, amazon: {rank, change} }
 * @param {boolean} compact - Show compact version (icons only)
 */
const PlatformIndicators = ({ platformPresence = {}, compact = false }) => {
    const platforms = [
        {
            key: 'googlePlay',
            name: 'Google Play',
            abbr: 'GP',
            color: '#34A853',
            bgColor: 'rgba(52, 168, 83, 0.15)'
        },
        {
            key: 'appStore',
            name: 'App Store',
            abbr: 'AS',
            color: '#007AFF',
            bgColor: 'rgba(0, 122, 255, 0.15)'
        },
        {
            key: 'amazon',
            name: 'Amazon',
            abbr: 'AMZ',
            color: '#FF9900',
            bgColor: 'rgba(255, 153, 0, 0.15)'
        }
    ];

    const activePlatforms = platforms.filter(p => platformPresence[p.key]);

    if (activePlatforms.length === 0) {
        return null;
    }

    if (compact) {
        return (
            <div 
                className="platform-indicators-compact"
                style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                }}
            >
                {activePlatforms.map(platform => {
                    const data = platformPresence[platform.key];
                    return (
                        <div
                            key={platform.key}
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: platform.color,
                                opacity: 0.8
                            }}
                            title={`${platform.name}: Rank #${data.rank}`}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <div 
            className="platform-indicators"
            style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
            }}
        >
            {activePlatforms.map(platform => {
                const data = platformPresence[platform.key];
                const isPositive = data.change < 0; // Negative change = rank improvement

                return (
                    <div
                        key={platform.key}
                        className="platform-indicator"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 8px',
                            background: platform.bgColor,
                            border: `1px solid ${platform.color}40`,
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600
                        }}
                        title={`${platform.name} Rank`}
                    >
                        <span style={{ color: platform.color, fontWeight: 700 }}>
                            {platform.abbr}
                        </span>
                        <span style={{ color: '#fff' }}>
                            #{data.rank}
                        </span>
                        {data.change !== 0 && (
                            <span 
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: isPositive ? '#10b981' : '#ef4444',
                                    fontSize: '10px'
                                }}
                            >
                                {isPositive ? (
                                    <TrendingUp size={10} />
                                ) : (
                                    <TrendingDown size={10} />
                                )}
                                {Math.abs(data.change)}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PlatformIndicators;

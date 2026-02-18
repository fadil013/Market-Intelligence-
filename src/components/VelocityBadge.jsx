import React from 'react';
import { TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react';

/**
 * Velocity Badge Component
 * Displays game trend velocity score with color-coded indicators
 * 
 * @param {number} score - Velocity score (0-100)
 * @param {string} size - Badge size: 'sm', 'md', 'lg'
 * @param {boolean} showLabel - Show "Velocity" label
 */
const VelocityBadge = ({ score = 0, size = 'md', showLabel = false }) => {
    // Determine velocity category
    const getVelocityData = (score) => {
        if (score >= 85) {
            return {
                label: 'Explosive',
                icon: Zap,
                color: '#10b981',
                bgColor: 'rgba(16, 185, 129, 0.15)',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                emoji: '🚀'
            };
        } else if (score >= 70) {
            return {
                label: 'Surging',
                icon: TrendingUp,
                color: '#3b82f6',
                bgColor: 'rgba(59, 130, 246, 0.15)',
                borderColor: 'rgba(59, 130, 246, 0.4)',
                emoji: '📈'
            };
        } else if (score >= 50) {
            return {
                label: 'Rising',
                icon: TrendingUp,
                color: '#6b7280',
                bgColor: 'rgba(107, 114, 128, 0.15)',
                borderColor: 'rgba(107, 114, 128, 0.4)',
                emoji: '➡️'
            };
        } else if (score >= 30) {
            return {
                label: 'Stable',
                icon: Minus,
                color: '#9ca3af',
                bgColor: 'rgba(156, 163, 175, 0.15)',
                borderColor: 'rgba(156, 163, 175, 0.3)',
                emoji: '⏸️'
            };
        } else {
            return {
                label: 'Declining',
                icon: TrendingDown,
                color: '#ef4444',
                bgColor: 'rgba(239, 68, 68, 0.15)',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                emoji: '📉'
            };
        }
    };

    const velocityData = getVelocityData(score);
    const Icon = velocityData.icon;

    // Size configurations
    const sizeConfig = {
        sm: {
            padding: '4px 8px',
            fontSize: '11px',
            iconSize: 12,
            gap: '4px'
        },
        md: {
            padding: '6px 12px',
            fontSize: '12px',
            iconSize: 14,
            gap: '6px'
        },
        lg: {
            padding: '8px 14px',
            fontSize: '14px',
            iconSize: 16,
            gap: '8px'
        }
    };

    const config = sizeConfig[size];

    return (
        <div
            className="velocity-badge"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: config.gap,
                padding: config.padding,
                background: velocityData.bgColor,
                border: `1px solid ${velocityData.borderColor}`,
                borderRadius: '6px',
                color: velocityData.color,
                fontSize: config.fontSize,
                fontWeight: 700,
                whiteSpace: 'nowrap'
            }}
            title={`Velocity Score: ${score}/100 - ${velocityData.label}`}
        >
            <Icon size={config.iconSize} />
            <span>{score}</span>
            {showLabel && <span style={{ opacity: 0.8 }}>{velocityData.label}</span>}
        </div>
    );
};

export default VelocityBadge;

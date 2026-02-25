import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { X, TrendingUp, TrendingDown, Download, DollarSign, Star, Globe, Activity, Zap, Award, Users, BarChart2, Smartphone } from 'lucide-react';
import GameIcon from './GameIcon';

// Generate a plausible 7-day performance curve from velocity/boost data
const generateHistory = (gameData) => {
    if (!gameData) return [];
    const base = gameData.monthlyRevenue / 30 / 1_000_000;
    const dlBase = gameData.monthlyDownloads / 30 / 1_000_000;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const momentum = gameData.velocityTrend === 'surging' ? 0.06 :
                     gameData.velocityTrend === 'rising'  ? 0.03 :
                     gameData.velocityTrend === 'declining' ? -0.03 : 0.01;
    return days.map((day, i) => ({
        day,
        revenue: parseFloat((base * (1 + momentum * i) * (0.92 + Math.random() * 0.16)).toFixed(2)),
        downloads: parseFloat((dlBase * (1 + momentum * i) * (0.92 + Math.random() * 0.16)).toFixed(2)),
    }));
};

// Build geo distribution from markets array
const generateGeo = (gameData) => {
    if (!gameData) return [];
    const marketColors = {
        'USA': '#3b82f6', 'China': '#ef4444', 'Japan': '#f59e0b',
        'Europe': '#10b981', 'Worldwide': '#8b5cf6', 'India': '#ec4899',
        'Others': '#64748b',
    };
    const markets = gameData.markets || ['Worldwide'];
    const perMarket = Math.floor(80 / markets.length);
    const result = markets.map((m, i) => ({
        region: m, percentage: i === 0 ? perMarket + 5 : perMarket,
        color: marketColors[m] || `hsl(${i * 70},60%,55%)`
    }));
    const used = result.reduce((s, r) => s + r.percentage, 0);
    if (used < 100) result.push({ region: 'Others', percentage: 100 - used, color: '#64748b' });
    return result;
};

const RankBadge = ({ label, value, color }) => (
    <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4, fontWeight: 500 }}>{label}</div>
        <div style={{
            fontSize: 15, fontWeight: 700,
            color: value < 0 ? '#10b981' : value > 0 ? '#f87171' : '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3
        }}>
            {value < 0 ? <TrendingUp size={13} /> : value > 0 ? <TrendingDown size={13} /> : null}
            {value === 0 ? 'â€”' : `${Math.abs(value)}`}
        </div>
    </div>
);

const StatCard = ({ icon, label, value, sub, accent }) => (
    <div style={{
        background: 'rgba(30,41,59,0.7)', borderRadius: 10, padding: '14px 16px',
        border: `1px solid rgba(${accent || '99,102,241'},0.18)`, flex: 1
    }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
            <span style={{ color: `rgb(${accent || '99,102,241'})`, opacity: 0.8 }}>{icon}</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>{sub}</div>}
    </div>
);

const AccelBadge = ({ acceleration, velocityTrend }) => {
    const map = {
        explosive: { label: 'Explosive Growth', bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.35)' },
        high:      { label: 'High Acceleration', bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.35)' },
        medium:    { label: 'Steady Momentum', bg: 'rgba(245,158,11,0.15)', color: '#fcd34d', border: 'rgba(245,158,11,0.35)' },
        stable:    { label: 'Stable', bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)' },
        declining: { label: 'Declining', bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
    };
    const s = map[velocityTrend] || map[acceleration] || map.stable;
    return (
        <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`
        }}>{s.label}</span>
    );
};

const AppDetailView = ({ appName, data, onClose, gameData }) => {
    // Use persisted appDetailsData if available, otherwise build from gameData
    const detail = data || {};
    const history = detail.performanceHistory?.length ? detail.performanceHistory : generateHistory(gameData);
    const geo = detail.geoDist?.length ? detail.geoDist : generateGeo(gameData);
    const accentHex = gameData?.color || '#6366f1';
    // Convert hex color to rgb components for CSS rgba usage
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    };
    const accent = hexToRgb(accentHex.startsWith('#') ? accentHex : '#6366f1');

    const bModel = gameData?.businessModel;
    const genre = gameData?.genre;
    const platform = gameData?.platform;
    const rating = gameData?.rating ?? detail.rating;
    const downloads = gameData?.monthlyDownloads
        ? `${(gameData.monthlyDownloads / 1_000_000).toFixed(1)}M / mo`
        : detail.downloads || 'â€”';
    const revenue = gameData?.monthlyRevenue
        ? `$${(gameData.monthlyRevenue / 1_000_000).toFixed(0)}M / mo`
        : detail.revenue || 'â€”';
    const velocityScore = gameData?.velocityScore ?? 0;
    const boostScore = gameData?.boostScore ?? 0;
    const rankHistory = gameData?.rankHistory || {};
    const platformPresence = gameData?.platformPresence || {};

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '100%',
            background: 'rgba(10,15,30,0.97)', overflow: 'hidden'
        }}>
            {/* Sticky Header */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 20, padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <button onClick={onClose} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer'
                }}>
                    <X size={13} /> Close
                </button>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, fontWeight: 700, color: '#10b981',
                    background: 'rgba(16,185,129,0.1)', padding: '4px 10px',
                    borderRadius: 20, border: '1px solid rgba(16,185,129,0.25)'
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    Live Analytics
                </div>
            </div>

            {/* Scrollable Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div style={{
                    background: `linear-gradient(135deg, rgba(${accent},0.12) 0%, rgba(${accent},0.04) 100%)`,
                    border: `1px solid rgba(${accent},0.25)`,
                    borderRadius: 14, padding: '20px 20px 18px',
                    display: 'flex', alignItems: 'center', gap: 16
                }}>
                    <GameIcon name={appName} fallback={gameData?.icon || 'ðŸŽ®'} color={accentHex} size={64} borderRadius={16} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>{appName}</h2>
                        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {genre && <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `rgba(${accent},0.18)`, color: accentHex, border: `1px solid rgba(${accent},0.35)` }}>{genre}</span>}
                            {platform && <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(30,41,59,0.9)', color: '#94a3b8', border: '1px solid rgba(71,85,105,0.5)' }}>{platform}</span>}
                            {bModel && <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(30,41,59,0.9)', color: '#94a3b8', border: '1px solid rgba(71,85,105,0.5)' }}>{bModel}</span>}
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                            {rating && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>
                                    <Star size={13} fill="#fbbf24" /> {rating}
                                </span>
                            )}
                            {gameData && <AccelBadge acceleration={gameData.acceleration} velocityTrend={gameData.velocityTrend} />}
                        </div>
                    </div>
                    {gameData?.studioRegion && (
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Studio</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1', marginTop: 2 }}>{gameData.studioRegion}</div>
                        </div>
                    )}
                </div>

                {/* â”€â”€ KEY METRICS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <StatCard icon={<Download size={15} />} label="Downloads" value={downloads} sub="monthly" accent={accent} />
                    <StatCard icon={<DollarSign size={15} />} label="Revenue" value={revenue} sub="monthly" accent="16,185,129" />
                    <StatCard icon={<Activity size={15} />} label="Velocity Score" value={`${velocityScore}/100`} sub="momentum index" accent="99,102,241" />
                    <StatCard icon={<Zap size={15} />} label="Boost Score" value={`+${boostScore}%`} sub="30-day growth" accent="245,158,11" />
                </div>

                {/* â”€â”€ RANK CHANGES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                {(rankHistory['24h'] !== undefined || rankHistory['7d'] !== undefined) && (
                    <div style={{
                        background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '14px 18px',
                        border: '1px solid rgba(255,255,255,0.07)'
                    }}>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                            Rank Movement
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <RankBadge label="24 Hours" value={rankHistory['24h'] ?? 0} />
                            <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
                            <RankBadge label="7 Days" value={rankHistory['7d'] ?? 0} />
                            <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
                            <RankBadge label="30 Days" value={rankHistory['30d'] ?? 0} />
                        </div>
                    </div>
                )}

                {/* â”€â”€ PLATFORM PRESENCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                {Object.keys(platformPresence).length > 0 && (
                    <div style={{
                        background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '14px 18px',
                        border: '1px solid rgba(255,255,255,0.07)'
                    }}>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Smartphone size={13} /> Platform Presence
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {Object.entries(platformPresence).map(([store, info]) => (
                                <div key={store} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 600 }}>
                                        {store === 'googlePlay' ? 'ðŸŸ¢ Google Play' : store === 'appStore' ? 'ðŸŽ App Store' : 'ðŸ“¦ Amazon'}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 14, fontWeight: 800, color: '#f1f5f9' }}>#{info.rank}</span>
                                        <span style={{
                                            fontSize: 12, fontWeight: 700,
                                            color: info.change < 0 ? '#10b981' : info.change > 0 ? '#f87171' : '#94a3b8'
                                        }}>
                                            {info.change < 0 ? `â–² ${Math.abs(info.change)}` : info.change > 0 ? `â–¼ ${info.change}` : 'â€“'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* â”€â”€ REVENUE TREND CHART â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div style={{
                    background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '16px 18px',
                    border: '1px solid rgba(255,255,255,0.07)'
                }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <BarChart2 size={13} /> Revenue Trend (7 Days)
                    </div>
                    <div style={{ height: 110, marginTop: 8 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 10, fontSize: 11 }}
                                    itemStyle={{ color: accentHex }}
                                    labelStyle={{ color: '#94a3b8' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke={accentHex} strokeWidth={2.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* â”€â”€ GEO DISTRIBUTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div style={{
                    background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '16px 18px',
                    border: '1px solid rgba(255,255,255,0.07)'
                }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Globe size={13} /> Geographic Distribution
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 100, height: 100, flexShrink: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={geo} innerRadius={30} outerRadius={46} paddingAngle={3} dataKey="percentage">
                                        {geo.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                            {geo.map((r, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{r.region}</span>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#f1f5f9' }}>{r.percentage}%</span>
                                    </div>
                                    <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${r.percentage}%`, background: r.color, borderRadius: 2 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* â”€â”€ MARKETS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                {gameData?.markets?.length > 0 && (
                    <div style={{
                        background: 'rgba(30,41,59,0.6)', borderRadius: 12, padding: '14px 18px',
                        border: '1px solid rgba(255,255,255,0.07)'
                    }}>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Award size={13} /> Active Markets
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                            {gameData.markets.map((m, i) => (
                                <span key={i} style={{
                                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                                    background: `rgba(${accent},0.1)`, color: '#cbd5e1',
                                    border: `1px solid rgba(${accent},0.2)`
                                }}>{m}</span>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AppDetailView;

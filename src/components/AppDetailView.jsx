import React, { useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { X, TrendingUp, TrendingDown, Download, DollarSign, Star, Globe, Activity, Zap, Award, BarChart2, Smartphone, ArrowUpRight } from 'lucide-react';
import GameIcon from './GameIcon';

/* ── helpers ───────────────────────────────────────────── */

const hexToRgb = (hex) => {
    if (!hex || !hex.startsWith('#')) return '99,102,241';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
};

const fmtNum = (n) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
};

const generateHistory = (gameData) => {
    if (!gameData) return [];
    const revBase = gameData.monthlyRevenue / 30;
    const dlBase = gameData.monthlyDownloads / 30;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const m = gameData.velocityTrend === 'surging' ? 0.06
        : gameData.velocityTrend === 'rising' ? 0.03
        : gameData.velocityTrend === 'declining' ? -0.03 : 0.01;
    const seed = gameData.name ? gameData.name.length : 5;
    return days.map((day, i) => {
        const jitter = 0.92 + ((seed * (i + 1) * 7) % 16) / 100;
        return {
            day,
            revenue: Math.round(revBase * (1 + m * i) * jitter),
            downloads: Math.round(dlBase * (1 + m * i) * jitter),
        };
    });
};

const generateGeo = (gameData) => {
    if (!gameData) return [];
    const colors = {
        USA: '#3b82f6', China: '#ef4444', Japan: '#f59e0b',
        Europe: '#10b981', Worldwide: '#8b5cf6', India: '#ec4899',
        Others: '#64748b',
    };
    const markets = gameData.markets || ['Worldwide'];
    const per = Math.floor(80 / markets.length);
    const result = markets.map((m, i) => ({
        region: m,
        percentage: i === 0 ? per + 5 : per,
        color: colors[m] || `hsl(${i * 70},60%,55%)`,
    }));
    const used = result.reduce((s, r) => s + r.percentage, 0);
    if (used < 100) result.push({ region: 'Others', percentage: 100 - used, color: '#64748b' });
    return result;
};

/* ── sub-components ────────────────────────────────────── */

const AccelBadge = ({ velocityTrend, acceleration }) => {
    const presets = {
        explosive: { label: 'Explosive Growth', bg: 'rgba(16,185,129,0.15)', fg: '#34d399', bd: 'rgba(16,185,129,0.35)' },
        surging:   { label: 'Explosive Growth', bg: 'rgba(16,185,129,0.15)', fg: '#34d399', bd: 'rgba(16,185,129,0.35)' },
        high:      { label: 'High Acceleration', bg: 'rgba(99,102,241,0.15)', fg: '#a5b4fc', bd: 'rgba(99,102,241,0.35)' },
        rising:    { label: 'High Acceleration', bg: 'rgba(99,102,241,0.15)', fg: '#a5b4fc', bd: 'rgba(99,102,241,0.35)' },
        medium:    { label: 'Steady Momentum', bg: 'rgba(245,158,11,0.15)', fg: '#fcd34d', bd: 'rgba(245,158,11,0.35)' },
        stable:    { label: 'Stable', bg: 'rgba(100,116,139,0.15)', fg: '#94a3b8', bd: 'rgba(100,116,139,0.3)' },
        declining: { label: 'Declining', bg: 'rgba(248,113,113,0.12)', fg: '#f87171', bd: 'rgba(248,113,113,0.3)' },
    };
    const s = presets[velocityTrend] || presets[acceleration] || presets.stable;
    return (
        <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: s.bg, color: s.fg, border: `1px solid ${s.bd}`,
        }}>{s.label}</span>
    );
};

const StatCard = ({ icon, label, value, sub, accent }) => (
    <div style={{
        background: 'rgba(30,41,59,0.7)', borderRadius: 10, padding: '14px 16px',
        border: `1px solid rgba(${accent || '99,102,241'},0.18)`,
    }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
            <span style={{ color: `rgb(${accent || '99,102,241'})`, opacity: 0.8 }}>{icon}</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#f1f5f9' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>{sub}</div>}
    </div>
);

const RankCell = ({ label, value }) => (
    <div style={{ textAlign: 'center', flex: 1 }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4, fontWeight: 500 }}>{label}</div>
        <div style={{
            fontSize: 15, fontWeight: 700,
            color: value < 0 ? '#10b981' : value > 0 ? '#f87171' : '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
        }}>
            {value < 0 ? <TrendingUp size={13} /> : value > 0 ? <TrendingDown size={13} /> : null}
            {value === 0 ? '--' : `${Math.abs(value)}`}
        </div>
    </div>
);

/* ── main component ────────────────────────────────────── */

const AppDetailView = ({ appName, data, onClose, gameData }) => {
    const detail = data || {};
    const history = useMemo(
        () => (detail.performanceHistory?.length ? detail.performanceHistory : generateHistory(gameData)),
        [appName]
    );
    const geo = useMemo(
        () => (detail.geoDist?.length ? detail.geoDist : generateGeo(gameData)),
        [appName]
    );

    const accentHex = gameData?.color || '#6366f1';
    const accent = hexToRgb(accentHex);
    const genre = gameData?.genre;
    const platform = gameData?.platform;
    const bModel = gameData?.businessModel;
    const rating = gameData?.rating ?? detail.rating;
    const downloads = gameData?.monthlyDownloads ? `${fmtNum(gameData.monthlyDownloads)} / mo` : (detail.downloads || '--');
    const revenue = gameData?.monthlyRevenue ? `$${fmtNum(gameData.monthlyRevenue)} / mo` : (detail.revenue || '--');
    const velocityScore = gameData?.velocityScore ?? 0;
    const boostScore = gameData?.boostScore ?? 0;
    const rankHistory = gameData?.rankHistory || {};
    const platformPresence = gameData?.platformPresence || {};

    const sectionStyle = {
        background: 'rgba(30,41,59,0.6)',
        borderRadius: 12,
        padding: '16px 18px',
        border: '1px solid rgba(255,255,255,0.07)',
    };
    const sectionTitle = {
        fontSize: 11,
        color: '#64748b',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'rgba(10,15,30,0.97)', overflow: 'hidden' }}>

            {/* ── STICKY HEADER ─────────────────────── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 20, padding: '10px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <button onClick={onClose} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
                }}>
                    <X size={13} /> Back
                </button>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, fontWeight: 700, color: '#10b981',
                    background: 'rgba(16,185,129,0.1)', padding: '4px 10px',
                    borderRadius: 20, border: '1px solid rgba(16,185,129,0.25)',
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    Live Analytics
                </div>
            </div>

            {/* ── SCROLLABLE BODY ───────────────────── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* HERO CARD */}
                <div style={{
                    background: `linear-gradient(135deg, rgba(${accent},0.14) 0%, rgba(${accent},0.04) 100%)`,
                    border: `1px solid rgba(${accent},0.25)`,
                    borderRadius: 14, padding: '18px 18px 16px',
                    display: 'flex', alignItems: 'center', gap: 14,
                }}>
                    <GameIcon name={appName} fallback={gameData?.icon || ''} color={accentHex} size={62} borderRadius={15} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>{appName}</h2>
                        <div style={{ marginTop: 5, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                            {genre && (
                                <span style={{
                                    padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                                    background: `rgba(${accent},0.18)`, color: accentHex,
                                    border: `1px solid rgba(${accent},0.35)`,
                                }}>{genre}</span>
                            )}
                            {platform && (
                                <span style={{
                                    padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                                    background: 'rgba(30,41,59,0.9)', color: '#94a3b8',
                                    border: '1px solid rgba(71,85,105,0.5)',
                                }}>{platform}</span>
                            )}
                            {bModel && (
                                <span style={{
                                    padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                                    background: 'rgba(30,41,59,0.9)', color: '#94a3b8',
                                    border: '1px solid rgba(71,85,105,0.5)',
                                }}>{bModel}</span>
                            )}
                        </div>
                        <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
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

                {/* KEY METRICS 2x2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <StatCard icon={<Download size={15} />} label="Downloads" value={downloads} sub="monthly" accent={accent} />
                    <StatCard icon={<DollarSign size={15} />} label="Revenue" value={revenue} sub="monthly" accent="16,185,129" />
                    <StatCard icon={<Activity size={15} />} label="Velocity" value={`${velocityScore}/100`} sub="momentum index" accent="99,102,241" />
                    <StatCard icon={<Zap size={15} />} label="Boost" value={`+${boostScore}%`} sub="30-day growth" accent="245,158,11" />
                </div>

                {/* RANK MOVEMENT */}
                {(rankHistory['24h'] !== undefined || rankHistory['7d'] !== undefined) && (
                    <div style={sectionStyle}>
                        <div style={sectionTitle}>Rank Movement</div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            <RankCell label="24 Hours" value={rankHistory['24h'] ?? 0} />
                            <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
                            <RankCell label="7 Days" value={rankHistory['7d'] ?? 0} />
                            <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
                            <RankCell label="30 Days" value={rankHistory['30d'] ?? 0} />
                        </div>
                    </div>
                )}

                {/* PLATFORM PRESENCE */}
                {Object.keys(platformPresence).length > 0 && (
                    <div style={sectionStyle}>
                        <div style={sectionTitle}><Smartphone size={13} /> Platform Presence</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {Object.entries(platformPresence).map(([store, info]) => (
                                <div key={store} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 600 }}>
                                        {store === 'googlePlay' ? 'Google Play' : store === 'appStore' ? 'App Store' : store}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 14, fontWeight: 800, color: '#f1f5f9' }}>#{info.rank}</span>
                                        <span style={{
                                            fontSize: 12, fontWeight: 700,
                                            color: info.change < 0 ? '#10b981' : info.change > 0 ? '#f87171' : '#94a3b8',
                                        }}>
                                            {info.change < 0 && <TrendingUp size={12} style={{ marginRight: 2, verticalAlign: 'middle' }} />}
                                            {info.change > 0 && <TrendingDown size={12} style={{ marginRight: 2, verticalAlign: 'middle' }} />}
                                            {info.change !== 0 ? Math.abs(info.change) : '--'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* REVENUE TREND */}
                <div style={sectionStyle}>
                    <div style={sectionTitle}><BarChart2 size={13} /> Revenue Trend (7 Days)</div>
                    <div style={{ height: 120 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id={`grad-${appName}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={accentHex} stopOpacity={0.3} />
                                        <stop offset="100%" stopColor={accentHex} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 10, fontSize: 11 }}
                                    itemStyle={{ color: accentHex }}
                                    labelStyle={{ color: '#94a3b8' }}
                                    formatter={(v) => [`$${fmtNum(v)}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke={accentHex} strokeWidth={2.5} fill={`url(#grad-${appName})`} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* DOWNLOADS TREND */}
                <div style={sectionStyle}>
                    <div style={sectionTitle}><Download size={13} /> Downloads Trend (7 Days)</div>
                    <div style={{ height: 120 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id={`dlGrad-${appName}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 10, fontSize: 11 }}
                                    itemStyle={{ color: '#10b981' }}
                                    labelStyle={{ color: '#94a3b8' }}
                                    formatter={(v) => [fmtNum(v), 'Downloads']}
                                />
                                <Area type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={2.5} fill={`url(#dlGrad-${appName})`} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* GEO DISTRIBUTION */}
                <div style={sectionStyle}>
                    <div style={sectionTitle}><Globe size={13} /> Geographic Distribution</div>
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
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
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

                {/* ACTIVE MARKETS */}
                {gameData?.markets?.length > 0 && (
                    <div style={sectionStyle}>
                        <div style={sectionTitle}><Award size={13} /> Active Markets</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                            {gameData.markets.map((m, i) => (
                                <span key={i} style={{
                                    padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                                    background: `rgba(${accent},0.1)`, color: '#cbd5e1',
                                    border: `1px solid rgba(${accent},0.2)`,
                                }}>{m}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* STORE LINK */}
                {gameData?.storeUrl && (
                    <a
                        href={gameData.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 13,
                            background: `rgba(${accent},0.15)`, color: accentHex,
                            border: `1px solid rgba(${accent},0.3)`,
                            textDecoration: 'none', cursor: 'pointer',
                        }}
                    >
                        View on Store <ArrowUpRight size={14} />
                    </a>
                )}
            </div>
        </div>
    );
};

export default AppDetailView;

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { X, TrendingUp, Download, DollarSign, Star, Globe, Smartphone, Activity } from 'lucide-react';

const AppDetailView = ({ appName, data, onClose }) => {
    if (!data) return (
        <div className="detail-panel glass-panel flex flex-col h-full" style={{ background: 'rgba(15,23,42,0.95)' }}>
            <div className="sticky top-0 z-20 p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)' }}>
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer', border: 'none' }}
                >
                    <X size={14} />
                    Back to Listings
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center" style={{ maxWidth: '320px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 24px' }}>
                        📊
                    </div>
                    <h3 className="text-white font-bold" style={{ fontSize: '18px', marginBottom: '8px' }}>Analytics Unavailable</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                        Detailed analytics for <strong style={{ color: '#94a3b8' }}>"{appName}"</strong> are not available in this demo. Try selecting TikTok, ChatGPT, or Google Gemini for full insights.
                    </p>
                    <button 
                        onClick={onClose} 
                        style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', borderRadius: '10px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none', cursor: 'pointer' }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="detail-panel glass-panel flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 z-20 p-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer', border: 'none' }}
                >
                    <X size={14} />
                    Back to Listings
                </button>
                <div className="live-badge scale-90">
                    <div className="dot"></div>
                    <span>Analytics Live</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {/* Header */}
                <div className="flex flex-col items-center text-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-slate-800 ring-4 ring-white/5 shadow-2xl">
                        {appName === 'TikTok' ? '🎵' : (appName === 'ChatGPT' ? '🤖' : '📱')}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-black text-white mb-2">{appName}</h2>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', boxShadow: '0 0 0 1px rgba(59,130,246,0.3)' }}>{data.category || 'App'}</span>
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-bold">{data.rating || '4.5'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="flex-1 p-3 glass-panel text-center">
                            <p className="text-gray-400 text-[9px] uppercase font-bold mb-1">Store Rank</p>
                            <p className="text-white font-black text-lg">#1</p>
                        </div>
                        <div className="flex-1 p-3 glass-panel text-center">
                            <p className="text-gray-400 text-[9px] uppercase font-bold mb-1">Growth Score</p>
                            <p className="text-emerald-400 font-black text-lg">98/100</p>
                        </div>
                    </div>
                </div>

                {/* Stats Stack */}
                <div className="space-y-6 mb-8">
                    <div className="glass-panel p-5" style={{ background: 'linear-gradient(to bottom right, rgba(59,130,246,0.08), transparent)' }}>
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-gray-400 text-xs font-medium mb-1">Estimated Revenue</p>
                                <h3 className="text-2xl font-black text-white">{data.revenue}</h3>
                            </div>
                            <div className="p-2 rounded-lg" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>
                                <DollarSign size={18} />
                            </div>
                        </div>
                        <div className="h-28">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.performanceHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" hide />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                                        itemStyle={{ color: '#3b82f6' }}
                                    />
                                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={1000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel p-5" style={{ background: 'linear-gradient(to bottom right, rgba(16,185,129,0.08), transparent)' }}>
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-gray-400 text-xs font-medium mb-1">Total Downloads</p>
                                <h3 className="text-2xl font-black text-white">{data.downloads}</h3>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                <Download size={18} />
                            </div>
                        </div>
                        <div className="h-28">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.performanceHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="day" hide />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                                        itemStyle={{ color: '#10b981' }}
                                    />
                                    <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={3} dot={false} animationDuration={1000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Geography Section */}
                <div className="glass-panel p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Globe size={16} className="text-blue-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Regions</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.geoDist}
                                        innerRadius={45}
                                        outerRadius={65}
                                        paddingAngle={5}
                                        dataKey="percentage"
                                    >
                                        {data.geoDist.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {data.geoDist.map((region, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-gray-400">{region.region}</span>
                                        <span className="text-white font-bold">{region.percentage}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-1000 ease-out"
                                            style={{ width: `${region.percentage}%`, backgroundColor: region.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDetailView;

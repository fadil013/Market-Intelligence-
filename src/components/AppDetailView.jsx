import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { X, TrendingUp, Download, DollarSign, Star, Globe, Smartphone, Activity } from 'lucide-react';

const AppDetailView = ({ appName, data, onClose }) => {
    if (!data) return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="glass-panel p-8 text-center max-w-sm">
                <h3 className="text-white font-bold mb-4">No data available for "{appName}" in this demo.</h3>
                <p className="text-gray-400 text-sm mb-6">Try clicking TikTok, ChatGPT, or Google Gemini for full analytics.</p>
                <button onClick={onClose} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all font-bold uppercase text-xs tracking-widest">Back to Dashboard</button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-panel w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl bg-slate-800 ring-4 ring-white/5 shadow-2xl">
                            {appName === 'TikTok' ? '🎵' : '📱'}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-4xl font-black text-white mb-2">{appName}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold ring-1 ring-purple-500/30">{data.category || 'App'}</span>
                                {data.studio && <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold ring-1 ring-blue-500/30">{data.studio}</span>}
                                <div className="flex items-center gap-1 text-amber-400">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-bold">{data.rating || '4.5'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="p-3 glass-panel text-center min-w-[120px]">
                                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Rank</p>
                                <p className="text-white font-black text-xl">#1</p>
                            </div>
                            <div className="p-3 glass-panel text-center min-w-[120px]">
                                <p className="text-gray-400 text-[10px] uppercase font-bold mb-1">Score</p>
                                <p className="text-emerald-400 font-black text-xl">98/100</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="glass-panel p-6 bg-gradient-to-br from-purple-500/10 to-transparent">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm font-medium mb-1">Monthly Revenue</p>
                                    <h3 className="text-3xl font-black text-white">{data.revenue}</h3>
                                </div>
                                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.performanceHistory}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="day" hide />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px' }}
                                            itemStyle={{ color: '#a855f7' }}
                                        />
                                        <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={4} dot={false} animationDuration={1500} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass-panel p-6 bg-gradient-to-br from-emerald-500/10 to-transparent">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm font-medium mb-1">Monthly Downloads</p>
                                    <h3 className="text-3xl font-black text-white">{data.downloads}</h3>
                                </div>
                                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                                    <Download size={24} />
                                </div>
                            </div>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data.performanceHistory}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="day" hide />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '12px' }}
                                            itemStyle={{ color: '#10b981' }}
                                        />
                                        <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={4} dot={false} animationDuration={1500} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Geography Section */}
                    <div className="glass-panel p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="text-blue-400" />
                            <h3 className="text-xl font-bold text-white">Geographic Revenue Distribution</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                {data.geoDist.map((region, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-300 font-medium">{region.region}</span>
                                            <span className="text-white font-bold">{region.percentage}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full transition-all duration-1000 ease-out"
                                                style={{ width: `${region.percentage}%`, bgcolor: region.color, backgroundColor: region.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-60">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.geoDist}
                                            innerRadius={60}
                                            outerRadius={80}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDetailView;

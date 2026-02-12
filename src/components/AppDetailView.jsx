import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { X, TrendingUp, Download, DollarSign, Star, Globe, Smartphone, Activity } from 'lucide-react';

const AppDetailView = ({ appName, data, onClose }) => {
    if (!data) return (
        <div className="glass-panel p-8 text-center max-w-sm mx-auto mt-20">
            <h3 className="text-white font-bold mb-4">No data available for "{appName}" in this demo.</h3>
            <p className="text-gray-400 text-sm mb-6">Try clicking TikTok, ChatGPT, or Google Gemini for full analytics.</p>
            <button onClick={onClose} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all font-bold uppercase text-xs tracking-widest">Back to Dashboard</button>
        </div>
    );

    return (
        <div className="detail-panel glass-panel flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 z-20 p-4 border-b border-white/5 bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
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
                            <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold ring-1 ring-purple-500/30 uppercase tracking-wider">{data.category || 'App'}</span>
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
                    <div className="glass-panel p-5 bg-gradient-to-br from-purple-500/10 to-transparent">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-gray-400 text-xs font-medium mb-1">Estimated Revenue</p>
                                <h3 className="text-2xl font-black text-white">{data.revenue}</h3>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
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
                                        itemStyle={{ color: '#a855f7' }}
                                    />
                                    <Line type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} dot={false} animationDuration={1000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-panel p-5 bg-gradient-to-br from-emerald-500/10 to-transparent">
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

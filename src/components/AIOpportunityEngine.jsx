import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { 
    Sparkles, 
    TrendingUp,
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle,
    Filter,
    Star,
    Target,
    Zap,
    ChevronRight,
    Activity
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const generatePDF = (opp, allOpportunities) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, margin = 18;
    let y = 0;

    const col = { bg: [10, 15, 30], accent: [99, 102, 241], green: [52, 211, 153], yellow: [251, 191, 36], text: [241, 245, 249], muted: [100, 116, 139], border: [30, 41, 59] };

    // Background
    doc.setFillColor(...col.bg);
    doc.rect(0, 0, W, 297, 'F');

    // Header bar
    doc.setFillColor(...col.accent);
    doc.rect(0, 0, W, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('ONYX GAMES', margin, 14);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.text('Market Intelligence Platform', margin, 19);
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(`Generated: ${dateStr}`, W - margin, 14, { align: 'right' });
    doc.text('Confidential — Internal Use Only', W - margin, 19, { align: 'right' });

    y = 32;

    // Title
    doc.setTextColor(...col.text);
    doc.setFontSize(18); doc.setFont('helvetica', 'bold');
    doc.text('Market Opportunity Report', margin, y); y += 8;
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...col.muted);
    doc.text('AI-Powered Niche Analysis & Strategic Recommendations', margin, y); y += 12;

    // Divider
    doc.setDrawColor(...col.border); doc.setLineWidth(0.4);
    doc.line(margin, y, W - margin, y); y += 10;

    // Priority badge and niche title
    const priColor = opp.recommendation === 'HIGH PRIORITY' ? col.green : opp.recommendation === 'MEDIUM PRIORITY' ? col.yellow : [148, 163, 184];
    doc.setFillColor(...priColor);
    doc.roundedRect(margin, y - 5, 40, 8, 2, 2, 'F');
    doc.setTextColor(10, 15, 30); doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.text(opp.recommendation, margin + 20, y, { align: 'center' }); y += 6;

    doc.setTextColor(...col.text);
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text(opp.niche, margin, y); y += 8;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...col.muted);
    doc.text('Market Opportunity Analysis — Onyx Games Intelligence', margin, y); y += 12;

    // Metrics row
    const metrics = [
        { label: 'DEMAND SCORE', value: `${opp.demandScore}/100`, color: opp.demandScore >= 80 ? col.green : col.yellow },
        { label: 'COMPETITION', value: `${opp.competitionScore}/100 ↓`, color: col.green },
        { label: 'REVENUE POTENTIAL', value: opp.revenuePotential, color: col.green },
        { label: 'WINDOW CLOSES IN', value: opp.timeToSaturation, color: [96, 165, 250] },
    ];
    const boxW = (W - margin * 2 - 9) / 4;
    metrics.forEach((m, i) => {
        const bx = margin + i * (boxW + 3);
        doc.setFillColor(...col.border); doc.roundedRect(bx, y, boxW, 18, 2, 2, 'F');
        doc.setTextColor(...col.muted); doc.setFontSize(6); doc.setFont('helvetica', 'bold');
        doc.text(m.label, bx + boxW / 2, y + 5, { align: 'center' });
        doc.setTextColor(...m.color); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
        doc.text(m.value, bx + boxW / 2, y + 13, { align: 'center' });
    });
    y += 26;

    // Why This Opportunity
    doc.setFillColor(...col.border); doc.roundedRect(margin, y, W - margin * 2, 8 + opp.reasoning.length * 7, 2, 2, 'F');
    doc.setTextColor(...col.accent); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('WHY THIS OPPORTUNITY', margin + 4, y + 6); y += 10;
    opp.reasoning.forEach(r => {
        doc.setTextColor(...col.green); doc.setFontSize(8); doc.text('✓', margin + 4, y);
        doc.setTextColor(...col.text); doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(r, W - margin * 2 - 14);
        doc.text(lines, margin + 10, y); y += lines.length * 5 + 2;
    });
    y += 6;

    // Comparable Games
    doc.setTextColor(...col.accent); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('COMPARABLE SUCCESS STORIES', margin, y); y += 6;
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(...col.text);
    opp.comparableGames.forEach((g, i) => {
        doc.setFillColor(...col.border); doc.roundedRect(margin + i * 52, y, 48, 8, 2, 2, 'F');
        doc.text(g, margin + i * 52 + 24, y + 5, { align: 'center' });
    });
    y += 14;

    // Recommended Mechanics
    doc.setTextColor(...col.accent); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('RECOMMENDED GAME MECHANICS', margin, y); y += 6;
    let mx = margin;
    opp.suggestedMechanics.forEach(m => {
        const tw = doc.getTextWidth(m) + 8;
        if (mx + tw > W - margin) { mx = margin; y += 9; }
        doc.setFillColor(99, 102, 241, 0.3); doc.roundedRect(mx, y - 4, tw, 7, 2, 2, 'F');
        doc.setTextColor(...col.text); doc.setFontSize(7); doc.setFont('helvetica', 'normal');
        doc.text(m, mx + 4, y); mx += tw + 3;
    });
    y += 14;

    // All Opportunities Summary Table
    doc.line(margin, y, W - margin, y); y += 8;
    doc.setTextColor(...col.accent); doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('ALL MARKET OPPORTUNITIES SUMMARY', margin, y); y += 8;
    // Table header
    doc.setFillColor(...col.border); doc.rect(margin, y, W - margin * 2, 7, 'F');
    doc.setTextColor(...col.muted); doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.text('NICHE', margin + 2, y + 5);
    doc.text('DEMAND', margin + 82, y + 5);
    doc.text('COMPETITION', margin + 104, y + 5);
    doc.text('REVENUE', margin + 134, y + 5);
    doc.text('PRIORITY', margin + 158, y + 5);
    y += 9;
    allOpportunities.forEach((o, i) => {
        if (i % 2 === 0) { doc.setFillColor(20, 28, 48); doc.rect(margin, y - 4, W - margin * 2, 7, 'F'); }
        const isThis = o.niche === opp.niche;
        if (isThis) { doc.setTextColor(99, 102, 241); } else { doc.setTextColor(241, 245, 249); }
        doc.setFontSize(7); doc.setFont('helvetica', isThis ? 'bold' : 'normal');
        doc.text(o.niche.substring(0, 40), margin + 2, y);
        doc.text(String(o.demandScore), margin + 86, y);
        doc.text(String(o.competitionScore), margin + 110, y);
        doc.text(o.revenuePotential, margin + 134, y);
        const pc = o.recommendation === 'HIGH PRIORITY' ? col.green : o.recommendation === 'MEDIUM PRIORITY' ? col.yellow : col.muted;
        doc.setTextColor(...pc);
        doc.text(o.recommendation, margin + 158, y);
        y += 7;
    });

    // Footer
    doc.setDrawColor(...col.border); doc.line(margin, 280, W - margin, 280);
    doc.setTextColor(...col.muted); doc.setFontSize(7); doc.setFont('helvetica', 'normal');
    doc.text('© Onyx Games Intelligence Platform — Confidential', margin, 286);
    doc.text('Page 1 of 1', W - margin, 286, { align: 'right' });

    doc.save(`Onyx_Opportunity_Report_${opp.niche.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);
};

const AIOpportunityEngine = ({ opportunityData }) => {
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [sortBy, setSortBy] = useState('demandScore'); // demandScore, revenue, saturation

    const priorityLevels = ['all', 'HIGH PRIORITY', 'MEDIUM PRIORITY', 'LOW PRIORITY', 'WATCH'];

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'HIGH PRIORITY': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle };
            case 'MEDIUM PRIORITY': return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: AlertCircle };
            case 'LOW PRIORITY': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: Activity };
            case 'WATCH': return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', icon: Clock };
            default: return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', icon: Star };
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        if (score >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'bg-green-500/20';
        if (score >= 60) return 'bg-yellow-500/20';
        if (score >= 40) return 'bg-orange-500/20';
        return 'bg-red-500/20';
    };

    // Filter and sort opportunities
    const filteredOpportunities = opportunityData
        .filter(opp => selectedPriority === 'all' || opp.recommendation === selectedPriority)
        .sort((a, b) => {
            if (sortBy === 'demandScore') return b.demandScore - a.demandScore;
            if (sortBy === 'revenue') {
                const aRevenue = parseInt(a.revenuePotential.replace(/[^0-9]/g, ''));
                const bRevenue = parseInt(b.revenuePotential.replace(/[^0-9]/g, ''));
                return bRevenue - aRevenue;
            }
            if (sortBy === 'saturation') {
                const aSaturation = parseInt(a.timeToSaturation.split('-')[0]);
                const bSaturation = parseInt(b.timeToSaturation.split('-')[0]);
                return bSaturation - aSaturation;
            }
            return 0;
        });

    // Calculate summary stats
    const highPriorityCount = opportunityData.filter(o => o.recommendation === 'HIGH PRIORITY').length;
    const mediumPriorityCount = opportunityData.filter(o => o.recommendation === 'MEDIUM PRIORITY').length;
    const avgDemandScore = Math.round(opportunityData.reduce((acc, o) => acc + o.demandScore, 0) / opportunityData.length);
    const avgCompetitionScore = Math.round(opportunityData.reduce((acc, o) => acc + o.competitionScore, 0) / opportunityData.length);

    // Prepare matrix data for scatter chart
    const matrixData = opportunityData.map(opp => ({
        name: opp.niche.length > 14 ? opp.niche.substring(0, 14) + '…' : opp.niche,
        fullName: opp.niche,
        demand: opp.demandScore,
        competition: opp.competitionScore,
        revenue: opp.revenuePotential,
        priority: opp.recommendation,
        size: opp.demandScore // Bubble size based on demand
    }));

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">High Priority</p>
                            <p className="text-3xl font-bold text-green-400 mt-1">{highPriorityCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Immediate opportunities</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Medium Priority</p>
                            <p className="text-3xl font-bold text-yellow-400 mt-1">{mediumPriorityCount}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-500/10">
                            <AlertCircle className="w-6 h-6 text-yellow-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Consider timing</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Demand Score</p>
                            <p className="text-3xl font-bold text-purple-400 mt-1">{avgDemandScore}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Market interest level</p>
                </div>

                <div className="glass-panel p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Avg Competition</p>
                            <p className="text-3xl font-bold text-blue-400 mt-1">{avgCompetitionScore}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-500/10">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Lower is better</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-panel p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Priority Level
                        </label>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            {priorityLevels.map(level => (
                                <option key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-gray-300 text-sm focus:outline-none focus:border-purple-500/50"
                        >
                            <option value="demandScore">Demand Score (High to Low)</option>
                            <option value="revenue">Revenue Potential</option>
                            <option value="saturation">Time to Saturation</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Demand vs Competition Matrix */}
            <div className="glass-panel p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Demand vs Competition Matrix
                </h3>
                <ResponsiveContainer width="100%" height={420}>
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 50, left: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis 
                            type="number" 
                            dataKey="competition" 
                            name="Competition"
                            stroke="#475569"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#334155' }}
                            label={{ value: 'Competition Score  (lower = better opportunity)', position: 'insideBottom', offset: -30, fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="demand" 
                            name="Demand"
                            stroke="#475569"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#334155' }}
                            label={{ value: 'Demand Score', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                        />
                        <ZAxis type="number" dataKey="size" range={[80, 350]} />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (!active || !payload || !payload.length) return null;
                                const d = payload[0].payload;
                                const priorityColor = d.priority === 'HIGH PRIORITY' ? '#10b981'
                                    : d.priority === 'MEDIUM PRIORITY' ? '#f59e0b'
                                    : d.priority === 'LOW PRIORITY' ? '#6366f1' : '#94a3b8';
                                return (
                                    <div style={{
                                        background: '#0f172a',
                                        border: `2px solid ${priorityColor}`,
                                        borderRadius: '10px',
                                        padding: '14px 18px',
                                        minWidth: '210px',
                                        boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 20px ${priorityColor}30`,
                                        fontFamily: 'sans-serif',
                                    }}>
                                        <p style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '8px' }}>{d.fullName || d.name}</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>⚔️ Competition</span>
                                                <span style={{ color: '#fca5a5', fontWeight: 800, fontSize: '15px' }}>{d.competition}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>📈 Demand</span>
                                                <span style={{ color: '#6ee7b7', fontWeight: 800, fontSize: '15px' }}>{d.demand}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#cbd5e1', fontSize: '12px', fontWeight: 600 }}>📦 Market Size</span>
                                                <span style={{ color: '#93c5fd', fontWeight: 800, fontSize: '15px' }}>{d.size}</span>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                            <span style={{
                                                fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em',
                                                color: priorityColor,
                                                background: `${priorityColor}20`,
                                                padding: '3px 10px', borderRadius: '4px',
                                                border: `1px solid ${priorityColor}60`,
                                            }}>{d.priority}</span>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <Scatter name="Opportunities" data={matrixData}>
                            {matrixData.map((entry, index) => {
                                let color = '#3b82f6'; // default blue
                                if (entry.priority === 'HIGH PRIORITY') color = '#10b981'; // green
                                else if (entry.priority === 'MEDIUM PRIORITY') color = '#f59e0b'; // yellow
                                else if (entry.priority === 'LOW PRIORITY') color = '#6366f1'; // indigo
                                else if (entry.priority === 'WATCH') color = '#64748b'; // gray
                                return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Matrix Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500" />
                        <span className="text-xs text-gray-400">High Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500" />
                        <span className="text-xs text-gray-400">Medium Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-500" />
                        <span className="text-xs text-gray-400">Low Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500" />
                        <span className="text-xs text-gray-400">Watch</span>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-gray-400">
                        <strong className="text-blue-400">Sweet Spot:</strong> Top-left quadrant (High Demand + Low Competition). 
                        Bubble size indicates demand strength. Avoid bottom-right (low demand + high competition).
                    </p>
                </div>
            </div>

            {/* Opportunity Cards */}
            <div className="grid grid-cols-1 gap-4">
                {filteredOpportunities.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-white font-semibold mb-2">No Opportunities Found</h3>
                        <p className="text-gray-400 text-sm">
                            No opportunities match your selected filters. Try adjusting the priority level.
                        </p>
                    </div>
                ) : (
                    filteredOpportunities.map((opp, index) => {
                        const priorityColors = getPriorityColor(opp.recommendation);
                        const PriorityIcon = priorityColors.icon;
                        
                        return (
                            <div 
                                key={index}
                                className={`glass-panel p-6 border-l-4 ${priorityColors.border} hover:scale-[1.01] transition-transform`}
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Left: Niche Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${priorityColors.bg} ${priorityColors.text} border ${priorityColors.border}`}>
                                                        {opp.recommendation}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-1">{opp.niche}</h3>
                                                <p className="text-gray-500 text-sm">Market Opportunity Analysis</p>
                                            </div>
                                        </div>

                                        {/* Reasoning */}
                                        <div className="space-y-2 mb-4">
                                            <p className="text-gray-400 text-sm font-semibold">Why This Opportunity:</p>
                                            {opp.reasoning.map((reason, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 min-w-[16px]" />
                                                    <p className="text-gray-300 text-sm">{reason}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Comparable Games */}
                                        {opp.comparableGames && opp.comparableGames.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-gray-400 text-sm font-semibold mb-2">Comparable Success Stories:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {opp.comparableGames.map((game, idx) => (
                                                        <span key={idx} className="px-3 py-1 rounded bg-slate-800/50 text-gray-300 text-xs">
                                                            {game}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Suggested Mechanics */}
                                        {opp.suggestedMechanics && opp.suggestedMechanics.length > 0 && (
                                            <div>
                                                <p className="text-gray-400 text-sm font-semibold mb-2">Recommended Mechanics:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {opp.suggestedMechanics.map((mechanic, idx) => (
                                                        <span key={idx} className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 text-xs border border-purple-500/30">
                                                            {mechanic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Metrics */}
                                    <div className="lg:w-80 space-y-4">
                                        {/* Demand Score */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 text-sm">Demand Score</span>
                                                <span className={`text-xl font-bold ${getScoreColor(opp.demandScore)}`}>
                                                    {opp.demandScore}/100
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${getScoreBg(opp.demandScore)}`}
                                                    style={{ width: `${opp.demandScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Competition Score */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 text-sm">Competition (Lower = Better)</span>
                                                <span className={`text-xl font-bold ${getScoreColor(100 - opp.competitionScore)}`}>
                                                    {opp.competitionScore}/100
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${getScoreBg(100 - opp.competitionScore)}`}
                                                    style={{ width: `${opp.competitionScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Revenue Potential */}
                                        <div className="glass-panel p-3 bg-green-500/5 border border-green-500/20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4 text-green-400" />
                                                    <span className="text-gray-400 text-sm">Revenue Potential</span>
                                                </div>
                                                <span className="text-green-400 font-bold">{opp.revenuePotential}</span>
                                            </div>
                                        </div>

                                        {/* Time to Saturation */}
                                        <div className="glass-panel p-3 bg-blue-500/5 border border-blue-500/20">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                    <span className="text-gray-400 text-sm">Window Closes In</span>
                                                </div>
                                                <span className="text-blue-400 font-bold">{opp.timeToSaturation}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => generatePDF(opp, opportunityData)}
                                            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.3)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.7)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.18)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
                                        >
                                            <Zap style={{ width: '16px', height: '16px' }} />
                                            Generate Full Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AIOpportunityEngine;

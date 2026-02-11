import React from 'react';
import { Search, Map, Calendar, Tag, Filter, ChevronDown } from 'lucide-react';

const FilterSection = ({ title, icon: Icon, children }) => {
    return (
        <div className="mb-8 last:mb-0">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
                {Icon && <Icon size={16} className="text-purple-500" />}
                <h4 className="text-xs uppercase tracking-tighter font-black">{title}</h4>
            </div>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
};

const FilterOption = ({ label, count, active }) => (
    <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${active ? 'bg-purple-600/20 text-purple-400 ring-1 ring-purple-600/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}>
        <span className="text-sm font-medium">{label}</span>
        {count !== undefined && <span className="text-[10px] font-bold opacity-50">{count}</span>}
    </div>
);

const AdvancedFilter = () => {
    return (
        <aside className="w-72 hidden lg:flex flex-col border-r border-white/5 pr-6 min-h-screen">
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search apps or tags..."
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin">
                <FilterSection title="Domains" icon={Filter}>
                    <FilterOption label="Games" count="257176" active />
                    <FilterOption label="Apps" count="167776" />
                </FilterSection>

                <FilterSection title="Top Categories" icon={Tag}>
                    <FilterOption label="Casual" count="127415" />
                    <FilterOption label="Hypercasual" count="57790" />
                    <FilterOption label="Midcore" count="23364" />
                </FilterSection>

                <FilterSection title="Geography" icon={Map}>
                    <div className="flex flex-wrap gap-2">
                        {['Worldwide', 'USA', 'China', 'Japan', 'Europe'].map((geo, idx) => (
                            <span key={idx} className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer border ${geo === 'Worldwide' ? 'bg-purple-500 border-purple-400 text-white' : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                                }`}>
                                {geo}
                            </span>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Time Period" icon={Calendar}>
                    <div className="flex flex-col gap-2">
                        <div className="glass-panel p-2 flex justify-between items-center bg-slate-950/50">
                            <span className="text-[10px] font-black text-gray-300 uppercase">Feb 2026</span>
                            <ChevronDown size={14} className="text-gray-500" />
                        </div>
                    </div>
                </FilterSection>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-600/20 active:scale-95">
                        Apply Filter
                    </button>
                    <button className="w-full mt-3 py-3 text-gray-500 hover:text-white text-xs font-bold transition-colors">
                        Reset Defaults
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdvancedFilter;

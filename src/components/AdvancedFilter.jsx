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
    <div className={`flex items-center justify-between gap-4 px-3 py-2 rounded-lg cursor-pointer transition-all ${active ? 'bg-purple-600/20 text-purple-400 ring-1 ring-purple-600/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}>
        <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
        {count !== undefined && <span className="text-[10px] font-black opacity-40 ml-auto">{count}</span>}
    </div>
);

const AdvancedFilter = () => {
    return (
        <aside className="advanced-filter hidden lg:flex flex-col">
            <div className="filter-search-container">
                <Search className="filter-search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search apps or tags..."
                    className="filter-search-input"
                />
            </div>

            <div className="flex-1 pr-2 scrollbar-hide">
                <FilterSection title="Domains" icon={Filter}>
                    <FilterOption label="Games" count="257,176" active />
                    <FilterOption label="Apps" count="167,776" />
                </FilterSection>

                <FilterSection title="Top Categories" icon={Tag}>
                    <FilterOption label="Casual" count="127,415" />
                    <FilterOption label="Hypercasual" count="57,790" />
                    <FilterOption label="Midcore" count="23,364" />
                </FilterSection>

                <FilterSection title="Geography" icon={Map}>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {['Worldwide', 'USA', 'China', 'Japan', 'Europe'].map((geo, idx) => (
                            <span key={idx} className={`px-2.5 py-1 rounded-md text-[10px] font-black cursor-pointer border transition-all ${geo === 'Worldwide' ? 'bg-purple-600 border-purple-500 text-white' : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                                }`}>
                                {geo}
                            </span>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Time Period" icon={Calendar}>
                    <div className="flex flex-col gap-2 pt-2">
                        <div className="glass-panel p-3 flex justify-between items-center bg-slate-900/40 border-white/5 cursor-pointer hover:border-white/20 transition-all">
                            <span className="text-[10px] font-black text-gray-300 uppercase letter-spacing-widest">Feb 2026</span>
                            <ChevronDown size={14} className="text-gray-500" />
                        </div>
                    </div>
                </FilterSection>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <button className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-900/40 active:scale-[0.98]">
                        Apply Analytics Filter
                    </button>
                    <button className="w-full mt-3 py-2 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-wider transition-colors">
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdvancedFilter;

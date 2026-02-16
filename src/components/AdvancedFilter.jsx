import React, { useState } from 'react';
import { Search, Map, Calendar, Tag, Filter, ChevronDown } from 'lucide-react';

const FilterSection = ({ title, icon: Icon, children }) => {
    return (
        <div className="mb-8 last:mb-0">
            <div className="filter-section-title">
                {Icon && <Icon size={16} style={{ color: '#3b82f6' }} />}
                <h4>{title}</h4>
            </div>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
};

const FilterOption = ({ label, count, active, onClick }) => (
    <div 
        className={`filter-option-item ${active ? 'active' : ''}`}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
    >
        <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
        {count !== undefined && <span className="filter-option-count">{count}</span>}
    </div>
);

const AdvancedFilter = ({ selectedDomain = 'Games', onDomainChange }) => {
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
                    <FilterOption 
                        label="Games" 
                        count="257,176" 
                        active={selectedDomain === 'Games'}
                        onClick={() => onDomainChange && onDomainChange('Games')}
                    />
                    <FilterOption 
                        label="Apps" 
                        count="167,776" 
                        active={selectedDomain === 'Apps'}
                        onClick={() => onDomainChange && onDomainChange('Apps')}
                    />
                </FilterSection>

                <FilterSection title="Top Categories" icon={Tag}>
                    <FilterOption label="Casual" count="127,415" />
                    <FilterOption label="Hypercasual" count="57,790" />
                    <FilterOption label="Midcore" count="23,364" />
                </FilterSection>

                <FilterSection title="Geography" icon={Map}>
                    <div className="geo-tags-container">
                        {['Worldwide', 'USA', 'China', 'Japan', 'Europe'].map((geo, idx) => (
                            <span
                                key={idx}
                                className={`geo-tag ${geo === 'Worldwide' ? 'active' : ''}`}
                            >
                                {geo}
                            </span>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Time Period" icon={Calendar}>
                    <div className="pt-2">
                        <div className="glass-panel p-3 flex justify-between items-center" style={{ background: 'rgba(15,23,42,0.4)', borderColor: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Feb 2026</span>
                            <ChevronDown size={14} style={{ color: '#64748b' }} />
                        </div>
                    </div>
                </FilterSection>

                <div className="filter-actions">
                    <button className="btn-apply">
                        Apply Analytics Filter
                    </button>
                    <button className="btn-reset">
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdvancedFilter;

import React from 'react';
import { Search, Map, Calendar, Tag, Filter, ChevronDown } from 'lucide-react';

const FilterSection = ({ title, icon: Icon, children }) => {
    return (
        <div className="mb-6 last:mb-0">
            <div className="filter-section-title">
                {Icon && <Icon size={16} style={{ color: '#6b7280' }} />}
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
        <span className="text-sm font-medium">{label}</span>
        {count !== undefined && <span className="filter-option-count">{count}</span>}
    </div>
);

const AdvancedFilter = ({ 
    selectedDomain = 'Games', 
    onDomainChange,
    activeFilters = {},
    onFilterChange,
    onApply,
    onReset 
}) => {
    return (
        <aside className="filter-panel-right">
            <div className="filter-header">
                <h3 className="filter-title">Filters</h3>
            </div>

            <div className="filter-search-container">
                <Search className="filter-search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search apps or tags..."
                    className="filter-search-input"
                />
            </div>

            <div className="filter-content">
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
                    <FilterOption 
                        label="All Categories" 
                        active={activeFilters.category === 'All'}
                        onClick={() => onFilterChange && onFilterChange({ ...activeFilters, category: 'All' })}
                    />
                    <FilterOption 
                        label="Casual" 
                        count="127,415"
                        active={activeFilters.category === 'Casual'}
                        onClick={() => onFilterChange && onFilterChange({ ...activeFilters, category: 'Casual' })}
                    />
                    <FilterOption 
                        label="Hypercasual" 
                        count="57,790"
                        active={activeFilters.category === 'Hypercasual'}
                        onClick={() => onFilterChange && onFilterChange({ ...activeFilters, category: 'Hypercasual' })}
                    />
                    <FilterOption 
                        label="Midcore" 
                        count="23,364"
                        active={activeFilters.category === 'Midcore'}
                        onClick={() => onFilterChange && onFilterChange({ ...activeFilters, category: 'Midcore' })}
                    />
                </FilterSection>

                <FilterSection title="Geography" icon={Map}>
                    <div className="geo-tags-container">
                        {['Worldwide', 'USA', 'China', 'Japan', 'Europe'].map((geo) => (
                            <span
                                key={geo}
                                className={`geo-tag ${activeFilters.geography === geo ? 'active' : ''}`}
                                onClick={() => onFilterChange && onFilterChange({ ...activeFilters, geography: geo })}
                            >
                                {geo}
                            </span>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Time Period" icon={Calendar}>
                    <div className="pt-2">
                        <div className="time-period-select" onClick={() => {}}>
                            <span>{activeFilters.timePeriod || 'Feb 2026'}</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                </FilterSection>
            </div>

            <div className="filter-actions">
                <button className="btn-apply" onClick={onApply}>
                    Apply Filters
                </button>
                <button className="btn-reset" onClick={onReset}>
                    Reset to Defaults
                </button>
            </div>
        </aside>
    );
};

export default AdvancedFilter;

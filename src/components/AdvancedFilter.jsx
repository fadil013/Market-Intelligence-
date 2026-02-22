import React, { useState } from 'react';
import { Search, Map, Calendar, Tag, Filter, ChevronDown, X } from 'lucide-react';

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
    onReset,
    onClose
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All Categories', 'Casual', 'Hypercasual', 'Midcore'];
    const categoryCounts = {
        'All Categories': undefined,
        'Casual': '127,415',
        'Hypercasual': '57,790',
        'Midcore': '23,364'
    };

    const filteredCategories = categories.filter(cat => 
        cat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <aside className="filter-panel-right">
            <div className="filter-header">
                <h3 className="filter-title">Filters</h3>
                <button 
                    className="filter-close-btn"
                    onClick={onClose}
                    aria-label="Close filters"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="filter-search-container">
                <Search className="filter-search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search categories or tags..."
                    className="filter-search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                {searchQuery && (
                    <button 
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
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
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(cat => (
                            <FilterOption 
                                key={cat}
                                label={cat}
                                count={categoryCounts[cat]}
                                active={activeFilters.category === cat || (cat === 'All Categories' && activeFilters.category === 'All')}
                                onClick={() => onFilterChange && onFilterChange({ 
                                    ...activeFilters, 
                                    category: cat === 'All Categories' ? 'All' : cat 
                                })}
                            />
                        ))
                    ) : (
                        <div className="text-sm text-gray-500 py-2 px-3">
                            No categories found
                        </div>
                    )}
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
                <button className="btn-reset" onClick={() => { onReset(); clearSearch(); }}>
                    Reset to Defaults
                </button>
            </div>
        </aside>
    );
};

export default AdvancedFilter;

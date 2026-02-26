import React, { useState } from 'react';
import { Search, Map, Calendar, Tag, Filter, ChevronDown, X, PanelRightClose } from 'lucide-react';

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

const CATEGORY_ICONS = {
    // Game categories
    'All Categories': '🔍', 'Casual': '🎲', 'Hypercasual': '⚡', 'Midcore': '⚔️',
    // App categories
    'Social Media': '💬', 'AI & Productivity': '🤖', 'Entertainment': '🎬',
    'Camera & Effects': '📷', 'Finance': '💳', 'Beauty & Style': '💄',
    'Education': '🎓', 'Health & Fitness': '🏃', 'Utility': '⚙️', 'Fashion & Design': '👗',
    // Domains
    'Games': '🎮', 'Apps': '📱',
};

const FilterOption = ({ label, count, active, onClick }) => (
    <div 
        className={`filter-option-item ${active ? 'active' : ''}`}
        onClick={onClick}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
    >
        {CATEGORY_ICONS[label] && (
            <span style={{ fontSize: '14px', flexShrink: 0, width: '18px', textAlign: 'center' }}>{CATEGORY_ICONS[label]}</span>
        )}
        <span className="text-sm font-medium" style={{ flex: 1 }}>{label}</span>
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
    onClose,
    onToggleCollapse,
    selectedAppData = null,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Dynamic category counts driven by selectedAppData genre
    const genreToCategoryMap = {
        'Casual': 'Casual', 'Sandbox': 'Casual',
        'Puzzle': 'Hypercasual', 'Hypercasual': 'Hypercasual',
        'RPG': 'Midcore', 'MOBA': 'Midcore', 'Strategy': 'Midcore',
        'Shooter': 'Midcore', 'Battle Royale': 'Midcore',
    };
    const appCategory = selectedAppData?.genre ? genreToCategoryMap[selectedAppData.genre] : null;

    // Domain-specific subcategories
    const GAME_CATEGORIES = [
        { label: 'All Categories', count: undefined },
        { label: 'Casual',         count: '127,415' },
        { label: 'Hypercasual',    count: '57,790' },
        { label: 'Midcore',        count: '23,364' },
    ];
    const APP_CATEGORIES = [
        { label: 'All Categories',    count: undefined },
        { label: 'Social Media',      count: '45,231' },
        { label: 'AI & Productivity', count: '38,420' },
        { label: 'Entertainment',     count: '29,100' },
        { label: 'Camera & Effects',  count: '18,770' },
        { label: 'Finance',           count: '14,230' },
        { label: 'Beauty & Style',    count: '12,940' },
        { label: 'Education',         count: '11,580' },
        { label: 'Health & Fitness',  count: '9,870'  },
        { label: 'Utility',           count: '8,340'  },
        { label: 'Fashion & Design',  count: '6,120'  },
    ];

    const rawCategories = selectedDomain === 'Apps' ? APP_CATEGORIES : GAME_CATEGORIES;
    const categories = rawCategories.map(c => c.label);
    const categoryCounts = Object.fromEntries(rawCategories.map(c => [c.label, c.count]));

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
                    onClick={onToggleCollapse}
                    aria-label="Hide filters"
                    title="Hide Filters"
                    style={{
                        display: 'flex', alignItems: 'center', gap: '7px',
                        padding: '8px 14px', borderRadius: '10px', flexShrink: 0,
                        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                        color: '#cbd5e1', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                        fontFamily: 'inherit', transition: 'all 0.2s', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.14)'; e.currentTarget.style.color='#f8fafc'; e.currentTarget.style.borderColor='rgba(255,255,255,0.28)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='#cbd5e1'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; }}
                >
                    <PanelRightClose size={15} />
                    <span>Hide</span>
                </button>
                <button 
                    className="filter-close-btn"
                    onClick={onClose}
                    aria-label="Close filters"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Selected App Info Card */}
            {selectedAppData && (
                <div style={{
                    margin: '0 16px 12px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: `linear-gradient(135deg, ${selectedAppData.color || '#7c3aed'}18, ${selectedAppData.color || '#7c3aed'}08)`,
                    border: `1px solid ${selectedAppData.color || '#7c3aed'}40`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '22px' }}>{selectedAppData.icon || '🎮'}</span>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {selectedAppData.name}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '11px' }}>
                                {selectedAppData.genre || selectedAppData.type || 'App'} · {selectedAppData.platform || ''}
                            </div>
                        </div>
                    </div>
                    {appCategory && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>CATEGORY:</span>
                            <span style={{
                                padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700,
                                background: `${selectedAppData.color || '#7c3aed'}25`,
                                color: selectedAppData.color || '#a78bfa',
                                border: `1px solid ${selectedAppData.color || '#7c3aed'}40`,
                            }}>
                                {appCategory}
                            </span>
                        </div>
                    )}
                </div>
            )}

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

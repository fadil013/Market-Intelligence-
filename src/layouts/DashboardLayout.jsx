import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Gamepad2, LayoutDashboard, TrendingUp, BarChart3, Brain, Lightbulb, Menu, X } from 'lucide-react';

const DashboardLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/' },
        { icon: TrendingUp, label: 'Trends & Boosts', path: '/trends' },
        { icon: BarChart3, label: 'Market Compare', path: '/market' },
        { icon: Brain, label: 'Predictive AI', path: '/predictive' },
        { icon: Lightbulb, label: 'Suggestions', path: '/suggestions' },
    ];

    return (
        <div className="app-container-new">
            <header className="top-nav">
                <button 
                    className="mobile-menu-toggle" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="top-nav-brand">
                    <Gamepad2 size={24} style={{ color: '#6b7280' }} />
                    <span className="brand-name">Onyx Games</span>
                </div>
                <nav className="top-nav-tabs">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </header>
            
            {/* Mobile Menu Sidebar - Slides from Left */}
            {mobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
                    <nav className="mobile-menu-sidebar" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-menu-header">
                            <div className="flex items-center gap-3">
                                <Gamepad2 size={22} style={{ color: '#6b7280' }} />
                                <span style={{ fontSize: '18px', fontWeight: 700, color: '#f9fafb' }}>Onyx Games</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '8px' }}>
                                <X size={20} />
                            </button>
                        </div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
            
            <main className="main-content-new">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

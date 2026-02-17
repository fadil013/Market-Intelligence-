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
                <button 
                    className="mobile-menu-toggle" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>
            
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
                    <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
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

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Gamepad2, LayoutDashboard, TrendingUp, BarChart3, Brain, Lightbulb } from 'lucide-react';

const DashboardLayout = () => {
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
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </header>
            <main className="main-content-new">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

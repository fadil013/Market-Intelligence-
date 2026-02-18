import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, BarChart3, Brain, Lightbulb, Activity, Bell } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: TrendingUp, label: 'Trends & Boosts', path: '/trends' },
    { icon: BarChart3, label: 'Market Compare', path: '/market' },
    { icon: Brain, label: 'Predictive AI', path: '/predictive' },
    { icon: Bell, label: 'Breakout Alerts', path: '/alerts' },
    { icon: Lightbulb, label: 'Suggestions', path: '/suggestions' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity size={28} className="min-w-[28px]" style={{ color: '#3b82f6' }} />
        <span>Onyx Games</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} className="min-w-[20px]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <h4>Intelligence Active</h4>
          <p>v2.0.0 · Real-time sync</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

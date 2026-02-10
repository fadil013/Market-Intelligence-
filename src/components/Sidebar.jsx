import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, BarChart3, Brain, Lightbulb, Smartphone } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: TrendingUp, label: 'Trends & Boosts', path: '/trends' },
    { icon: BarChart3, label: 'Market Compare', path: '/market' },
    { icon: Brain, label: 'Predictive AI', path: '/predictive' },
    { icon: Lightbulb, label: 'Suggestions', path: '/suggestions' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Smartphone size={32} />
        <span>MID Pro</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <h4>Stay Updated</h4>
          <p>v1.2.0 • Data Sync Active</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import { LayoutDashboard, TrendingUp, BarChart3, Brain, Lightbulb, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ collapsed, onToggle }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: TrendingUp, label: 'Trends & Boosts', path: '/trends' },
    { icon: BarChart3, label: 'Market Compare', path: '/market' },
    { icon: Brain, label: 'Predictive AI', path: '/predictive' },
    { icon: Lightbulb, label: 'Suggestions', path: '/suggestions' },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <Smartphone size={32} className="min-w-[32px]" />
        {!collapsed && <span>MID Pro</span>}
        <button
          onClick={onToggle}
          className="sidebar-toggle-btn"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : ''}
          >
            <item.icon size={20} className="min-w-[20px]" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          {collapsed ? (
            <div className="text-center font-black text-purple-400">v1.2</div>
          ) : (
            <>
              <h4>Stay Updated</h4>
              <p>v1.2.0 • Data Sync Active</p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

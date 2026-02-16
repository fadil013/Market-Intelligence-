# 🎮 Market Intelligence Dashboard (MID Pro)

A high-fidelity, production-ready analytics dashboard for mobile market intelligence, engineered for "Absolute Perfection" in performance and user experience.

## ✨ Project Mission
To provide a seamless, single-screen experience for analyzing competitive app data, store rankings, and predictive market trends with zero perceptual latency.

> [!NOTE]
> **Active Development**: The user is currently developing the **Mobile App version** of this dashboard. Copilot should consider mobile-first or cross-platform consistency when suggest changes to the web dashboard.

## 🚀 Technical Highlights
- **Single-Screen Layout**: Collapsible navigation and sticky side-panel details eliminate horizontal scrolling.
- **Safe Hydration**: Architectural pattern to ensure zero "data flashes" when switching between complex chart datasets.
- **Hardened CSS**: Critical UI components use robust Vanilla CSS to ensure visual integrity across deployments.

## 🛠️ Tech Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + Vanilla CSS (Hardened)
- **Visualization**: Recharts
- **Icons**: Lucide-React

## 📂 Key Architecture
- `/src/pages/Overview.jsx`: Primary dashboard logic (Filters | Rankings | Details).
- `/src/components/AppDetailView.jsx`: High-density side-panel analytics.
- `/src/components/Sidebar.jsx`: Collapsible navigation system.
- `/src/data/mockData.js`: Central source of truth for dashboard metrics.

## 📈 Roadmap (Next for Copilot)
1. **API Integration**: Transition from `mockData.js` to real-time endpoints (e.g., Sensor Tower).
2. **Filter Logic**: Implement the backend/frontend filtering logic for the `AdvancedFilter` component.
3. **List Virtualization**: Integrate `react-window` for large-scale store ranking datasets.

---

**Developed for Absolute Perfection.** 🥂🫡

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { navigationItems, pageMeta } from "../../shared/config/navigation";

function DashboardLayout({ dashboard }) {
  const location = useLocation();
  const currentMeta = pageMeta[location.pathname] ?? pageMeta["/"];

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-panel">
          <div className="brand-icon">OZ</div>
          <div>
            <strong>OptiZenqor</strong>
            <p>Commerce and product operations</p>
          </div>
        </div>

        <nav className="nav-stack">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-button ${isActive ? "active" : ""}`.trim()
              }
            >
              <span>{item.label}</span>
              <small>{item.helper}</small>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Connected domains</p>
          <h3>Aligned with your app and web flow</h3>
          <p>
            Catalog, categories, offers, account actions, auth states, and API
            endpoints are now reflected in the dashboard structure.
          </p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">{currentMeta.eyebrow}</p>
            <h1>{currentMeta.title}</h1>
            <p className="topbar-copy">{currentMeta.description}</p>
          </div>

          <div className="topbar-actions">
            <article className="mini-stat">
              <strong>{dashboard.pendingActions}</strong>
              <span>Pending actions</span>
            </article>
            <article className="mini-stat">
              <strong>{dashboard.systemSnapshot.liveRoutes}</strong>
              <span>Live routes</span>
            </article>
            <article className="mini-stat">
              <strong>{dashboard.systemSnapshot.apiCount}</strong>
              <span>API endpoints</span>
            </article>
          </div>
        </header>

        <div className="mobile-nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`.trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <section className="hero-card page-hero">
          <div>
            <p className="eyebrow">Platform visibility</p>
            <h2>{currentMeta.heroTitle}</h2>
            <p className="hero-copy">{currentMeta.heroCopy}</p>
          </div>

          <div className="hero-metrics compact">
            {currentMeta.highlights.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <Outlet context={dashboard} />
      </main>
    </div>
  );
}

export default DashboardLayout;

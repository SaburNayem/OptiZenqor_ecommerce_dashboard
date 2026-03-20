import DashboardSection from "../shared/ui/DashboardSection";
import { useDashboard } from "../store/DashboardContext";

function FeaturesPage() {
  const dashboard = useDashboard();

  return (
    <div className="page-stack">
      <DashboardSection
        title="Feature rollout control"
        subtitle="Separate release management for product, commerce, and content initiatives."
      >
        <div className="feature-list">
          {dashboard.features.map((feature) => (
            <article key={feature.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{feature.name}</h3>
                  <p>
                    {feature.owner} • {feature.exposure}
                  </p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${feature.enabled ? "enabled" : ""}`}
                >
                  {feature.enabled ? "Enabled" : "Disabled"}
                </button>
              </div>
              <div className="rollout-row">
                <span>Rollout</span>
                <strong>{feature.rollout}%</strong>
              </div>
              <div className="progress-track">
                <span style={{ width: `${feature.rollout}%` }} />
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

export default FeaturesPage;

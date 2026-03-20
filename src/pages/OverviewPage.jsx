import InsightCard from "../shared/ui/InsightCard";
import DashboardSection from "../shared/ui/DashboardSection";
import SummaryGrid from "../shared/ui/SummaryGrid";
import StatusBadge from "../shared/ui/StatusBadge";
import { useDashboard } from "../store/DashboardContext";

function OverviewPage() {
  const dashboard = useDashboard();

  return (
    <div className="page-stack">
      <SummaryGrid items={dashboard.stats} />

      <section className="card-grid three-up">
        <InsightCard
          eyebrow="Storefront"
          title="Catalog readiness"
          value={`${dashboard.products.filter((item) => item.status === "Published").length} products live`}
          description="Products and categories taken from the existing web app are now visible in admin summary form."
        />
        <InsightCard
          eyebrow="Customers"
          title="Account health"
          value={`${dashboard.users.filter((item) => item.status === "Active").length} active users`}
          description="Support, account, and order-oriented user operations are separated from catalog tasks."
        />
        <InsightCard
          eyebrow="Platform"
          title="System coverage"
          value={`${dashboard.apiConfig.endpoints.length} monitored endpoints`}
          description="Auth, category, favorite, cart, and product routes from the app are represented in system visibility."
        />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Operations feed"
            subtitle="Current activity across catalog, content, and auth service operations."
          >
            <div className="activity-list">
              {dashboard.activityFeed.map((item) => (
                <article key={item} className="activity-item">
                  <span className="activity-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Auth flow health"
            subtitle="A compact view of the service behaviors defined in the mobile app."
          >
            <div className="feature-list">
              {dashboard.authFlows.map((flow) => (
                <article key={flow.key} className="feature-card">
                  <div className="feature-topline">
                    <div>
                      <h3>{flow.key}</h3>
                      <p>{flow.detail}</p>
                    </div>
                    <StatusBadge value={flow.status} toneMap={dashboard.toneMap} />
                  </div>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default OverviewPage;

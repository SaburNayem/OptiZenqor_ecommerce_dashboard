import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import StatusBadge from "../shared/ui/StatusBadge";
import { useDashboard } from "../store/DashboardContext";

function SystemPage() {
  const dashboard = useDashboard();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="API endpoint coverage"
            subtitle="Mirrored from the mobile app endpoint constants."
          >
            <DataTable
              columns={["Endpoint", "Purpose", "Status"]}
              rows={dashboard.apiConfig.endpoints.map((endpoint) => (
                <tr key={endpoint}>
                  <td>{endpoint}</td>
                  <td>{describeEndpoint(endpoint)}</td>
                  <td>
                    <StatusBadge value="Healthy" toneMap={dashboard.toneMap} />
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Service configuration"
            subtitle="Technical settings extracted from the current app service layer."
          >
            <div className="feature-card">
              <h3>Base URL</h3>
              <p>{dashboard.apiConfig.baseUrl}</p>
            </div>
          </DashboardSection>
        </div>
      </section>

      <DashboardSection
        title="Authentication service flow"
        subtitle="These responses reflect the current mock service behavior inside the Flutter app."
      >
        <DataTable
          columns={["Flow", "Behavior", "Status"]}
          rows={dashboard.authFlows.map((flow) => (
            <tr key={flow.key}>
              <td>{flow.key}</td>
              <td>{flow.detail}</td>
              <td>
                <StatusBadge value={flow.status} toneMap={dashboard.toneMap} />
              </td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

function describeEndpoint(endpoint) {
  if (endpoint.includes("sign-in")) return "Login and token issue";
  if (endpoint.includes("sign-up")) return "Create customer account";
  if (endpoint.includes("products")) return "Catalog listing and merchandising";
  if (endpoint.includes("categories")) return "Store taxonomy and browse structure";
  if (endpoint.includes("cart")) return "Order intent and checkout basket";
  if (endpoint.includes("favorite")) return "Wishlist and repeat intent";

  return "Platform route";
}

export default SystemPage;

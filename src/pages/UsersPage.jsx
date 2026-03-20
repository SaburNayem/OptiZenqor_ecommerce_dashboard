import { useOutletContext } from "react-router-dom";
import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import InsightCard from "../shared/ui/InsightCard";
import StatusBadge from "../shared/ui/StatusBadge";

function UsersPage() {
  const dashboard = useOutletContext();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Customer and account management"
            subtitle="Users, plan access, order activity, and support visibility aligned to your app account flow."
          >
            <DataTable
              columns={["User", "Role", "Plan", "Orders", "Favorites", "Status"]}
              rows={dashboard.users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="identity-cell">
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td>{user.plan}</td>
                  <td>{user.orders}</td>
                  <td>{user.favorites}</td>
                  <td>
                    <StatusBadge value={user.status} toneMap={dashboard.toneMap} />
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Account actions"
            subtitle="Actions mirrored from the existing account page."
          >
            <div className="feature-list">
              {dashboard.accountActions.map((action) => (
                <article key={action.title} className="feature-card">
                  <h3>{action.title}</h3>
                  <p>{action.subtitle}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>

      <section className="card-grid">
        <InsightCard
          eyebrow="Customers"
          title="Support readiness"
          value="6 account actions"
          description="Personal details, orders, addresses, payments, and support have dedicated admin visibility."
        />
        <InsightCard
          eyebrow="Customers"
          title="Verification"
          value="Reset code monitored"
          description="Password reset and code verification are surfaced through the separate system view."
        />
        <InsightCard
          eyebrow="Customers"
          title="Engagement"
          value={`${dashboard.users.reduce((sum, user) => sum + user.favorites, 0)} favorites`}
          description="Favorite and order behavior gives the admin team a quick health signal."
        />
      </section>
    </div>
  );
}

export default UsersPage;

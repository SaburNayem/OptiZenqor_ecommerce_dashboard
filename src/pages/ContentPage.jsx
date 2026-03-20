import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import InsightCard from "../shared/ui/InsightCard";
import StatusBadge from "../shared/ui/StatusBadge";
import { useDashboard } from "../store/DashboardContext";

function ContentPage() {
  const dashboard = useDashboard();

  return (
    <div className="page-stack">
      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Editorial and campaign content"
            subtitle="Post workflow informed by existing blog, guide, and promotional content structures."
          >
            <DataTable
              columns={["Post", "Author", "Channel", "Reach", "Publish date", "Status", "Actions"]}
              rows={dashboard.posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="identity-cell">
                      <strong>{post.title}</strong>
                      <span>{post.id}</span>
                    </div>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.channel}</td>
                  <td>{post.reach}</td>
                  <td>{post.publishedAt}</td>
                  <td>
                    <StatusBadge value={post.status} toneMap={dashboard.toneMap} />
                  </td>
                  <td>
                    <div className="action-row">
                      <button type="button" className="table-action" onClick={() => dashboard.approvePost(post.id)}>
                        Accept
                      </button>
                      <button type="button" className="table-action danger" onClick={() => dashboard.rejectPost(post.id)}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Drawer content"
            subtitle="Links mirrored from the web drawer and support shell."
          >
            <div className="pill-grid">
              {dashboard.drawerItems.map((item) => (
                <span key={item} className="filter-pill">
                  {item}
                </span>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>

      <section className="card-grid">
        {dashboard.contentHighlights.map((item) => (
          <InsightCard
            key={item}
            eyebrow="Highlights"
            title="Homepage message"
            value="Ready"
            description={item}
          />
        ))}
      </section>
    </div>
  );
}

export default ContentPage;

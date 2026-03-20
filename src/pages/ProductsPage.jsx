import { useOutletContext } from "react-router-dom";
import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import StatusBadge from "../shared/ui/StatusBadge";
import InsightCard from "../shared/ui/InsightCard";

function ProductsPage() {
  const dashboard = useOutletContext();

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard
          eyebrow="Catalog"
          title="Featured candidates"
          value={dashboard.products.slice(0, 4).length}
          description="The leading storefront products are ready for homepage and campaign placement."
        />
        <InsightCard
          eyebrow="Catalog"
          title="Low stock"
          value={dashboard.products.filter((product) => product.status === "Low Stock").length}
          description="Products needing inventory attention before they impact conversion."
        />
        <InsightCard
          eyebrow="Offers"
          title="Campaign tabs"
          value={dashboard.offerTabs.length}
          description="Offer structures imported from the storefront for campaign planning."
        />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection
            title="Product catalog"
            subtitle="Products carried over from the existing React storefront data."
          >
            <DataTable
              columns={["Product", "Category", "Price", "Inventory", "Sales", "Status"]}
              rows={dashboard.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="identity-cell">
                      <strong>{product.name}</strong>
                      <span>{product.id}</span>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>${product.price}</td>
                  <td>{product.inventory}</td>
                  <td>{product.sales}</td>
                  <td>
                    <StatusBadge value={product.status} toneMap={dashboard.toneMap} />
                  </td>
                </tr>
              ))}
            />
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection
            title="Offer planning"
            subtitle="Promotional structures already used in the storefront."
          >
            <div className="pill-grid">
              {dashboard.offerTabs.map((tab) => (
                <span key={tab} className="filter-pill">
                  {tab}
                </span>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection
            title="Homepage highlights"
            subtitle="Current storefront messaging ready for admin review."
          >
            <div className="activity-list">
              {dashboard.homeHighlights.map((item) => (
                <article key={item} className="activity-item">
                  <span className="activity-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;

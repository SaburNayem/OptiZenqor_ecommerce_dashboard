import { useOutletContext } from "react-router-dom";
import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import InsightCard from "../shared/ui/InsightCard";

function CategoriesPage() {
  const dashboard = useOutletContext();

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard
          eyebrow="Categories"
          title="Active categories"
          value={dashboard.categories.length}
          description="All storefront categories are represented in the dashboard taxonomy view."
        />
        <InsightCard
          eyebrow="Categories"
          title="Largest segment"
          value="Beauty & Personal Care"
          description="This category currently holds the deepest product assortment in the imported seed data."
        />
        <InsightCard
          eyebrow="Categories"
          title="Navigation health"
          value={`${dashboard.categories.filter((item) => item.productCount > 0).length}/${dashboard.categories.length}`}
          description="Categories with live products connected to the browsing experience."
        />
      </section>

      <DashboardSection
        title="Category management"
        subtitle="The same category structure used by the storefront browsing and product details flow."
      >
        <DataTable
          columns={["Category", "Icon", "Banner title", "Products", "State"]}
          rows={dashboard.categories.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="identity-cell">
                  <strong>{category.name}</strong>
                  <span>{category.id}</span>
                </div>
              </td>
              <td>{category.icon}</td>
              <td>{category.bannerTitle}</td>
              <td>{category.productCount}</td>
              <td>{category.productCount > 0 ? "Ready" : "Empty"}</td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default CategoriesPage;

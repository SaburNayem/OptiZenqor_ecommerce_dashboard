import { useEffect, useMemo, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import DataTable from "../../../shared/ui/DataTable";
import InsightCard from "../../../shared/ui/InsightCard";
import { adminRequest } from "../../../shared/api/adminApi";

function CategoriesPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    categories: [],
    products: [],
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const appControl = await adminRequest("/admin/app-control");
        if (!active) return;

        setState({
          loading: false,
          error: "",
          categories: appControl.categories || [],
          products: appControl.products || [],
        });
      } catch (error) {
        if (!active) return;
        setState((current) => ({
          ...current,
          loading: false,
          error: error.message || "Unable to load categories.",
        }));
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () =>
      state.categories.map((category) => {
        const productCount = state.products.filter((product) => {
          const categoryIds = [
            product.primaryCategoryId,
            ...(product.categories || []).map((item) => item.categoryId),
          ].filter(Boolean);

          return categoryIds.includes(category.id);
        }).length;

        return {
          ...category,
          productCount,
          readiness: productCount > 0 ? "Ready" : "Empty",
        };
      }),
    [state.categories, state.products],
  );

  const largestCategory = useMemo(
    () =>
      categories.reduce(
        (largest, current) => (current.productCount > largest.productCount ? current : largest),
        categories[0] || { name: "None", productCount: 0 },
      ),
    [categories],
  );

  if (state.loading) {
    return <div className="page-stack"><section className="panel-card"><p>Loading categories...</p></section></div>;
  }

  if (state.error) {
    return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;
  }

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard
          eyebrow="Categories"
          title="Active categories"
          value={categories.filter((item) => item.isActive).length}
          description="Every store taxonomy group visible to admins in one table."
        />
        <InsightCard
          eyebrow="Categories"
          title="Largest segment"
          value={largestCategory.name}
          description={`${largestCategory.productCount} products currently point at this category.`}
        />
        <InsightCard
          eyebrow="Categories"
          title="Ready groups"
          value={`${categories.filter((item) => item.readiness === "Ready").length}/${categories.length}`}
          description="Categories with products assigned and ready for merchandising."
        />
      </section>

      <DashboardSection title="Category management" subtitle="Taxonomy shared across the website and mobile app browsing experiences.">
        <DataTable
          columns={["Category", "Icon", "Banner title", "Products", "State"]}
          rows={categories.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="identity-cell">
                  <strong>{category.name}</strong>
                  <span>{category.id}</span>
                </div>
              </td>
              <td>{category.icon || category.name.slice(0, 1).toUpperCase()}</td>
              <td>{category.bannerTitle || category.name}</td>
              <td>{category.productCount}</td>
              <td>{category.readiness}</td>
            </tr>
          ))}
        />
      </DashboardSection>
    </div>
  );
}

export default CategoriesPage;

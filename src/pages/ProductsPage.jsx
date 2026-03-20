import { useState } from "react";
import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import StatusBadge from "../shared/ui/StatusBadge";
import InsightCard from "../shared/ui/InsightCard";
import { categories } from "../store/data/catalog";
import { useDashboard } from "../store/DashboardContext";

function ProductsPage() {
  const dashboard = useDashboard();
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState({
    name: "",
    categoryId: categories[0].id,
    categoryName: categories[0].name,
    price: "",
    inventory: "",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    description: "",
    status: "Draft",
  });

  function resetForm() {
    setEditingId("");
    setForm({
      name: "",
      categoryId: categories[0].id,
      categoryName: categories[0].name,
      price: "",
      inventory: "",
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
      description: "",
      status: "Draft",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.price || !form.inventory) return;

    if (editingId) {
      dashboard.updateProduct(editingId, {
        ...form,
        price: Number(form.price),
        inventory: Number(form.inventory),
      });
    } else {
      dashboard.addProduct(form);
    }

    resetForm();
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      price: String(product.price),
      inventory: String(product.inventory),
      imageUrl: product.imageUrl,
      description: product.description,
      status: product.status,
    });
  }

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
              columns={["Product", "Category", "Price", "Inventory", "Sales", "Status", "Actions"]}
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
                  <td>
                    <div className="action-row">
                      <button type="button" className="table-action" onClick={() => startEdit(product)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="table-action danger"
                        onClick={() => dashboard.deleteProduct(product.id)}
                      >
                        Delete
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
            title={editingId ? "Edit product" : "Add product"}
            subtitle="Create, update, or remove catalog items directly from the dashboard."
          >
            <form className="form-card" onSubmit={handleSubmit}>
              <label>
                Product name
                <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
              </label>
              <label>
                Category
                <select
                  value={form.categoryId}
                  onChange={(event) => {
                    const selected = categories.find((item) => item.id === event.target.value);
                    setForm((current) => ({
                      ...current,
                      categoryId: event.target.value,
                      categoryName: selected?.name || "",
                    }));
                  }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="split-fields">
                <label>
                  Price
                  <input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
                </label>
                <label>
                  Inventory
                  <input value={form.inventory} onChange={(event) => setForm((current) => ({ ...current, inventory: event.target.value }))} />
                </label>
              </div>
              <label>
                Status
                <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Low Stock</option>
                </select>
              </label>
              <label>
                Image URL
                <input value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
              </label>
              <label>
                Description
                <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} />
              </label>
              <div className="action-row">
                <button type="submit" className="primary-button">
                  {editingId ? "Update product" : "Add product"}
                </button>
                {editingId ? (
                  <button type="button" className="secondary-button" onClick={resetForm}>
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </DashboardSection>

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

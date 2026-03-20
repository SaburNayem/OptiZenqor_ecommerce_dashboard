import { useState } from "react";
import DashboardSection from "../shared/ui/DashboardSection";
import DataTable from "../shared/ui/DataTable";
import StatusBadge from "../shared/ui/StatusBadge";
import InsightCard from "../shared/ui/InsightCard";
import { categories } from "../store/data/catalog";
import { useDashboard } from "../store/DashboardContext";

const defaultImage =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80";

function getInitialForm() {
  return {
    name: "",
    categoryIds: [categories[0].id],
    categoryNames: [categories[0].name],
    primaryCategoryId: categories[0].id,
    primaryCategoryName: categories[0].name,
    offerTags: [],
    price: "",
    inventory: "",
    imageUrl: defaultImage,
    description: "",
    status: "Draft",
  };
}

function ProductsPage() {
  const dashboard = useDashboard();
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(getInitialForm);
  const [newOfferTab, setNewOfferTab] = useState("");

  function resetForm() {
    setEditingId("");
    setForm(getInitialForm());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.price || !form.inventory || !form.categoryIds.length) return;

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
      categoryIds: product.categoryIds ?? [product.categoryId],
      categoryNames: product.categoryNames ?? [product.categoryName],
      primaryCategoryId: product.categoryId,
      primaryCategoryName: product.categoryName,
      offerTags: product.offerTags ?? [],
      price: String(product.price),
      inventory: String(product.inventory),
      imageUrl: product.imageUrl,
      description: product.description,
      status: product.status,
    });
  }

  function toggleCategory(category) {
    setForm((current) => {
      const exists = current.categoryIds.includes(category.id);
      const categoryIds = exists
        ? current.categoryIds.filter((id) => id !== category.id)
        : [...current.categoryIds, category.id];
      const categoryNames = categories
        .filter((item) => categoryIds.includes(item.id))
        .map((item) => item.name);

      const primaryCategoryId = categoryIds.includes(current.primaryCategoryId)
        ? current.primaryCategoryId
        : categoryIds[0] || categories[0].id;
      const primaryCategoryName =
        categories.find((item) => item.id === primaryCategoryId)?.name || categories[0].name;

      return {
        ...current,
        categoryIds,
        categoryNames,
        primaryCategoryId,
        primaryCategoryName,
      };
    });
  }

  function toggleOfferTab(tab) {
    setForm((current) => ({
      ...current,
      offerTags: current.offerTags.includes(tab)
        ? current.offerTags.filter((item) => item !== tab)
        : [...current.offerTags, tab],
    }));
  }

  function handleImageFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((current) => ({ ...current, imageUrl: previewUrl }));
  }

  function handleAddOfferTab(event) {
    event.preventDefault();
    if (!newOfferTab.trim()) return;
    dashboard.addOfferTab(newOfferTab);
    setNewOfferTab("");
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
              columns={["Product", "Primary", "Multi category", "Offers", "Price", "Status", "Actions"]}
              rows={dashboard.products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="identity-cell product-cell">
                      <img src={product.imageUrl} alt={product.name} className="product-thumb" />
                      <strong>{product.name}</strong>
                      <span>{product.id}</span>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td>{(product.categoryNames ?? [product.categoryName]).join(", ")}</td>
                  <td>{product.offerTags?.length ? product.offerTags.join(", ") : "None"}</td>
                  <td>${product.price}</td>
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
                Primary category
                <select
                  value={form.primaryCategoryId}
                  onChange={(event) => {
                    const selected = categories.find((item) => item.id === event.target.value);
                    setForm((current) => ({
                      ...current,
                      primaryCategoryId: event.target.value,
                      primaryCategoryName: selected?.name || "",
                    }));
                  }}
                >
                  {categories
                    .filter((category) => form.categoryIds.includes(category.id))
                    .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                    ))}
                </select>
              </label>
              <div>
                <span className="field-label">Choose multiple categories</span>
                <div className="selector-grid">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`selector-pill ${form.categoryIds.includes(category.id) ? "active" : ""}`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="field-label">Choose offer tabs</span>
                <div className="selector-grid">
                  {dashboard.offerTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`selector-pill ${form.offerTags.includes(tab) ? "active offer" : ""}`}
                      onClick={() => toggleOfferTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
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
                Upload image directly
                <input type="file" accept="image/*" onChange={handleImageFileChange} />
              </label>
              <div className="image-preview-card">
                <img src={form.imageUrl} alt="Product preview" className="image-preview" />
                <div>
                  <strong>Preview</strong>
                  <p>This uses the direct image URL or uploaded local image preview.</p>
                </div>
              </div>
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
            subtitle="Promotional structures already used in the storefront, with admin add support."
          >
            <form className="inline-form" onSubmit={handleAddOfferTab}>
              <input
                value={newOfferTab}
                onChange={(event) => setNewOfferTab(event.target.value)}
                placeholder="Add new offer tab"
              />
              <button type="submit" className="primary-button compact-button">
                Add offer
              </button>
            </form>
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

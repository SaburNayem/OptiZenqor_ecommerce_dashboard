import { useEffect, useMemo, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import InsightCard from "../../../shared/ui/InsightCard";
import { adminRequest } from "../../../shared/api/adminApi";

function CatalogPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    products: [],
    categories: [],
  });
  const [form, setForm] = useState({
    name: "",
    slug: "",
    sku: "",
    description: "",
    shortDescription: "",
    imageUrl: "",
    price: "",
    compareAtPrice: "",
    stockQuantity: "",
    primaryCategoryId: "",
    isFeatured: false,
    isPopular: false,
    isVisible: true,
  });
  const [submitStatus, setSubmitStatus] = useState("");

  async function load() {
    try {
      const [products, appControl] = await Promise.all([
        adminRequest("/admin/products"),
        adminRequest("/admin/app-control"),
      ]);

      setState({
        loading: false,
        error: "",
        products,
        categories: appControl.categories || [],
      });
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message || "Unable to load catalog." }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => ({
    productCount: state.products.length,
    lowStockCount: state.products.filter((product) => Number(product.stockQuantity || 0) <= 10).length,
    offerCount: state.products.filter((product) => product.isFeatured || product.isPopular).length,
  }), [state.products]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitStatus("Saving product...");

    try {
      const slug = (form.slug || form.name)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      await adminRequest("/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          slug,
          sku: form.sku,
          description: form.description,
          shortDescription: form.shortDescription || undefined,
          imageUrl: form.imageUrl || undefined,
          price: Number(form.price || 0),
          compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
          stockQuantity: Number(form.stockQuantity || 0),
          primaryCategoryId: form.primaryCategoryId || undefined,
          categoryIds: form.primaryCategoryId ? [form.primaryCategoryId] : undefined,
          isFeatured: form.isFeatured,
          isPopular: form.isPopular,
          isVisible: form.isVisible,
          status: "ACTIVE",
        }),
      });

      setForm({
        name: "",
        slug: "",
        sku: "",
        description: "",
        shortDescription: "",
        imageUrl: "",
        price: "",
        compareAtPrice: "",
        stockQuantity: "",
        primaryCategoryId: "",
        isFeatured: false,
        isPopular: false,
        isVisible: true,
      });
      setSubmitStatus("Product created successfully.");
      await load();
    } catch (error) {
      setSubmitStatus(error.message || "Unable to create product.");
    }
  }

  if (state.loading) {
    return <div className="page-stack"><section className="panel-card"><p>Loading live catalog...</p></section></div>;
  }

  if (state.error) {
    return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;
  }

  return (
    <div className="page-stack">
      <section className="card-grid">
        <InsightCard eyebrow="Catalog" title="Products" value={stats.productCount} description="Live and draft items managed for app and website surfaces." />
        <InsightCard eyebrow="Catalog" title="Low stock" value={stats.lowStockCount} description="Products that need replenishment attention." />
        <InsightCard eyebrow="Campaigns" title="Promoted items" value={stats.offerCount} description="Featured or popular products currently highlighted in the system." />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Product catalog" subtitle="Products loaded directly from the OptiZenqor backend.">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {state.products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="identity-cell">
                          <strong>{product.name}</strong>
                          <span>{product.sku}</span>
                        </div>
                      </td>
                      <td>{product.primaryCategory?.name || "Unassigned"}</td>
                      <td>{`BDT ${Number(product.price || 0).toLocaleString()}`}</td>
                      <td>{product.stockQuantity}</td>
                      <td>{product.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Add product" subtitle="Create a new catalog record in the backend.">
            <form className="form-card" onSubmit={handleSubmit}>
              <label>
                Product name
                <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required />
              </label>
              <label>
                Slug
                <input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} placeholder="auto-generated if empty" />
              </label>
              <label>
                SKU
                <input value={form.sku} onChange={(event) => setForm((current) => ({ ...current, sku: event.target.value }))} required />
              </label>
              <label>
                Description
                <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required />
              </label>
              <label>
                Short description
                <input value={form.shortDescription} onChange={(event) => setForm((current) => ({ ...current, shortDescription: event.target.value }))} />
              </label>
              <label>
                Image URL
                <input value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
              </label>
              <div className="split-fields">
                <label>
                  Price
                  <input type="number" min="0" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} required />
                </label>
                <label>
                  Compare at
                  <input type="number" min="0" value={form.compareAtPrice} onChange={(event) => setForm((current) => ({ ...current, compareAtPrice: event.target.value }))} />
                </label>
              </div>
              <div className="split-fields">
                <label>
                  Stock
                  <input type="number" min="0" value={form.stockQuantity} onChange={(event) => setForm((current) => ({ ...current, stockQuantity: event.target.value }))} required />
                </label>
                <label>
                  Category
                  <select value={form.primaryCategoryId} onChange={(event) => setForm((current) => ({ ...current, primaryCategoryId: event.target.value }))}>
                    <option value="">Select category</option>
                    {state.categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="toggle-chip">
                <input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm((current) => ({ ...current, isFeatured: event.target.checked }))} />
                Featured
              </label>
              <label className="toggle-chip">
                <input type="checkbox" checked={form.isPopular} onChange={(event) => setForm((current) => ({ ...current, isPopular: event.target.checked }))} />
                Popular
              </label>
              <label className="toggle-chip">
                <input type="checkbox" checked={form.isVisible} onChange={(event) => setForm((current) => ({ ...current, isVisible: event.target.checked }))} />
                Visible
              </label>
              {submitStatus ? <p className={submitStatus.includes("successfully") ? "status-inline" : "auth-error"}>{submitStatus}</p> : null}
              <button type="submit" className="primary-button">Create product</button>
            </form>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;

import { useEffect, useState } from "react";
import DashboardSection from "../shared/ui/DashboardSection";
import { adminRequest } from "../shared/api/adminApi";

function AppControlPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    data: null,
    status: "",
  });

  async function load() {
    try {
      const data = await adminRequest("/admin/app-control");
      setState((current) => ({
        ...current,
        loading: false,
        error: "",
        data,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        loading: false,
        error: error.message || "Unable to load app controls.",
      }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function mutate(path, body, successMessage) {
    setState((current) => ({ ...current, status: "Saving changes..." }));

    try {
      await adminRequest(path, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      await load();
      setState((current) => ({ ...current, status: successMessage }));
    } catch (error) {
      setState((current) => ({ ...current, status: error.message || "Unable to save changes." }));
    }
  }

  if (state.loading) {
    return <div className="page-stack"><section className="panel-card"><p>Loading app controls...</p></section></div>;
  }

  if (state.error || !state.data) {
    return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error || "No control data found."}</p></section></div>;
  }

  const { controls, homepageSections, categories, offers, products, content, features, systemConfig } = state.data;

  return (
    <div className="page-stack">
      <section className="card-grid">
        <article className="insight-card">
          <p className="eyebrow">Homepage</p>
          <h3>Visible sections</h3>
          <strong>{controls.activeHomepageSections}</strong>
          <p>Hero slider and homepage blocks currently enabled for app and web.</p>
        </article>
        <article className="insight-card">
          <p className="eyebrow">Catalog</p>
          <h3>Live categories</h3>
          <strong>{controls.activeCategories}</strong>
          <p>Categories that can still appear inside the app browsing flow.</p>
        </article>
        <article className="insight-card">
          <p className="eyebrow">Campaigns</p>
          <h3>Active offers</h3>
          <strong>{controls.activeOffers}</strong>
          <p>Offer groups currently allowed to surface in the app and web offer areas.</p>
        </article>
      </section>

      {state.status ? <section className="panel-card"><p className={state.status.includes("Unable") ? "auth-error" : "status-inline"}>{state.status}</p></section> : null}

      <DashboardSection title="Homepage sections and slider" subtitle="Hide or show every homepage section, including top slider content blocks.">
        <div className="feature-list">
          {homepageSections.map((section) => (
            <article key={section.key} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.key}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${section.isActive ? "enabled" : ""}`}
                  onClick={() => mutate(`/homepage/${section.key}`, { isActive: !section.isActive }, `Homepage section "${section.title}" updated.`)}
                >
                  {section.isActive ? "Visible" : "Hidden"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Category visibility" subtitle="Turn categories on and off from the dashboard so the app can stop showing them.">
        <div className="feature-list">
          {categories.map((category) => (
            <article key={category.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.slug}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${category.isActive ? "enabled" : ""}`}
                  onClick={() => mutate(`/categories/${category.id}`, { isActive: !category.isActive }, `Category "${category.name}" updated.`)}
                >
                  {category.isActive ? "Visible" : "Hidden"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Offer control" subtitle="Control different offer groups separately for app and storefront campaigns.">
        <div className="feature-list">
          {offers.map((offer) => (
            <article key={offer.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{offer.label}</h3>
                  <p>{offer.slug}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${offer.isActive ? "enabled" : ""}`}
                  onClick={() => mutate(`/offers/${offer.id}`, { isActive: !offer.isActive }, `Offer "${offer.label}" updated.`)}
                >
                  {offer.isActive ? "Visible" : "Hidden"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Product control" subtitle="Hide or show products without deleting them.">
        <div className="feature-list">
          {products.slice(0, 12).map((product) => (
            <article key={product.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{product.name}</h3>
                  <p>{`${product.primaryCategory?.name || "No category"} · ${product.status}`}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-pill ${product.isVisible ? "enabled" : ""}`}
                  onClick={() => mutate(`/products/${product.id}`, { isVisible: !product.isVisible }, `Product "${product.name}" updated.`)}
                >
                  {product.isVisible ? "Visible" : "Hidden"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Content and feature flags" subtitle="Control app sections, content publishing, and feature rollouts from one area.">
        <div className="content-grid">
          <div className="primary-column">
            <div className="feature-list">
              {content.map((item) => (
                <article key={item.id} className="feature-card">
                  <div className="feature-topline">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.type}</p>
                    </div>
                    <button
                      type="button"
                      className={`toggle-pill ${item.status === "PUBLISHED" ? "enabled" : ""}`}
                      onClick={() =>
                        mutate(
                          `/content/${item.id}`,
                          { status: item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" },
                          `Content "${item.title}" updated.`,
                        )
                      }
                    >
                      {item.status}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="secondary-column">
            <div className="feature-list">
              {features.map((feature) => (
                <article key={feature.id} className="feature-card">
                  <div className="feature-topline">
                    <div>
                      <h3>{feature.label}</h3>
                      <p>{feature.environment}</p>
                    </div>
                    <button
                      type="button"
                      className={`toggle-pill ${feature.isEnabled ? "enabled" : ""}`}
                      onClick={() => mutate(`/features/${feature.id}`, { isEnabled: !feature.isEnabled }, `Feature "${feature.label}" updated.`)}
                    >
                      {feature.isEnabled ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection title="System configuration" subtitle="Core app-level values managed by the dashboard.">
        <div className="feature-list">
          {systemConfig.map((config) => (
            <article key={config.id} className="feature-card">
              <div className="feature-topline">
                <div>
                  <h3>{config.key}</h3>
                  <p>{config.description || "System-managed config value"}</p>
                </div>
                <strong>{config.value}</strong>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}

export default AppControlPage;

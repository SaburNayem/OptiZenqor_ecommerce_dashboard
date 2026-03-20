import { useMemo, useState } from "react";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "User Control" },
  { id: "products", label: "Products" },
  { id: "posts", label: "Posts" },
  { id: "features", label: "Features" },
];

const initialUsers = [
  {
    id: "USR-104",
    name: "Nafisa Rahman",
    email: "nafisa@optizenqor.com",
    role: "Admin",
    status: "Active",
    plan: "Enterprise",
    lastSeen: "2 min ago",
  },
  {
    id: "USR-231",
    name: "Arif Hasan",
    email: "arif@optizenqor.com",
    role: "Editor",
    status: "Review",
    plan: "Growth",
    lastSeen: "19 min ago",
  },
  {
    id: "USR-418",
    name: "Tania Akter",
    email: "tania@optizenqor.com",
    role: "Moderator",
    status: "Suspended",
    plan: "Starter",
    lastSeen: "Yesterday",
  },
  {
    id: "USR-567",
    name: "Ishraq Khan",
    email: "ishraq@optizenqor.com",
    role: "Support",
    status: "Active",
    plan: "Growth",
    lastSeen: "5 min ago",
  },
];

const initialProducts = [
  {
    id: "PRD-11",
    name: "Focus Planner",
    category: "Productivity",
    inventory: 84,
    price: "$29",
    status: "Published",
    sales: 1240,
  },
  {
    id: "PRD-12",
    name: "Habit Sprint Kit",
    category: "Wellness",
    inventory: 32,
    price: "$42",
    status: "Draft",
    sales: 490,
  },
  {
    id: "PRD-13",
    name: "Energy Audit Sheet",
    category: "Analytics",
    inventory: 120,
    price: "$19",
    status: "Published",
    sales: 1804,
  },
  {
    id: "PRD-14",
    name: "Team Ritual Pack",
    category: "Collaboration",
    inventory: 17,
    price: "$58",
    status: "Low Stock",
    sales: 665,
  },
];

const initialPosts = [
  {
    id: "PST-71",
    title: "How to Build a Zero-Overwhelm Workflow",
    author: "Admin Team",
    channel: "Blog",
    status: "Published",
    reach: "18.2K",
    publishedAt: "Mar 18",
  },
  {
    id: "PST-72",
    title: "Weekly Product Release Notes",
    author: "Nafisa Rahman",
    channel: "News",
    status: "Scheduled",
    reach: "7.4K",
    publishedAt: "Mar 22",
  },
  {
    id: "PST-73",
    title: "The Energy Mapping Method",
    author: "Arif Hasan",
    channel: "Guide",
    status: "Review",
    reach: "5.1K",
    publishedAt: "Pending",
  },
];

const initialFeatures = [
  {
    id: "FTR-1",
    name: "Smart reminders",
    owner: "Product Team",
    exposure: "All users",
    rollout: 100,
    enabled: true,
  },
  {
    id: "FTR-2",
    name: "Advanced analytics",
    owner: "Growth Team",
    exposure: "Pro plans",
    rollout: 60,
    enabled: true,
  },
  {
    id: "FTR-3",
    name: "AI post assistant",
    owner: "Content Team",
    exposure: "Internal",
    rollout: 15,
    enabled: false,
  },
];

const activityFeed = [
  "Arif moved a post to editorial review.",
  "Low-stock alert triggered for Team Ritual Pack.",
  "New enterprise admin approved for OptiZenqor Labs.",
  "Feature rollout updated for Advanced analytics.",
];

const statusToneMap = {
  Active: "success",
  Published: "success",
  Enabled: "success",
  Review: "warning",
  Scheduled: "warning",
  "Low Stock": "warning",
  Suspended: "danger",
  Draft: "muted",
};

function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [posts, setPosts] = useState(initialPosts);
  const [features, setFeatures] = useState(initialFeatures);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Productivity",
    inventory: "",
    price: "",
  });
  const [postForm, setPostForm] = useState({
    title: "",
    author: "",
    channel: "Blog",
  });

  const stats = useMemo(
    () => [
      {
        label: "Managed users",
        value: users.length,
        change: "+12% this month",
      },
      {
        label: "Published products",
        value: products.filter((item) => item.status === "Published").length,
        change: "4 ready to promote",
      },
      {
        label: "Active posts",
        value: posts.filter((item) => item.status !== "Draft").length,
        change: "3 in publishing flow",
      },
      {
        label: "Enabled features",
        value: features.filter((item) => item.enabled).length,
        change: "1 staged rollout",
      },
    ],
    [users, products, posts, features],
  );

  function cycleUserStatus(userId) {
    const nextStatus = {
      Active: "Review",
      Review: "Suspended",
      Suspended: "Active",
    };

    setUsers((current) =>
      current.map((user) =>
        user.id === userId ? { ...user, status: nextStatus[user.status] } : user,
      ),
    );
  }

  function cycleProductStatus(productId) {
    const nextStatus = {
      Published: "Low Stock",
      "Low Stock": "Draft",
      Draft: "Published",
    };

    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, status: nextStatus[product.status] }
          : product,
      ),
    );
  }

  function cyclePostStatus(postId) {
    const nextStatus = {
      Published: "Scheduled",
      Scheduled: "Review",
      Review: "Published",
    };

    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, status: nextStatus[post.status] } : post,
      ),
    );
  }

  function toggleFeature(featureId) {
    setFeatures((current) =>
      current.map((feature) =>
        feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature,
      ),
    );
  }

  function handleProductSubmit(event) {
    event.preventDefault();

    if (!productForm.name || !productForm.inventory || !productForm.price) {
      return;
    }

    setProducts((current) => [
      {
        id: `PRD-${current.length + 11}`,
        name: productForm.name,
        category: productForm.category,
        inventory: Number(productForm.inventory),
        price: productForm.price.startsWith("$") ? productForm.price : `$${productForm.price}`,
        status: "Draft",
        sales: 0,
      },
      ...current,
    ]);

    setProductForm({
      name: "",
      category: "Productivity",
      inventory: "",
      price: "",
    });
    setActiveSection("products");
  }

  function handlePostSubmit(event) {
    event.preventDefault();

    if (!postForm.title || !postForm.author) {
      return;
    }

    setPosts((current) => [
      {
        id: `PST-${current.length + 71}`,
        title: postForm.title,
        author: postForm.author,
        channel: postForm.channel,
        status: "Review",
        reach: "0.0K",
        publishedAt: "Pending",
      },
      ...current,
    ]);

    setPostForm({
      title: "",
      author: "",
      channel: "Blog",
    });
    setActiveSection("posts");
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-panel">
          <div className="brand-icon">OZ</div>
          <div>
            <strong>OptiZenqor</strong>
            <p>Control dashboard</p>
          </div>
        </div>

        <nav className="nav-stack">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-button ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">System pulse</p>
          <h3>All content and commerce controls live here.</h3>
          <p>
            Manage users, launch features, publish products, and move posts through
            review without leaving the dashboard.
          </p>
        </div>
      </aside>

      <main className="main-panel">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h1>Everything for OptiZenqor operations in one place.</h1>
            <p className="hero-copy">
              This dashboard centralizes feature control, user management, product
              publishing, and editorial workflow for the whole product team.
            </p>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>98.4%</strong>
              <span>Uptime</span>
            </div>
            <div>
              <strong>24</strong>
              <span>Pending actions</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Team members online</span>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.change}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="primary-column">
            {(activeSection === "overview" || activeSection === "users") && (
              <DashboardSection
                title="User control"
                subtitle="Roles, plans, access states, and recent account activity."
              >
                <DataTable
                  columns={["User", "Role", "Plan", "Status", "Last seen", "Action"]}
                  rows={users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="identity-cell">
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td>{user.role}</td>
                      <td>{user.plan}</td>
                      <td>
                        <StatusBadge value={user.status} />
                      </td>
                      <td>{user.lastSeen}</td>
                      <td>
                        <button
                          type="button"
                          className="table-action"
                          onClick={() => cycleUserStatus(user.id)}
                        >
                          Update state
                        </button>
                      </td>
                    </tr>
                  ))}
                />
              </DashboardSection>
            )}

            {(activeSection === "overview" || activeSection === "products") && (
              <DashboardSection
                title="Product manager"
                subtitle="Track catalog readiness, inventory pressure, and sellable status."
              >
                <DataTable
                  columns={["Product", "Category", "Inventory", "Price", "Status", "Action"]}
                  rows={products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="identity-cell">
                          <strong>{product.name}</strong>
                          <span>{product.id}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.inventory}</td>
                      <td>{product.price}</td>
                      <td>
                        <StatusBadge value={product.status} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="table-action"
                          onClick={() => cycleProductStatus(product.id)}
                        >
                          Change status
                        </button>
                      </td>
                    </tr>
                  ))}
                />
              </DashboardSection>
            )}

            {(activeSection === "overview" || activeSection === "posts") && (
              <DashboardSection
                title="Post workflow"
                subtitle="Run blog, guide, and campaign content from draft to publish."
              >
                <DataTable
                  columns={["Post", "Author", "Channel", "Reach", "Status", "Action"]}
                  rows={posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div className="identity-cell">
                          <strong>{post.title}</strong>
                          <span>{post.publishedAt}</span>
                        </div>
                      </td>
                      <td>{post.author}</td>
                      <td>{post.channel}</td>
                      <td>{post.reach}</td>
                      <td>
                        <StatusBadge value={post.status} />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="table-action"
                          onClick={() => cyclePostStatus(post.id)}
                        >
                          Move stage
                        </button>
                      </td>
                    </tr>
                  ))}
                />
              </DashboardSection>
            )}

            {(activeSection === "overview" || activeSection === "features") && (
              <DashboardSection
                title="Feature control"
                subtitle="Feature flags and rollout ownership for the product roadmap."
              >
                <div className="feature-list">
                  {features.map((feature) => (
                    <article key={feature.id} className="feature-card">
                      <div className="feature-topline">
                        <div>
                          <h3>{feature.name}</h3>
                          <p>
                            {feature.owner} • {feature.exposure}
                          </p>
                        </div>
                        <button
                          type="button"
                          className={`toggle-pill ${feature.enabled ? "enabled" : ""}`}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          {feature.enabled ? "Enabled" : "Disabled"}
                        </button>
                      </div>
                      <div className="rollout-row">
                        <span>Rollout</span>
                        <strong>{feature.rollout}%</strong>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: `${feature.rollout}%` }} />
                      </div>
                    </article>
                  ))}
                </div>
              </DashboardSection>
            )}
          </div>

          <div className="secondary-column">
            <DashboardSection
              title="Quick create"
              subtitle="Add products and editorial posts without leaving the workspace."
            >
              <form className="form-card" onSubmit={handleProductSubmit}>
                <div className="section-heading">
                  <h3>New product</h3>
                  <span>Catalog entry</span>
                </div>
                <label>
                  Product name
                  <input
                    value={productForm.name}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Product title"
                  />
                </label>
                <label>
                  Category
                  <select
                    value={productForm.category}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                  >
                    <option>Productivity</option>
                    <option>Wellness</option>
                    <option>Analytics</option>
                    <option>Collaboration</option>
                  </select>
                </label>
                <div className="split-fields">
                  <label>
                    Inventory
                    <input
                      type="number"
                      value={productForm.inventory}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          inventory: event.target.value,
                        }))
                      }
                      placeholder="0"
                    />
                  </label>
                  <label>
                    Price
                    <input
                      value={productForm.price}
                      onChange={(event) =>
                        setProductForm((current) => ({
                          ...current,
                          price: event.target.value,
                        }))
                      }
                      placeholder="$00"
                    />
                  </label>
                </div>
                <button type="submit" className="primary-button">
                  Create product
                </button>
              </form>

              <form className="form-card" onSubmit={handlePostSubmit}>
                <div className="section-heading">
                  <h3>New post</h3>
                  <span>Editorial queue</span>
                </div>
                <label>
                  Title
                  <input
                    value={postForm.title}
                    onChange={(event) =>
                      setPostForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Post headline"
                  />
                </label>
                <label>
                  Author
                  <input
                    value={postForm.author}
                    onChange={(event) =>
                      setPostForm((current) => ({
                        ...current,
                        author: event.target.value,
                      }))
                    }
                    placeholder="Writer name"
                  />
                </label>
                <label>
                  Channel
                  <select
                    value={postForm.channel}
                    onChange={(event) =>
                      setPostForm((current) => ({
                        ...current,
                        channel: event.target.value,
                      }))
                    }
                  >
                    <option>Blog</option>
                    <option>News</option>
                    <option>Guide</option>
                    <option>Campaign</option>
                  </select>
                </label>
                <button type="submit" className="primary-button alt">
                  Create post
                </button>
              </form>
            </DashboardSection>

            <DashboardSection
              title="Operations feed"
              subtitle="Recent control room updates across the system."
            >
              <div className="activity-list">
                {activityFeed.map((item) => (
                  <article key={item} className="activity-item">
                    <span className="activity-dot" />
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </DashboardSection>
          </div>
        </section>
      </main>
    </div>
  );
}

function DashboardSection({ title, subtitle, children }) {
  return (
    <section className="panel-card">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function StatusBadge({ value }) {
  const tone = statusToneMap[value] || "muted";

  return <span className={`status-badge ${tone}`}>{value}</span>;
}

export default App;

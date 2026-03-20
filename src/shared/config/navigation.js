export const navigationItems = [
  { to: "/", label: "Overview", helper: "Business snapshot", end: true },
  { to: "/catalog", label: "Catalog", helper: "Products and offers" },
  { to: "/categories", label: "Categories", helper: "Store taxonomy" },
  { to: "/customers", label: "Customers", helper: "Users and support" },
  { to: "/content", label: "Content", helper: "Posts and promo" },
  { to: "/features", label: "Features", helper: "Flags and rollout" },
  { to: "/chat", label: "Chat", helper: "Support inbox" },
  { to: "/system", label: "System", helper: "Auth and API health" },
];

export const pageMeta = {
  "/": {
    eyebrow: "Executive view",
    title: "Overview",
    description: "A single place to understand the live health of the OptiZenqor commerce ecosystem.",
    heroTitle: "Track the storefront, customers, content, and system readiness together.",
    heroCopy:
      "This control room mirrors the structure of your app and web projects so teams can operate products, categories, content, and platform settings from clearly separated areas.",
    highlights: [
      { label: "9 categories", value: "Synced from the storefront catalog structure" },
      { label: "12 products", value: "Seeded from the React storefront data" },
      { label: "6 endpoints", value: "Mirroring auth and catalog API routes" },
    ],
  },
  "/catalog": {
    eyebrow: "Catalog operations",
    title: "Catalog",
    description: "Manage storefront products, featured items, pricing, inventory, and sales readiness.",
    heroTitle: "Products now live in their own management surface.",
    heroCopy:
      "This area is aligned to the existing web and mobile catalog structure, including featured items, category mapping, pricing, stock status, and merchandising health.",
    highlights: [
      { label: "Featured", value: "Top products carried from the storefront homepage" },
      { label: "Offers", value: "Promotional tabs represented for campaign planning" },
      { label: "Inventory", value: "Low-stock and ready-to-publish visibility" },
    ],
  },
  "/categories": {
    eyebrow: "Store taxonomy",
    title: "Categories",
    description: "Review the categories and merchandising structure that power browsing in the web app.",
    heroTitle: "The catalog taxonomy is separated from product management.",
    heroCopy:
      "Categories, icons, banners, and product counts are managed independently here so storefront navigation stays clean as the assortment grows.",
    highlights: [
      { label: "Navigation", value: "Based on the storefront category grid" },
      { label: "Banner titles", value: "Mapped to current category presentation" },
      { label: "Coverage", value: "Every category connected to active products" },
    ],
  },
  "/customers": {
    eyebrow: "Customer operations",
    title: "Customers",
    description: "Handle account states, support actions, order history, and plan access from a dedicated page.",
    heroTitle: "Customer governance now matches the app account experience.",
    heroCopy:
      "This page brings together account actions, support handling, verification state, and role-based access, reflecting the sign-in and profile flows already present in the app.",
    highlights: [
      { label: "Account actions", value: "Personal details, orders, payments, support" },
      { label: "Favorites", value: "Reflecting storefront user behavior seeds" },
      { label: "Reset flow", value: "Auth verification states surfaced here" },
    ],
  },
  "/content": {
    eyebrow: "Editorial operations",
    title: "Content",
    description: "Plan blog posts, promotional offers, drawer links, and homepage highlights from one content hub.",
    heroTitle: "Promotional and editorial content has its own publishing workflow.",
    heroCopy:
      "This section is built around the same content pieces already visible in your web project, including offer tabs, highlight messaging, and support drawer content.",
    highlights: [
      { label: "Offer tabs", value: "Campaign structure from the storefront" },
      { label: "Drawer items", value: "Support and account links from the app shell" },
      { label: "Highlights", value: "Homepage messaging ready for review" },
    ],
  },
  "/features": {
    eyebrow: "Release control",
    title: "Features",
    description: "Ship new capabilities with rollout visibility across mobile, web, and internal admin tooling.",
    heroTitle: "Feature flags and rollout planning are isolated from content and catalog work.",
    heroCopy:
      "Teams can decide what launches to internal staff, all customers, or selected plans without overloading the rest of the dashboard.",
    highlights: [
      { label: "Mobile + web", value: "Flags mapped to storefront and app surfaces" },
      { label: "Exposure", value: "Internal, Pro, All users, and beta scopes" },
      { label: "Rollout", value: "Progressive delivery readiness for each feature" },
    ],
  },
  "/chat": {
    eyebrow: "Support inbox",
    title: "Chat",
    description: "Handle customer support conversations and order-related questions from a dedicated admin inbox.",
    heroTitle: "Customer chat now lives inside the admin dashboard.",
    heroCopy:
      "Support conversations, replies, and resolution status are now separated into their own workspace so admins can answer users without mixing that work into product or content operations.",
    highlights: [
      { label: "Threads", value: "Open, pending, and closed support conversations" },
      { label: "Replies", value: "Admin responses added directly in the dashboard" },
      { label: "Resolution", value: "Chats can be closed after support is complete" },
    ],
  },
  "/system": {
    eyebrow: "Platform health",
    title: "System",
    description: "See authentication behavior, API endpoint coverage, and service availability in one technical view.",
    heroTitle: "Operational system details now sit in their own technical dashboard.",
    heroCopy:
      "Auth flows, network endpoints, and service success states are separated here so engineering and operations can review platform readiness without mixing it into product tasks.",
    highlights: [
      { label: "Auth", value: "Sign in, sign up, reset, and code verification paths" },
      { label: "Endpoints", value: "Base URL and catalog routes mirrored from the app" },
      { label: "Service health", value: "Demo responses visualized for admin visibility" },
    ],
  },
};

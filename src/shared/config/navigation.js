export const navigationItems = [
  { to: "/", label: "Overview", helper: "Business snapshot", end: true },
  { to: "/app-control", label: "App Control", helper: "Show and hide sections" },
  { to: "/catalog", label: "Catalog", helper: "Products and offers" },
  { to: "/categories", label: "Categories", helper: "Store taxonomy" },
  { to: "/customers", label: "Customers", helper: "Accounts and support" },
  { to: "/orders", label: "Orders", helper: "Fulfillment control" },
  { to: "/content", label: "Content", helper: "Editorial and promo" },
  { to: "/homepage", label: "Homepage", helper: "Hero and sections" },
  { to: "/features", label: "Features", helper: "Flags and rollout" },
  { to: "/chat", label: "Chat", helper: "Support inbox" },
  { to: "/system", label: "System", helper: "API and auth health" },
  { to: "/settings", label: "Settings", helper: "Admin preferences" },
];

export const pageMeta = {
  "/": {
    eyebrow: "Executive view",
    title: "Overview",
    description: "A single place to understand commerce, support, content, and platform health together.",
    heroTitle: "Run the OptiZenqor website, app, and future API platform from one dashboard.",
    heroCopy:
      "This control center aligns catalog, orders, customers, homepage content, support, and system health so teams can manage the whole ecosystem without jumping between tools.",
    highlights: [
      { label: "11 routes", value: "Admin surfaces connected under one protected shell" },
      { label: "App + web", value: "Shared operational view across both customer channels" },
      { label: "API live", value: "Services connected to the current backend integration layer" },
    ],
  },
  "/catalog": {
    eyebrow: "Catalog operations",
    title: "Catalog",
    description: "Manage product records, stock, merchandising, visibility, and offers from one place.",
    heroTitle: "Product management now behaves more like a real admin surface.",
    heroCopy:
      "Admins can control category assignment, featured and popular states, offer tags, visibility, and inventory with a cleaner add and edit workflow.",
    highlights: [
      { label: "Visibility", value: "Hide or show products across app and web" },
      { label: "Merchandising", value: "Featured and popular controls included" },
      { label: "Inventory", value: "Low-stock monitoring built into the catalog flow" },
    ],
  },
  "/app-control": {
    eyebrow: "Global control",
    title: "App Control",
    description: "Control every major customer-facing section from one dashboard screen.",
    heroTitle: "Turn app sections, slider blocks, categories, offers, and content on or off from one place.",
    heroCopy:
      "This page is built to act like a real app-control center so admins can decide what the mobile app and storefront are allowed to show without touching code.",
    highlights: [
      { label: "Slider", value: "Homepage sections can be hidden or shown" },
      { label: "Offers", value: "Campaign groups can be controlled separately" },
      { label: "Categories", value: "Store taxonomy visibility can be switched live" },
    ],
  },
  "/categories": {
    eyebrow: "Store taxonomy",
    title: "Categories",
    description: "Monitor the category structure powering browsing and product discovery.",
    heroTitle: "Categories remain cleanly separated from product editing.",
    heroCopy:
      "Category readiness is derived from live product assignments so merchandising teams can see which groups are populated and ready to surface.",
    highlights: [
      { label: "Taxonomy", value: "Shared between website and mobile browsing" },
      { label: "Coverage", value: "Computed product counts per category" },
      { label: "Readiness", value: "Empty groups are visible immediately" },
    ],
  },
  "/customers": {
    eyebrow: "Customer operations",
    title: "Customers",
    description: "Handle account states, plans, roles, support history, and customer review flows.",
    heroTitle: "Customer governance now has filters, search, and account detail context.",
    heroCopy:
      "Admins can search accounts, filter by role or plan, inspect history, and moderate access without leaving the broader control center.",
    highlights: [
      { label: "Moderation", value: "Active, review, and suspended states visible" },
      { label: "Filters", value: "Search by role, plan, and status" },
      { label: "Context", value: "Action history stub prepared for future audit data" },
    ],
  },
  "/orders": {
    eyebrow: "Order operations",
    title: "Orders",
    description: "Track order status and fulfillment progress for app and storefront transactions.",
    heroTitle: "Orders now live in a dedicated admin surface.",
    heroCopy:
      "This page reviews live order records from the backend and supports status updates for fulfillment operations.",
    highlights: [
      { label: "Statuses", value: "Pending through refunded workflows covered" },
      { label: "Sources", value: "Website and app orders shown together" },
      { label: "Details", value: "Address, items, and payment context included" },
    ],
  },
  "/content": {
    eyebrow: "Editorial operations",
    title: "Content",
    description: "Manage blog, news, and guide content with status controls and homepage placement.",
    heroTitle: "Editorial workflow now supports richer publishing states.",
    heroCopy:
      "Draft, approved, rejected, and published flows are separated cleanly, and content can be associated with homepage placements for future rendering.",
    highlights: [
      { label: "Statuses", value: "Draft, approved, rejected, and published supported" },
      { label: "Placement", value: "Homepage placement selector included" },
      { label: "Campaigns", value: "Promo and editorial items managed together" },
    ],
  },
  "/homepage": {
    eyebrow: "Homepage control",
    title: "Homepage",
    description: "Manage hero content, CTAs, trust messaging, popular items, and offer ribbons.",
    heroTitle: "The customer-facing first impression is now configurable from the admin dashboard.",
    heroCopy:
      "Homepage controls are designed to represent both the React storefront and Flutter app landing experiences from one admin-managed content layer.",
    highlights: [
      { label: "Hero", value: "Title, subtitle, and CTA controls available" },
      { label: "Highlights", value: "Trust cards and offer ribbons editable" },
      { label: "Popular", value: "Popular product section tied to catalog items" },
    ],
  },
  "/features": {
    eyebrow: "Release control",
    title: "Features",
    description: "Ship capabilities progressively with real local flag mutation and rollout controls.",
    heroTitle: "Feature rollout is now interactive instead of read-only.",
    heroCopy:
      "Enabled state, rollout percentages, and environment targeting can all be adjusted through the current backend feature flag APIs.",
    highlights: [
      { label: "Toggle", value: "Local enable and disable control now active" },
      { label: "Rollout", value: "Editable percentage for staged delivery" },
      { label: "Environment", value: "Internal, beta, and public targeting included" },
    ],
  },
  "/chat": {
    eyebrow: "Support inbox",
    title: "Chat",
    description: "Manage support threads, reply with canned responses, and close or reopen issues.",
    heroTitle: "Support work now has better filtering and customer context.",
    heroCopy:
      "Unread counts, thread status filters, canned replies, and customer info cards make the chat workspace feel more like a real admin inbox.",
    highlights: [
      { label: "Unread", value: "Unread counts surfaced in the inbox" },
      { label: "Replies", value: "Quick canned responses supported" },
      { label: "Resolution", value: "Threads can be closed or reopened locally" },
    ],
  },
  "/system": {
    eyebrow: "Platform health",
    title: "System",
    description: "Track health cards, endpoint visibility, auth flow status, and environment configuration.",
    heroTitle: "System monitoring is clearer and more operational.",
    heroCopy:
      "Health checks, endpoint tables, and environment cards give the dashboard a clearer operational view of the current backend setup.",
    highlights: [
      { label: "Health", value: "Health cards summarize key technical surfaces" },
      { label: "Endpoints", value: "Status and latency shown together" },
      { label: "Refresh", value: "Manual refresh action prepared for future checks" },
    ],
  },
  "/settings": {
    eyebrow: "Admin configuration",
    title: "Settings",
    description: "Control admin identity, notifications, dashboard preferences, and API configuration.",
    heroTitle: "Admin preferences and platform configuration now have a dedicated home.",
    heroCopy:
      "Settings now works as the admin surface for live system configuration while leaving room for deeper profile and preference controls later.",
    highlights: [
      { label: "Profile", value: "Admin identity and title fields available" },
      { label: "Preferences", value: "Theme, density, and notifications included" },
      { label: "API", value: "Live config values available for service management" },
    ],
  },
};

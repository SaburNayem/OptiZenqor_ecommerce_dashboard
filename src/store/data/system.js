export const apiConfig = {
  baseUrl: "https://api.omnizara.com",
  endpoints: [
    "/auth/sign-in",
    "/auth/sign-up",
    "/products",
    "/categories",
    "/cart",
    "/favorite",
  ],
};

export const authFlows = [
  { key: "Sign in", status: "Healthy", detail: "Returns token and account email" },
  { key: "Sign up", status: "Healthy", detail: "Creates account payload for onboarding" },
  { key: "Password reset", status: "Healthy", detail: "Sends verification code successfully" },
  { key: "Verify code", status: "Healthy", detail: "Checks 123456 in the current mock service" },
];

export const features = [
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
  {
    id: "FTR-4",
    name: "Express checkout",
    owner: "Commerce Team",
    exposure: "Beta users",
    rollout: 40,
    enabled: true,
  },
];

export const activityFeed = [
  "Catalog sync refreshed the Electronics & Gadget inventory set.",
  "Flash Sell campaign moved to scheduled publishing.",
  "Password reset verification remained healthy in the latest auth check.",
  "Advanced analytics rollout increased for Growth plan users.",
];

export const toneMap = {
  Active: "success",
  Published: "success",
  Enabled: "success",
  Healthy: "success",
  Review: "warning",
  Scheduled: "warning",
  "Low Stock": "warning",
  Suspended: "danger",
  Disabled: "danger",
  Draft: "muted",
};

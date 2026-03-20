import { accountActions, users } from "./data/customers";
import { contentHighlights, drawerItems, posts } from "./data/content";
import { categories, homeHighlights, offerTabs, products } from "./data/catalog";
import { activityFeed, apiConfig, authFlows, features, toneMap } from "./data/system";

export function createDashboardStore() {
  const categoryCounts = categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.categoryId === category.id).length,
  }));

  const stats = [
    {
      label: "Categories",
      value: categories.length,
      change: `${categoryCounts.filter((item) => item.productCount > 0).length} populated groups`,
    },
    {
      label: "Products",
      value: products.length,
      change: `${products.filter((item) => item.status === "Published").length} live in catalog`,
    },
    {
      label: "Customers",
      value: users.length,
      change: `${users.filter((item) => item.status === "Active").length} active accounts`,
    },
    {
      label: "Endpoints",
      value: apiConfig.endpoints.length,
      change: `${authFlows.length} auth flows monitored`,
    },
  ];

  const pendingActions =
    products.filter((product) => product.status !== "Published").length +
    posts.filter((post) => post.status !== "Published").length +
    users.filter((user) => user.status !== "Active").length +
    features.filter((feature) => !feature.enabled).length;

  const systemSnapshot = {
    liveRoutes: 7,
    apiCount: apiConfig.endpoints.length,
  };

  return {
    stats,
    pendingActions,
    systemSnapshot,
    categories: categoryCounts,
    products,
    users,
    posts,
    features,
    activityFeed,
    offerTabs,
    homeHighlights,
    accountActions,
    drawerItems,
    contentHighlights,
    apiConfig,
    authFlows,
    toneMap,
  };
}

import { accountActions, users as seedUsers } from "./data/customers";
import { contentHighlights, drawerItems, posts as seedPosts } from "./data/content";
import { categories, homeHighlights, offerTabs, products as seedProducts } from "./data/catalog";
import {
  activityFeed,
  apiConfig,
  authFlows,
  features as seedFeatures,
  toneMap,
} from "./data/system";

export const initialChatThreads = [
  {
    id: "chat-1",
    customerName: "Nafisa Rahman",
    channel: "Website chat",
    orderRef: "ORD-1204",
    status: "Open",
    messages: [
      { id: "m1", sender: "customer", text: "My order is delayed. Can you check?", time: "09:20" },
      { id: "m2", sender: "admin", text: "Checking this for you now.", time: "09:24" },
    ],
  },
  {
    id: "chat-2",
    customerName: "Arif Hasan",
    channel: "Support inbox",
    orderRef: "ORD-1281",
    status: "Pending",
    messages: [
      { id: "m3", sender: "customer", text: "Can I change my delivery address?", time: "11:05" },
    ],
  },
];

export function createSeedState() {
  return {
    products: seedProducts,
    users: seedUsers,
    posts: seedPosts.map((post) => ({
      ...post,
      status: post.status === "Published" ? "Approved" : post.status,
    })),
    features: seedFeatures,
    chatThreads: initialChatThreads,
  };
}

export function buildDashboardView(state) {
  const categoryCounts = categories.map((category) => ({
    ...category,
    productCount: state.products.filter((product) => product.categoryId === category.id).length,
  }));

  const stats = [
    {
      label: "Categories",
      value: categories.length,
      change: `${categoryCounts.filter((item) => item.productCount > 0).length} populated groups`,
    },
    {
      label: "Products",
      value: state.products.length,
      change: `${state.products.filter((item) => item.status === "Published").length} live in catalog`,
    },
    {
      label: "Customers",
      value: state.users.length,
      change: `${state.users.filter((item) => item.status === "Active").length} active accounts`,
    },
    {
      label: "Chats",
      value: state.chatThreads.length,
      change: `${state.chatThreads.filter((item) => item.status !== "Closed").length} unresolved threads`,
    },
  ];

  const pendingActions =
    state.products.filter((product) => product.status !== "Published").length +
    state.posts.filter((post) => post.status !== "Approved").length +
    state.users.filter((user) => user.status !== "Active").length +
    state.features.filter((feature) => !feature.enabled).length +
    state.chatThreads.filter((thread) => thread.status !== "Closed").length;

  return {
    stats,
    pendingActions,
    systemSnapshot: {
      liveRoutes: 8,
      apiCount: apiConfig.endpoints.length,
    },
    categories: categoryCounts,
    products: state.products,
    users: state.users,
    posts: state.posts,
    features: state.features,
    chatThreads: state.chatThreads,
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

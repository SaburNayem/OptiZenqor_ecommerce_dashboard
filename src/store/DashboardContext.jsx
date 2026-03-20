import { createContext, useContext, useMemo, useState } from "react";
import { buildDashboardView, createSeedState } from "./dashboardStore";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, setState] = useState(createSeedState);

  const actions = {
    addProduct(form) {
      setState((current) => ({
        ...current,
        products: [
          {
            id: `p${current.products.length + 1}`,
            name: form.name,
            categoryId: form.categoryId,
            categoryName: form.categoryName,
            price: Number(form.price),
            rating: 4.5,
            imageUrl: form.imageUrl,
            description: form.description,
            inventory: Number(form.inventory),
            status: form.status,
            sales: 0,
          },
          ...current.products,
        ],
      }));
    },
    updateProduct(productId, updates) {
      setState((current) => ({
        ...current,
        products: current.products.map((product) =>
          product.id === productId ? { ...product, ...updates } : product,
        ),
      }));
    },
    deleteProduct(productId) {
      setState((current) => ({
        ...current,
        products: current.products.filter((product) => product.id !== productId),
      }));
    },
    approveUser(userId) {
      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === userId ? { ...user, status: "Active" } : user,
        ),
      }));
    },
    rejectUser(userId) {
      setState((current) => ({
        ...current,
        users: current.users.map((user) =>
          user.id === userId ? { ...user, status: "Suspended" } : user,
        ),
      }));
    },
    approvePost(postId) {
      setState((current) => ({
        ...current,
        posts: current.posts.map((post) =>
          post.id === postId ? { ...post, status: "Approved", publishedAt: "Today" } : post,
        ),
      }));
    },
    rejectPost(postId) {
      setState((current) => ({
        ...current,
        posts: current.posts.map((post) =>
          post.id === postId ? { ...post, status: "Rejected" } : post,
        ),
      }));
    },
    sendChatMessage(threadId, text) {
      if (!text.trim()) return;

      setState((current) => ({
        ...current,
        chatThreads: current.chatThreads.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                status: "Open",
                messages: [
                  ...thread.messages,
                  {
                    id: `m${thread.messages.length + 1}`,
                    sender: "admin",
                    text: text.trim(),
                    time: "Now",
                  },
                ],
              }
            : thread,
        ),
      }));
    },
    closeChat(threadId) {
      setState((current) => ({
        ...current,
        chatThreads: current.chatThreads.map((thread) =>
          thread.id === threadId ? { ...thread, status: "Closed" } : thread,
        ),
      }));
    },
  };

  const value = useMemo(() => ({ ...buildDashboardView(state), ...actions }), [state]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }

  return context;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");
const TOKEN_KEY = "optizenqor_admin_access_token";

function unwrapResponse(payload) {
  return payload?.data ?? payload;
}

export function getStoredToken() {
  return window.localStorage.getItem(TOKEN_KEY) || "";
}

export function setStoredToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function adminRequest(path, options = {}) {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredToken();
      window.localStorage.removeItem("optizenqor_admin_session");
    }
    throw new Error(json?.message || json?.error || `Request failed for ${path}`);
  }

  return unwrapResponse(json);
}

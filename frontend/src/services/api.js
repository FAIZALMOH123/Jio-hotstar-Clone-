const apiBase = import.meta.env.VITE_API_URL || "/api";
const sessionKey = "jio-hotstar-session";

export const readSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(sessionKey) || "null");
  } catch {
    return null;
  }
};

export const saveSession = (session) => {
  try {
    sessionStorage.setItem(sessionKey, JSON.stringify(session));
  } catch {
    return { success: false };
  }
  return { success: true };
};

export const clearSession = () => {
  try {
    sessionStorage.removeItem(sessionKey);
  } catch {
    return { success: false };
  }
  return { success: true };
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  return { ...data, statusCode: response.status };
};

const refreshSession = async (session) => {
  if (!session?.refreshToken) return { success: false };
  try {
    const response = await fetch(`${apiBase}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });
    const result = await parseResponse(response);
    if (!response.ok || !result.data?.token) return { success: false };
    const updated = { ...session, ...result.data };
    saveSession(updated);
    return { success: true, session: updated };
  } catch {
    return { success: false };
  }
};

export const apiRequest = async (path, options = {}, retry = true) => {
  const session = readSession();
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (session?.token) headers.set("Authorization", `Bearer ${session.token}`);

  try {
    const response = await fetch(`${apiBase}${path}`, { ...options, headers });
    const result = await parseResponse(response);
    if (path === "/auth/sign-in") {
      const details = {
        endpoint: `${apiBase}${path}`,
        statusCode: response.status,
        success: Boolean(result.success),
      };
      if (!response.ok || !result.success) {
        console.error("Sign-in request was rejected:", {
          ...details,
          code: result.code,
          message: result.message,
          fieldErrors: Object.keys(result.errors || {}),
        });
      } else {
        console.info("Sign-in request succeeded:", details);
      }
    }
    if (response.status === 401 && retry && session?.refreshToken && path !== "/auth/refresh") {
      const refreshed = await refreshSession(session);
      if (refreshed.success) return apiRequest(path, options, false);
      clearSession();
    }
    return result;
  } catch (error) {
    if (path === "/auth/sign-in") {
      console.error("Sign-in request could not reach the API:", {
        endpoint: `${apiBase}${path}`,
        error: error?.message || error?.name || "UNKNOWN_ERROR",
      });
    }
    return { success: false, statusCode: 503, message: "Cannot connect to the backend. Check that the API server is running." };
  }
};

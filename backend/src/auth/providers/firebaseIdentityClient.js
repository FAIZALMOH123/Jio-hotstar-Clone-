import { env } from "../../config/env.js";

const identityToolkitUrl = "https://identitytoolkit.googleapis.com/v1";

const getFirebaseErrorCode = (message = "") => {
  if (/api key.*not valid|invalid api key/i.test(message)) return "API_KEY_INVALID";
  const match = message.match(/^[A-Z][A-Z0-9_]+/);
  return match?.[0] || "AUTH_PROVIDER_ERROR";
};

export const firebaseRequest = async (endpoint, payload, operation = "auth") => {
  if (!env.firebaseWebApiKey) {
    return { success: false, statusCode: 503, code: "CONFIGURATION_ERROR" };
  }

  try {
    const response = await fetch(`${identityToolkitUrl}/${endpoint}?key=${encodeURIComponent(env.firebaseWebApiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const code = getFirebaseErrorCode(data.error?.message);
      console.error("Firebase Auth request rejected:", { endpoint, statusCode: response.status, code });
      return { success: false, statusCode: response.status, code };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Firebase Auth request failed:", {
      endpoint,
      code: error.cause?.code || error.code || error.name || "UNKNOWN_ERROR",
    });
    return { success: false, statusCode: operation === "reset" ? 502 : 503, code: "AUTH_PROVIDER_UNAVAILABLE" };
  }
};

export const sendVerificationEmail = (idToken, continueUrl = env.authContinueUrl) => firebaseRequest("accounts:sendOobCode", {
  requestType: "VERIFY_EMAIL",
  idToken,
  continueUrl,
});

export const sendPasswordResetEmail = (email) => firebaseRequest("accounts:sendOobCode", {
  requestType: "PASSWORD_RESET",
  email,
}, "reset");

export const refreshFirebaseToken = async (refreshToken) => {
  if (!env.firebaseWebApiKey) return { success: false, statusCode: 503, message: "Firebase authentication is not configured" };
  try {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(env.firebaseWebApiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    });
    const tokens = await response.json().catch(() => ({}));
    if (!response.ok || !tokens.id_token) return { success: false, statusCode: 401, message: "Session expired. Sign in again." };
    const lookup = await firebaseRequest("accounts:lookup", { idToken: tokens.id_token });
    const account = lookup.data?.users?.[0];
    if (!lookup.success || !account?.emailVerified) {
      return { success: false, statusCode: 403, message: "Verify your email to continue" };
    }
    return {
      success: true,
      data: {
        token: tokens.id_token,
        refreshToken: tokens.refresh_token || refreshToken,
        expiresIn: Number(tokens.expires_in),
      },
    };
  } catch (error) {
    console.error("Firebase token refresh failed:", error?.code || error?.name || "UNKNOWN_ERROR");
    return { success: false, statusCode: 502, message: "Authentication service is unavailable" };
  }
};

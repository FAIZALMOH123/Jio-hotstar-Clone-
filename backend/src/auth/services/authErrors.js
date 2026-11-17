export const cleanAuthError = (code) => {
  if (code === "EMAIL_EXISTS") return { statusCode: 409, message: "Email is already registered" };
  if (code === "INVALID_EMAIL") return { statusCode: 400, message: "Enter a valid email address" };
  if (code === "WEAK_PASSWORD") return { statusCode: 400, message: "Password must contain at least 8 characters" };
  if (["EMAIL_NOT_FOUND", "INVALID_PASSWORD", "INVALID_LOGIN_CREDENTIALS"].includes(code)) {
    return { statusCode: 401, message: "Email or password is incorrect" };
  }
  if (["TOO_MANY_ATTEMPTS_TRY_LATER", "QUOTA_EXCEEDED"].includes(code)) {
    return { statusCode: 429, message: "Too many attempts. Please try again later." };
  }
  if (["CONFIGURATION_ERROR", "API_KEY_INVALID", "PROJECT_NOT_FOUND", "OPERATION_NOT_ALLOWED", "CONFIGURATION_NOT_FOUND"].includes(code)) {
    return { statusCode: 503, message: "Firebase Authentication is not configured. Check the Web API key and enable Email/Password sign-in." };
  }
  if (code === "AUTH_PROVIDER_UNAVAILABLE") return { statusCode: 502, message: "Authentication service is unavailable" };
  if (code === "USER_DISABLED") return { statusCode: 403, message: "This account has been disabled" };
  return { statusCode: 502, message: "Unable to complete authentication request" };
};

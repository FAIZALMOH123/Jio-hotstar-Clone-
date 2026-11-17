import { refreshSessionTokens } from "../repositories/refreshSessionRepository.js";

export const refreshSession = async (refreshToken) => {
  if (typeof refreshToken !== "string" || !refreshToken.trim()) {
    return { success: false, statusCode: 400, message: "Refresh token is required" };
  }
  const result = await refreshSessionTokens(refreshToken);
  if (!result.success) return result;
  return { success: true, statusCode: 200, message: "Session refreshed", data: result.data };
};

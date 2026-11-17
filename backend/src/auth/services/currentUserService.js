import { findCurrentUserProfile } from "../repositories/currentUserRepository.js";

export const getCurrentUser = async (uid) => {
  const result = await findCurrentUserProfile(uid);
  return {
    ...result,
    statusCode: result.success ? 200 : result.statusCode || 503,
    message: result.message || "Profile loaded",
  };
};

import { refreshFirebaseToken } from "../providers/firebaseIdentityClient.js";

export const refreshSessionTokens = (refreshToken) => refreshFirebaseToken(refreshToken);

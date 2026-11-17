import { firebaseRequest } from "../providers/firebaseIdentityClient.js";
import { getUserProfile } from "./profileRepository.js";
import { auth } from "../../db/firebase.js";

export const authenticateSignIn = async (email, password) => {
  const result = await firebaseRequest("accounts:signInWithPassword", {
    email,
    password,
    returnSecureToken: true,
  });

  if (!result.success) return result;

  // Google Identity Toolkit REST API does not include emailVerified directly in its response.
  // We decode/verify the issued ID token to extract email_verified.
  if (auth && result.data?.idToken) {
    try {
      const decoded = await auth.verifyIdToken(result.data.idToken);
      result.data.emailVerified = Boolean(decoded.email_verified);
    } catch {
      try {
        const userRecord = await auth.getUser(result.data.localId);
        result.data.emailVerified = Boolean(userRecord.emailVerified);
      } catch {
        result.data.emailVerified = false;
      }
    }
  } else if (result.data?.idToken) {
    try {
      const payload = JSON.parse(Buffer.from(result.data.idToken.split(".")[1], "base64").toString("utf8"));
      result.data.emailVerified = Boolean(payload.email_verified);
    } catch {
      result.data.emailVerified = false;
    }
  }

  return result;
};

export const findSignInProfile = (uid) => getUserProfile(uid);

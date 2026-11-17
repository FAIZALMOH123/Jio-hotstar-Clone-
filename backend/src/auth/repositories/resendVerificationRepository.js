import { firebaseRequest, sendVerificationEmail } from "../providers/firebaseIdentityClient.js";

export const authenticateResendRequest = (email, password) => firebaseRequest("accounts:signInWithPassword", {
  email,
  password,
  returnSecureToken: true,
});

export const sendResentVerification = (idToken) => sendVerificationEmail(idToken);

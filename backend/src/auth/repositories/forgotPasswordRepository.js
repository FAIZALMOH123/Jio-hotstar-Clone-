import { sendPasswordResetEmail } from "../providers/firebaseIdentityClient.js";

export const requestResetEmail = (email) => sendPasswordResetEmail(email);

import { auth } from "../../db/firebase.js";
import { createUserProfile, deleteUserProfile } from "./profileRepository.js";
import { firebaseRequest, sendVerificationEmail } from "../providers/firebaseIdentityClient.js";

export const createAuthAccount = (email, password) => firebaseRequest("accounts:signUp", {
  email,
  password,
  returnSecureToken: true,
});

export const saveSignUpProfile = (profile) => createUserProfile(profile);
export const removeSignUpProfile = (uid) => deleteUserProfile(uid);
export const sendSignUpVerification = (idToken) => sendVerificationEmail(idToken);

export const deleteAuthAccount = async (uid) => {
  if (!auth) return;
  try {
    await auth.deleteUser(uid);
  } catch (error) {
    console.error("Firebase signup cleanup failed:", error?.code || "provider error");
  }
};

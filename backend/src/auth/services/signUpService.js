import { validateSignup } from "../../validators/authValidator.js";
import {
  createAuthAccount,
  deleteAuthAccount,
  removeSignUpProfile,
  saveSignUpProfile,
  sendSignUpVerification,
} from "../repositories/signUpRepository.js";
import { cleanAuthError } from "./authErrors.js";

export const signUp = async (userData = {}) => {
  const validationErrors = validateSignup(userData);
  if (Object.keys(validationErrors).length) {
    return { success: false, statusCode: 400, message: "Check the submitted fields", errors: validationErrors };
  }

  const name = userData.name.trim();
  const email = userData.email.trim().toLowerCase();
  const created = await createAuthAccount(email, userData.password);
  if (!created.success) return { success: false, ...cleanAuthError(created.code) };

  const uid = created.data.localId;

  // Run profile persistence and verification email dispatch in PARALLEL
  const [profile, verification] = await Promise.all([
    saveSignUpProfile({ uid, name, email }),
    sendSignUpVerification(created.data.idToken),
  ]);

  if (!profile.success) {
    await Promise.allSettled([removeSignUpProfile(uid), deleteAuthAccount(uid)]);
    return {
      success: false,
      statusCode: profile.statusCode || 503,
      message: profile.message || "Could not save the account profile",
    };
  }

  if (!verification.success) {
    await Promise.allSettled([removeSignUpProfile(uid), deleteAuthAccount(uid)]);
    const error = cleanAuthError(verification.code);
    return {
      success: false,
      statusCode: error.statusCode === 400 ? 502 : error.statusCode,
      message: "Account was not created because the verification email could not be sent",
    };
  }

  return { success: true, statusCode: 201, message: "Account created. Check your email to verify it before signing in." };
};

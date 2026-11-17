import { validateCredentials } from "../../validators/authValidator.js";
import { authenticateSignIn, findSignInProfile } from "../repositories/signInRepository.js";
import { cleanAuthError } from "./authErrors.js";

export const signIn = async (credentials = {}) => {
  const validationErrors = validateCredentials(credentials);
  if (Object.keys(validationErrors).length) {
    return { success: false, statusCode: 400, message: "Check the submitted fields", errors: validationErrors };
  }

  const result = await authenticateSignIn(credentials.email.trim().toLowerCase(), credentials.password);
  if (!result.success) return { success: false, ...cleanAuthError(result.code) };
  if (!result.data.emailVerified) {
    return {
      success: false,
      statusCode: 403,
      code: "EMAIL_NOT_VERIFIED",
      message: "Verify your email using the link sent during signup before signing in.",
    };
  }

  const profile = await findSignInProfile(result.data.localId);
  if (!profile.success) return { success: false, statusCode: profile.statusCode || 503, message: profile.message };
  return {
    success: true,
    statusCode: 200,
    message: "Signed in successfully",
    data: {
      token: result.data.idToken,
      refreshToken: result.data.refreshToken,
      expiresIn: Number(result.data.expiresIn),
      user: profile.data,
    },
  };
};

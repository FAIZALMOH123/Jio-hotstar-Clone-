import { validateCredentials } from "../../validators/authValidator.js";
import { authenticateResendRequest, sendResentVerification } from "../repositories/resendVerificationRepository.js";
import { cleanAuthError } from "./authErrors.js";

const responseMessage = "If this account needs verification, a link will be sent.";

export const resendVerification = async (credentials = {}) => {
  const validationErrors = validateCredentials(credentials);
  if (Object.keys(validationErrors).length) {
    return { success: false, statusCode: 400, message: "Check the submitted fields", errors: validationErrors };
  }

  const result = await authenticateResendRequest(credentials.email.trim().toLowerCase(), credentials.password);
  if (!result.success) return { success: false, ...cleanAuthError(result.code) };
  if (result.data.emailVerified) return { success: true, statusCode: 200, message: responseMessage };

  const sent = await sendResentVerification(result.data.idToken);
  if (!sent.success) return { success: false, statusCode: 502, message: "Could not send a verification email right now" };
  return { success: true, statusCode: 200, message: responseMessage };
};

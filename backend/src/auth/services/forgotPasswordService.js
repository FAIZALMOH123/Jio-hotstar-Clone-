import { validateEmail } from "../../validators/authValidator.js";
import { requestResetEmail } from "../repositories/forgotPasswordRepository.js";

export const forgotPassword = async (body = {}) => {
  const validation = validateEmail(body);
  if (validation.error) return { success: false, statusCode: 400, message: validation.error };

  const result = await requestResetEmail(validation.email);
  if (!result.success && result.code !== "EMAIL_NOT_FOUND") {
    return {
      success: false,
      statusCode: result.statusCode === 503 ? 502 : result.statusCode,
      message: "Could not send a password reset email right now",
    };
  }
  return { success: true, statusCode: 200, message: "If that email has an account, a reset link will be sent." };
};

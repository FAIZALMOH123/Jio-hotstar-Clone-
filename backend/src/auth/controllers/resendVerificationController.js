import { sendAuthResult } from "./sendAuthResult.js";
import { resendVerification } from "../services/resendVerificationService.js";

export const resendVerificationController = async (req, res, next) => {
  try {
    const result = await resendVerification(req.body);
    return sendAuthResult(res, result);
  } catch (error) {
    return next(error);
  }
};

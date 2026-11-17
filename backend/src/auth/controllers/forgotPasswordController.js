import { sendAuthResult } from "./sendAuthResult.js";
import { forgotPassword } from "../services/forgotPasswordService.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    const result = await forgotPassword(req.body);
    return sendAuthResult(res, result);
  } catch (error) {
    return next(error);
  }
};

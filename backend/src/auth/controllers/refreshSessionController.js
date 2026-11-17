import { sendAuthResult } from "./sendAuthResult.js";
import { refreshSession } from "../services/refreshSessionService.js";

export const refreshSessionController = async (req, res, next) => {
  try {
    const result = await refreshSession((req.body || {}).refreshToken);
    return sendAuthResult(res, result);
  } catch (error) {
    return next(error);
  }
};

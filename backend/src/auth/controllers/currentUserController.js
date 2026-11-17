import { sendAuthResult } from "./sendAuthResult.js";
import { getCurrentUser } from "../services/currentUserService.js";

export const currentUserController = async (req, res, next) => {
  try {
    const result = await getCurrentUser(req.auth.uid);
    return sendAuthResult(res, result);
  } catch (error) {
    return next(error);
  }
};

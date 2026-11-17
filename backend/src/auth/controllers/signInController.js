import { sendAuthResult } from "./sendAuthResult.js";
import { signIn } from "../services/signInService.js";

export const signInController = async (req, res, next) => {
  try {
    const result = await signIn(req.body);
    return sendAuthResult(res, result);
  } catch (error) {
    return next(error);
  }
};

import { sendAuthResult } from "./sendAuthResult.js";
import { signUp } from "../services/signUpService.js";

export const signUpController = async (req, res, next) => {
  try {
    const result = await signUp(req.body);
    return sendAuthResult(res, result);
  } catch (error) {
    return next(error);
  }
};

import { Router } from "express";
import {
  currentUserController,
  forgotPasswordController,
  refreshSessionController,
  resendVerificationController,
  signInController,
  signUpController,
} from "../controllers/index.js";
import { requireAuth } from "../../middlewares/requireAuth.js";

const router = Router();

router.post("/sign-up", signUpController);
router.post("/sign-in", signInController);
router.post("/resend-verification", resendVerificationController);
router.post("/forgot-password", forgotPasswordController);
router.post("/refresh", refreshSessionController);
router.get("/me", requireAuth, currentUserController);

export default router;

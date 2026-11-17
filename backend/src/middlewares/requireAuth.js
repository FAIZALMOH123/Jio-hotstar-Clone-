import { auth } from "../db/firebase.js";

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return res.status(401).json({ success: false, message: "Sign in to continue" });
  }
  if (!auth) {
    return res.status(503).json({ success: false, message: "Authentication is not configured" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    if (!decoded.email_verified) {
      return res.status(403).json({ success: false, message: "Verify your email to continue" });
    }
    req.auth = decoded;
    return next();
  } catch (error) {
    console.error("Authentication token rejected:", error.code || "invalid token");
    return res.status(401).json({ success: false, message: "Your session is invalid or expired" });
  }
};

import { signupUser } from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const result = await signupUser(req.body);

    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      ...(result.data && { data: result.data }),
    });
  } catch (error) {
    console.error("Signup controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

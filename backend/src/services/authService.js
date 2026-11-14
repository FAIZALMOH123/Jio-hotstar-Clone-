import { auth } from "../db/firebase.js";
import { createUserProfile } from "../repositories/userRepository.js";

export const signupUser = async (userData) => {
  try {
    const { name, email, password } = userData;

    if (!name?.trim() || !email?.trim() || !password) {
      return {
        success: false,
        statusCode: 400,
        message: "Name, email and password are required",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        statusCode: 400,
        message: "Password must contain at least 8 characters",
      };
    }

    const user = await auth.createUser({
      displayName: name.trim(),
      email: email.trim(),
      password,
    });

    const profileResult = await createUserProfile(user.uid, {
      name: name.trim(),
      email: user.email,
    });

    if (!profileResult.success) {
      try {
        await auth.deleteUser(user.uid);
      } catch (cleanupError) {
        console.error("Account cleanup error:", cleanupError.message);
      }

      return {
        success: false,
        statusCode: profileResult.statusCode,
        message: profileResult.message,
      };
    }

    console.log("Signup successful:", user.uid);

    return {
      success: true,
      statusCode: 201,
      message: "Registration successful",
      data: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Signup service error:", error.code, error.message);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        statusCode: 409,
        message: "Email is already registered",
      };
    }

    if (error.code === "auth/invalid-email") {
      return {
        success: false,
        statusCode: 400,
        message: "Invalid email address",
      };
    }

    if (error.code === "auth/invalid-password") {
      return {
        success: false,
        statusCode: 400,
        message: "Password does not meet Firebase requirements",
      };
    }

    return {
      success: false,
      statusCode: 500,
      message: "Registration failed",
    };
  }
};

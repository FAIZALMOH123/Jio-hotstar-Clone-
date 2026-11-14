import { db } from "../db/firebase.js";

export const createUserProfile = async (uid, userData) => {
  try {
    await db
      .collection("users")
      .doc(uid)
      .set({
        uid,
        name: userData.name,
        email: userData.email,
        photoURL: userData.photoURL || null,
        createdAt: new Date().toISOString(),
      });

    console.log("User profile saved successfully");

    return {
      success: true,
      statusCode: 201,
      message: "User profile created successfully",
    };
  } catch (error) {
    console.error("Repository error:", error.message);

    return {
      success: false,
      statusCode: 500,
      message: "Failed to save user profile",
    };
  }
};

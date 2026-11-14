import "dotenv/config";

import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let firebaseApp;

try {
  const apps = getApps();

  if (apps.length === 0) {
    firebaseApp = initializeApp({
      credential: applicationDefault(),
    });
  } else {
    firebaseApp = apps[0];
  }

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error.message);
  process.exit(1);
}

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

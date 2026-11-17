import "dotenv/config";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const keyUrl = new URL("../../serviceAccountKey.json", import.meta.url);
const keyPath = fileURLToPath(keyUrl);

let app = getApps()[0];

if (!app) {
  try {
    if (fs.existsSync(keyPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
      app = initializeApp({ credential: cert(serviceAccount) });
    } else {
      app = initializeApp({ credential: applicationDefault() });
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error.code || error.message || "configuration error");
  }
}

export const auth = app ? getAuth(app) : null;
export const firestore = app ? getFirestore(app) : null;

export const warmupFirebase = async () => {
  try {
    if (firestore) {
      await firestore.collection("counters").doc("users").get();
    }
  } catch (err) {
    console.warn("Firebase background warmup warning:", err?.message || err);
  }
};

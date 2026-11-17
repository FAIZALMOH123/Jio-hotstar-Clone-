import { firestore } from "../../db/firebase.js";

const profileCollection = () => firestore?.collection("users");
const failure = () => ({ success: false, statusCode: 503, message: "User profile storage is unavailable" });
const getUserCodeNumber = (value) => {
  if (typeof value !== "string") return 0;
  return Number(value.match(/^USER-(\d+)$/)?.[1]) || 0;
};

const logFirestoreError = (operation, error) => {
  console.error(`Firestore profile ${operation} failed:`, error?.code || error?.name || "UNKNOWN_ERROR");
};

let counterCache = null;
let counterInitPromise = null;

const initCounter = async () => {
  if (!firestore) return 0;
  try {
    const counterRef = firestore.collection("counters").doc("users");
    const snap = await counterRef.get();
    if (snap.exists) {
      counterCache = Number(snap.data()?.count) || 0;
    } else {
      const usersSnap = await profileCollection().get();
      let maxCount = 0;
      usersSnap.forEach((doc) => {
        maxCount = Math.max(maxCount, getUserCodeNumber(doc.data()?.userCode));
      });
      counterCache = maxCount;
    }
  } catch (error) {
    logFirestoreError("counter read", error);
    counterCache = 0;
  }
  return counterCache;
};

export const getNextUserCode = async (existingUserCode = null) => {
  if (existingUserCode && getUserCodeNumber(existingUserCode)) {
    return existingUserCode;
  }

  if (counterCache === null) {
    if (!counterInitPromise) counterInitPromise = initCounter();
    await counterInitPromise;
    counterInitPromise = null;
  }

  counterCache += 1;
  const count = counterCache;
  const userCode = `USER-${String(count).padStart(3, "0")}`;

  // Persist counter asynchronously to avoid blocking user response
  if (firestore) {
    const counterRef = firestore.collection("counters").doc("users");
    counterRef.set({ count, updatedAt: new Date().toISOString() }, { merge: true }).catch((err) => {
      logFirestoreError("counter update", err);
    });
  }

  return userCode;
};

export const createUserProfile = async ({ uid, name, email, createdAt, userCode: providedCode }) => {
  if (!firestore) return failure();
  try {
    const users = profileCollection();
    const profileRef = users.doc(uid);
    const now = new Date().toISOString();

    const userCode = await getNextUserCode(providedCode);

    const profileData = {
      docId: uid,
      uid,
      userCode,
      name,
      email,
      createdAt: createdAt || now,
      updatedAt: now,
    };

    await profileRef.set(profileData, { merge: true });
    return { success: true, data: profileData };
  } catch (error) {
    logFirestoreError("write", error);
    return failure();
  }
};

export const getUserProfile = async (uid) => {
  if (!firestore) return failure();
  try {
    const profile = await profileCollection().doc(uid).get();
    if (!profile.exists) return { success: false, statusCode: 404, message: "Profile not found" };
    const data = profile.data();
    if (!data.userCode || !data.docId || !data.updatedAt) {
      const updated = await createUserProfile({
        uid: data.uid || profile.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt,
      });
      if (!updated.success) return updated;
      return updated;
    }
    return {
      success: true,
      data: {
        docId: profile.id,
        uid: data.uid || profile.id,
        userCode: data.userCode,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
      },
    };
  } catch (error) {
    logFirestoreError("read", error);
    return failure();
  }
};

export const deleteUserProfile = async (uid) => {
  if (!firestore) return { success: false };
  try {
    await profileCollection().doc(uid).delete();
    return { success: true };
  } catch (error) {
    logFirestoreError("delete", error);
    return { success: false };
  }
};

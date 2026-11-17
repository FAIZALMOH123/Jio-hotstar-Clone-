import { getUserProfile } from "./profileRepository.js";

export const findCurrentUserProfile = (uid) => getUserProfile(uid);

import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 3000,
  frontendOrigin: process.env.FRONTEND_ORIGIN ,
  firebaseWebApiKey: process.env.FIREBASE_WEB_API_KEY ,
  authContinueUrl: process.env.AUTH_CONTINUE_URL ,
};

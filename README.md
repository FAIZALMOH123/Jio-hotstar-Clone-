# JioHotstar Clone

React/Vite frontend and layered Express backend. Firebase Authentication handles accounts, and Cloud Firestore stores user profiles and the movie catalog. Poster files stay in `frontend/public/posters`; Firestore stores their paths.

## Backend layers

- `src/config`: application configuration
- `src/api/auth`: one controller, service, and repository file per auth endpoint; `routes/authRoutes.js` maps paths to controllers
- `src/api/movies`: one controller, service, and repository file per movie endpoint; `routes/movieRoutes.js` maps paths to controllers
- `src/api/system`: health endpoint controller, service, and repository
- `src/api/shared`: shared controller error handling
- `src/api/*/controllers/index.js`: export endpoint controllers for each route table
- `src/api/auth/providers`: Firebase Identity Toolkit client used by auth repositories
- `src/validators`: shared request validation
- `src/db`: Firebase initialization and Firestore seed/import scripts
- `src/middlewares`: authentication and shared error handling

Each API controller runs through a shared `try/catch` wrapper that logs the operation and a safe error code/name, then forwards the error to shared middleware for a generic response.

User profiles are stored at `users/{firebaseUid}` with `docId`, Firebase `uid`, sequential `userCode` (for example `USER-001`), `createdAt`, and `updatedAt`. A transaction updates `counters/users` to avoid duplicate user codes. Passwords and confirmation passwords are handled by Firebase Authentication and are not stored in Firestore.

## Local setup

1. Install Node.js and create a Firebase project.
2. In Firebase Console, enable Email/Password authentication and create a Cloud Firestore database. Add `localhost` to authorized domains and leave the standard verification and password reset email templates enabled.
3. In `backend`, copy `.env.example` to `.env` and set `FIREBASE_WEB_API_KEY` and `GOOGLE_APPLICATION_CREDENTIALS`. Keep the service account JSON private and out of Git.
4. From `backend`, run `npm install`, `npm run firestore:seed`, then `npm run dev`.
5. In a second terminal, run `npm install` and `npm run dev` from `frontend`. Vite proxies `/api` calls to `http://localhost:3000`.

The seed command inserts or updates the 12 movie documents from `src/data/movies.json` in Firestore. Existing PostgreSQL profiles and catalog records can be copied before removing PostgreSQL by temporarily setting `DATABASE_URL` and running `npm run firestore:import-postgres` from `backend`. The importer does not delete PostgreSQL data. After import, `DATABASE_URL` is no longer needed.

## API

- `POST /api/auth/sign-up` — create account/profile and send email verification link.
- `POST /api/auth/sign-in` — authenticate verified email/password and return ID/refresh tokens.
- `POST /api/auth/resend-verification` — resend an email verification link.
- `POST /api/auth/forgot-password` — ask Firebase to send a reset link.
- `POST /api/auth/refresh` — refresh an expired Firebase ID token.
- `GET /api/auth/me` — return the signed-in user's Firestore profile (Bearer ID token required).
- `GET /api/movies` — return catalog records.
- `GET /api/movies/:slug` — return one movie.

Phone/SMS verification is not configured.

# JioHotstar Clone 🎬

A modern, high-performance streaming platform clone featuring a **Liquid Glass** UI on the frontend and a scalable **7-Layer Architecture** on the backend.

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM, React Icons
- **Backend**: Node.js, Express.js (7-layer decoupled architecture)
- **Auth & Database**: Firebase Authentication (JWT + Refresh tokens) & Google Cloud Firestore (NoSQL)
- **Styling & Performance**: Hardware-accelerated liquid glassmorphism, GPU-diffused gradients, 60 FPS scroll optimization

---

## 📁 Repository Structure

```text
├── frontend/                     # React + Vite Client (Runs on Port 5173)
│   ├── src/
│   │   ├── components/           # Reusable UI (Button, Input, Loader, MovieCard, Layout)
│   │   ├── context/              # Global state (AuthContext, MovieContext)
│   │   ├── pages/                # Views (Home, Movies, Watch, Search, Auth)
│   │   ├── services/             # HTTP layer (api.js with auto-refresh 401 interceptor)
│   │   └── index.css             # Liquid glass aesthetic & GPU-accelerated scroll
│   └── vite.config.js            # Dev server with /api proxy to backend (:3000)
│
├── backend/                      # Express.js REST API (Runs on Port 3000)
│   ├── src/
│   │   ├── index.js              # Server entry point & route registration
│   │   ├── config/               # Environment configuration (env.js)
│   │   ├── db/                   # Firebase Admin SDK & Firestore connection (firebase.js)
│   │   ├── middlewares/          # requireAuth & centralized error handler
│   │   ├── validators/           # authValidator (input validation)
│   │   ├── auth/                 # Auth domain (routes, controllers, services, repositories)
│   │   ├── movies/               # Movies domain (routes, controllers, services, repositories)
│   │   └── data/                 # Catalog fallback data (movies.json)
│   └── serviceAccountKey.json    # Firebase Admin credentials (kept private)
```

---

## 🏛️ Architecture Highlights

### 1. 7-Layer Decoupled Backend
```text
Request ➔ routes ➔ middlewares ➔ controllers ➔ services ➔ repositories ➔ Firestore/Firebase
```
- **Controllers**: Handle HTTP inputs/outputs without database queries.
- **Services**: Enforce business rules and orchestrate tasks (e.g. parallel profile save + verification dispatch).
- **Repositories**: Isolated data access layer. Switching database technology only touches this layer.

### 2. Authentication & Session Management
- **Access Token (1-hour JWT)**: Sent via `Authorization: Bearer <token>` for protected routes.
- **Refresh Token**: Long-lived credential used by `POST /api/auth/refresh` when access tokens expire.
- **Session Persistence**: React's `AuthContext` calls `GET /api/auth/me` on browser reload to restore active sessions without re-authenticating.
- **Automatic 401 Interceptor**: `frontend/src/services/api.js` catches expired token errors, silently refreshes the token, and retries the request seamlessly.

---

## 🛠️ Local Setup & Installation

### 1. Prerequisites
- Node.js (v18+ recommended)
- Firebase Project with **Email/Password Authentication** and **Cloud Firestore** enabled.

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Place your Firebase service account private key at:
   `backend/serviceAccountKey.json`
3. Configure `backend/.env`:
   ```env
   PORT=3000
   FIREBASE_WEB_API_KEY=your_firebase_web_api_key
   AUTH_CONTINUE_URL=http://localhost:5173/email-verified
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```
   *Backend runs at `http://localhost:3000`.*

### 3. Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   *Frontend runs at `http://localhost:5173` with automatic `/api` proxying to port 3000.*

---

## 📡 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/sign-up` | Create user profile and send email verification link. |
| `POST` | `/api/auth/sign-in` | Authenticate email/password and return access + refresh tokens. |
| `POST` | `/api/auth/refresh` | Exchange refresh token for a brand-new access token. |
| `GET` | `/api/auth/me` | Fetch authenticated profile (`Authorization: Bearer <token>`). |
| `POST` | `/api/auth/resend-verification` | Resend email verification link. |
| `POST` | `/api/auth/forgot-password` | Send password reset link to user email. |

### Movies (`/api/movies`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies` | Fetch full catalog of movies. |
| `GET` | `/api/movies/:slug` | Fetch single movie details by slug. |

---

## 🔒 Security & Performance

- **Data Privacy**: Passwords are cryptographically managed by Firebase Authentication and never stored in Firestore.
- **Optimized Sign-Up**: Parallelized profile writing and in-memory counter allocation deliver sign-up response times under 3 seconds.
- **GPU Accelerated Rendering**: CSS `translateZ(0)` layering prevents repaint lag during heavy page scrolling.

import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

import authRoutes from "./auth/routes/authRoutes.js";
import movieRoutes from "./movies/routes/movieRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { warmupFirebase } from "./db/firebase.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true,
  }),
);

app.use(express.json());

// Root Health Check API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "JioHotstar backend is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use(errorMiddleware);

// Start server
const PORT = env.port;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  warmupFirebase().catch(() => {});
});

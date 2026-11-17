import { Router } from "express";
import { listMoviesController, movieDetailController } from "../controllers/index.js";

const router = Router();

router.get("/", listMoviesController);
router.get("/:slug", movieDetailController);

export default router;

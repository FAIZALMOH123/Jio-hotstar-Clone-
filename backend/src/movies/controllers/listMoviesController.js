import { listMovies } from "../services/listMoviesService.js";

export const listMoviesController = async (_req, res, next) => {
  try {
    const result = await listMovies();
    return res.status(result.success ? 200 : result.statusCode || 500).json(result);
  } catch (error) {
    return next(error);
  }
};

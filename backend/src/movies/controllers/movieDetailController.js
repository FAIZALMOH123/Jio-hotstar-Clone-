import { getMovieDetail } from "../services/movieDetailService.js";

export const movieDetailController = async (req, res, next) => {
  try {
    const result = await getMovieDetail(req.params.slug);
    return res.status(result.success ? 200 : result.statusCode || 404).json(result);
  } catch (error) {
    return next(error);
  }
};

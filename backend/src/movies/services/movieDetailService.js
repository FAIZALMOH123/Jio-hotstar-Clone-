import { fetchMovieBySlug } from "../repositories/movieDetailRepository.js";

export const getMovieDetail = async (slug) => {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { success: false, statusCode: 400, message: "Movie slug is invalid" };
  }
  return fetchMovieBySlug(slug);
};

import { apiRequest } from "./api";

export const getMovies = async () => apiRequest("/movies");

export const getMovie = async (slug) => apiRequest(`/movies/${encodeURIComponent(slug)}`);

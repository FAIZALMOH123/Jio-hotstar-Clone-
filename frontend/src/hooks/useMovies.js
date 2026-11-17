import { useContext } from "react";
import MovieContext from "../context/MovieContext";

export const useMovies = () => {
  const context = useContext(MovieContext);
  return context || {
    movies: [],
    isLoading: false,
    error: "",
    reloadMovies: async () => ({ success: false }),
  };
};

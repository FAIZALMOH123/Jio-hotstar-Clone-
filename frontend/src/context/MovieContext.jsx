import { createContext, useCallback, useEffect, useState } from "react";
import { getMovies } from "../services/movieService";
import { defaultCatalog } from "../data/defaultCatalog";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(defaultCatalog);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const reloadMovies = useCallback(async () => {
    const result = await getMovies();
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      setMovies(result.data);
      setError("");
    } else if (!movies.length) {
      setError(result.message || "Movie catalog could not be loaded");
    }
    setIsLoading(false);
    return result;
  }, [movies.length]);

  useEffect(() => {
    let active = true;
    const loadMovies = async () => {
      const result = await getMovies();
      if (!active) return;
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        setMovies(result.data);
        setError("");
      } else if (!movies.length) {
        setError(result.message || "Movie catalog could not be loaded");
      }
      setIsLoading(false);
    };
    loadMovies();
    return () => { active = false; };
  }, [movies.length]);

  return (
    <MovieContext.Provider value={{ movies, isLoading, error, reloadMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;

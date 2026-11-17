import { createContext, useCallback, useEffect, useState } from "react";
import { clearSession, readSession, saveSession } from "../services/api";
import { getCurrentUser, signin } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadUser = async () => {
      const session = readSession();
      if (!session?.token) {
        setIsLoading(false);
        return;
      }
      const result = await getCurrentUser();
      if (!active) return;
      if (result.success) setUser(result.data);
      else clearSession();
      setIsLoading(false);
    };
    loadUser();
    return () => { active = false; };
  }, []);

  const signIn = useCallback(async (credentials) => {
    const result = await signin(credentials);
    if (!result.success) return result;
    const sessionResult = saveSession(result.data);
    if (!sessionResult.success) return { success: false, message: "Could not save the sign-in session in this browser" };
    setUser(result.data.user);
    return result;
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
    return { success: true };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

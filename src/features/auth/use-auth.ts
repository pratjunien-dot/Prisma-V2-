import { useEffect } from "react";
import { useAuthStore } from "./model/auth.store";
import { AuthGateway } from "./api/auth.gateway";

export const useAuth = () => {
  const { user, isLoading, setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = AuthGateway.onAuthChange((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setIsLoading]);

  const login = async () => {
    setIsLoading(true);
    try {
      await AuthGateway.loginWithGoogle();
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthGateway.logout();
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};

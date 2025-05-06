import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { UserDto } from "../tdos/user.dto";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<boolean>(() => {
    const storedAuth = sessionStorage.getItem("auth");
    return storedAuth === "true";
  });

  const [user, setUser] = useState<UserDto | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    sessionStorage.setItem("auth", auth.toString());
  }, [auth]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

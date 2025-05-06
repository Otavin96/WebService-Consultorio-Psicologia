import { createContext } from "react";
import { UserDto } from "../tdos/user.dto";

interface AuthContextType {
  auth: boolean;
  setAuth: (auth: boolean) => void;
  user: UserDto | null;
  setUser: (user: UserDto) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

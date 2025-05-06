import { AuthDto, AuthResponse, UserDto } from "../tdos/user.dto";
import { api } from "./api";

export const registerUser = async (user: UserDto): Promise<void> => {
  const response = await api.post("/user/", user);

  return response.data;
};

export const authenticateUser = async (
  credentials: AuthDto
): Promise<AuthResponse> => {
  const response = await api.post("/user/authenticate/", credentials);
  return response.data;
};

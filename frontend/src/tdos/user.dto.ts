export enum StatusPermission {
  PROFISSIONAL_SAUDE = "PROFISSIONAL_SAUDE",
  SECRETARIA = "SECRETARIA",
}

export interface UserDto {
  id?: string;
  name: string;
  username: string;
  password: string;
  roles: StatusPermission;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: UserDto;
  access_token: {
    access_token: string;
  };
}

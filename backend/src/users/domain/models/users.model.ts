export enum StatusPermission {
  PROFISSIONAL_SAUDE = "PROFISSIONAL_SAUDE",
  SECRETARIA = "SECRETARIA",
}

export interface UserModel {
  id: string;
  name: string;
  username: string;
  password: string;
  roles: StatusPermission;
  created_at: Date;
  updated_at: Date;
}

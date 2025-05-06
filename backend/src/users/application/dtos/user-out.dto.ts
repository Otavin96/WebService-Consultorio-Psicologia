import { StatusPermission } from "@/users/domain/models/users.model";

export type UserOutput = {
  id: string;
  name: string;
  username: string;
  password: string;
  roles: StatusPermission;
  created_at: Date;
  updated_at: Date;
};

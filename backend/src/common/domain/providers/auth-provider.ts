import { StatusPermission } from "@/users/domain/models/users.model";

export type GenerateAuthKeyProps = {
  access_token: string;
};

export type VerifyAuthKeyProps = {
  user_id: string;
  roles: StatusPermission;
};

export interface AuthProvider {
  generateAuthKey(
    user_id: string,
    roles: StatusPermission | undefined
  ): GenerateAuthKeyProps;
  verifyAuthKey(token: string): VerifyAuthKeyProps;
}

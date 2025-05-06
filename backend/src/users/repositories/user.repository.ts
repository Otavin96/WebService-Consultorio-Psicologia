import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { StatusPermission, UserModel } from "../domain/models/users.model";

export type CreateUserProps = {
  name: string;
  username: string;
  password: string;
  roles: StatusPermission;
};

export interface UsersRepository
  extends RepositoryInterface<UserModel, CreateUserProps> {
  findByUsername(username: string): Promise<UserModel>;
  findByName(name: string): Promise<UserModel>;
  conflictingUsername(username: string): Promise<void>;
}

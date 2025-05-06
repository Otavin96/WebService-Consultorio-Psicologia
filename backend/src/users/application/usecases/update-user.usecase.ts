import { StatusPermission } from "@/users/domain/models/users.model";
import { UserOutput } from "../dtos/user-out.dto";
import { inject, injectable } from "tsyringe";
import { UsersRepository } from "@/users/repositories/user.repository";
import { BcryptjsHashProvider } from "@/common/infrastructure/providers/hashProvider/bcryptjs-hash-provider";

export namespace UpdateUsersUseCase {
  export type Input = {
    id: string;
    name: string;
    username: string;
    password: string;
    roles: StatusPermission;
  };

  export type Output = UserOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: UsersRepository,
      @inject("BcryptjsHashProvider")
      private bcryptjsHashProvider: BcryptjsHashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      const userUpdate = await this.usersRepository.findById(input.id);

      if (input.name) {
        userUpdate.name = input.name;
      }

      if (input.username) {
        userUpdate.username = input.username;
      }

      if (input.password) {
        userUpdate.password = await this.bcryptjsHashProvider.generateHash(
          input.password
        );
      }

      if (input.roles) {
        userUpdate.roles = input.roles;
      }

      const userUpdated = await this.usersRepository.update(userUpdate);

      return userUpdated;
    }
  }
}

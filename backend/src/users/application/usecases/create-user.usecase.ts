import { inject, injectable } from "tsyringe";
import { UserOutput } from "../dtos/user-out.dto";
import { UsersRepository } from "@/users/repositories/user.repository";
import { BcryptjsHashProvider } from "@/common/infrastructure/providers/hashProvider/bcryptjs-hash-provider";
import { StatusPermission } from "@/users/domain/models/users.model";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";

export namespace CreateUsersUseCase {
  export type Input = {
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

      @inject("HashProvider")
      private bcryptjsHashProvider: BcryptjsHashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name || !input.username || !input.password || !input.roles) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      await this.usersRepository.conflictingUsername(input.username);

      const user = this.usersRepository.create(input);

      user.password = await this.bcryptjsHashProvider.generateHash(
        input.password
      );

      const createdUser: UserOutput = await this.usersRepository.insert(user);

      return createdUser;
    }
  }
}

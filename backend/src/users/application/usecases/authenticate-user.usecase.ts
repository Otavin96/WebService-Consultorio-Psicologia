import { inject, injectable } from "tsyringe";
import { UserOutput } from "../dtos/user-out.dto";
import { UsersRepository } from "@/users/repositories/user.repository";
import { BcryptjsHashProvider } from "@/common/infrastructure/providers/hashProvider/bcryptjs-hash-provider";
import { InvalidCredentialsError } from "@/common/domain/errors/invalid-credentials-error";

export namespace AuthenticateUserUseCase {
  export type Input = {
    username: string;
    password: string;
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
      if (!input.username || !input.password) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      const user = await this.usersRepository.findByUsername(input.username);

      const passwordMatch = await this.bcryptjsHashProvider.compareHash(
        input.password,
        user.password
      );

      if (!passwordMatch) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      return user;
    }
  }
}

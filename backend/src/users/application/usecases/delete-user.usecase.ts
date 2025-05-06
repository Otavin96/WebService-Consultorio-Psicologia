import { BadRequestError } from "@/common/domain/errors/badRequest-error";
import { UsersRepository } from "@/users/repositories/user.repository";
import { inject, injectable } from "tsyringe";

export namespace DeleteUsersUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("UsersRepository")
      private usersRepository: UsersRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      await this.usersRepository.findById(input.id);

      await this.usersRepository.delete(input.id);
    }
  }
}

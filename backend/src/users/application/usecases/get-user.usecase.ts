import { injectable, inject } from "tsyringe";
import { UserOutput } from "../dtos/user-out.dto";
import { UsersRepository } from "@/users/repositories/user.repository";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";

export namespace GetUsersUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;

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

      const user = await this.usersRepository.findById(input.id);

      return user;
    }
  }
}

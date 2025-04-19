import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";
import { SchedulingsRepository } from "@/scheduling/repositories/SchedulingsRepository";

export namespace DeleteSchedulingUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("SchedulingsRepository")
      private schedulingsRepository: SchedulingsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      return this.schedulingsRepository.delete(input.id);
    }
  }
}

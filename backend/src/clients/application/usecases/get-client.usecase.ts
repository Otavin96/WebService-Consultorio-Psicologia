import { inject, injectable } from "tsyringe";
import { ClientsOutput } from "../dtos/clients-output.dto";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";
import { ClientsRepository } from "@/clients/repositories/clients.repository";

export namespace GetClientUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ClientsOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientsRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      return this.clientsRepository.findById(input.id);
    }
  }
}

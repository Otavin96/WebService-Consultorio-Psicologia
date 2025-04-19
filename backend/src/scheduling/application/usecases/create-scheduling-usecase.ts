import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";
import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entity";
import { SchedulingsOutput } from "../dtos/scheduling-output.dto";
import { SchedulingsRepository } from "@/scheduling/repositories/SchedulingsRepository";

export namespace CreateSchedulingUseCase {
  export type Input = {
    client: Client;
    date: Date;
    time: Date;
    observations: string;
  };

  export type Output = SchedulingsOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("SchedulingsRepository")
      private schedulingsRepository: SchedulingsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.client || !input.date || !input.time || !input.observations) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      const scheduling = this.schedulingsRepository.create(input);

      const schedulingClient: SchedulingsOutput =
        await this.schedulingsRepository.insert(scheduling);

      return schedulingClient;
    }
  }
}

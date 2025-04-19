import { inject, injectable } from "tsyringe";
import { SchedulingsOutput } from "../dtos/scheduling-output.dto";
import { SchedulingsRepository } from "@/scheduling/repositories/SchedulingsRepository";

export namespace UpdateSchedulingUseCase {
  export type Input = {
    id: string;
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
      let scheduling = await this.schedulingsRepository.findById(input.id);

      if (input.date) {
        scheduling.date = input.date;
      }

      if (input.time) {
        scheduling.time = input.time;
      }

      if (input.observations) {
        scheduling.observations = input.observations;
      }

      const updatedScheduling: SchedulingsOutput =
        await this.schedulingsRepository.update(scheduling);

      return updatedScheduling;
    }
  }
}

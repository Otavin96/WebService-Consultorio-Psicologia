import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";
import { Status } from "@/consultation/domain/models/consultation.model";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import { ConsultationsOutput } from "../dtos/consultation-output.dto";
import { ConsultationsRepository } from "@/consultation/repositories/consultation.repository";
import { User } from "@/users/infrastructure/typeorm/entities/users.entitty";

export namespace CreateConsultationUseCase {
  export type Input = {
    situation: Status;
    previousConsultations: { date: string; note: string }[];
    currentQuery: string;
    patientAttention: string;
    scheduling: Scheduling;
    professional: User;
  };

  export type Output = ConsultationsOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ConsultationsRepository")
      private consultationsRepository: ConsultationsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.situation ||
        !input.previousConsultations ||
        !input.currentQuery ||
        !input.patientAttention ||
        !input.scheduling ||
        !input.professional
      ) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      const consultation = this.consultationsRepository.create(input);

      const createConsultation: ConsultationsOutput =
        await this.consultationsRepository.insert(consultation);

      return createConsultation;
    }
  }
}

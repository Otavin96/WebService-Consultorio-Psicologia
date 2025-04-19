import { inject, injectable } from "tsyringe";
import { Status } from "@/consultation/domain/models/consultation.model";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import { ConsultationsOutput } from "../dtos/consultation-output.dto";
import { ConsultationsRepository } from "@/consultation/repositories/consultation.repository";

export namespace UpdateConsutationUseCase {
  export type Input = {
    id: string;
    situation: Status;
    previousConsultations: { date: string; note: string }[];
    currentQuery: string;
    patientAttention: string;
    scheduling: Scheduling;
  };

  export type Output = ConsultationsOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ConsultationsRepository")
      private consultationsRepository: ConsultationsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let consultation = await this.consultationsRepository.findById(input.id);

      if (input.situation) {
        consultation.situation = input.situation;
      }

      if (input.previousConsultations) {
        consultation.previousConsultations = input.previousConsultations;
      }

      if (input.currentQuery) {
        consultation.currentQuery = input.currentQuery;
      }

      if (input.patientAttention) {
        consultation.patientAttention = input.patientAttention;
      }

      if (input.scheduling) {
        consultation.scheduling = input.scheduling;
      }

      const updatedConsultation: ConsultationsOutput =
        await this.consultationsRepository.update(consultation);

      return updatedConsultation;
    }
  }
}

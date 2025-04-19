import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";
import { ConsultationsRepository } from "@/consultation/repositories/consultation.repository";
import { ConsultationsOutput } from "../dtos/consultation-output.dto";

export namespace GetConsultationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ConsultationsOutput;
  @injectable()
  export class UseCase {
    constructor(
      @inject("ConsultationsRepository")
      private consultationsRepository: ConsultationsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      return this.consultationsRepository.findById(input.id);
    }
  }
}

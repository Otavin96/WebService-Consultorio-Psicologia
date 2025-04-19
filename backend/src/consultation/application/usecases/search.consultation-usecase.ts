import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/pagination-output.dto";
import { SearchInputDto } from "../dtos/search-input.dto";
import { inject, injectable } from "tsyringe";
import { ConsultationModel } from "@/consultation/domain/models/consultation.model";
import { ConsultationsRepository } from "@/consultation/repositories/consultation.repository";

export namespace SearchConsultationUseCase {
  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<ConsultationModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ConsultationsRepository")
      private consultationsRepository: ConsultationsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.consultationsRepository.search(input);
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}

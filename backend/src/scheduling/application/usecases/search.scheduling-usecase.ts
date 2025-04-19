import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/pagination-output.dto";
import { SearchInputDto } from "../dtos/search-input.dto";
import { inject, injectable } from "tsyringe";
import { SchedulingModel } from "@/scheduling/domain/models/scheduling.model";
import { SchedulingsRepository } from "@/scheduling/repositories/SchedulingsRepository";

export namespace SearchSchedulingUseCase {
  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<SchedulingModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("SchedulingsRepository")
      private schedulingsRepository: SchedulingsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.schedulingsRepository.search(input);
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}

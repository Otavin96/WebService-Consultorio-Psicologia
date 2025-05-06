import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/pagination-output.dto";
import { SearchInputDto } from "../dtos/search-input.dto";
import { inject, injectable } from "tsyringe";
import { SchedulingModel } from "@/scheduling/domain/models/scheduling.model";
import { SchedulingsRepository } from "@/scheduling/repositories/SchedulingsRepository";

export namespace GetAllSchedulingByClientUseCase {
  export type Input = {
    clientId: string;
    dataSearch: SearchInputDto;
  };

  export type Output = PaginationOutputDto<SchedulingModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("SchedulingsRepository")
      private schedulingsRepository: SchedulingsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult =
        await this.schedulingsRepository.getAllSchedulingByClient(
          input.clientId,
          input.dataSearch
        );
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}

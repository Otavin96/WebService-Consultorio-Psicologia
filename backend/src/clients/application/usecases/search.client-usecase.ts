import { ClientsModel } from "@/clients/domain/models/clients.model";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/pagination-output.dto";
import { SearchInputDto } from "../dtos/search-input.dto";
import { inject, injectable } from "tsyringe";
import { ClientsRepository } from "@/clients/repositories/clients.repository";

export namespace SearchClientUseCase {
  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<ClientsModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientsRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.clientsRepository.search(input);
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}

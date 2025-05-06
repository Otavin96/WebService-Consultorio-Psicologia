import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entity";
import {
  RepositoryInterface,
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { SchedulingModel } from "../domain/models/scheduling.model";
import { SearchInputDto } from "../../consultation/application/dtos/search-input.dto";

export type CreateSchedulingProps = {
  client: Client;
  date: Date;
  time: Date;
  observations: string;
};

export interface SchedulingsRepository
  extends RepositoryInterface<SchedulingModel, CreateSchedulingProps> {
  getAllSchedulingByClient(
    clientId: string,
    props: SearchInput
  ): Promise<SearchOutput<SchedulingModel>>;
}

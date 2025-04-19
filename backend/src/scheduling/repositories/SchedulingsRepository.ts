import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entity";
import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { SchedulingModel } from "../domain/models/scheduling.model";

export type CreateSchedulingProps = {
  client: Client;
  date: Date;
  time: Date;
  observations: string;
};

export interface SchedulingsRepository
  extends RepositoryInterface<SchedulingModel, CreateSchedulingProps> {}

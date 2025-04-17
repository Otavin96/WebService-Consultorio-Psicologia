import { container } from "tsyringe";
import { ClientsTypeormRepository } from "../typeorm/repositories/clients-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Client } from "../typeorm/entities/clients.entity";
import { CreateClientUseCase } from "@/clients/application/usecases/create-client-usecase";

container.registerSingleton("ClientsRepository", ClientsTypeormRepository);

container.registerInstance(
  "ClientsDefaultTypeormRepository",
  dataSource.getRepository(Client)
);

container.registerSingleton(
  "CreateClientsUseCase",
  CreateClientUseCase.UseCase
);

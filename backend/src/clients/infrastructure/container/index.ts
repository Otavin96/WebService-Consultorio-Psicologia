import { container } from "tsyringe";
import { ClientsTypeormRepository } from "../typeorm/repositories/clients-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Client } from "../typeorm/entities/clients.entity";
import { CreateClientUseCase } from "@/clients/application/usecases/create-client-usecase";
import { GetClientUseCase } from "@/clients/application/usecases/get-client.usecase";
import { SearchClientUseCase } from "@/clients/application/usecases/search.client-usecase";
import { UpdateClientUseCase } from "@/clients/application/usecases/update-client-usecase";
import { DeleteClientUseCase } from "@/clients/application/usecases/delete-client.usecase";

container.registerSingleton("ClientsRepository", ClientsTypeormRepository);

container.registerInstance(
  "ClientsDefaultTypeormRepository",
  dataSource.getRepository(Client)
);

container.registerSingleton(
  "CreateClientsUseCase",
  CreateClientUseCase.UseCase
);

container.registerSingleton("GetClientsUseCase", GetClientUseCase.UseCase);

container.registerSingleton(
  "SearchClientsUseCase",
  SearchClientUseCase.UseCase
);

container.registerSingleton(
  "UpdateClientsUseCase",
  UpdateClientUseCase.UseCase
);

container.registerSingleton(
  "DeleteClientsUseCase",
  DeleteClientUseCase.UseCase
);

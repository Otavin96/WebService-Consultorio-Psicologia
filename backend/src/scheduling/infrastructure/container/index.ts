import { container } from "tsyringe";
import { SchedulingsTyperomRepository } from "../typeorm/repositories/schedulings-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Scheduling } from "../typeorm/entities/scheduling.entity";
import { CreateSchedulingUseCase } from "@/scheduling/application/usecases/create-scheduling-usecase";
import { DeleteSchedulingUseCase } from "@/scheduling/application/usecases/delete-scheduling.usecase";
import { GetSchedulingUseCase } from "@/scheduling/application/usecases/get-scheduling.usecase";
import { SearchSchedulingUseCase } from "@/scheduling/application/usecases/search.scheduling-usecase";
import { UpdateSchedulingUseCase } from "@/scheduling/application/usecases/update-scheduling-usecase";
import { GetAllSchedulingByClientUseCase } from "@/scheduling/application/usecases/get-scheduling-all-by-client.scheduling-usecase.";

container.registerSingleton(
  "SchedulingsRepository",
  SchedulingsTyperomRepository
);

container.registerInstance(
  "SchedulingsDefaultTypeormRepository",
  dataSource.getRepository(Scheduling)
);

container.registerSingleton(
  "CreateSchedulingsUseCase",
  CreateSchedulingUseCase.UseCase
);

container.registerSingleton(
  "DeleteSchedulingsUseCase",
  DeleteSchedulingUseCase.UseCase
);

container.registerSingleton(
  "GetSchedulingsUseCase",
  GetSchedulingUseCase.UseCase
);

container.registerSingleton(
  "GetAllSchedulingByClientUseCase",
  GetAllSchedulingByClientUseCase.UseCase
);

container.registerSingleton(
  "SearchSchedulingsUseCase",
  SearchSchedulingUseCase.UseCase
);

container.registerSingleton(
  "UpdateSchedulingsUseCase",
  UpdateSchedulingUseCase.UseCase
);

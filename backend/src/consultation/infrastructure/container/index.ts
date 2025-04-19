import { container } from "tsyringe";
import { ConsultationTypeormRepository } from "../typeorm/repositories/consultation-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Consultation } from "../typeorm/entities/consultation.entity";
import { DeleteConsultationUseCase } from "@/consultation/application/usecases/delete-consultation.usecase";
import { GetConsultationUseCase } from "@/consultation/application/usecases/get-consultation.usecase";
import { SearchConsultationUseCase } from "@/consultation/application/usecases/search.consultation-usecase";
import { UpdateConsutationUseCase } from "@/consultation/application/usecases/update-consultation-usecase";
import { CreateConsultationUseCase } from "@/consultation/application/usecases/create-consultation-usecase";

container.registerSingleton(
  "ConsultationsRepository",
  ConsultationTypeormRepository
);

container.registerInstance(
  "ConsultationDefaultTypeormRepository",
  dataSource.getRepository(Consultation)
);

container.registerSingleton(
  "CreateConsultationsUseCase",
  CreateConsultationUseCase.UseCase
);

container.registerSingleton(
  "DeleteConsultationsUseCase",
  DeleteConsultationUseCase.UseCase
);

container.registerSingleton(
  "GetConsultationsUseCase",
  GetConsultationUseCase.UseCase
);

container.registerSingleton(
  "SearchConsultationsUseCase",
  SearchConsultationUseCase.UseCase
);

container.registerSingleton(
  "UpdateConsutationsUseCase",
  UpdateConsutationUseCase.UseCase
);

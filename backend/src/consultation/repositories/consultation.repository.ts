import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import { ConsultationModel, Status } from "../domain/models/consultation.model";
import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";

export type CreateConsultationProps = {
  situation: Status;
  previousConsultations: { date: string; note: string }[];
  currentQuery: string;
  patientAttention: string;
  scheduling: Scheduling;
};

export interface ConsultationsRepository
  extends RepositoryInterface<ConsultationModel, CreateConsultationProps> {}

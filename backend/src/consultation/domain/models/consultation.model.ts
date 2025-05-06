import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entitty";

export enum Status {
  IN_PROGRESS = "In progress",
  COMPLETED = "Completed",
}

export interface ConsultationModel {
  id: string;
  situation: Status;
  previousConsultations: { date: string; note: string }[];
  currentQuery: string;
  patientAttention: string;
  scheduling: Scheduling;
  professional: User;
  created_at: Date;
  updated_at: Date;
}

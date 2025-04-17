import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";

export enum Status {
  IN_PROGRESS = "In progress",
  COMPLETED = "Completed",
}

export interface ConsultationModel {
  id: string;
  date: Date;
  time: Date;
  situation: Status;
  prevConsultation: string;
  currentQuery: string;
  patientAttention: string;
  scheduling: Scheduling;
  created_at: Date;
  updated_at: Date;
}

import { Status } from "@/consultation/domain/models/consultation.model";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";

export type ConsultationsOutput = {
  id: string;
  situation: Status;
  previousConsultations: { date: string; note: string }[];
  currentQuery: string;
  patientAttention: string;
  scheduling: Scheduling;
  created_at: Date;
  updated_at: Date;
};

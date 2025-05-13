import { ClientDto } from "./client.dto";

export enum Status {
  IN_PROGRESS = "In progress",
  COMPLETED = "Completed",
}

export type Scheduling = {
  id: string;
  client: ClientDto;
  date: Date;
  time: Date;
  observations: string;
  created_at: Date;
  updated_at: Date;
};

export interface ConsultationDto {
  id?: string;
  situation: string;
  previousConsultations: { date: string; note: string };
  currentQuery: string;
  patientAttention: string;
  scheduling: string | undefined;
  professional: string | undefined;
  created_at?: Date;
  updated_at?: Date;
}

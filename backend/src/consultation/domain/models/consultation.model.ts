export enum Status {
  IN_PROGRESS = "In progress",
  COMPLETED = "Completed",
}

export interface Consultation {
  id: string;
  data: Date;
  time: Date;
  situation: Status;
  prevConsultation: string;
  currentQuery: string;
  patientAttention: string;
  created_at: Date;
  updated_at: Date;
}

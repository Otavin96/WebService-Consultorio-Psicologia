import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entity";

export interface SchedulingModel {
  id: string;
  date: Date;
  time: Date;
  observations: string;
  client: Client;
  created_at: Date;
  updated_at: Date;
}

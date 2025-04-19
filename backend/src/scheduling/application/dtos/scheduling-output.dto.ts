import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entity";

export type SchedulingsOutput = {
  id: string;
  client: Client;
  date: Date;
  time: Date;
  observations: string;
  created_at: Date;
  updated_at: Date;
};

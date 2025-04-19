import { Address } from "@/clients/infrastructure/typeorm/entities/Address";
import { Contact } from "@/clients/infrastructure/typeorm/entities/Contact";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";

export enum RolesProps {
  SECRETARIA = "secretaria",
  PROFISSIONAL_SAUDE = "profissional_saude",
  USER = "usuario",
}

export interface ClientsModel {
  id: string;
  cpf: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: Address;
  contact: Contact;
  roles: RolesProps;
  scheduling: Scheduling[];
  created_at: Date;
  updated_at: Date;
}

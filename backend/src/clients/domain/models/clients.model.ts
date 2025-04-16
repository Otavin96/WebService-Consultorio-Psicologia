import { Address } from "@/clients/infrastructure/typeorm/entities/Address";
import { Contact } from "@/clients/infrastructure/typeorm/entities/Contact";

export enum RolesProps {
  SECRETARIA = "secretaria",
  PROFISSIONAL_SAUDE = "profissional_saude",
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
  created_at: Date;
  updated_at: Date;
}

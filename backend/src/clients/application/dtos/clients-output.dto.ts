import { Address } from "@/clients/infrastructure/typeorm/entities/Address";
import { Contact } from "@/clients/infrastructure/typeorm/entities/Contact";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";

export type ClientsOutput = {
  id: string;
  cpf: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: Address;
  contact: Contact;
  billingAddress: Address;
  scheduling: Scheduling[];
  created_at: Date;
  updated_at: Date;
};
